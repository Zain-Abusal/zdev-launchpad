import { useState } from "react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { logActivity } from "@/lib/activityLogger";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("chat_messages").insert({
        sender_name: formData.name,
        sender_email: formData.email,
        message: formData.message,
        is_from_client: false,
      });

      if (error) throw error;
      logActivity({ action: "contact_form_submit", details: `From ${formData.email}` });

      toast({
        title: "Message sent!",
        description: "I'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-background px-4 py-20 md:px-8 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.05),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.03),transparent_40%)]" />
        <div className="container relative z-10 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="pill mx-auto w-fit">Let's talk</p>
            <h1 className="mt-4 text-4xl font-bold text-foreground md:text-5xl">Get in touch</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Share the project and the metrics that matter, and we&apos;ll scope a clear plan together.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="surface-card h-full rounded-3xl border border-border/60 p-8"
            >
              <h2 className="text-2xl font-semibold text-foreground">What you get</h2>
              <p className="mt-3 text-muted-foreground">
                Fast response, concrete next steps, and a realistic delivery plan with timelines.
              </p>
              <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/60 px-4 py-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p>zainabusal113@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/60 px-4 py-3">
                  <MessageSquare className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Response time</h3>
                    <p>Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <BackgroundGradient className="rounded-3xl">
                <Card className="surface-card rounded-3xl border border-border/60 p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      <Send className="mr-2 h-4 w-4" />
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Card>
              </BackgroundGradient>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Contact;
