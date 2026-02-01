import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface AssessmentAnswer {
  question: string
  answer: string
}

interface Assessment {
  type: 'ai' | 'it'
  title: string
  resultLevel: string
  answers: AssessmentAnswer[]
}

// Cache the transporter at module level to reuse across requests
let cachedTransporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  }
  return cachedTransporter
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message, assessments } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Format assessment data for email
    const formatAssessmentsHtml = (assessments: Assessment[] | undefined) => {
      if (!assessments || assessments.length === 0) return ''

      return assessments.map(assessment => `
        <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #333;">${assessment.title}</h3>
          <p><strong>Result Level:</strong> <span style="color: ${
            assessment.resultLevel === 'high' || assessment.resultLevel === 'critical'
              ? '#dc2626'
              : assessment.resultLevel === 'medium' || assessment.resultLevel === 'moderate'
              ? '#ca8a04'
              : '#16a34a'
          };">${assessment.resultLevel.charAt(0).toUpperCase() + assessment.resultLevel.slice(1)}</span></p>
          <h4>Responses:</h4>
          <ul style="padding-left: 20px;">
            ${assessment.answers.map(a => `
              <li style="margin-bottom: 10px;">
                <strong>${a.question}</strong><br/>
                <span style="color: #666;">${a.answer}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('')
    }

    const formatAssessmentsText = (assessments: Assessment[] | undefined) => {
      if (!assessments || assessments.length === 0) return ''

      return '\n\n--- COMPLETED ASSESSMENTS ---\n' + assessments.map(assessment => `
${assessment.title}
Result Level: ${assessment.resultLevel.charAt(0).toUpperCase() + assessment.resultLevel.slice(1)}

Responses:
${assessment.answers.map(a => `Q: ${a.question}\nA: ${a.answer}`).join('\n\n')}
`).join('\n---\n')
    }

    // Use cached transporter for better performance
    const transporter = getTransporter()

    const hasAssessments = assessments && assessments.length > 0
    const subjectSuffix = hasAssessments
      ? ` (includes ${assessments.map((a: Assessment) => a.type === 'ai' ? 'AI Assessment' : 'IT Assessment').join(' & ')})`
      : ''

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      replyTo: email, // Reply goes to the person who submitted the form
      subject: `New Contact Form Submission from ${name}${subjectSuffix}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        ${formatAssessmentsHtml(assessments)}
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}
${formatAssessmentsText(assessments)}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
