import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";

interface TicketPayload {
  name: string;
  email: string;
  company?: string;
  category: string;
  message: string;
}

const ContactPage = () => {
  const [form, setForm] = useState<TicketPayload>({
    name: "",
    email: "",
    company: "",
    category: "support",
    message: "",
  });

  const createTicket = useMutation(
    (payload: TicketPayload) => api.post<{ id: string }>("/api/support/tickets", payload),
    {
      onSuccess: () => {
        toast({ title: "Message received", description: "We created a support ticket for your request." });
        setForm({ name: "", email: "", company: "", category: "support", message: "" });
      },
      onError: (err) => toast({ title: "Unable to send message", description: err.message, variant: "destructive" }),
    }
  );

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <p className="text-muted-foreground text-sm">We create support tickets for every submission.</p>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                createTicket.mutate(form);
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="Company or organization"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="How can we help?"
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={createTicket.isPending}>
                {createTicket.isPending ? "Sending..." : "Send"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
};

export default ContactPage;
