'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, type User as FirebaseUser
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { createUserDoc, getUserDoc, updateUserActivity } from '@/lib/firestore'
import type { User, Role } from '@/types'

interface AuthContextValue {
  firebaseUser: FirebaseUser | null
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string, role: Role) => Promise<void>
  logOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function loadUser(fbUser: FirebaseUser) {
    const userData = await getUserDoc(fbUser.uid)
    setUser(userData)
    if (userData?.approved) {
      await updateUserActivity(fbUser.uid)
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser)
      if (fbUser) {
        await loadUser(fbUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function signUp(email: string, password: string, name: string, role: Role) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await createUserDoc(cred.user.uid, {
      email,
      displayName: name,
      role,
    })
    // Trigger admin notification email
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'new_signup_admin',
        userName: name,
        data: { email, role },
      }),
    })
  }

  async function logOut() {
    await signOut(auth)
    setUser(null)
  }

  async function refreshUser() {
    if (firebaseUser) {
      await loadUser(firebaseUser)
    }
  }

  return (
    <AuthContext.Provider value={{ firebaseUser, user, loading, signIn, signUp, logOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
