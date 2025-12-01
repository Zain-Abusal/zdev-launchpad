import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/lib/activityLogger";
import { useAuth } from "@/contexts/AuthContext";

const AdminSupport = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    fetchMessages();
    if (user) {
      logActivity({ action: "admin_support_view", details: "Viewed support inbox", userId: user.id });
    }
  }, [user]);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("is_from_client", false)
      .order("created_at", { ascending: false });
    if (data) setMessages(data);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from("chat_messages")
      .update({ read_at: new Date().toISOString(), status: "closed" })
      .eq("id", id);

    if (!error) {
      logActivity({ action: "admin_support_close", details: `Closed support message ${id}` , userId: user?.id });
      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, read_at: new Date().toISOString(), status: "closed" });
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="pill w-fit">Support</p>
            <h1 className="text-3xl font-bold">Support Inbox</h1>
            <p className="text-muted-foreground">Manage customer support messages and inquiries</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> Auto-refresh when actions occur
          </div>
        </motion.div>

        <div className="grid gap-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card
                className={`surface-card border border-border/60 cursor-pointer hover-lift ${!message.read_at ? "ring-2 ring-primary/20" : ""}`}
                onClick={() => setSelectedMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{message.sender_name}</h3>
                          {!message.read_at && <Badge variant="default" className="shrink-0">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{message.sender_email}</p>
                        <p className="text-sm line-clamp-2 text-foreground/80">{message.message}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(message.created_at).toLocaleDateString()}
                      </div>
                      <Badge variant={message.status === "open" ? "secondary" : "outline"}>
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
          <Card className="surface-card border border-border/60">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No support messages yet</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl surface-card border border-border/60">
            <DialogHeader>
              <DialogTitle>Support Message</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <Card className="surface-card border border-border/60">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{selectedMessage.sender_name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{selectedMessage.sender_email}</p>
                      </div>
                      <Badge variant={selectedMessage.status === "open" ? "default" : "secondary"}>
                        {selectedMessage.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-sm text-foreground/80">{selectedMessage.message}</p>
                    <p className="text-xs text-muted-foreground mt-4">
                      Received: {new Date(selectedMessage.created_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>

                {!selectedMessage.read_at && (
                  <Button onClick={() => markAsRead(selectedMessage.id)} className="w-full">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
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
