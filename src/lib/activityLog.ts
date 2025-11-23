// src/lib/activityLog.ts
// Simple activity log utility for email events

export type EmailLogEntry = {
  timestamp: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
};

const LOG_KEY = 'activity_email_log';

export function logEmailActivity(entry: EmailLogEntry) {
  // For demo: store in localStorage (replace with DB/Supabase in production)
  const logs: EmailLogEntry[] = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
  logs.push(entry);
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

export function getEmailActivityLog(): EmailLogEntry[] {
  return JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
}
