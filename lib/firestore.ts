import {
  doc, getDoc, setDoc, updateDoc, collection,
  query, where, orderBy, limit, getDocs,
  serverTimestamp, Timestamp, increment, arrayUnion
} from 'firebase/firestore'
import { db } from './firebase'
import type { User, AssessmentAttempt, Certification, LeaderboardEntry } from '@/types'

// ── User ─────────────────────────────────────────────────────────────────────

export async function createUserDoc(uid: string, data: Partial<User>) {
  await setDoc(doc(db, 'users', uid), {
    uid,
    xp: 0,
    streak: 0,
    completedChapters: [],
    passedAssessments: [],
    certifications: [],
    approvalStatus: 'pending',
    approved: false,
    lastActiveAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    ...data,
  })
}

export async function getUserDoc(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return null
  const data = snap.data()
  return {
    ...data,
    lastActiveAt: data.lastActiveAt?.toDate() ?? null,
    createdAt: data.createdAt?.toDate() ?? new Date(),
    certifications: (data.certifications ?? []).map((c: any) => ({
      ...c,
      earnedAt: c.earnedAt?.toDate?.() ?? new Date(),
    })),
  } as User
}

export async function updateUserActivity(uid: string) {
  await updateDoc(doc(db, 'users', uid), {
    lastActiveAt: serverTimestamp(),
  })
}

export async function updateUserXP(uid: string, amount: number) {
  await updateDoc(doc(db, 'users', uid), {
    xp: increment(amount),
  })
}

export async function markChapterComplete(uid: string, chapterId: string, xpReward: number) {
  await updateDoc(doc(db, 'users', uid), {
    completedChapters: arrayUnion(chapterId),
    xp: increment(xpReward),
    lastActiveAt: serverTimestamp(),
  })
}

export async function markAssessmentPassed(uid: string, chapterId: string, xpReward: number) {
  await updateDoc(doc(db, 'users', uid), {
    passedAssessments: arrayUnion(chapterId),
    xp: increment(xpReward),
    lastActiveAt: serverTimestamp(),
  })
}

export async function awardCertification(uid: string, cert: Certification) {
  await updateDoc(doc(db, 'users', uid), {
    certifications: arrayUnion({
      ...cert,
      earnedAt: Timestamp.fromDate(cert.earnedAt),
    }),
    xp: increment(500), // cert bonus XP
    lastActiveAt: serverTimestamp(),
  })
}

export async function approveUser(uid: string) {
  await updateDoc(doc(db, 'users', uid), {
    approved: true,
    approvalStatus: 'approved',
  })
}

export async function rejectUser(uid: string) {
  await updateDoc(doc(db, 'users', uid), {
    approved: false,
    approvalStatus: 'rejected',
  })
}

export async function getAllUsers(): Promise<User[]> {
  const snap = await getDocs(collection(db, 'users'))
  return snap.docs.map(d => {
    const data = d.data()
    return {
      ...data,
      lastActiveAt: data.lastActiveAt?.toDate() ?? null,
      createdAt: data.createdAt?.toDate() ?? new Date(),
      certifications: (data.certifications ?? []).map((c: any) => ({
        ...c,
        earnedAt: c.earnedAt?.toDate?.() ?? new Date(),
      })),
    } as User
  })
}

export async function getPendingUsers(): Promise<User[]> {
  const q = query(collection(db, 'users'), where('approvalStatus', '==', 'pending'))
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data() as User)
}

// ── Assessments ───────────────────────────────────────────────────────────────

export async function saveAssessmentAttempt(attempt: Omit<AssessmentAttempt, 'id'>) {
  const ref = doc(collection(db, 'assessments'))
  await setDoc(ref, {
    ...attempt,
    id: ref.id,
    startedAt: Timestamp.fromDate(attempt.startedAt),
    completedAt: Timestamp.fromDate(attempt.completedAt),
  })
  return ref.id
}

export async function getAssessmentAttempts(userId: string, chapterId: string): Promise<AssessmentAttempt[]> {
  const q = query(
    collection(db, 'assessments'),
    where('userId', '==', userId),
    where('chapterId', '==', chapterId),
    orderBy('completedAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => {
    const data = d.data()
    return {
      ...data,
      startedAt: data.startedAt?.toDate() ?? new Date(),
      completedAt: data.completedAt?.toDate() ?? new Date(),
    } as AssessmentAttempt
  })
}

// ── Leaderboard ───────────────────────────────────────────────────────────────

export async function getLeaderboard(limitCount = 50): Promise<LeaderboardEntry[]> {
  const q = query(
    collection(db, 'users'),
    where('approved', '==', true),
    orderBy('xp', 'desc'),
    limit(limitCount)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d, i) => {
    const data = d.data()
    return {
      uid: data.uid,
      displayName: data.displayName,
      role: data.role,
      xp: data.xp ?? 0,
      streak: data.streak ?? 0,
      completedChapters: (data.completedChapters ?? []).length,
      passedAssessments: (data.passedAssessments ?? []).length,
      rank: i + 1,
    } as LeaderboardEntry
  })
}
