'use client'

import AppShell from '@/components/AppShell'
import { useAuth } from '@/contexts/AuthContext'
import { CHAPTERS, isChapterUnlocked } from '@/lib/chapters'
import { markChapterComplete } from '@/lib/firestore'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, CheckCircle, Clock, Zap, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ChapterPage() {
  const { id } = useParams<{ id: string }>()
  const { user, refreshUser } = useAuth()
  const router = useRouter()
  const [marking, setMarking] = useState(false)

  const chapter = CHAPTERS.find(c => c.id === id)
  if (!chapter || !user) return null

  const unlocked = isChapterUnlocked(chapter.id, user.passedAssessments ?? [])
  const completed = (user.completedChapters ?? []).includes(chapter.id)
  const assessmentPassed = (user.passedAssessments ?? []).includes(chapter.id)

  if (!unlocked) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="font-bold text-gray-900 mb-2">Chapter Locked</h2>
            <p className="text-gray-500 text-sm">Pass the assessment for the previous chapter to unlock this.</p>
            <Link href="/dashboard" className="btn-primary mt-4 inline-flex items-center gap-2 text-sm py-2">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
        </div>
      </AppShell>
    )
  }

  async function handleMarkRead() {
    if (!user || completed) return
    setMarking(true)
    try {
      await markChapterComplete(user.uid, chapter!.id, chapter!.xpReward)
      await refreshUser()
      toast.success(`+${chapter!.xpReward} XP! Chapter marked as read.`)
    } catch {
      toast.error('Failed to save progress')
    } finally {
      setMarking(false)
    }
  }

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Back */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          All Chapters
        </Link>

        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge bg-orange-100 text-orange-700">Chapter {chapter.number}</span>
            {assessmentPassed && <span className="badge bg-green-100 text-green-700">✓ Completed</span>}
            {chapter.certificationLevel && (
              <span className="badge bg-yellow-50 text-yellow-700">🏅 Cert Level {chapter.certificationLevel}</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{chapter.title}</h1>
          <p className="text-gray-500 mb-5">{chapter.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {chapter.estimatedMins} min read
            </div>
            <div className="flex items-center gap-1 text-orange-500">
              <Zap className="w-4 h-4" />
              +{chapter.xpReward} XP
            </div>
          </div>
        </div>

        {/* Notion link */}
        <div className="card p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Chapter Content</h2>
          <p className="text-gray-500 text-sm mb-4">
            This chapter is hosted on Notion. Open it in a new tab, read it thoroughly, then come back to mark it complete and take the assessment.
          </p>
          <a
            href={chapter.notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Open Chapter in Notion
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Mark complete & take assessment */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-4">What to do next</h2>
          <div className="space-y-3">
            <div className={`flex items-center gap-3 p-3 rounded-xl border ${completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${completed ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {completed ? '✓' : '1'}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900">Read the chapter</div>
                <div className="text-xs text-gray-500">Open Notion and read the full content</div>
              </div>
              {!completed && (
                <button
                  onClick={handleMarkRead}
                  disabled={marking}
                  className="btn-primary text-xs py-1.5 px-3"
                >
                  {marking ? 'Saving…' : 'Mark Read'}
                </button>
              )}
              {completed && <CheckCircle className="w-5 h-5 text-green-500" />}
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border ${assessmentPassed ? 'border-green-200 bg-green-50' : completed ? 'border-orange-200 bg-orange-50' : 'border-gray-200 opacity-60'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${assessmentPassed ? 'bg-green-500 text-white' : completed ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {assessmentPassed ? '✓' : '2'}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900">Take the Assessment</div>
                <div className="text-xs text-gray-500">15 questions • 70% to pass • 3 attempts</div>
              </div>
              {completed && !assessmentPassed && (
                <Link
                  href={`/assessment/${chapter.id}`}
                  className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1"
                >
                  Start <ChevronRight className="w-3 h-3" />
                </Link>
              )}
              {assessmentPassed && <CheckCircle className="w-5 h-5 text-green-500" />}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
