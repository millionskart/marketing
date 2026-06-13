'use client'

import AppShell from '@/components/AppShell'
import { useAuth } from '@/contexts/AuthContext'
import { getLeaderboard } from '@/lib/firestore'
import { getRoleLabel, formatXP, getStreakEmoji, cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Trophy, Zap, Flame, Loader2 } from 'lucide-react'
import type { LeaderboardEntry } from '@/types'

const MEDAL = ['🥇', '🥈', '🥉']

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLeaderboard().then(data => { setEntries(data); setLoading(false) })
  }, [])

  const myRank = entries.findIndex(e => e.uid === user?.uid) + 1

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
            <p className="text-gray-500 text-sm mt-1">Top performers this cycle</p>
          </div>
          {myRank > 0 && (
            <div className="bg-orange-50 rounded-xl px-4 py-2 text-right">
              <div className="text-xs text-orange-600 font-medium">Your Rank</div>
              <div className="text-2xl font-extrabold text-orange-500">#{myRank}</div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          </div>
        ) : entries.length === 0 ? (
          <div className="card p-12 text-center">
            <Trophy className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500">No entries yet — be the first!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, i) => {
              const isMe = entry.uid === user?.uid
              return (
                <div
                  key={entry.uid}
                  className={cn(
                    'card p-4 flex items-center gap-4 transition-all',
                    isMe && 'ring-2 ring-orange-400 ring-offset-1',
                    i === 0 && 'bg-gradient-to-r from-yellow-50 to-white',
                    i === 1 && 'bg-gradient-to-r from-gray-50 to-white',
                    i === 2 && 'bg-gradient-to-r from-orange-50 to-white',
                  )}
                >
                  {/* Rank */}
                  <div className="w-10 text-center flex-shrink-0">
                    {i < 3 ? (
                      <span className="text-xl">{MEDAL[i]}</span>
                    ) : (
                      <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    isMe ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {entry.displayName[0]?.toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">
                        {entry.displayName} {isMe && <span className="text-orange-500">(You)</span>}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-400">{getRoleLabel(entry.role)}</span>
                      <span className="text-xs text-gray-400">{entry.passedAssessments} chapters</span>
                      {entry.streak >= 3 && (
                        <span className="text-xs">{getStreakEmoji(entry.streak)} {entry.streak}d</span>
                      )}
                    </div>
                  </div>

                  {/* XP */}
                  <div className="flex items-center gap-1 text-orange-500 flex-shrink-0">
                    <Zap className="w-4 h-4 fill-current" />
                    <span className="font-bold text-sm">{formatXP(entry.xp)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AppShell>
  )
}
