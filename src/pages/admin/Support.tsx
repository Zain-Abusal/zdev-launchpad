import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminSupport = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('is_from_client', false)
      .order('created_at', { ascending: false });
    
    if (data) setMessages(data);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('chat_messages')
      .update({ read_at: new Date().toISOString(), status: 'closed' })
      .eq('id', id);

    if (!error) {
      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, read_at: new Date().toISOString(), status: 'closed' });
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Support Inbox</h1>
          <p className="text-muted-foreground">
            Manage customer support messages and inquiries
          </p>
        </motion.div>

        <div className="grid gap-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card 
                className={`cursor-pointer hover-lift ${!message.read_at ? 'border-primary' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-full bg-muted">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{message.sender_name}</h3>
                          {!message.read_at && <Badge variant="default" className="shrink-0">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{message.sender_email}</p>
                        <p className="text-sm line-clamp-2">{message.message}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(message.created_at).toLocaleDateString()}
                      </div>
                      <Badge variant={message.status === 'open' ? 'secondary' : 'outline'}>
                        {message.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {messages.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No support messages yet</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Support Message</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{selectedMessage.sender_name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{selectedMessage.sender_email}</p>
                      </div>
                      <Badge variant={selectedMessage.status === 'open' ? 'default' : 'secondary'}>
                        {selectedMessage.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                    <p className="text-xs text-muted-foreground mt-4">
                      Received: {new Date(selectedMessage.created_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>

                {!selectedMessage.read_at && (
                  <Button 
                    onClick={() => markAsRead(selectedMessage.id)}
                    className="w-full"
                  >
                    Mark as Read & Close
                  </Button>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminSupport;
