export type Role = 'media_buyer' | 'creative_strategist' | 'marketing_manager' | 'admin'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export interface User {
  uid: string
  email: string
  displayName: string
  role: Role
  approvalStatus: ApprovalStatus
  approved: boolean
  xp: number
  streak: number
  lastActiveAt: Date | null
  completedChapters: string[]
  passedAssessments: string[]
  createdAt: Date
  certifications: Certification[]
  avatarUrl?: string
}

export interface Chapter {
  id: string
  number: number
  title: string
  description: string
  notionUrl: string
  estimatedMins: number
  xpReward: number
  certificationLevel?: 1 | 2 | 3 | 4
  unlockAfterChapter?: string
}

export interface Question {
  id: string
  chapterId: string
  type: 'mcq' | 'multi_select' | 'scenario'
  text: string
  options: string[]
  correctAnswers: number[]  // indices
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  xpReward: number
}

export interface AssessmentAttempt {
  id: string
  userId: string
  chapterId: string
  attemptNumber: number
  score: number
  passed: boolean
  answers: Record<string, number[]>  // questionId -> selected indices
  wrongQuestionIds: string[]
  startedAt: Date
  completedAt: Date
}

export interface Certification {
  level: 1 | 2 | 3 | 4
  name: string
  earnedAt: Date
  certificateUrl?: string
}

export interface LeaderboardEntry {
  uid: string
  displayName: string
  role: Role
  xp: number
  streak: number
  completedChapters: number
  passedAssessments: number
  rank: number
}

export interface EmailPayload {
  type: 'account_approved' | 'chapter_passed' | 'certification_earned' | 'inactivity_reminder'
  to: string
  userName: string
  data?: Record<string, string | number>
}

export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
