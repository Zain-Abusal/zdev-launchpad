import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  ArrowRight,
  Compass,
  Layers,
  Lightbulb,
  ShieldCheck,
  Zap,
  LineChart,
  Terminal,
  Check,
  PanelRightDashed,
} from "lucide-react";

const heroStats = [
  { value: "48h", label: "Kickoff turnaround", detail: "First preview lands inside two days." },
  { value: "140+", label: "Projects shipped", detail: "SaaS launches, ops dashboards, automation." },
  { value: "97%", label: "On-time delivery", detail: "Protected weekly cadences and clear risers." },
];

const capabilityGrid = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Narratives with intent",
    badge: "Marketing",
    description: "Expressive launch pages and campaign flows designed to convert and educate.",
    metric: "3-5 sections",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Operational control",
    badge: "Dashboards",
    description: "Portals, admin tools, and client workspaces that feel premium and stay performant.",
    metric: "Role-aware",
  },
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Automation fabric",
    badge: "Python",
    description: "Bots, data pipelines, and sync layers that glue the stack together without drama.",
    metric: "99% uptime",
  },
  {
    icon: <PanelRightDashed className="h-6 w-6" />,
    title: "Design systems",
    badge: "UI kit",
    description: "Tokens, primitives, and components so teams can ship quickly and stay on brand.",
    metric: "Tokenized",
  },
];

const steps = [
  { number: "01", title: "Shape the win", description: "Define the goal, success signals, and what done looks like." },
  { number: "02", title: "Prototype fast", description: "Clickable flows and visual direction in days, not weeks." },
  { number: "03", title: "Build and wire", description: "Ship the experience, connect data, add the automation layer." },
  { number: "04", title: "Launch and care", description: "Staged rollouts, monitoring, docs, and on-call support." },
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
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary/15 via-background to-secondary/80 py-20 md:py-24">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-10 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-x-6 top-28 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-50" />
        <div className="absolute inset-x-6 bottom-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-50" />
      </div>

      <div className="container relative mx-auto px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="pill">Independent launch partner</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl md:leading-[1.05] text-foreground">
              Digital products, control rooms, and automation built with pace
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-accent">
                and finish.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              From story-driven landing pages to operational control rooms and automation, I keep teams aligned with
              visible progress, fast decisions, and ship-ready polish.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/get-started">
                <Button size="lg" className="group w-full sm:w-auto">
                  Start a build
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/portfolio" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary/40 bg-secondary/60 text-foreground"
                >
                  See what ships
                </Button>
              </Link>
            </div>
            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-secondary/60 px-4 py-2 text-xs text-muted-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">24h</span>
              Typical response time for new requests
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-lg backdrop-blur transition-transform duration-200 hover:-translate-y-1"
                >
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm font-semibold text-foreground/90">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <Card className="border border-border/50 bg-card/90 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg text-foreground">Launch-ready stack</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Auth, analytics, SEO, and performance budgets set on day one so we can focus on outcomes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Supabase", "Framer Motion", "Tailwind", "Python"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full border-primary/20 bg-secondary/70">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Weekly proof", icon: <Zap className="h-5 w-5" />, copy: "Previews and walkthroughs keep decisions moving." },
                { title: "Security baked in", icon: <ShieldCheck className="h-5 w-5" />, copy: "RBAC, audit trails, and telemetry are not add-ons." },
                { title: "Measured results", icon: <LineChart className="h-5 w-5" />, copy: "Set KPIs up front and keep them instrumented." },
              ]
                .slice(0, 2)
                .map((card) => (
                  <Card key={card.title} className="border border-border/50 bg-secondary/70">
                    <div className="flex items-start gap-3 p-4">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">{card.icon}</div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{card.copy}</p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="page-section container mx-auto px-4 py-16 md:px-8">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="pill">Capabilities</p>
          <h2 className="text-3xl font-bold text-foreground">From story-first to system-heavy work</h2>
          <p className="text-lg text-muted-foreground">
            Every build blends design, engineering, and automation so the experience feels cohesive.
          </p>
        </div>
        <Link to="/services">
          <Button variant="ghost" className="group text-foreground">
            View services
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <BentoGrid className="auto-rows-[minmax(240px,_1fr)]">
        {capabilityGrid.map((capability, index) => (
          <BentoGridItem
            key={capability.title}
            title={
              <div className="flex items-center justify-between text-xl font-semibold text-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {capability.icon}
                  </span>
                  {capability.title}
                </div>
                <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/10 text-xs">
                  {capability.badge}
                </Badge>
              </div>
            }
            description={<p className="text-sm text-muted-foreground leading-relaxed">{capability.description}</p>}
            className="relative overflow-hidden border border-border/50 bg-card/90 backdrop-blur"
          >
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_30%,rgba(56,189,248,0.14),transparent_40%),radial-gradient(circle_at_80%_8%,rgba(196,181,253,0.14),transparent_38%)]"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 9, repeat: Infinity, delay: index * 0.25 }}
            />
          </BentoGridItem>
        ))}
      </BentoGrid>
    </section>

    <section className="bg-secondary/60 py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground">A cadence built for visibility</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Weekly rituals, demos, and metrics so stakeholders never wonder what is happening.
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
              <Card className="surface-card h-full border border-border/50">
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
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
          <p className="pill">Recent builds</p>
          <h2 className="text-3xl font-bold text-foreground">Designed, engineered, delivered</h2>
          <p className="text-lg text-muted-foreground">
            A look at how design, product thinking, and code stay aligned through delivery.
          </p>
        </div>
        <Link to="/portfolio">
          <Button variant="outline" className="group border-primary/40 bg-secondary/70 text-foreground">
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
            <Card className="surface-card h-full border border-border/50">
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

    <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/80 to-background py-16 text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="container relative mx-auto px-4 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="pill">Let us ship</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl text-foreground">Ready when you are.</h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Share the intent, the metrics you care about, and the access we need. I will return with a plan, a build
              path, and a timeline.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/get-started" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Get a build timeline
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-primary/40 bg-secondary/70">
                  Ask a quick question
                </Button>
              </Link>
            </div>
          </div>
          <Card className="surface-card border border-border/50 p-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Compass className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Clear direction</p>
                  <p className="text-sm text-muted-foreground">Scope, success metrics, and milestones defined up front.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Weekly proof</p>
                  <p className="text-sm text-muted-foreground">Walkthroughs, loom updates, and staging links every week.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Safe launches</p>
                  <p className="text-sm text-muted-foreground">Monitoring, rollbacks, and docs so you stay supported.</p>
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
