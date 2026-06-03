import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

// Sender address — uses Resend's default onboarding domain
// Switch to custom domain (e.g., no-reply@yadavassociates.com) when you add your domain to Resend
export const FROM_EMAIL = 'Ramdas Yadav Associates <onboarding@resend.dev>';
