'use client'

import AppShell from '@/components/AppShell'
import { useAuth } from '@/contexts/AuthContext'
import { getAllUsers, approveUser, rejectUser } from '@/lib/firestore'
import { getRoleLabel, getRoleBadgeColor, formatDate, daysSince, formatXP } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Clock, CheckCircle, XCircle, Loader2, AlertCircle, Zap, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import type { User } from '@/types'

type TabFilter = 'pending' | 'approved' | 'all'

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [tab, setTab] = useState<TabFilter>('pending')

  useEffect(() => {
    if (user && user.role !== 'admin') { router.push('/dashboard'); return }
    loadUsers()
  }, [user])

  async function loadUsers() {
    setLoading(true)
    const data = await getAllUsers()
    setUsers(data.sort((a, b) => (b.createdAt?.getTime?.() ?? 0) - (a.createdAt?.getTime?.() ?? 0)))
    setLoading(false)
  }

  async function handleApprove(uid: string, name: string, email: string) {
    setActionLoading(uid)
    try {
      await approveUser(uid)
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'account_approved',
          to: email,
          userName: name,
          data: {},
        }),
      })
      toast.success(`${name} approved`)
      await loadUsers()
    } catch {
      toast.error('Failed to approve')
    } finally {
      setActionLoading(null)
    }
  }

  async function handleReject(uid: string, name: string) {
    setActionLoading(uid)
    try {
      await rejectUser(uid)
      toast.success(`${name} rejected`)
      await loadUsers()
    } catch {
      toast.error('Failed to reject')
    } finally {
      setActionLoading(null)
    }
  }

  if (user?.role !== 'admin') return null

  const pending = users.filter(u => u.approvalStatus === 'pending')
  const approved = users.filter(u => u.approved)
  const filtered = tab === 'pending' ? pending : tab === 'approved' ? approved : users
  const inactive = approved.filter(u => daysSince(u.lastActiveAt) >= 5)

  return (
    <AppShell>
      <div className="animate-fade-in space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage users and monitor progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Pending Approval', value: pending.length, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Active Learners', value: approved.length, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
            { label: 'Inactive (5d+)', value: inactive.length, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="card p-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4.5 h-4.5 ${color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {(['pending', 'approved', 'all'] as TabFilter[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t} {t === 'pending' ? `(${pending.length})` : t === 'approved' ? `(${approved.length})` : `(${users.length})`}
            </button>
          ))}
        </div>

        {/* User list */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No users in this category</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(u => {
              const inactive5d = u.approved && daysSince(u.lastActiveAt) >= 5
              return (
                <div key={u.uid} className={`card p-4 flex items-center gap-4 ${inactive5d ? 'border-l-4 border-l-red-300' : ''}`}>
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                    {u.displayName?.[0]?.toUpperCase() ?? '?'}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">{u.displayName}</span>
                      <span className={`badge ${getRoleBadgeColor(u.role)}`}>{getRoleLabel(u.role)}</span>
                      {u.approvalStatus === 'pending' && <span className="badge bg-orange-100 text-orange-700">Pending</span>}
                      {inactive5d && <span className="badge bg-red-100 text-red-700">Inactive {daysSince(u.lastActiveAt)}d</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="text-xs text-gray-400">{u.email}</span>
                      {u.approved && (
                        <>
                          <span className="flex items-center gap-0.5 text-xs text-orange-500">
                            <Zap className="w-3 h-3" />{formatXP(u.xp)}
                          </span>
                          <span className="flex items-center gap-0.5 text-xs text-gray-400">
                            <BookOpen className="w-3 h-3" />{(u.passedAssessments ?? []).length} chapters
                          </span>
                        </>
                      )}
                      <span className="text-xs text-gray-400">Joined {formatDate(u.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {u.approvalStatus === 'pending' && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleApprove(u.uid, u.displayName, u.email)}
                        disabled={actionLoading === u.uid}
                        className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {actionLoading === u.uid ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(u.uid, u.displayName)}
                        disabled={actionLoading === u.uid}
                        className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Inactivity reminder section */}
        {inactive.length > 0 && tab === 'approved' && (
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Send Inactivity Reminders
            </h3>
            <p className="text-sm text-gray-500 mb-4">{inactive.length} users haven&apos;t logged in for 5+ days.</p>
            <button
              onClick={async () => {
                for (const u of inactive) {
                  await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      type: 'inactivity_reminder',
                      to: u.email,
                      userName: u.displayName,
                      data: { daysSince: daysSince(u.lastActiveAt).toString() },
                    }),
                  })
                }
                toast.success(`Reminders sent to ${inactive.length} users`)
              }}
              className="btn-primary text-sm py-2 px-4"
            >
              Send Reminders to All ({inactive.length})
            </button>
          </div>
        )}
      </div>
    </AppShell>
  )
}
