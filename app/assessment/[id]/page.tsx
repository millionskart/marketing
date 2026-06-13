'use client'

import AppShell from '@/components/AppShell'
import { useAuth } from '@/contexts/AuthContext'
import { CHAPTERS, getCertificationForChapter } from '@/lib/chapters'
import { getQuestionsForChapter, getSmartRetryQuestions } from '@/lib/questions'
import { getAssessmentAttempts, saveAssessmentAttempt, markAssessmentPassed, awardCertification } from '@/lib/firestore'
import { canAttemptAssessment, PASS_MARK, MAX_ATTEMPTS, calcScore } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy, Loader2, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import type { AssessmentAttempt, Question } from '@/types'

type Phase = 'intro' | 'quiz' | 'result'

export default function AssessmentPage() {
  const { id } = useParams<{ id: string }>()
  const { user, refreshUser } = useAuth()
  const router = useRouter()

  const chapter = CHAPTERS.find(c => c.id === id)
  const allQuestions = chapter ? getQuestionsForChapter(chapter.id) : []

  const [phase, setPhase] = useState<Phase>('intro')
  const [attempts, setAttempts] = useState<AssessmentAttempt[]>([])
  const [loadingAttempts, setLoadingAttempts] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [wrongIds, setWrongIds] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)

  const loadAttempts = useCallback(async () => {
    if (!user || !chapter) return
    const data = await getAssessmentAttempts(user.uid, chapter.id)
    setAttempts(data)
    setLoadingAttempts(false)
  }, [user, chapter])

  useEffect(() => { loadAttempts() }, [loadAttempts])

  if (!chapter || !user) return null
  if (loadingAttempts) return (
    <AppShell>
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
      </div>
    </AppShell>
  )

  const alreadyPassed = (user.passedAssessments ?? []).includes(chapter.id)
  const { canAttempt, reason, cooldownEndsAt } = canAttemptAssessment(attempts)
  const attemptNumber = attempts.length + 1
  const latestWrongIds = attempts[0]?.wrongQuestionIds ?? []

  function startQuiz() {
    const qs = attemptNumber > 1
      ? getSmartRetryQuestions(allQuestions, latestWrongIds, 15)
      : allQuestions.slice(0, 15)
    setQuestions(qs)
    setAnswers({})
    setCurrent(0)
    setShowExplanation(false)
    setPhase('quiz')
  }

  function toggleAnswer(optionIdx: number) {
    const q = questions[current]
    const prev = answers[q.id] ?? []
    if (q.type === 'mcq') {
      setAnswers(a => ({ ...a, [q.id]: [optionIdx] }))
    } else {
      if (prev.includes(optionIdx)) {
        setAnswers(a => ({ ...a, [q.id]: prev.filter(i => i !== optionIdx) }))
      } else {
        setAnswers(a => ({ ...a, [q.id]: [...prev, optionIdx] }))
      }
    }
  }

  function isAnswerCorrect(q: Question): boolean {
    const selected = answers[q.id] ?? []
    if (selected.length !== q.correctAnswers.length) return false
    return q.correctAnswers.every(i => selected.includes(i))
  }

  async function handleSubmit() {
    const correct = questions.filter(q => isAnswerCorrect(q)).length
    const sc = calcScore(correct, questions.length)
    const passed = sc >= PASS_MARK
    const badIds = questions.filter(q => !isAnswerCorrect(q)).map(q => q.id)

    setScore(sc)
    setWrongIds(badIds)
    setSubmitting(true)

    try {
      const xpEarned = passed ? questions.reduce((sum, q) => sum + (isAnswerCorrect(q) ? q.xpReward : 0), 0) : 0
      
      await saveAssessmentAttempt({
        userId: user.uid,
        chapterId: chapter.id,
        attemptNumber,
        score: sc,
        passed,
        answers,
        wrongQuestionIds: badIds,
        startedAt: new Date(Date.now() - 1000),
        completedAt: new Date(),
      })

      if (passed) {
        await markAssessmentPassed(user.uid, chapter.id, xpEarned)
        
        // Award certification if applicable
        const cert = getCertificationForChapter(chapter.id)
        if (cert) {
          await awardCertification(user.uid, {
            level: cert.level as 1|2|3|4,
            name: cert.name,
            earnedAt: new Date(),
          })
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'certification_earned',
              to: user.email,
              userName: user.displayName,
              data: { certName: cert.name, chapterTitle: chapter.title },
            }),
          })
        } else {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'chapter_passed',
              to: user.email,
              userName: user.displayName,
              data: { chapterTitle: chapter.title, score: sc.toString() },
            }),
          })
        }

        await refreshUser()
        toast.success(passed ? `Passed! +${xpEarned} XP earned 🎉` : '')
      }

      await loadAttempts()
      setPhase('result')
    } catch {
      toast.error('Failed to save attempt')
    } finally {
      setSubmitting(false)
    }
  }

  const q = questions[current]
  const selectedAnswers = q ? (answers[q.id] ?? []) : []

  // ── INTRO PHASE ──
  if (phase === 'intro') {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto animate-fade-in">
          <Link href={`/chapter/${chapter.id}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter
          </Link>

          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">📝</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Chapter {chapter.number} Assessment</h1>
            <p className="text-gray-500 mb-6">{chapter.title}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xl font-bold text-gray-900">15</div>
                <div className="text-xs text-gray-500">Questions</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xl font-bold text-gray-900">{PASS_MARK}%</div>
                <div className="text-xs text-gray-500">Pass Mark</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xl font-bold text-gray-900">{MAX_ATTEMPTS - attempts.length}</div>
                <div className="text-xs text-gray-500">Attempts Left</div>
              </div>
            </div>

            {alreadyPassed && (
              <div className="bg-green-50 rounded-xl p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="text-sm text-green-700 text-left">
                  <p className="font-medium">Already passed!</p>
                  <p className="text-green-600">Best score: {Math.max(...attempts.map(a => a.score))}%</p>
                </div>
              </div>
            )}

            {!canAttempt && reason === 'cooldown' && cooldownEndsAt && (
              <div className="bg-red-50 rounded-xl p-4 mb-6 flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-500" />
                <div className="text-sm text-red-700 text-left">
                  <p className="font-medium">Cooldown active</p>
                  <p className="text-red-600">You can retry after {cooldownEndsAt.toLocaleString('en-IN')}</p>
                </div>
              </div>
            )}

            {attempts.length > 0 && (
              <div className="bg-orange-50 rounded-xl p-4 mb-6 text-left">
                <p className="text-xs font-medium text-orange-600 mb-2 uppercase tracking-wide">Previous Attempts</p>
                {attempts.map(a => (
                  <div key={a.id} className="flex items-center justify-between text-sm py-1">
                    <span className="text-gray-600">Attempt {a.attemptNumber}</span>
                    <span className={`font-semibold ${a.passed ? 'text-green-600' : 'text-red-500'}`}>
                      {a.score}% {a.passed ? '✓' : '✗'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Link href={`/chapter/${chapter.id}`} className="btn-secondary text-sm py-2.5 px-5">
                Review Chapter
              </Link>
              {canAttempt && (
                <button onClick={startQuiz} className="btn-primary text-sm py-2.5 px-5">
                  {alreadyPassed ? 'Retake Assessment' : `Start Attempt ${attemptNumber}`}
                </button>
              )}
            </div>
          </div>
        </div>
      </AppShell>
    )
  }

  // ── QUIZ PHASE ──
  if (phase === 'quiz' && q) {
    const answered = selectedAnswers.length > 0
    const isLast = current === questions.length - 1

    return (
      <AppShell>
        <div className="max-w-2xl mx-auto animate-fade-in">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Question {current + 1} of {questions.length}</span>
              <span className="text-sm font-medium text-orange-500">{Math.round(((current) / questions.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-300"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="card p-6">
            {/* Question type badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="badge bg-gray-100 text-gray-600 capitalize">{q.type.replace('_', ' ')}</span>
              <span className="badge bg-orange-50 text-orange-600">+{q.xpReward} XP</span>
              {q.type === 'multi_select' && (
                <span className="badge bg-blue-50 text-blue-600">Select all that apply</span>
              )}
            </div>

            {/* Question */}
            <h2 className="text-lg font-semibold text-gray-900 mb-5 leading-relaxed">{q.text}</h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {q.options.map((opt, idx) => {
                const selected = selectedAnswers.includes(idx)
                return (
                  <button
                    key={idx}
                    onClick={() => !showExplanation && toggleAnswer(idx)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      selected
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gray-400">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {current > 0 && (
                <button onClick={() => { setCurrent(c => c - 1); setShowExplanation(false) }} className="btn-secondary text-sm py-2.5 px-4">
                  Back
                </button>
              )}
              <div className="flex-1" />
              {!isLast ? (
                <button
                  onClick={() => { setCurrent(c => c + 1); setShowExplanation(false) }}
                  disabled={!answered}
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!answered || submitting}
                  className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : 'Submit Assessment'}
                </button>
              )}
            </div>
          </div>
        </div>
      </AppShell>
    )
  }

  // ── RESULT PHASE ──
  if (phase === 'result') {
    const passed = score >= PASS_MARK
    const cert = passed ? getCertificationForChapter(chapter.id) : null

    return (
      <AppShell>
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="card p-8 text-center mb-6">
            <div className="text-5xl mb-4">{passed ? '🎉' : '😤'}</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {passed ? 'Assessment Passed!' : 'Not Quite There'}
            </h1>
            <p className="text-gray-500 mb-6">{chapter.title}</p>

            <div className={`text-5xl font-extrabold mb-2 ${passed ? 'text-green-500' : 'text-red-500'}`}>
              {score}%
            </div>
            <p className="text-sm text-gray-400 mb-6">
              {passed ? `${PASS_MARK}% required — you passed!` : `${PASS_MARK}% required — ${PASS_MARK - score}% short`}
            </p>

            {cert && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-yellow-800">Certification Earned!</p>
                  <p className="text-sm text-yellow-600">{cert.name}</p>
                </div>
              </div>
            )}

            {!passed && wrongIds.length > 0 && (
              <div className="bg-red-50 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-700">
                  <p className="font-medium mb-1">On your next attempt:</p>
                  <p className="text-red-600">The {wrongIds.length} questions you got wrong will appear more frequently to help you focus on weak areas.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-3">
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-bold">{questions.length - wrongIds.length}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Correct</div>
              </div>
              <div className="bg-red-50 rounded-xl p-3">
                <div className="flex items-center justify-center gap-1 text-red-500">
                  <XCircle className="w-4 h-4" />
                  <span className="font-bold">{wrongIds.length}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Incorrect</div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Link href="/dashboard" className="btn-secondary text-sm py-2.5 px-5">
                Dashboard
              </Link>
              {passed ? (
                <Link href="/leaderboard" className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Leaderboard
                </Link>
              ) : canAttemptAssessment(attempts).canAttempt ? (
                <button onClick={() => { setPhase('intro') }} className="btn-primary text-sm py-2.5 px-5">
                  Try Again
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </AppShell>
    )
  }

  return null
}
