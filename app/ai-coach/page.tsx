'use client'

import AppShell from '@/components/AppShell'
import AICoach from '@/components/AICoach'

export default function AICoachPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] animate-fade-in">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">AI Marketing Coach</h1>
          <p className="text-gray-500 text-sm mt-1">Ask anything about digital marketing, campaigns, or concepts from your chapters.</p>
        </div>
        <div className="h-[calc(100%-4rem)]">
          <AICoach />
        </div>
      </div>
    </AppShell>
  )
}
