import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type NotificationBody = {
  event: 'submission_created' | 'booking_confirmed';
  type?: string;
  record?: Record<string, unknown>;
};

const TYPE_LABELS: Record<string, string> = {
  contact: 'Contact',
  aupair: 'Au Pair',
  family: 'Famille',
  reservation: 'Réservation',
};

function buildSubmissionEmail(body: NotificationBody, adminEmail: string) {
  const type = body.type ?? 'unknown';
  const label = TYPE_LABELS[type] ?? type;
  const record = body.record ?? {};
  const name = (record.name as string) ?? '—';
  const email = (record.email as string) ?? '—';
  const payload = JSON.stringify(record.payload ?? record, null, 2);

  return {
    to: adminEmail,
    subject: `[Grâce est là] Nouvelle demande — ${label}`,
    html: `
      <h2>Nouvelle demande (${label})</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>ID :</strong> ${record.id ?? '—'}</p>
      <pre style="background:#f5f5f5;padding:12px;border-radius:8px;white-space:pre-wrap;font-size:13px;">${payload}</pre>
      <p style="color:#666;font-size:12px;">Connectez-vous au tableau de bord admin pour gérer cette demande.</p>
    `,
  };
}

function buildBookingEmail(body: NotificationBody, adminEmail: string) {
  const record = body.record ?? {};
  return {
    to: adminEmail,
    subject: '[Grâce est là] Nouveau rendez-vous confirmé',
    html: `
      <h2>Rendez-vous confirmé</h2>
      <p><strong>Nom :</strong> ${(record.name as string) ?? '—'}</p>
      <p><strong>Email :</strong> ${(record.email as string) ?? '—'}</p>
      <p><strong>Date :</strong> ${(record.display_date as string) ?? '—'} à ${(record.display_time as string) ?? '—'}</p>
      <p><strong>Début (ISO) :</strong> ${(record.starts_at as string) ?? '—'}</p>
    `,
  };
}

async function sendWithResend(
  apiKey: string,
  fromEmail: string,
  mail: { to: string; subject: string; html: string },
) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [mail.to],
      subject: mail.subject,
      html: mail.html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error: ${res.status} ${text}`);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const adminEmail = Deno.env.get('ADMIN_EMAIL');
    const resendKey = Deno.env.get('RESEND_API_KEY');
    const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'Grâce est là <onboarding@resend.dev>';

    const body = (await req.json()) as NotificationBody;

    if (!adminEmail) {
      return new Response(
        JSON.stringify({ ok: true, skipped: true, reason: 'ADMIN_EMAIL not set' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (!resendKey) {
      console.log('Notification (no RESEND_API_KEY):', JSON.stringify(body));
      return new Response(
        JSON.stringify({ ok: true, skipped: true, reason: 'RESEND_API_KEY not set' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const mail =
      body.event === 'booking_confirmed'
        ? buildBookingEmail(body, adminEmail)
        : buildSubmissionEmail(body, adminEmail);

    await sendWithResend(resendKey, fromEmail, mail);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
