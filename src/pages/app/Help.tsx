import { AppLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tickets = [
  { subject: "Need more quota", status: "open" },
  { subject: "Webhook retries", status: "in_progress" },
];

const Help = () => {
  const docsUrl = import.meta.env.VITE_MINTLIFY_DOCS_URL || "https://docs.example.com";
  return (
    <AppLayout>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Docs & Support</CardTitle>
          <a href={docsUrl} target="_blank" rel="noreferrer">
            <Button variant="outline">Open Docs</Button>
          </a>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">Support tickets</p>
            <div className="space-y-2 mt-2">
              {tickets.map((ticket) => (
                <div key={ticket.subject} className="flex items-center justify-between rounded-md border p-3">
                  <span>{ticket.subject}</span>
                  <span className="text-xs text-muted-foreground">{ticket.status}</span>
                </div>
              ))}
            </div>
          </div>
          <Button>Create ticket</Button>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Help;
