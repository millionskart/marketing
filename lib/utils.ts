import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}K`
  return xp.toString()
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    media_buyer: 'Media Buyer',
    creative_strategist: 'Creative Strategist',
    marketing_manager: 'Marketing Manager',
    admin: 'Admin',
  }
  return labels[role] ?? role
}

export function getRoleBadgeColor(role: string): string {
  const colors: Record<string, string> = {
    media_buyer: 'bg-blue-100 text-blue-800',
    creative_strategist: 'bg-purple-100 text-purple-800',
    marketing_manager: 'bg-green-100 text-green-800',
    admin: 'bg-red-100 text-red-800',
  }
  return colors[role] ?? 'bg-gray-100 text-gray-800'
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 30) return '🔥🔥🔥'
  if (streak >= 14) return '🔥🔥'
  if (streak >= 7) return '🔥'
  if (streak >= 3) return '⚡'
  return '✨'
}

export function formatDate(date: Date | null): string {
  if (!date) return 'Never'
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).format(date)
}

export function daysSince(date: Date | null): number {
  if (!date) return 999
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function calcScore(correct: number, total: number): number {
  return Math.round((correct / total) * 100)
}

export const PASS_MARK = 70
export const MAX_ATTEMPTS = 3
export const COOLDOWN_HOURS = 24

export function canAttemptAssessment(
  attempts: { attemptNumber: number; completedAt: Date }[]
): { canAttempt: boolean; reason?: string; cooldownEndsAt?: Date } {
  if (attempts.length === 0) return { canAttempt: true }
  
  const latest = attempts[0] // ordered desc
  if (latest.attemptNumber < MAX_ATTEMPTS) return { canAttempt: true }
  
  const cooldownEndsAt = new Date(latest.completedAt.getTime() + COOLDOWN_HOURS * 60 * 60 * 1000)
  if (new Date() < cooldownEndsAt) {
    return { canAttempt: false, reason: 'cooldown', cooldownEndsAt }
  }
  
  return { canAttempt: true }
}
