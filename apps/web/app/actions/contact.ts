'use server';

import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

type Result = { success: true } | { success: false; error: string };

export async function submitContactForm(formData: FormData): Promise<Result> {
  // Honeypot check
  if (formData.get('website')) {
    // Pretend to succeed to confuse bots
    return { success: true };
  }

  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const company = String(formData.get('company') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!resend) {
    console.error('RESEND_API_KEY not configured');
    return {
      success: false,
      error: 'Email service is not configured. Please contact us directly.',
    };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    return {
      success: false,
      error: 'Email service is not configured.',
    };
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone && `Phone: ${phone}`,
        company && `Company: ${company}`,
        '',
        'Message:',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return { success: true };
  } catch (err) {
    console.error('Failed to send email:', err);
    return {
      success: false,
      error: 'Failed to send message. Please try again later.',
    };
  }
}
