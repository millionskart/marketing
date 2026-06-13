import type { Chapter } from '@/types'

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'ABC of Digital Marketing',
    description: 'Fundamentals of digital marketing — how it works, who it reaches, and why it matters for modern brands.',
    notionUrl: 'https://app.notion.com/p/Ch-1-ABC-of-Digital-Marketing-1986e4ff58a2805aa165ff3dabb44290',
    estimatedMins: 30,
    xpReward: 100,
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Channels & Platforms',
    description: 'Deep dive into Meta, Google, YouTube, and emerging platforms — where to play and how to win on each.',
    notionUrl: 'https://app.notion.com/p/Ch-2-Channels-Platforms-3666e4ff58a28097bdcecd7b40cc9317',
    estimatedMins: 45,
    xpReward: 100,
    unlockAfterChapter: 'ch1',
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Creative Strategy',
    description: 'The art and science of creating ads that stop the scroll — hooks, formats, and testing creative at scale.',
    notionUrl: 'https://app.notion.com/p/Ch-3-Creative-Strategy-3666e4ff58a280ed9151d7569728cf84',
    estimatedMins: 45,
    xpReward: 150,
    certificationLevel: 1,
    unlockAfterChapter: 'ch2',
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Performance Analysis & Scaling',
    description: 'Reading data like a pro — CPM, ROAS, CAC, and knowing exactly when and how to scale a winning campaign.',
    notionUrl: 'https://app.notion.com/p/Ch-4-Performance-Analysis-Scaling-3666e4ff58a280b69654f189537d855b',
    estimatedMins: 50,
    xpReward: 150,
    unlockAfterChapter: 'ch3',
  },
  {
    id: 'ch5',
    number: 5,
    title: 'Brand Thinking & Sr. Judgment',
    description: 'Elevate from executor to strategist — brand positioning, senior-level decisions, and long-term growth thinking.',
    notionUrl: 'https://app.notion.com/p/Ch-5-Brand-Thinking-Sr-Judgment-3676e4ff58a280f58730e19c95bf9782',
    estimatedMins: 50,
    xpReward: 150,
    unlockAfterChapter: 'ch4',
  },
  {
    id: 'ch6',
    number: 6,
    title: 'Funnel Architecture',
    description: 'Build full-funnel marketing systems — from awareness to retention, with the right message at every stage.',
    notionUrl: 'https://app.notion.com/p/Ch-6-Funnel-Architecture',
    estimatedMins: 50,
    xpReward: 200,
    certificationLevel: 2,
    unlockAfterChapter: 'ch5',
  },
  {
    id: 'ch7',
    number: 7,
    title: 'Budget Allocation & ROI Thinking',
    description: 'Spend smarter — portfolio thinking for ad budgets, marginal ROAS, and building cases for media investment.',
    notionUrl: 'https://app.notion.com/p/Ch-7-Budget-Allocation-ROI',
    estimatedMins: 55,
    xpReward: 200,
    unlockAfterChapter: 'ch6',
  },
  {
    id: 'ch8',
    number: 8,
    title: 'Growth Playbooks',
    description: 'The complete playbook library — launch, scale, retention, and turnaround strategies used by top D2C brands.',
    notionUrl: 'https://app.notion.com/p/Ch-8-Growth-Playbooks',
    estimatedMins: 60,
    xpReward: 250,
    certificationLevel: 3,
    unlockAfterChapter: 'ch7',
  },
]

export const CERT_NAMES: Record<number, string> = {
  1: 'Digital Marketing Foundation',
  2: 'Performance Marketing Specialist',
  3: 'Growth Marketing Expert',
  4: 'Game of Selling Master',
}

export function isChapterUnlocked(chapterId: string, passedAssessments: string[]): boolean {
  const chapter = CHAPTERS.find(c => c.id === chapterId)
  if (!chapter) return false
  if (!chapter.unlockAfterChapter) return true
  return passedAssessments.includes(chapter.unlockAfterChapter)
}

export function getCertificationForChapter(chapterId: string): { level: number; name: string } | null {
  const chapter = CHAPTERS.find(c => c.id === chapterId)
  if (!chapter?.certificationLevel) return null
  return { level: chapter.certificationLevel, name: CERT_NAMES[chapter.certificationLevel] }
}
