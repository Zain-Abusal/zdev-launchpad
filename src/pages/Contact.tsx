import { useState } from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('chat_messages').insert({
        sender_name: formData.name,
        sender_email: formData.email,
        message: formData.message,
        is_from_client: false,
      });

      if (error) throw error;

      toast({
        title: 'Message sent!',
        description: "I'll get back to you as soon as possible.",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-muted-foreground mb-6">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you need a custom website, web system, or Python automation, 
              I'm here to help bring your ideas to life.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">support@zdev.dev</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Response Time</h3>
                  <p className="text-muted-foreground">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6">
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
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Contact;
