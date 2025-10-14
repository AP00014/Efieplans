// @ts-expect-error: Deno types not available in this environment
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
// @ts-expect-error: Resend types not available in Deno environment
import { Resend } from "npm:resend@3.2.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContactRecord {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;')
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
      status: 200
    })
  }

  try {
    // Initialize Resend
    // @ts-expect-error: Deno types not available in this environment
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

    // Get the contact message data from the request
    const { record }: { record: ContactRecord } = await req.json()

    if (!record) {
      throw new Error('No record data provided')
    }

    const { name, email, subject, message } = record

    // Validate required fields
    if (!name || !email || !subject || !message) {
      throw new Error('Missing required fields: name, email, subject, message')
    }

    // Validate email format
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format')
    }

    // Sanitize inputs to prevent HTML injection
    const sanitizedName = escapeHtml(name)
    const sanitizedEmail = escapeHtml(email)
    const sanitizedSubject = escapeHtml(subject)
    const sanitizedMessage = escapeHtml(message)

    // Send notification email to admin
    const { data, error } = await resend.emails.send({
      from: 'Efie Plans <noreply@efieplans.com>',
      // @ts-expect-error: Deno types not available in this environment
      to: [Deno.env.get('ADMIN_EMAIL') ?? 'admin@efieplans.com'],
      subject: `New Contact Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Message Received</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            This message was sent from your website contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, emailId: data?.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending contact notification:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})