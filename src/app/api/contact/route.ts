import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const name = (body.name ?? '').toString().trim()
  const email = (body.email ?? '').toString().trim()
  const message = (body.message ?? '').toString().trim()

  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, error: 'Please enter your name.' }, { status: 400 })
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 })
  }
  if (!message || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: 'Message should be at least 10 characters.' },
      { status: 400 },
    )
  }

  // No external mail backend in this sandbox — log and acknowledge.
  // In production this is where you'd forward to an email service / DB.
  console.log('[contact] new message', { name, email, length: message.length })

  return NextResponse.json({
    ok: true,
    message: `Thanks ${name.split(' ')[0]}! Your message has been received — I'll reply to ${email} soon.`,
  })
}
