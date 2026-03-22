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
    const mailTo = process.env.MAIL_TO || smtpUser
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

    await transporter.sendMail({
      from: `Portfolio Contact <${mailFrom}>`,
      to: mailTo,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
  <div style="margin:0; padding:0; background:#0b1020; font-family: Arial, sans-serif; color:#f8fafc;">
    
    <!-- Wrapper -->
    <div style="max-width:600px; margin:20px auto; background:rgba(15,23,42,0.75); border:1px solid #262E3A; border-radius:12px; overflow:hidden;">
      
      <!-- Header -->
      <div style="padding:25px; text-align:center; background:linear-gradient(135deg, #1793FF, #6f7bff);">
        <h1 style="margin:0; font-size:24px; color:#ffffff;">📩 New Contact Request</h1>
        <p style="margin:5px 0 0; color:#e2e8f0;">Someone reached out through your portfolio</p>
      </div>

      <!-- Image -->
      <div style="text-align:center; padding:20px;">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/561/561127.png" 
          alt="Contact"
          width="100"
          style="opacity:0.9;"
        />
      </div>

      <!-- Content -->
      <div style="padding:0 25px 20px;">
        <p><strong style="color:#93c5fd;">Name:</strong> ${name}</p>
        <p><strong style="color:#93c5fd;">Email:</strong> ${email}</p>
        <p><strong style="color:#93c5fd;">Subject:</strong> ${subject}</p>

        <p style="margin-top:15px;"><strong style="color:#93c5fd;">Message:</strong></p>
        <p style="color:#cbd5f5;">
          ${message.replace(/\n/g, '<br />')}
        </p>
      </div>

      <!-- Footer -->
      <div style="background:rgba(59,130,246,0.16); padding:20px; text-align:center;">
        <h3 style="margin:0 0 8px; color:#22c55e;">✅ Message Received</h3>
        <p style="margin:0; color:#cbd5f5;">
          Thank you for reaching out. We’ll review your message and get back to you soon.
        </p>
      </div>

    </div>

  </div>
`
    })

    return NextResponse.json({ message: 'Message sent.' })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong while sending your message.'
    return NextResponse.json({ message }, { status: 500 })
  }
}
