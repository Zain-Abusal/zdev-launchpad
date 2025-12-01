import { useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, ShieldCheck } from "lucide-react";
import { logActivity } from "@/lib/activityLogger";
import { useAuth } from "@/contexts/AuthContext";

const MarketingDashboard = () => {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [recipients, setRecipients] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState("");

  const handleSend = async () => {
    setSending(true);
    setResult("");
    const emails = recipients.split(",").map((e) => e.trim()).filter(Boolean);
    try {
      const { sendResendEmail } = await import("@/integrations/resend");
      for (const to of emails) {
        await sendResendEmail({ to, subject, html: bodyHtml || `<pre>${bodyText}</pre>` });
      }
      setResult("Emails sent successfully!");
      if (user) logActivity({ action: "admin_marketing_send", details: `Sent to ${emails.length} recipients`, userId: user.id });
    } catch (err: any) {
      setResult("Error sending emails: " + err.message);
    }
    setSending(false);
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start justify-between gap-3"
        >
          <div>
            <p className="pill w-fit">Marketing</p>
            <h1 className="text-3xl font-bold text-foreground">Send marketing email</h1>
            <p className="text-muted-foreground">
              Use plain text or HTML for rich formatting. Send to comma-separated recipients.
            </p>
          </div>
          <Badge variant="secondary" className="rounded-full bg-secondary/60 text-foreground">
            <ShieldCheck className="mr-1 h-4 w-4" />
            Resend
          </Badge>
        </motion.div>

        <Card className="surface-card border border-border/60">
          <CardHeader>
            <CardTitle className="text-foreground">Message</CardTitle>
            <p className="text-sm text-muted-foreground">
              Deliver announcements, product updates, or releases to your list.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Input
                className="mt-2"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Plain Text Content</label>
              <Textarea
                className="mt-2"
                placeholder="Plain text content"
                rows={4}
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">HTML Content (optional)</label>
              <Textarea
                className="mt-2"
                placeholder="HTML content for rich emails"
                rows={6}
                value={bodyHtml}
                onChange={(e) => setBodyHtml(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">If provided, HTML will be used. Otherwise, plain text will be sent.</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Recipients</label>
              <Input
                className="mt-2"
                placeholder="Recipients (comma-separated emails)"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
            </div>
            <Button onClick={handleSend} disabled={sending} className="w-full">
              {sending ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Email</>}
            </Button>
            {result && <div className="mt-4 text-sm text-center text-muted-foreground">{result}</div>}
          </CardContent>
        </Card>

        <Card className="surface-card border border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Use plain text for transactional clarity; drop in HTML for branded announcements.</p>
            <p>Keep recipient lists clean; separate by commas. Monitor send results via activity logs.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default MarketingDashboard;
