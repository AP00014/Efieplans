// @ts-expect-error: Deno types not available in this environment
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "@supabase/supabase-js";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;');
}

// @ts-expect-error: Deno types not available in this environment
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
// @ts-expect-error: Deno types not available in this environment
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
// @ts-expect-error: Deno types not available in this environment
const NEWSLETTER_FROM_EMAIL = Deno.env.get('NEWSLETTER_FROM_EMAIL') || 'no-reply@example.com';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false
  }
});

console.info('contact-reply function initialized');

async function sendMail(to: string, subject: string, html: string) {
  // Use Supabase's built-in mailer (requires service role key)
  const url = `${SUPABASE_URL}/mail/send`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({
      to: [
        {
          email: to
        }
      ],
      from: {
        email: NEWSLETTER_FROM_EMAIL
      },
      subject,
      html
    })
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Mail send failed', res.status, text);
    throw new Error(`Mail send failed: ${res.status}`);
  }

  return res.json();
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      status: 200
    });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({
        error: 'Method not allowed'
      }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const body = await req.json();

    if (!body.contactMessageId || !body.replyMessage) {
      return new Response(JSON.stringify({
        error: 'contactMessageId and replyMessage are required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 1. Fetch contact message
    const { data: contactMessage, error: fetchErr } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', body.contactMessageId)
      .maybeSingle();

    if (fetchErr) {
      console.error('Error fetching contact message', fetchErr);
      return new Response(JSON.stringify({
        error: 'Failed to fetch contact message'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    if (!contactMessage) {
      return new Response(JSON.stringify({
        error: 'Contact message not found'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 2. Update contact message status
    const { error: updateErr } = await supabase
      .from('contact_messages')
      .update({
        status: 'replied',
        updated_at: new Date().toISOString()
      })
      .eq('id', body.contactMessageId);

    if (updateErr) {
      console.error('Error updating contact message', updateErr);
      return new Response(JSON.stringify({
        error: 'Failed to update contact message'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 3. Send reply email
    const subject = body.replySubject || `Re: ${contactMessage.subject || 'Your Contact Message'}`;
    const replyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for contacting Efie Plans</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>Dear ${escapeHtml(contactMessage.name)},</p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #28a745;">
            ${escapeHtml(body.replyMessage).replace(/\n/g, '<br>')}
          </div>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; font-size: 14px; color: #666;">
          <p><strong>Your original message:</strong></p>
          <p><em>${escapeHtml(contactMessage.message).replace(/\n/g, '<br>')}</em></p>
        </div>
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          Best regards,<br>
          The Efie Plans Team
        </p>
      </div>
    `;

    try {
      await sendMail(contactMessage.email, subject, replyHtml);
    } catch (e) {
      console.error('Failed to send reply email', e);
      return new Response(JSON.stringify({
        error: 'Failed to send email'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Reply sent successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (err) {
    console.error('Unexpected error', err);
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
});