// @ts-expect-error: Deno environment
/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from '@supabase/supabase-js'
import { Resend } from "resend"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-requested-with',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
  'Access-Control-Max-Age': '86400',
}

interface NewsletterRequest {
  subject: string
  content: string
}

serve(async (req: Request) => {
  console.log('Newsletter function called with method:', req.method)
  console.log('Request headers:', Object.fromEntries(req.headers.entries()))

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request')
    return new Response(null, {
      headers: corsHeaders,
      status: 200
    })
  }

  try {
    console.log('Initializing Supabase client...')
    // Initialize Supabase client
    // @ts-expect-error: Deno types not available in this environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? 'https://wroqkppgfeqixyspxkmo.supabase.co'
    // @ts-expect-error: Deno types not available in this environment
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const authHeader = req.headers.get('Authorization')

    console.log('SUPABASE_URL:', supabaseUrl ? 'Set' : 'Not set')
    console.log('SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? 'Set' : 'Not set')
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing')

    if (!serviceRoleKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set')
    }

    if (!authHeader) {
      throw new Error('Authorization header is missing')
    }

    const supabaseClient = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Initialize Resend
    console.log('Initializing Resend...')
    // @ts-expect-error: Deno types not available in this environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    console.log('RESEND_API_KEY:', resendApiKey ? 'Set' : 'Not set')

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }

    const resend = new Resend(resendApiKey)

    // Get the newsletter data from the request
    console.log('Parsing request body...')
    const body = await req.json() as NewsletterRequest
    console.log('Request body:', body)

    const { subject, content } = body

    if (!subject || !content) {
      throw new Error('Missing required fields: subject and content')
    }

    console.log('Subject:', subject)
    console.log('Content length:', content.length)

    // Fetch active email subscriptions and authenticated user emails
    console.log('Fetching email subscriptions...')
    const subscriptionsResult = await supabaseClient
      .from('email_subscriptions')
      .select('email')
      .eq('is_active', true)

    console.log('Subscriptions query result:', subscriptionsResult)

    if (subscriptionsResult.error) {
      console.error('Error fetching subscriptions:', subscriptionsResult.error)
      throw subscriptionsResult.error
    }

    console.log('Fetching user emails...')
    const usersResult = await supabaseClient
      .from('profiles')
      .select('email')
      .not('email', 'is', null)

    console.log('Users query result:', usersResult)

    if (usersResult.error) {
      console.error('Error fetching users:', usersResult.error)
      throw usersResult.error
    }

    const subscriptionEmails = subscriptionsResult.data?.map((sub: { email: string }) => sub.email) || []
    const userEmails = usersResult.data?.map((user: { email: string }) => user.email) || []

    console.log('Subscription emails:', subscriptionEmails.length)
    console.log('User emails:', userEmails.length)

    // Combine and deduplicate emails
    const recipientEmails = Array.from(new Set([...subscriptionEmails, ...userEmails]))

    console.log('Total unique recipient emails:', recipientEmails.length)
    console.log('Recipient emails:', recipientEmails)

    if (recipientEmails.length === 0) {
      console.log('No email recipients found, returning early')
      return new Response(
        JSON.stringify({ success: true, message: 'No email recipients found', recipientCount: 0 }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    // Send newsletter to all subscribers
    console.log('Sending newsletter via Resend...')
    console.log('Sending to emails:', recipientEmails.slice(0, 5), recipientEmails.length > 5 ? `...and ${recipientEmails.length - 5} more` : '')

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #333; margin: 0;">Efie Plans</h1>
          <p style="color: #666; margin: 5px 0;">Architectural & Construction Excellence</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          ${content.replace(/\n/g, '<br>')}
        </div>
        <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee; margin-top: 20px;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            You're receiving this because you subscribed to our newsletter.
          </p>
          <p style="color: #666; font-size: 14px; margin: 5px 0;">
            <a href="#" style="color: #007bff; text-decoration: none;">Unsubscribe</a> |
            <a href="#" style="color: #007bff; text-decoration: none;">Update Preferences</a>
          </p>
        </div>
      </div>
    `

    console.log('Email HTML length:', emailHtml.length)

    const { data, error } = await resend.emails.send({
      from: 'Efie Plans <newsletter@efieplans.com>',
      to: recipientEmails,
      subject: subject,
      html: emailHtml,
    })

    console.log('Resend API response:', { data, error })

    if (error) {
      console.error('Resend API error:', error)
      throw error
    }

    console.log('Newsletter sent successfully, email ID:', data?.id)

    // Record the newsletter send in the database
    console.log('Recording newsletter send in database...')
    const { error: insertError } = await supabaseClient
      .from('newsletter_sends')
      .insert({
        subject: subject,
        content: content,
        sent_at: new Date().toISOString(),
        recipient_count: recipientEmails.length
      })

    if (insertError) {
      console.error('Error recording newsletter send:', insertError)
      // Don't throw here, as the newsletter was already sent successfully
    } else {
      console.log('Newsletter send recorded successfully')
    }

    return new Response(
      JSON.stringify({
        success: true,
        emailId: data?.id,
        recipientCount: recipientEmails.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending newsletter:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Full error details:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      error
    })
    return new Response(
      JSON.stringify({
        error: errorMessage,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})