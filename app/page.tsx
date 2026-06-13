'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ArrowRight, BookOpen, Trophy, Zap, Users, Star, CheckCircle } from 'lucide-react'

const FEATURES = [
  { icon: BookOpen, title: '8 In-Depth Chapters', desc: 'From digital basics to senior-level brand strategy — curated for D2C & e-commerce teams.' },
  { icon: Zap, title: 'AI Marketing Coach', desc: 'Ask questions, get personalized explanations, and deepen your understanding instantly.' },
  { icon: Trophy, title: 'Earn Certifications', desc: '4 levels of certification to validate your skills and stand out in the industry.' },
  { icon: Users, title: 'Team Leaderboard', desc: 'Compete with peers, celebrate wins, and build a culture of continuous learning.' },
]

const STATS = [
  { value: '8', label: 'Chapters' },
  { value: '120+', label: 'Questions' },
  { value: '4', label: 'Certifications' },
  { value: '10+', label: 'Years of Experience' },
]

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user?.approved) router.push('/dashboard')
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <span className="text-xl font-bold text-gray-900">Game of Selling</span>
          </div>
          <Link href="/login" className="btn-primary text-sm py-2 px-4">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-orange-100">
            <Star className="w-4 h-4 fill-current" />
            Built by Millions Kart — 10 years, ₹250Cr+ in sales
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Learn Marketing<br />
            <span className="text-gradient">the Way It Actually Works</span>
          </h1>
          
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            No fluff. No theory. Just battle-tested frameworks from a team that&apos;s spent 
            ₹250+ crore on ads and built brands that actually sell.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="btn-primary flex items-center gap-2 text-base">
              Get Started — It&apos;s Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-400">Admin approval required after signup</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-orange-500">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Everything you need to level up</h2>
          <p className="text-gray-500 text-center mb-12">A complete learning system, not just videos you never finish.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 flex gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Your learning path</h2>
          <div className="space-y-4">
            {[
              { level: 'Level 1', chapters: 'Chapters 1–3', cert: 'Digital Marketing Foundation', color: 'bg-blue-500' },
              { level: 'Level 2', chapters: 'Chapters 4–6', cert: 'Performance Marketing Specialist', color: 'bg-purple-500' },
              { level: 'Level 3', chapters: 'Chapters 7–8', cert: 'Growth Marketing Expert', color: 'bg-orange-500' },
              { level: 'Final', chapters: 'All 8 Chapters', cert: 'Game of Selling Master', color: 'bg-red-500' },
            ].map(({ level, chapters, cert, color }) => (
              <div key={level} className="card p-5 flex items-center gap-4">
                <div className={`w-2 h-12 ${color} rounded-full flex-shrink-0`} />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{level}</div>
                  <div className="font-semibold text-gray-900">{chapters}</div>
                  <div className="text-sm text-gray-500">{cert}</div>
                </div>
                <CheckCircle className="w-5 h-5 text-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to play?</h2>
          <p className="text-gray-500 mb-8">Join the Millions Kart team and start building real marketing skills.</p>
          <Link href="/login" className="btn-primary inline-flex items-center gap-2 text-base">
            Create Your Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <span className="font-semibold text-gray-700">Game of Selling</span>
          </div>
          <p className="text-sm text-gray-400">© 2024 Millions Kart. Built with ❤️ in Mohali.</p>
        </div>
      </footer>
    </div>
  )
}
