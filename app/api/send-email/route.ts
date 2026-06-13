import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Game of Selling <noreply@gameofselling.com>'
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? 'krishan@millionskart.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://gameofselling.com'

type EmailType =
  | 'account_approved'
  | 'chapter_passed'
  | 'certification_earned'
  | 'inactivity_reminder'
  | 'new_signup_admin'

interface EmailPayload {
  type: EmailType
  to?: string
  userName: string
  data?: Record<string, string>
}

function buildEmail(payload: EmailPayload): { to: string; subject: string; html: string } {
  const { type, userName, data = {}, to = '' } = payload

  const baseStyle = `
    font-family: 'Inter', -apple-system, sans-serif;
    max-width: 560px;
    margin: 0 auto;
    padding: 0;
    background: #fff;
  `
  const headerStyle = `
    background: linear-gradient(135deg, #f97316, #dc2626);
    padding: 32px 40px;
    border-radius: 16px 16px 0 0;
    text-align: center;
  `
  const bodyStyle = `padding: 32px 40px; border: 1px solid #f3f4f6; border-top: none; border-radius: 0 0 16px 16px;`
  const btnStyle = `
    display: inline-block;
    background: linear-gradient(135deg, #f97316, #dc2626);
    color: #fff;
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 15px;
    margin-top: 20px;
  `

  const wrap = (inner: string) =>
    `<div style="${baseStyle}"><div style="${headerStyle}"><div style="font-size:28px">🎮</div><div style="color:white;font-size:18px;font-weight:700;margin-top:8px">Game of Selling</div></div><div style="${bodyStyle}">${inner}<p style="color:#9ca3af;font-size:12px;margin-top:32px;text-align:center">© Millions Kart · Mohali, India · <a href="${APP_URL}" style="color:#f97316">gameofselling.com</a></p></div></div>`

  switch (type) {
    case 'account_approved':
      return {
        to,
        subject: `✅ You're in! Game of Selling account approved`,
        html: wrap(`
          <h2 style="color:#111827;font-size:22px;margin:0 0 12px">Welcome, ${userName}! 🎉</h2>
          <p style="color:#6b7280;line-height:1.6">Your Game of Selling account has been approved. You now have full access to all chapters, assessments, and your AI marketing coach.</p>
          <p style="color:#6b7280;line-height:1.6">Start with Chapter 1 — it covers the fundamentals that everything else builds on.</p>
          <div style="text-align:center"><a href="${APP_URL}/dashboard" style="${btnStyle}">Start Learning →</a></div>
        `),
      }

    case 'chapter_passed':
      return {
        to,
        subject: `🏆 Chapter passed: ${data.chapterTitle} — ${data.score}%`,
        html: wrap(`
          <h2 style="color:#111827;font-size:22px;margin:0 0 12px">Chapter Passed! 💪</h2>
          <p style="color:#6b7280;line-height:1.6">Great work, ${userName}. You scored <strong style="color:#f97316">${data.score}%</strong> on <strong>${data.chapterTitle}</strong>.</p>
          <p style="color:#6b7280;line-height:1.6">Your next chapter is now unlocked. Keep the momentum going.</p>
          <div style="text-align:center"><a href="${APP_URL}/dashboard" style="${btnStyle}">Continue Learning →</a></div>
        `),
      }

    case 'certification_earned':
      return {
        to,
        subject: `🏅 You've earned: ${data.certName}`,
        html: wrap(`
          <h2 style="color:#111827;font-size:22px;margin:0 0 12px">Certification Earned! 🏅</h2>
          <p style="color:#6b7280;line-height:1.6">Congratulations, ${userName}! You've earned the <strong style="color:#f97316">${data.certName}</strong> certification.</p>
          <p style="color:#6b7280;line-height:1.6">This is a real milestone — you now have proven knowledge that most marketers don't. Check your certificates page to view it.</p>
          <div style="text-align:center"><a href="${APP_URL}/certificates" style="${btnStyle}">View Certificate →</a></div>
        `),
      }

    case 'inactivity_reminder':
      return {
        to,
        subject: `👋 ${userName}, your streak is at risk!`,
        html: wrap(`
          <h2 style="color:#111827;font-size:22px;margin:0 0 12px">We miss you, ${userName}</h2>
          <p style="color:#6b7280;line-height:1.6">You haven't logged in for <strong>${data.daysSince} days</strong>. The best marketers learn consistently — even 15 minutes a day compounds into serious knowledge.</p>
          <p style="color:#6b7280;line-height:1.6">Your dashboard is waiting. Pick up where you left off.</p>
          <div style="text-align:center"><a href="${APP_URL}/dashboard" style="${btnStyle}">Get Back to It →</a></div>
        `),
      }

    case 'new_signup_admin':
      return {
        to: ADMIN_EMAIL,
        subject: `🆕 New signup: ${userName} (${data.role})`,
        html: wrap(`
          <h2 style="color:#111827;font-size:22px;margin:0 0 12px">New Account Pending Approval</h2>
          <p style="color:#6b7280;line-height:1.6"><strong>${userName}</strong> just signed up as a <strong>${data.role}</strong> with email <strong>${data.email}</strong>.</p>
          <p style="color:#6b7280;line-height:1.6">Review and approve their account from the admin dashboard.</p>
          <div style="text-align:center"><a href="${APP_URL}/admin" style="${btnStyle}">Review in Admin →</a></div>
        `),
      }

    default:
      return { to, subject: 'Game of Selling Notification', html: wrap(`<p>Hello ${userName}!</p>`) }
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload: EmailPayload = await req.json()
    const email = buildEmail(payload)

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: email.to || ADMIN_EMAIL,
      subject: email.subject,
      html: email.html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Email route error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
