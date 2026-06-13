'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, Mail, LogOut } from 'lucide-react'

export default function PendingPage() {
  const { user, loading, logOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/login')
      else if (user.approved) router.push('/dashboard')
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">You are on the list!</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Your account is pending admin approval. You will receive an email at{' '}
            <span className="font-medium text-gray-700">{user?.email}</span> once approved.
          </p>
          <div className="bg-orange-50 rounded-xl p-4 flex items-start gap-3 text-left mb-6">
            <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-700">
              <p className="font-medium mb-1">What happens next?</p>
              <p className="text-orange-600 leading-relaxed">
                KK reviews all new accounts personally. Expect approval within 24-48 hours.
              </p>
            </div>
          </div>
          <button
            onClick={logOut}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mx-auto"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
