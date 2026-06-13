'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AIMessage } from '@/types'

interface AICoachProps {
  onClose?: () => void
}

export default function AICoach({ onClose }: AICoachProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content: "Hey! I'm your AI marketing coach — trained on real D2C playbooks from Millions Kart. Ask me anything about digital marketing, Meta ads, scaling, ROAS, creative strategy, or any concept from your chapters.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: AIMessage = { role: 'user', content: text, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply ?? 'Sorry, I ran into an issue. Please try again.',
        timestamp: new Date(),
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Network error — please try again.',
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">AI Marketing Coach</div>
            <div className="text-orange-100 text-xs">Ask anything about marketing</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}>
            {/* Avatar */}
            <div className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs',
              msg.role === 'assistant' ? 'bg-orange-50' : 'bg-gray-100'
            )}>
              {msg.role === 'assistant' ? <Bot className="w-3.5 h-3.5 text-orange-500" /> : <User className="w-3.5 h-3.5 text-gray-500" />}
            </div>

            {/* Bubble */}
            <div className={cn(
              'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
              msg.role === 'assistant'
                ? 'bg-gray-50 text-gray-800 rounded-tl-none'
                : 'bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-tr-none'
            )}>
              {msg.content.split('\n').map((line, j) => (
                <p key={j} className={j > 0 ? 'mt-2' : ''}>
                  {line.split(/\*\*(.*?)\*\*/g).map((part, k) =>
                    k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 bg-orange-50 rounded-full flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3">
              <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask about ROAS, creative strategy, scaling..."
            className="input text-sm py-2.5 flex-1"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide">
          {['What is ROAS?', 'How to scale Meta ads?', 'Explain creative fatigue', 'What is MER?'].map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="text-xs text-gray-400 hover:text-orange-500 whitespace-nowrap border border-gray-200 hover:border-orange-300 rounded-lg px-2 py-1 transition-colors flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
