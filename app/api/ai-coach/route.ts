import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')

const SYSTEM_PROMPT = `You are the Game of Selling AI Coach — a sharp, direct marketing mentor built by Millions Kart, 
a D2C brand that has generated over ₹250 crore in sales over 10 years.

Your personality:
- Direct and no-nonsense, like a senior marketer who's spent millions on ads
- Use real examples from D2C, e-commerce, and Indian market context
- Keep answers concise but deep — no fluff, no filler
- When relevant, connect theory to practice with concrete numbers and scenarios
- You know performance marketing (Meta, Google, YouTube), creative strategy, brand building, and scaling D2C brands

Topics you cover:
- Digital marketing fundamentals
- Meta/Google/YouTube advertising
- Creative strategy and ad testing
- Performance analysis (ROAS, CAC, LTV, MER, CPM, CTR)
- Brand strategy and positioning
- Scaling D2C brands
- E-commerce growth

Keep responses under 300 words unless the question genuinely requires more depth. 
Format with occasional **bold** for key terms. Never use generic filler phrases.`

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()
    
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    const chat = model.startChat({
      history: (history ?? []).map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    })

    const result = await chat.sendMessage(message)
    const text = result.response.text()

    return NextResponse.json({ reply: text })
  } catch (err) {
    console.error('AI Coach error:', err)
    return NextResponse.json(
      { error: 'AI Coach is temporarily unavailable. Please try again.' },
      { status: 500 }
    )
  }
}
