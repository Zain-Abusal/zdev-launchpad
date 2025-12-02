import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layout, Database, Terminal, ArrowRight, CheckCircle2, Compass, Rocket, Sparkles } from "lucide-react";

const serviceTracks = [
  {
    icon: <Layout className="h-12 w-12 text-primary" />,
    title: "Narrative launches",
    description: "Story-first marketing sites and campaign pages with clear CTA paths and a bias for conversion.",
    outcomes: ["Messaging frameworks", "Conversion-primed layouts", "SEO and analytics baked in"],
    tech: ["React", "Vite", "Animation systems", "Contentful/Supabase"],
  },
  {
    icon: <Database className="h-12 w-12 text-primary" />,
    title: "Systems and dashboards",
    description: "Operational control rooms and portals that surface the right signals and stay pleasant to use.",
    outcomes: ["Role-aware flows", "Data visualizations", "Fast, resilient queries"],
    tech: ["Supabase", "Postgres", "REST/GraphQL", "Charting libraries"],
  },
  {
    icon: <Terminal className="h-12 w-12 text-primary" />,
    title: "Python automation",
    description: "Bots, pipelines, and integrations that remove repetitive work and keep teams informed.",
    outcomes: ["Scheduled jobs", "Data enrichment", "Observability and alerts"],
    tech: ["FastAPI", "Pandas", "Headless scraping", "Workers/queues"],
  },
];

const engagement = [
  "Weekly previews with Loom walkthroughs and staging links",
  "Design tokens, component libraries, and docs you can keep",
  "Source-controlled environments with CI hooks and health checks",
  "Launch support, rollback plans, and on-call coverage during go-live",
];

const serviceSignals = [
  { label: "First preview", value: "5-7 days", detail: "Clickable flows and hero states." },
  { label: "Build cadence", value: "Weekly ships", detail: "Staging drops with notes every week." },
  { label: "Stability", value: "99% uptime", detail: "Monitoring, alerts, and rollback plans." },
];

const rituals = [
  { title: "Shape", copy: "Clarify the goal, audience, and must-haves. Translate into a lean scope and success signals." },
  { title: "Prototype", copy: "Clickable flows and visual language in days, so feedback lands early and often." },
  { title: "Build", copy: "Ship the experience, wire data, and add automation. Every week ends with a proof." },
  { title: "Stabilize", copy: "Load tests, monitoring, docs, and handoff so the work stays reliable after launch." },
];

const Services = () => (
  <PublicLayout>
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary px-4 py-20 md:px-8 md:py-24">
      <div className="absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 bottom-[-10%] h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="pill mx-auto w-fit">Services built end-to-end</p>
          <h1 className="mt-6 text-4xl font-bold md:text-5xl text-foreground">
            Design-led engineering for teams that want to move fast
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Launch-grade storytelling, resilient systems, and automation that quietly does the work.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/get-started">
              <Button size="lg" className="group">
                Start a project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="border-primary/40 bg-secondary/70">
                View portfolio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="-mt-16 space-y-12 px-4 pb-20 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 rounded-3xl border border-border/50 bg-card/70 p-6 sm:grid-cols-3">
        {serviceSignals.map((signal) => (
          <div key={signal.label} className="rounded-2xl border border-border/40 bg-secondary/60 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{signal.label}</p>
            <p className="mt-2 text-xl font-semibold text-foreground">{signal.value}</p>
            <p className="text-sm text-muted-foreground">{signal.detail}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {serviceTracks.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="surface-card h-full rounded-3xl border border-border/50 p-8 transition-transform duration-200 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">{service.title}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">Outcome-led</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{service.description}</p>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Outputs</h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {service.outcomes.map((useCase) => (
                    <li key={useCase} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Tooling</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {service.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="rounded-full border-primary/20 bg-secondary/70">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-border/50 bg-secondary/70 p-8 md:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Engagement style</p>
          <h3 className="text-2xl font-bold text-foreground">Transparent delivery with artifacts you can keep</h3>
          <p className="text-sm text-muted-foreground">
            Every engagement includes source-controlled environments, docs, and reusable components so your team can
            extend the work long after launch.
          </p>
        </div>
        <div className="grid gap-3">
          {engagement.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card px-4 py-3 shadow-sm"
            >
              <Sparkles className="mt-1 h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-border/50 bg-card/70 p-8 md:grid-cols-2">
        {rituals.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex gap-4 rounded-2xl border border-border/40 bg-secondary/60 p-4"
          >
            <Badge variant="outline" className="h-9 w-9 shrink-0 items-center justify-center rounded-full border-primary/40 bg-primary/10 text-primary">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </Badge>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.copy}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/60 to-background p-8 text-center">
        <div className="flex justify-center">
          <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
            Engagement playbook
          </Badge>
        </div>
        <h3 className="text-2xl font-bold text-foreground">Bring the brief, leave with a launch plan</h3>
        <p className="text-base text-muted-foreground">
          Share the metrics that matter. I will design the path, build the experience, and stay on to launch and support
          it. Ready to see a first preview?
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link to="/get-started">
            <Button size="lg" className="group">
              Book a kickoff
              <Rocket className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-primary/40 bg-secondary/70">
              Ask a question
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </PublicLayout>
);

export default Services;
