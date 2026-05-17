/**
 * B4B Moldova · Lead capture API
 *
 * Endpoint: POST /api/lead
 *
 * Folosește Resend pentru a trimite emailuri (gratuit până la 3000/lună).
 * Setează RESEND_API_KEY în Vercel Environment Variables.
 *
 * Alternative: Brevo, SendGrid, Mailgun — toate cu API similar.
 */

export default async function handler(req, res) {
  // CORS pentru same-origin
  res.setHeader('Access-Control-Allow-Origin', 'https://b4biz.md');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, size, source, lang } = req.body || {};

    // Validare basic
    if (!name || !email || !company) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'company']
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Anti-bot: honeypot field
    if (req.body.website) {
      // Bot detected — return success but don't process
      return res.status(200).json({ ok: true });
    }

    // Rate limit basic (Vercel KV recomandat pentru production)
    // ... (omis pentru simplitate)

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set');
      // Fallback: doar log în Vercel logs, returnează success
      console.log('LEAD (no email sent):', { name, email, company, size, source });
      return res.status(200).json({
        ok: true,
        warning: 'Email service not configured. Lead logged.'
      });
    }

    // 1. Email către B4B (notificare lead nou)
    const internalEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'B4B Site <b4b@gmail.com>',
        to: 'b4b@gmail.com',
        reply_to: email,
        subject: `🎯 Lead nou · ${company}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:2rem">
            <h2 style="color:#111;border-bottom:2px solid #C9A96A;padding-bottom:0.5rem">Lead nou via b4biz.md</h2>
            <table style="width:100%;border-collapse:collapse;margin-top:1.5rem;font-family:Arial,sans-serif;font-size:14px">
              <tr><td style="padding:8px 0;color:#888;width:140px">Nume</td><td style="color:#111;font-weight:600">${escapeHtml(name)}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Email</td><td><a href="mailto:${escapeHtml(email)}" style="color:#A8843F">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:8px 0;color:#888">Companie</td><td style="color:#111">${escapeHtml(company)}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Dimensiune</td><td style="color:#111">${escapeHtml(size || 'nedeclarată')}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Sursă</td><td style="color:#111">${escapeHtml(source || 'lead-form')}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Limbă</td><td style="color:#111">${escapeHtml(lang || 'ro')}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Data</td><td style="color:#111">${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Chisinau' })}</td></tr>
            </table>
            <p style="margin-top:2rem;font-size:13px;color:#888;font-style:italic;border-top:1px solid #E8E8E8;padding-top:1rem">
              Răspunde direct la acest email pentru a începe conversația.
            </p>
          </div>
        `
      })
    });

    if (!internalEmail.ok) {
      const errText = await internalEmail.text();
      console.error('Resend internal email failed:', errText);
    }

    // 2. Email auto-reply către lead cu PDF
    const replyTemplates = {
      ro: {
        subject: 'Ghidul tău B4B · 7 procese pierdute lunar',
        greeting: 'Salut',
        body: `Mulțumim pentru interesul tău în B4B Moldova.<br><br>
          Atașat găsești ghidul de 22 de pagini cu cele 7 procese pe care orice IMM moldovenesc le pierde lunar — cu cifre reale, exemple concrete și un sistem de auto-evaluare în 24 de întrebări.<br><br>
          Dacă după lectură vrei să discutăm situația specifică a companiei tale <strong>${escapeHtml(company)}</strong>, programează o sesiune gratuită de 30 minute aici:<br><br>
          → <a href="https://b4biz.md/#contact" style="color:#A8843F;text-decoration:none;border-bottom:1px solid #C9A96A;padding-bottom:1px">https://b4biz.md/#contact</a><br><br>
          Lectură utilă,`,
        signature: 'Echipa B4B Moldova'
      },
      en: {
        subject: 'Your B4B Guide · 7 processes lost monthly',
        greeting: 'Hello',
        body: `Thank you for your interest in B4B Moldova.<br><br>
          Attached you'll find the 22-page guide on the 7 processes that every Moldovan SME loses monthly — with real figures, concrete examples and a 24-question self-assessment system.<br><br>
          If after reading you'd like to discuss the specific situation of <strong>${escapeHtml(company)}</strong>, schedule a free 30-minute session here:<br><br>
          → <a href="https://b4biz.md/#contact" style="color:#A8843F;text-decoration:none;border-bottom:1px solid #C9A96A;padding-bottom:1px">https://b4biz.md/#contact</a><br><br>
          Happy reading,`,
        signature: 'B4B Moldova Team'
      },
      ru: {
        subject: 'Ваше руководство B4B · 7 процессов, теряемых ежемесячно',
        greeting: 'Здравствуйте',
        body: `Спасибо за интерес к B4B Moldova.<br><br>
          Во вложении — руководство на 22 страницах о 7 процессах, которые каждое МСП Молдовы теряет ежемесячно — с реальными цифрами, конкретными примерами и системой самооценки из 24 вопросов.<br><br>
          Если после прочтения захотите обсудить ситуацию вашей компании <strong>${escapeHtml(company)}</strong>, запишитесь на бесплатную 30-минутную сессию здесь:<br><br>
          → <a href="https://b4biz.md/#contact" style="color:#A8843F;text-decoration:none;border-bottom:1px solid #C9A96A;padding-bottom:1px">https://b4biz.md/#contact</a><br><br>
          Приятного чтения,`,
        signature: 'Команда B4B Moldova'
      }
    };

    const tpl = replyTemplates[lang] || replyTemplates.ro;

    const leadEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'B4B Moldova <b4b@gmail.com>',
        to: email,
        subject: tpl.subject,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:2rem;color:#111;line-height:1.7">
            <div style="font-size:1.8rem;letter-spacing:-0.03em;margin-bottom:1.5rem;font-weight:400">B4<span style="color:#C9A96A">B</span></div>

            <p style="font-size:1rem;color:#444">${tpl.greeting} ${escapeHtml(name)},</p>

            <p style="font-size:1rem;color:#444">${tpl.body}</p>

            <p style="font-family:'Courier New',monospace;font-size:0.95rem;font-style:italic;color:#A8843F;margin-top:2rem">— ${tpl.signature}</p>

            <hr style="border:none;border-top:1px solid #E8E8E8;margin:2.5rem 0">

            <p style="font-size:0.75rem;color:#888;font-family:Arial,sans-serif;line-height:1.6">
              B4B Moldova · Chișinău, Republica Moldova<br>
              <a href="tel:+37378000019" style="color:#888;text-decoration:none">+373 78 000 019</a> ·
              <a href="mailto:b4b@gmail.com" style="color:#888;text-decoration:none">b4b@gmail.com</a> ·
              <a href="https://b4biz.md" style="color:#888;text-decoration:none">b4biz.md</a>
            </p>
          </div>
        `,
        attachments: [
          {
            filename: 'B4B_Ghid_7_Procese_2026.pdf',
            path: 'https://b4biz.md/B4B_Ghid_7_Procese_2026.pdf'
          }
        ]
      })
    });

    if (!leadEmail.ok) {
      const errText = await leadEmail.text();
      console.error('Resend lead email failed:', errText);
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
}

// HTML escape helper
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
