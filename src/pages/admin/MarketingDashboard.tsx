import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sendResendEmail } from '@/integrations/resend';

const MarketingDashboard = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipients, setRecipients] = useState(''); // comma-separated emails
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState('');

  const handleSend = async () => {
    setSending(true);
    setResult('');
    const emails = recipients.split(',').map(e => e.trim()).filter(Boolean);
    try {
      for (const to of emails) {
        await sendResendEmail({ to, subject, html: body });
      }
      setResult('Emails sent successfully!');
    } catch (err: any) {
      setResult('Error sending emails: ' + err.message);
    }
    setSending(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Send Marketing Email</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              className="border rounded px-2 py-1 mb-2 w-full"
              placeholder="Subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
            <textarea
              className="border rounded px-2 py-1 mb-2 w-full"
              placeholder="Email HTML body"
              rows={6}
              value={body}
              onChange={e => setBody(e.target.value)}
            />
            <input
              type="text"
              className="border rounded px-2 py-1 mb-2 w-full"
              placeholder="Recipients (comma-separated emails)"
              value={recipients}
              onChange={e => setRecipients(e.target.value)}
            />
            <Button onClick={handleSend} disabled={sending}>
              {sending ? 'Sending...' : 'Send Email'}
            </Button>
            {result && <div className="mt-2 text-sm">{result}</div>}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default MarketingDashboard;
