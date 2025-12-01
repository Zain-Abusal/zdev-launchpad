import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  ArrowRight,
  Code2,
  Layout,
  Sparkles,
  Shield,
  Timer,
  LineChart,
  Terminal,
  Check,
} from "lucide-react";

const heroStats = [
  { value: "140+", label: "Projects shipped", detail: "SaaS, ecommerce, ops tooling" },
  { value: "10d", label: "Average v1 timeline", detail: "Design → live build" },
  { value: "<1h", label: "Response time", detail: "When you need support" },
];

const capabilities = [
  {
    icon: <Layout className="h-7 w-7" />,
    title: "Narrative sites",
    description: "Launch-grade marketing sites and story-driven experiences.",
  },
  {
    icon: <Code2 className="h-7 w-7" />,
    title: "Systems & dashboards",
    description: "Operational dashboards, client portals, and admin tools that feel premium.",
  },
  {
    icon: <Terminal className="h-7 w-7" />,
    title: "Automation",
    description: "Python bots, data pipelines, scraping, and smart glue for the tools you use.",
  },
];

const steps = [
  { number: "01", title: "Discovery", description: "Capture goals, constraints, and success signals." },
  { number: "02", title: "Design system", description: "Clickable flows + visual language in days." },
  { number: "03", title: "Build & automate", description: "Ship the product, wire data, automate the boring." },
  { number: "04", title: "Launch & care", description: "Monitored launches, docs, and support on call." },
];

const recentBuilds = [
  {
    title: "Product ops cockpit",
    detail: "A React + Supabase control room for feature rollouts, gating, and flags.",
    items: ["Feature matrix", "Audit trails", "Config as data", "Single pane of glass"],
  },
  {
    title: "Automation mesh",
    detail: "Python workers that scrape, enrich, and sync data back into your stack.",
    items: ["Headless scraping", "Webhook fan-out", "Retryable jobs", "Slack digests"],
  },
  {
    title: "High-converting launch site",
    detail: "Story-driven landing page with clear CTA paths and performance budgets.",
    items: ["Narrative sections", "Microinteractions", "A/B ready", "99/100 Lighthouse"],
  },
];

const Home = () => (
  <PublicLayout>
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.03),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.05),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.04),transparent_40%)]" />

      <div className="container relative mx-auto px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              Independent dev studio shipping for startups and teams
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl md:leading-[1.05] text-foreground">
              Digital products, systems, and automation
              <span className="block text-primary">built fast, shipped polished.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              I ship marketing sites, client portals, admin tools, and Python automation that plugs into your stack—with
              fast iterations and production discipline.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/get-started">
                <Button size="lg" className="group w-full sm:w-auto">
                  Build my project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/portfolio" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-border/70 bg-secondary/50">
                  See recent work
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-secondary/60 p-4 shadow-lg backdrop-blur"
                >
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm font-semibold text-foreground/90">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <Card className="border border-border/60 bg-card/80 shadow-2xl">
              <div className="flex items-center gap-3 p-4">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Production-ready foundations</p>
              <p className="text-xs text-muted-foreground">
                Auth, analytics, SEO, and fast load times—set up day one.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 px-4 pb-4">
                {["React", "TypeScript", "Supabase", "Framer Motion", "Tailwind"].map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Tight delivery loops", icon: <Timer className="h-5 w-5" />, copy: "Frequent previews and async updates keep you unblocked." },
                  { title: "Security-first", icon: <Shield className="h-5 w-5" />, copy: "Supabase + JWT auth, audit logs, RBAC baked in." },
                  { title: "Measurable impact", icon: <LineChart className="h-5 w-5" />, copy: "Instrumentation for uptime, conversions, adoption." },
                ].map((card, idx) => (
                <Card key={card.title} className="border border-border/60 bg-secondary/50">
                  <div className="flex items-start gap-3 p-4">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">{card.icon}</div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
                      <p className="text-xs text-muted-foreground">{card.copy}</p>
                    </div>
                  </div>
                </Card>
              )).slice(0,2)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16 md:px-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Capabilities</p>
          <h2 className="text-3xl font-bold text-foreground">From landing pages to living systems</h2>
          <p className="text-lg text-muted-foreground">Each build blends design polish with robust engineering.</p>
        </div>
        <Link to="/services">
          <Button variant="ghost" className="group">
            View services
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <BentoGrid className="auto-rows-[minmax(220px,_1fr)]">
        {capabilities.map((capability, index) => (
          <BentoGridItem
            key={capability.title}
            title={
              <div className="flex items-center gap-3 text-xl font-semibold text-foreground">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {capability.icon}
                </span>
                {capability.title}
              </div>
            }
            description={<p className="text-sm text-muted-foreground leading-relaxed">{capability.description}</p>}
            className="relative overflow-hidden border border-border/60 bg-card/80 backdrop-blur"
          >
            <motion.div
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.06),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.04),transparent_45%)]"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 8, repeat: Infinity, delay: index * 0.3 }}
            />
          </BentoGridItem>
        ))}
      </BentoGrid>
    </section>

    <section className="bg-secondary/40 py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground">A process that keeps momentum</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Clear phases, visible progress, and artifacts you can share with stakeholders.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="surface-card border border-border/60 h-full">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16 md:px-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Recent builds</p>
          <h2 className="text-3xl font-bold text-foreground">Designed, engineered, and shipped</h2>
          <p className="text-lg text-muted-foreground">What it looks like when design, product, and code stay aligned.</p>
        </div>
        <Link to="/portfolio">
          <Button variant="outline" className="group border-border/60 bg-secondary/60">
            Browse portfolio
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {recentBuilds.map((build, index) => (
          <motion.div
            key={build.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card className="surface-card border border-border/60 h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-foreground">{build.title}</CardTitle>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{build.detail}</p>
                <ul className="space-y-2 text-sm">
                  {build.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="relative overflow-hidden bg-primary/5 py-16 text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="container relative mx-auto px-4 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Let’s ship</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl text-foreground">Ready when you are.</h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Send the brief, share the metrics you care about, and let’s build the thing together.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/get-started" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Get a build timeline
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-border/70 bg-secondary/60">
                  Quick question?
                </Button>
              </Link>
            </div>
          </div>
          <Card className="surface-card border border-border/60 p-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Stable, secure foundations</p>
                  <p className="text-sm text-muted-foreground">Auth, audits, and monitoring included.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Timer className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Fast delivery loops</p>
                  <p className="text-sm text-muted-foreground">Previews, async updates, and Looms.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </PublicLayout>
);

export default Home;
