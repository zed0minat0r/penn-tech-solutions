import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const SYSTEM_PROMPT = `You are the Penn Tech Solutions virtual assistant. You're a technical expert who helps small businesses in the Greater Philadelphia area with IT needs.

SERVICES YOU CAN DISCUSS:
- Cloud VoIP & Telecom (hosted PBX, soft phones, conference systems)
- Network Infrastructure (firewalls, managed switches, WiFi, cabling)
- PoS Systems (retail/restaurant setup, payment integration)
- Websites (custom design, mobile-first, SEO)
- Security Systems (cameras, access control, remote monitoring)
- Anti-Virus & Data Protection (enterprise AV, backups, phishing protection)
- Equipment Procurement (wholesale pricing, full setup)
- Custom App Development (workflow automation, mobile apps)
- AI Business Integration (chatbots, document processing, automation)

BEHAVIOR:
- Be technically knowledgeable but explain things clearly
- When someone seems interested in a service, offer to connect them with the team
- Collect name, email, and phone when appropriate (don't be pushy)
- Guide toward scheduling a free consultation for complex needs
- Keep responses concise (2-3 paragraphs max)
- If asked about pricing, explain that costs vary by needs and suggest a consultation`

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey || apiKey === 'your-key-here') {
      return new Response(
        JSON.stringify({ error: 'Anthropic API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages array required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const anthropic = new Anthropic({ apiKey })

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)

    if (error instanceof Anthropic.RateLimitError) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
