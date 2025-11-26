import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const features = [
  { title: "API Keys", desc: "Create, rotate, and revoke granular API keys per app." },
  { title: "Analytics", desc: "Usage, latency, and error insights broken down by org and app." },
  { title: "Logs", desc: "Centralized request logging with rich filters and exports." },
  { title: "Team Access", desc: "RBAC-powered multi-tenant orgs with owners, admins, and members." },
  { title: "Billing", desc: "Usage-aware billing with plans, invoices, and Stripe hooks." },
  { title: "Docs", desc: "Mintlify-hosted docs with deep links across the platform." },
];

const steps = [
  { step: "1", title: "Sign up", desc: "Create your account and default organization." },
  { step: "2", title: "Generate a key", desc: "Create scoped API keys for each app or integration." },
  { step: "3", title: "Ship", desc: "Follow the Mintlify docs to call the /v1 API and track metrics." },
];

const testimonials = [
  { name: "Mia Chen", role: "CTO, Northwind", quote: "We shipped our MVP in a week with Launchpad's API-first tooling." },
  { name: "Aiden Park", role: "Head of Platform, Lumio", quote: "RBAC and audit logs gave us enterprise-ready governance from day one." },
];

const Home = () => {
  const docsUrl = import.meta.env.VITE_MINTLIFY_DOCS_URL || "https://docs.example.com";

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-16 flex flex-col gap-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Badge className="w-fit">Multi-tenant API platform</Badge>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              API keys, analytics, and dashboards in one SaaS launchpad.
            </h1>
            <p className="text-lg text-muted-foreground">
              Launch secure, multi-tenant APIs with a ready-made dashboard for your customers and an internal admin console for your team.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <a href={docsUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg">View Docs</Button>
              </a>
            </div>
          </div>
          <Card className="border-primary/30 shadow-xl">
            <CardHeader>
              <CardTitle>Usage snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Requests today</p>
                  <p className="text-2xl font-semibold">24,512</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Error rate</p>
                  <p className="text-2xl font-semibold">0.42%</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Active keys</p>
                  <p className="text-2xl font-semibold">142</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">MRR</p>
                  <p className="text-2xl font-semibold">$38.2k</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Data shown for illustration from demo metrics.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{feature.desc}</CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.step}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">{step.step}</span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{step.desc}</CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </CardHeader>
              <CardContent className="text-muted-foreground">“{testimonial.quote}”</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
