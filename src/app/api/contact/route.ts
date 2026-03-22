import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

const getEnv = (key: string) => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<ContactPayload>

    const name = payload.name?.trim()
    const email = payload.email?.trim()
    const subject = payload.subject?.trim()
    const message = payload.message?.trim()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 })
    }

    const smtpHost = getEnv('SMTP_HOST')
    const smtpPort = Number(getEnv('SMTP_PORT'))
    const smtpUser = getEnv('SMTP_USER')
    const smtpPass = getEnv('SMTP_PASS')
    const ownerEmail = 'aniketbiswas2392001@gmail.com'
    const mailFrom = process.env.MAIL_FROM || smtpUser

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    })

    const messageHtml = message.replace(/\n/g, '<br />')

    const internalText = `New app inquiry\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    const internalHtml = `
  <div style="margin:0; padding:0; background:#0a0f14; font-family: Arial, sans-serif; color:#e6f1ff;">
    <div style="max-width:640px; margin:20px auto; background:#0c1622; border:1px solid #16303a; border-radius:12px; overflow:hidden;">
      <div style="padding:18px 22px; background:linear-gradient(135deg, #00f5a0, #00d9ff); color:#001018;">
        <div style="font-size:12px; letter-spacing:2px; font-family: 'Courier New', Courier, monospace;">NEW QUEST</div>
        <div style="font-size:22px; font-weight:700;">App Development Inquiry</div>
        <div style="font-size:13px;">A new lead just landed.</div>
      </div>
      <div style="padding:20px 22px;">
        <div style="margin:0 0 10px;"><strong style="color:#7ef7d7;">Name:</strong> ${name}</div>
        <div style="margin:0 0 10px;"><strong style="color:#7ef7d7;">Email:</strong> ${email}</div>
        <div style="margin:0 0 14px;"><strong style="color:#7ef7d7;">Subject:</strong> ${subject}</div>
        <div style="margin-top:12px; font-size:14px; line-height:1.6; color:#cfe7ff;">
          <div style="color:#7ef7d7; font-weight:700; margin-bottom:6px;">Message</div>
          <div>${messageHtml}</div>
        </div>
      </div>
    </div>
  </div>
`

    const autoReplyText = `Hi ${name},\n\nThanks for reaching out about your app idea. Your message is in my queue and I will review it shortly.\n\nSummary\n- Subject: ${subject}\n- Your email: ${email}\n\nYour message:\n${message}\n\nIf you need to add anything, just reply to this email.\n\nAniket`
    const autoReplyHtml = `
  <div style="margin:0; padding:0; background:#0a0f14; font-family: Arial, sans-serif; color:#e6f1ff;">
    <div style="max-width:640px; margin:20px auto; background:#0c1622; border:1px solid #16303a; border-radius:14px; overflow:hidden; box-shadow:0 0 24px rgba(0,255,214,0.2);">
      <div style="padding:22px; text-align:center; background:linear-gradient(135deg, #00f5a0, #00d9ff); color:#001018;">
        <div style="font-size:12px; letter-spacing:2px; font-family: 'Courier New', Courier, monospace;">QUEST ACCEPTED</div>
        <div style="font-size:26px; font-weight:700;">App Build Request</div>
        <div style="font-size:14px;">Thanks for reaching out, ${name}.</div>
      </div>

      <div style="padding:22px;">
        <p style="margin:0 0 12px; color:#cfe7ff;">
          Your message is safely in my inbox. I will review the details and get back to you with next steps.
        </p>

        <div style="margin:16px 0; padding:14px; border:1px dashed #1bd1a5; background:rgba(0,255,214,0.08); border-radius:10px;">
          <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#7ef7d7;">Your Quest Log</div>
          <div style="margin-top:8px; font-size:14px;">
            <div><strong style="color:#7ef7d7;">Subject:</strong> ${subject}</div>
            <div><strong style="color:#7ef7d7;">Email:</strong> ${email}</div>
          </div>
        </div>

        <div style="margin-top:12px; font-size:14px; line-height:1.6; color:#cfe7ff;">
          <div style="color:#7ef7d7; font-weight:700; margin-bottom:6px;">Your Message</div>
          <div>${messageHtml}</div>
        </div>
      </div>

      <div style="padding:16px; background:#081018; text-align:center; color:#9cc2ff; font-size:12px;">
        Response window: 24-48 hours. If it is urgent, reply to this email.
      </div>
    </div>
  </div>
`

    await Promise.all([
      transporter.sendMail({
        from: `Portfolio Contact <${mailFrom}>`,
        to: ownerEmail,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        text: internalText,
        html: internalHtml
      }),
      transporter.sendMail({
        from: `Aniket Biswas <${mailFrom}>`,
        to: email,
        replyTo: ownerEmail,
        subject: `Quest Accepted: ${subject}`,
        text: autoReplyText,
        html: autoReplyHtml
      })
    ])

    return NextResponse.json({ message: 'Message sent.' })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong while sending your message.'
    return NextResponse.json({ message }, { status: 500 })
  }
}
