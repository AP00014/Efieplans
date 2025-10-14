// @ts-expect-error: Deno types not available in this environment
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
// @ts-expect-error: Supabase types not available in this environment
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// @ts-expect-error: Resend types not available in this environment
import { Resend } from "npm:resend@3.2.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ReplyRequest {
  contactMessageId: string
  replyMessage: string
  replySubject?: string
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

    // Get the reply data from the request
    const { contactMessageId, replyMessage, replySubject }: ReplyRequest = await req.json()

    if (!contactMessageId || !replyMessage) {
      throw new Error('Missing required fields: contactMessageId and replyMessage')
    }

    // Fetch the contact message
    const { data: contactMessage, error: fetchError } = await supabaseClient
      .from('contact_messages')
      .select('*')
      .eq('id', contactMessageId)
      .single()

    if (fetchError || !contactMessage) {
      throw new Error('Contact message not found')
    }

    // Send reply email to the original sender
    const subject = replySubject || `Re: ${contactMessage.subject || 'Your Contact Message'}`
    const { data, error } = await resend.emails.send({
      from: 'Efie Plans <noreply@efieplans.com>',
      to: [contactMessage.email],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for contacting Efie Plans</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Dear ${contactMessage.name},</p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #28a745;">
              ${replyMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; font-size: 14px; color: #666;">
            <p><strong>Your original message:</strong></p>
            <p><em>${contactMessage.message.replace(/\n/g, '<br>')}</em></p>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Best regards,<br>
            The Efie Plans Team
          </p>
        </div>
      `,
    })

    if (error) {
      throw error
    }

    // Update the contact message status to 'replied'
    const { error: updateError } = await supabaseClient
      .from('contact_messages')
      .update({ status: 'replied', updated_at: new Date().toISOString() })
      .eq('id', contactMessageId)

    if (updateError) {
      console.error('Error updating contact message status:', updateError)
    }

    return new Response(
      JSON.stringify({
        success: true,
        emailId: data?.id,
        contactMessageId: contactMessageId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending contact reply:', error)
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