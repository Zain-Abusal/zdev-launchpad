import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sendResendEmail } from '@/integrations/resend';

const MarketingDashboard = () => {
  const [subject, setSubject] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [recipients, setRecipients] = useState(''); // comma-separated emails
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState('');

  const handleSend = async () => {
    setSending(true);
    setResult('');
    const emails = recipients.split(',').map(e => e.trim()).filter(Boolean);
    // Try to get admin email from env or default
    const sender = import.meta.env.VITE_ZDEV_ADMIN_EMAIL || 'zainabusal113@gmail.com';
    try {
      for (const to of emails) {
        await sendResendEmail({ to, subject, html: bodyHtml || `<pre>${bodyText}</pre>`, sender });
      }
      setResult('Emails sent successfully!');
    } catch (err: any) {
      setResult('Error sending emails: ' + err.message);
    }
    setSending(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Send Marketing Email</CardTitle>
            <p className="text-muted-foreground mt-2">Send a marketing email to your clients. You can use plain text or HTML for rich formatting.</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="block font-medium mb-1">Subject</label>
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Plain Text Content</label>
              <textarea
                className="border rounded px-2 py-1 w-full"
                placeholder="Plain text content"
                rows={4}
                value={bodyText}
                onChange={e => setBodyText(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">HTML Content (optional)</label>
              <textarea
                className="border rounded px-2 py-1 w-full"
                placeholder="HTML content for rich emails"
                rows={6}
                value={bodyHtml}
                onChange={e => setBodyHtml(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">If provided, HTML will be used. Otherwise, plain text will be sent.</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Recipients</label>
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                placeholder="Recipients (comma-separated emails)"
                value={recipients}
                onChange={e => setRecipients(e.target.value)}
              />
            </div>
            <Button onClick={handleSend} disabled={sending} className="w-full">
              {sending ? 'Sending...' : 'Send Email'}
            </Button>
            {result && <div className="mt-4 text-sm text-center">{result}</div>}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default MarketingDashboard;
