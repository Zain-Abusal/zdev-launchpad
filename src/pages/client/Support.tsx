import { useEffect, useState } from 'react';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Paperclip, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const ClientSupport = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '', file: null });

  useEffect(() => {
    if (user) fetchTickets();
  }, [user]);

  const fetchTickets = async () => {
    setLoading(true);
    // const { data } = await supabase
    //   .from('support_tickets')
    //   .select('*')
    //   .eq('client_id', user.id)
    //   .order('created_at', { ascending: false });
      // Supabase query removed; setTickets should be updated with valid data source if available.
      setTickets([]); // Placeholder for tickets until valid data source is available
    setLoading(false);
  };

  const handleCreateTicket = async () => {
    setLoading(true);
    // const { data, error } = await supabase
    //   .from('support_tickets')
    //   .insert({
    //     client_id: user.id,
    //     subject: newTicket.subject,
    //     status: 'Open',
    //     priority: 'Normal',
    //     created_at: new Date().toISOString()
    //   })
    //   .select();
      // Supabase query removed; ticket message creation logic should be updated with valid data source if available.
      // Placeholder logic for ticket creation until valid data source is available.
      // Ticket creation logic removed due to missing table and type error. Add valid logic when table is available.
    setLoading(false);
  };

  return (
    <ClientLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle><MessageSquare className="inline mr-2" />Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Create New Ticket</h4>
              <input
                type="text"
                placeholder="Subject"
                className="border rounded px-2 py-1 mb-2 w-full"
                value={newTicket.subject}
                onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })}
              />
              <textarea
                placeholder="Describe your issue..."
                className="border rounded px-2 py-1 mb-2 w-full"
                value={newTicket.message}
                onChange={e => setNewTicket({ ...newTicket, message: e.target.value })}
              />
              <label className="flex items-center gap-2 mb-2">
                <Paperclip className="h-4 w-4" />
                <input
                  type="file"
                  onChange={e => setNewTicket({ ...newTicket, file: e.target.files?.[0] })}
                />
              </label>
              <Button size="sm" onClick={handleCreateTicket} disabled={loading || !newTicket.subject || !newTicket.message}>
                {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                Submit Ticket
              </Button>
            </div>
            <h4 className="font-semibold mb-2">Your Tickets</h4>
            {loading ? (
              <Loader2 className="animate-spin h-6 w-6 mx-auto" />
            ) : tickets.length ? (
              <ul className="text-sm">
                {tickets.map(ticket => (
                  <li key={ticket.id} className="mb-4 border-b pb-2">
                    <div className="font-semibold">{ticket.subject}</div>
                    <div>Status: {ticket.status} | Priority: {ticket.priority}</div>
                    <div className="text-xs text-muted-foreground">Created: {ticket.created_at}</div>
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted-foreground">No support tickets found.</p>}
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientSupport;
