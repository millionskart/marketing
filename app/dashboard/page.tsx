'use client'

import AppShell from '@/components/AppShell'
import { useAuth } from '@/contexts/AuthContext'
import { CHAPTERS, isChapterUnlocked } from '@/lib/chapters'
import { formatXP, getStreakEmoji, getRoleLabel } from '@/lib/utils'
import Link from 'next/link'
import { BookOpen, CheckCircle, Lock, ArrowRight, Zap, Flame, Trophy, ChevronRight } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  if (!user) return null

  const passedAssessments = user.passedAssessments ?? []
  const completedChapters = user.completedChapters ?? []

  const progress = Math.round((passedAssessments.length / CHAPTERS.length) * 100)

  return (
    <AppShell>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hey {user.displayName.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            {getRoleLabel(user.role)} • {passedAssessments.length}/{CHAPTERS.length} chapters completed
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-xl font-bold">{formatXP(user.xp)}</span>
            </div>
            <div className="text-xs text-gray-500">Total XP</div>
          </div>
          <div className="card p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-xl">{getStreakEmoji(user.streak)}</span>
              <span className="text-xl font-bold text-gray-900">{user.streak}</span>
            </div>
            <div className="text-xs text-gray-500">Day Streak</div>
          </div>
          <div className="card p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-xl font-bold">{(user.certifications ?? []).length}</span>
            </div>
            <div className="text-xs text-gray-500">Certs</div>
          </div>
        </div>

        {/* Overall progress */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-orange-500">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">{passedAssessments.length} of {CHAPTERS.length} assessments passed</p>
        </div>

        {/* Chapters */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Chapters</h2>
            <span className="text-sm text-gray-400">{CHAPTERS.length} total</span>
          </div>
          <div className="space-y-3">
            {CHAPTERS.map(chapter => {
              const unlocked = isChapterUnlocked(chapter.id, passedAssessments)
              const completed = passedAssessments.includes(chapter.id)
              const read = completedChapters.includes(chapter.id)

              return (
                <div
                  key={chapter.id}
                  className={`card p-4 flex items-center gap-4 ${!unlocked ? 'opacity-60' : ''}`}
                >
                  {/* Status icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    completed ? 'bg-green-50' : unlocked ? 'bg-orange-50' : 'bg-gray-100'
                  }`}>
                    {completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : unlocked ? (
                      <BookOpen className="w-5 h-5 text-orange-500" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-gray-400">Ch.{chapter.number}</span>
                      {chapter.certificationLevel && (
                        <span className="badge bg-yellow-50 text-yellow-700">🏅 Cert {chapter.certificationLevel}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{chapter.title}</h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-400">{chapter.estimatedMins} min</span>
                      <span className="text-xs text-orange-500">+{chapter.xpReward} XP</span>
                    </div>
                  </div>

                  {/* Action */}
                  {unlocked && (
                    <Link
                      href={`/chapter/${chapter.id}`}
                      className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600 flex-shrink-0"
                    >
                      {completed ? 'Review' : read ? 'Test' : 'Start'}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
