'use client'

import AppShell from '@/components/AppShell'
import { useAuth } from '@/contexts/AuthContext'
import { getRoleLabel, getRoleBadgeColor, formatXP, formatDate, getStreakEmoji } from '@/lib/utils'
import { CHAPTERS } from '@/lib/chapters'
import { Zap, Flame, BookOpen, Medal, Calendar } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  if (!user) return null

  const passed = user.passedAssessments?.length ?? 0
  const certs = user.certifications?.length ?? 0
  const progress = Math.round((passed / CHAPTERS.length) * 100)

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
        {/* Avatar & name */}
        <div className="card p-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white">
              {user.displayName[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{user.displayName}</h1>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <span className={`badge mt-1.5 ${getRoleBadgeColor(user.role)}`}>
                {getRoleLabel(user.role)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Zap, label: 'Total XP', value: formatXP(user.xp), color: 'text-orange-500', bg: 'bg-orange-50' },
            { icon: Flame, label: 'Day Streak', value: `${user.streak} ${getStreakEmoji(user.streak)}`, color: 'text-red-500', bg: 'bg-red-50' },
            { icon: BookOpen, label: 'Chapters Passed', value: `${passed}/${CHAPTERS.length}`, color: 'text-blue-500', bg: 'bg-blue-50' },
            { icon: Medal, label: 'Certifications', value: certs.toString(), color: 'text-yellow-500', bg: 'bg-yellow-50' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="text-xs text-gray-400">{label}</div>
                <div className="font-bold text-gray-900">{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-700 text-sm">Overall Progress</span>
            <span className="text-sm font-bold text-orange-500">{progress}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Account info */}
        <div className="card p-5 space-y-3">
          <h3 className="font-semibold text-gray-700 text-sm">Account Details</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Member since
            </span>
            <span className="font-medium text-gray-900">{formatDate(user.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Last active</span>
            <span className="font-medium text-gray-900">{formatDate(user.lastActiveAt)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className="badge bg-green-100 text-green-700">✓ Approved</span>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
