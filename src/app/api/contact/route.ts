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
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `
    })

    return NextResponse.json({ message: 'Message sent.' })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong while sending your message.'
    return NextResponse.json({ message }, { status: 500 })
  }
}
