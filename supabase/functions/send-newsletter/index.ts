// @ts-expect-error: Deno types not available in this environment
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
// @ts-expect-error: Supabase types not available in this environment
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// @ts-expect-error: Resend types not available in this environment
import { Resend } from "npm:resend@3.2.0"

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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 200
    })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      // @ts-expect-error: Deno types not available in this environment
      Deno.env.get('SUPABASE_URL') ?? 'https://wroqkppgfeqixyspxkmo.supabase.co',
      // @ts-expect-error: Deno types not available in this environment
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Initialize Resend
    // @ts-expect-error: Deno types not available in this environment
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

    // Get the newsletter data from the request
    const { subject, content }: NewsletterRequest = await req.json()

    if (!subject || !content) {
      throw new Error('Missing required fields: subject and content')
    }

    // Fetch active email subscriptions and authenticated user emails
    const [subscriptionsResult, usersResult] = await Promise.all([
      supabaseClient
        .from('email_subscriptions')
        .select('email')
        .eq('is_active', true),
      supabaseClient
        .from('profiles')
        .select('email')
        .not('email', 'is', null)
    ])

    if (subscriptionsResult.error) throw subscriptionsResult.error
    if (usersResult.error) throw usersResult.error

    const subscriptionEmails = subscriptionsResult.data?.map((sub: { email: string }) => sub.email) || []
    const userEmails = usersResult.data?.map((user: { email: string }) => user.email) || []

    // Combine and deduplicate emails
    const recipientEmails = [...new Set([...subscriptionEmails, ...userEmails])]

    if (recipientEmails.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'No email recipients found', recipientCount: 0 }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    // Send newsletter to all subscribers
    const { data, error } = await resend.emails.send({
      from: 'Efie Plans <newsletter@efieplans.com>',
      to: recipientEmails,
      subject: subject,
      html: `
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
      `,
    })

    if (error) {
      throw error
    }

    // Record the newsletter send in the database
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
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})