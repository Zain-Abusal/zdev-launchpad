import axios from 'axios';
import { logEmailActivity } from '../lib/activityLog';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY || import.meta.env.VITE_RESEND_API_KEY;
const RESEND_API_URL = 'https://api.resend.com/emails';

export async function sendResendEmail({ to, subject, html, sender }: { to: string; subject: string; html: string; sender?: string }) {
  if (!RESEND_API_KEY) throw new Error('Resend API key missing');
  const fromAddress = sender || 'zainabusal113@gmail.com';
  // Log activity before sending
  logEmailActivity({
    timestamp: new Date().toISOString(),
    sender: fromAddress,
    recipient: to,
    subject,
    content: html,
  });
  return axios.post(
    RESEND_API_URL,
    {
      to,
      subject,
      html,
      from: fromAddress,
    },
    {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
}
