'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Role } from '@/types'

type Tab = 'signin' | 'signup'

const ROLES: { value: Role; label: string; desc: string }[] = [
  { value: 'media_buyer', label: 'Media Buyer', desc: 'You run paid ads and optimize campaigns' },
  { value: 'creative_strategist', label: 'Creative Strategist', desc: 'You create and test ad creatives' },
  { value: 'marketing_manager', label: 'Marketing Manager', desc: 'You oversee marketing strategy & teams' },
]

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<Role>('media_buyer')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp, user } = useAuth()
  const router = useRouter()

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn(email, password)
      // Wait for auth state to update, then check approval
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } catch (err: unknown) {
      const msg = (err as { code?: string })?.code === 'auth/invalid-credential'
        ? 'Invalid email or password'
        : 'Sign in failed. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { toast.error('Please enter your name'); return }
    if (password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      await signUp(email, password, name, role)
      toast.success('Account created! Waiting for admin approval.', { duration: 6000 })
      setTab('signin')
    } catch (err: unknown) {
      const msg = (err as { code?: string })?.code === 'auth/email-already-in-use'
        ? 'Email already registered. Sign in instead.'
        : 'Sign up failed. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3">
        <Link href="/" className="btn-ghost flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🎮</div>
            <h1 className="text-2xl font-bold text-gray-900">Game of Selling</h1>
            <p className="text-gray-500 text-sm mt-1">Marketing Academy by Millions Kart</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {(['signin', 'signup'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Sign In */}
          {tab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                <input
                  type="email" required
                  className="input"
                  placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'} required
                    className="input pr-12"
                    placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : 'Sign In'}
              </button>
            </form>
          )}

          {/* Sign Up */}
          {tab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                <input
                  type="text" required
                  className="input"
                  placeholder="Rahul Sharma"
                  value={name} onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                <input
                  type="email" required
                  className="input"
                  placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'} required minLength={8}
                    className="input pr-12"
                    placeholder="Min. 8 characters"
                    value={password} onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Your Role</label>
                <div className="space-y-2">
                  {ROLES.map(r => (
                    <label
                      key={r.value}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        role === r.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio" name="role" value={r.value}
                        checked={role === r.value}
                        onChange={() => setRole(r.value)}
                        className="mt-0.5 accent-orange-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{r.label}</div>
                        <div className="text-gray-500 text-xs">{r.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</> : 'Create Account'}
              </button>
              <p className="text-xs text-gray-400 text-center">
                Your account will be reviewed and approved by admin before you can access the content.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
