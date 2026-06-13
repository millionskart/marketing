'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, BookOpen, Trophy, Medal, User, LogOut, Settings, Loader2, Zap, Bot } from 'lucide-react'
import { cn, getRoleLabel, formatXP } from '@/lib/utils'

const NAV = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/certificates', icon: Medal, label: 'Certificates' },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/ai-coach", icon: Bot, label: "AI Coach" },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (loading) return
    if (!user) { router.push('/login'); return }
    if (!user.approved) { router.push('/pending'); return }
  }, [user, loading, router])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
    </div>
  )

  if (!user?.approved) return null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 fixed h-full z-20">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <div>
              <div className="font-bold text-gray-900 text-sm">Game of Selling</div>
              <div className="text-xs text-gray-400">by Millions Kart</div>
            </div>
          </Link>
        </div>

        {/* User XP */}
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="bg-orange-50 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-orange-600">Your XP</span>
              <Zap className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{formatXP(user.xp)}</div>
            <div className="text-xs text-orange-400 mt-0.5">{getRoleLabel(user.role)}</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                pathname === href || pathname.startsWith(href + '/')
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="w-4.5 h-4.5" />
              {label}
            </Link>
          ))}
          {user.role === 'admin' && (
            <Link
              href="/admin"
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                pathname === '/admin'
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Settings className="w-4.5 h-4.5" />
              Admin
            </Link>
          )}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
              {user.displayName[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{user.displayName}</div>
              <div className="text-xs text-gray-400 truncate">{user.email}</div>
            </div>
          </div>
          <button
            onClick={logOut}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors w-full px-2 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        {/* Mobile topbar */}
        <header className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-bold text-gray-900 text-sm">Game of Selling</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-orange-600">{formatXP(user.xp)} XP</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden bg-white border-t border-gray-100 px-2 py-2 flex items-center justify-around sticky bottom-0">
          {NAV.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors',
                pathname === href ? 'text-orange-600' : 'text-gray-400'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
