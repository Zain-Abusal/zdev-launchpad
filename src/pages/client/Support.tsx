import { useEffect, useState } from "react";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Paperclip, Loader2, PlusCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/lib/activityLogger";
import { useToast } from "@/hooks/use-toast";

const retry = async <T,>(fn: () => Promise<T>, attempts = 3, delayMs = 400): Promise<T> => {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      await new Promise((res) => setTimeout(res, delayMs * (i + 1)));
    }
  }
  throw lastErr;
};

const ClientSupport = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTicket, setNewTicket] = useState<{ subject: string; message: string; file: File | null }>({
    subject: "",
    message: "",
    file: null,
  });

  useEffect(() => {
    if (user) fetchTickets();
  }, [user]);

  const fetchTickets = async () => {
    setLoading(true);
    const { data, error } = await retry(() =>
      supabase
        .from('support_tickets')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })
    );
    if (error) {
      toast({ title: "Error", description: "Could not load tickets.", variant: "destructive" });
      setTickets([]);
    } else {
      setTickets(data || []);
    }
    setLoading(false);
  };

  const handleCreateTicket = async () => {
    setLoading(true);
    const { data, error } = await retry(() =>
      supabase
        .from('support_tickets')
        .insert({
          client_id: user.id,
          subject: newTicket.subject,
          status: 'Open',
          priority: 'Normal',
          created_at: new Date().toISOString(),
        })
        .select()
    );
    if (error) {
      toast({ title: "Error", description: "Could not create ticket.", variant: "destructive" });
      setLoading(false);
      return;
    }

    if (data && data[0]) {
      const ticketId = data[0].id;
      await supabase.from('ticket_messages').insert({
        ticket_id: ticketId,
        sender_id: user.id,
        message: newTicket.message,
        created_at: new Date().toISOString(),
      });

      // Handle file upload if present
      if (newTicket.file) {
        const path = `support/${ticketId}-${Date.now()}-${newTicket.file.name}`;
        const { error: uploadError } = await supabase.storage.from('project-requests').upload(path, newTicket.file);
        if (!uploadError) {
          await supabase
            .from('ticket_attachments')
            .insert({ ticket_id: ticketId, file_path: path, created_at: new Date().toISOString() });
        }
      }

      logActivity({
        action: 'support_ticket_created',
        details: `Ticket: ${newTicket.subject}`,
        userId: user.id,
      });
      toast({ title: "Ticket submitted", description: "We'll reply soon." });
      setNewTicket({ subject: '', message: '', file: null });
      fetchTickets();
    }
    setLoading(false);
  };

  return (
    <ClientLayout>
      <div className="space-y-6">
        <Card className="surface-card border border-border/60">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Support Tickets
            </CardTitle>
            <Badge variant="secondary" className="rounded-full">Average response &lt;24h</Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-2xl border border-border/60 bg-secondary/50 p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-primary" />
                Create New Ticket
              </h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Subject"
                    value={newTicket.subject}
                    onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Describe the issue</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue..."
                    rows={4}
                    value={newTicket.message}
                    onChange={e => setNewTicket({ ...newTicket, message: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <Paperclip className="h-4 w-4" />
                    <span>Attach file</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => setNewTicket({ ...newTicket, file: e.target.files?.[0] || null })}
                    />
                  </Label>
                </div>
                <Button
                  size="sm"
                  onClick={handleCreateTicket}
                  disabled={loading || !newTicket.subject || !newTicket.message}
                  className="w-full md:w-auto"
                >
                  {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                  Submit Ticket
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Your Tickets</h4>
              {loading ? (
                <Loader2 className="animate-spin h-6 w-6 mx-auto" />
              ) : tickets.length ? (
                <div className="grid gap-3">
                  {tickets.map(ticket => (
                    <div key={ticket.id} className="rounded-2xl border border-border/60 bg-card/80 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{ticket.subject}</div>
                          <div className="text-xs text-muted-foreground">
                            Created: {new Date(ticket.created_at).toLocaleString()}
                          </div>
                        </div>
                        <Badge variant="outline">{ticket.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Priority: {ticket.priority || 'Normal'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No support tickets found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientSupport;
