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

    const internalText = `New mobile app inquiry\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nReply-To: ${email}\n\nMessage:\n${message}`
    const internalHtml = `
  <div style="margin:0; padding:0; background:#0b1020; font-family: Arial, sans-serif; color:#e2e8f0;">
    <div style="max-width:640px; margin:20px auto; background:#0f172a; border:1px solid #1e293b; border-radius:16px; overflow:hidden; box-shadow:0 24px 50px rgba(15,23,42,0.35);">
      <div style="padding:22px 24px; background:linear-gradient(135deg, #1793FF, #6f7bff); color:#ffffff;">
        <div style="font-size:12px; letter-spacing:2px; text-transform:uppercase;">New Inquiry</div>
        <div style="font-size:24px; font-weight:700;">Mobile App Development</div>
        <div style="font-size:13px; opacity:0.9;">A new message arrived from your portfolio.</div>
      </div>

      <div style="padding:18px 24px; text-align:center;">
        <img
          src="https://img.icons8.com/fluency/96/smartphone-tablet.png"
          alt="Mobile app"
          width="96"
          height="96"
          style="display:inline-block;"
        />
      </div>

      <div style="padding:0 24px 22px;">
        <div style="background:#0b1324; border:1px solid #1f2a44; border-radius:12px; padding:14px 16px; margin-bottom:16px;">
          <div style="color:#d6b36a; font-weight:700; margin-bottom:8px;">Lead Details</div>
          <div style="margin-bottom:6px;"><strong style="color:#e2e8f0;">Name:</strong> ${name}</div>
          <div style="margin-bottom:6px;"><strong style="color:#e2e8f0;">Email:</strong> ${email}</div>
          <div><strong style="color:#e2e8f0;">Subject:</strong> ${subject}</div>
        </div>

        <div style="color:#d6b36a; font-weight:700; margin-bottom:8px;">Message</div>
        <div style="color:#cbd5f5; line-height:1.6;">${messageHtml}</div>
      </div>

      <div style="padding:14px 24px; background:#0b1324; border-top:1px solid #1f2a44; color:#94a3b8; font-size:12px; text-align:center;">
        Reply directly to this lead from your email client.
      </div>
    </div>
  </div>
`

    const autoReplyText = `Hi ${name},\n\nThank you for contacting me about your mobile app project. I have received your message and will review it shortly.\n\nSummary\n- Subject: ${subject}\n- Your email: ${email}\n\nContact details\n- WhatsApp: 6290034904\n- LinkedIn: https://www.linkedin.com/in/aniket-kumar-biswas/\n\nYour message:\n${message}\n\nIf you would like to add anything, just reply to this email.\n\nAniket`
    const autoReplyHtml = `
  <div style="margin:0; padding:0; background:#0b1020; font-family: Arial, sans-serif; color:#e2e8f0;">
    <div style="max-width:640px; margin:20px auto; background:#0f172a; border:1px solid #1e293b; border-radius:16px; overflow:hidden; box-shadow:0 24px 50px rgba(15,23,42,0.35);">
      <div style="padding:22px; text-align:center; background:linear-gradient(135deg, #1793FF, #6f7bff); color:#ffffff;">
        <div style="font-size:12px; letter-spacing:2px; text-transform:uppercase;">Inquiry Received</div>
        <div style="font-size:26px; font-weight:700;">Mobile App Development</div>
        <div style="font-size:14px; opacity:0.9;">Thank you for reaching out, ${name}.</div>
      </div>

      <div style="padding:20px 24px;">
        <div style="text-align:center; margin-bottom:14px;">
          <img
            src="https://img.icons8.com/fluency/96/smartphone-tablet.png"
            alt="Mobile app"
            width="96"
            height="96"
            style="display:inline-block;"
          />
        </div>

        <p style="margin:0 0 12px; color:#cbd5f5;">
          I have received your message and will review the details. You can expect a response soon.
        </p>

        <div style="margin:16px 0; padding:14px; border:1px dashed rgba(214, 179, 106, 0.8); background:rgba(23, 147, 255, 0.08); border-radius:12px;">
          <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#d6b36a;">Inquiry Summary</div>
          <div style="margin-top:8px; font-size:14px;">
            <div><strong style="color:#e2e8f0;">Subject:</strong> ${subject}</div>
            <div><strong style="color:#e2e8f0;">Email:</strong> ${email}</div>
          </div>
        </div>

        <div style="margin-top:12px; font-size:14px; line-height:1.6; color:#cbd5f5;">
          <div style="color:#d6b36a; font-weight:700; margin-bottom:6px;">Your Message</div>
          <div>${messageHtml}</div>
        </div>

        <div style="margin-top:16px; padding:14px 16px; background:#0b1324; border:1px solid #1f2a44; border-radius:12px;">
          <div style="color:#d6b36a; font-weight:700; margin-bottom:8px;">Contact Details</div>
          <div style="margin-bottom:6px;"><strong style="color:#e2e8f0;">WhatsApp:</strong> 6290034904</div>
          <div>
            <strong style="color:#e2e8f0;">LinkedIn:</strong>
            <a href="https://www.linkedin.com/in/aniket-kumar-biswas/" style="color:#93c5fd; text-decoration:none;">
              aniket-kumar-biswas
            </a>
          </div>
        </div>
      </div>

      <div style="padding:16px; background:#0b1324; text-align:center; color:#94a3b8; font-size:12px;">
        Typical response time: 24-48 hours. If it is urgent, reply to this email.
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
        subject: `Mobile App Inquiry Received: ${subject}`,
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
