'use client'

import AppShell from '@/components/AppShell'
import { useAuth } from '@/contexts/AuthContext'
import { CERT_NAMES } from '@/lib/chapters'
import { formatDate } from '@/lib/utils'
import { Medal, Lock } from 'lucide-react'

const ALL_CERTS = [
  { level: 1, color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  { level: 2, color: 'from-purple-400 to-purple-600', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  { level: 3, color: 'from-orange-400 to-red-500', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  { level: 4, color: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
]

export default function CertificatesPage() {
  const { user } = useAuth()
  if (!user) return null

  const earned = user.certifications ?? []

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Certifications</h1>
          <p className="text-gray-500 text-sm mt-1">{earned.length} of {ALL_CERTS.length} earned</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {ALL_CERTS.map(({ level, color, bg, text, border }) => {
            const certData = earned.find(c => c.level === level)
            const isEarned = !!certData

            return (
              <div
                key={level}
                className={`rounded-2xl border-2 p-6 transition-all ${
                  isEarned ? `${border} shadow-sm` : 'border-gray-200 opacity-60'
                }`}
              >
                {/* Certificate card visual */}
                <div className={`h-28 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 left-2 text-6xl font-extrabold text-white opacity-20">GOS</div>
                  </div>
                  {isEarned ? (
                    <div className="text-center text-white">
                      <Medal className="w-8 h-8 mx-auto mb-1" />
                      <div className="text-xs font-medium opacity-80">CERTIFIED</div>
                    </div>
                  ) : (
                    <Lock className="w-8 h-8 text-white opacity-60" />
                  )}
                </div>

                <div>
                  <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isEarned ? text : 'text-gray-400'}`}>
                    Level {level}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{CERT_NAMES[level]}</h3>
                  {isEarned && certData ? (
                    <>
                      <p className="text-xs text-gray-400">Earned {formatDate(certData.earnedAt)}</p>
                      <div className={`mt-3 inline-flex items-center gap-1.5 ${bg} ${text} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                        <Medal className="w-3.5 h-3.5" />
                        Certificate Earned
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400">Complete the required chapters to unlock</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {earned.length === 0 && (
          <div className="text-center mt-8 p-8 bg-gray-50 rounded-2xl">
            <Medal className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No certificates yet</p>
            <p className="text-gray-400 text-sm mt-1">Complete chapters and pass assessments to earn your first certification.</p>
          </div>
        )}
      </div>
    </AppShell>
  )
}
