import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layout, Database, Terminal, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const services = [
  {
    icon: <Layout className="h-12 w-12 text-primary" />,
    title: "Custom Websites",
    description: "Launch-grade marketing sites and landers with sharp copy, speed, and SEO baked in.",
    useCases: ["Product launches", "Campaign pages", "Brand sites", "Conversion CTAs"],
    tech: ["React", "Vite", "Tailwind", "SEO setup"],
  },
  {
    icon: <Database className="h-12 w-12 text-primary" />,
    title: "Systems & Web Apps",
    description: "Operational dashboards and admin tools with clean data models and crisp UX.",
    useCases: ["Admin portals", "Client dashboards", "Internal tools", "Data visualizations"],
    tech: ["React", "Supabase", "PostgreSQL", "REST/GraphQL"],
  },
  {
    icon: <Terminal className="h-12 w-12 text-primary" />,
    title: "Python Tools & Automation",
    description: "Bots, APIs, and scheduled workflows to eliminate repetitive work, with observability built in.",
    useCases: ["Scraping + enrichment", "Scheduled jobs", "3rd-party integrations", "Data pipelines"],
    tech: ["Python", "FastAPI", "Pandas", "Selenium"],
  },
];

const engagement = [
  "Weekly previews with Loom walkthroughs",
  "Source-controlled environments and CI hooks",
  "Design tokens + component libraries for consistency",
  "Launch support, docs, and handoff training",
];

const Services = () => (
  <PublicLayout>
    <section className="relative overflow-hidden bg-background px-4 py-20 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_45%)]" />
      <div className="relative mx-auto max-w-6xl text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="pill mx-auto w-fit">Services built end-to-end</p>
          <h1 className="mt-6 text-4xl font-bold md:text-5xl text-foreground">Design-led engineering for your next launch</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            From narrative marketing pages to complex systems, everything ships with polish, performance, and instrumentation baked in.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/get-started">
              <Button size="lg" className="group">
                Start a project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="border-border/60 bg-secondary/60">
                View portfolio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="-mt-16 space-y-12 px-4 pb-20 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="surface-card h-full rounded-3xl border border-border/60 p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">{service.title}</h3>
                  <p className="text-xs text-muted-foreground">Crafted with measurable outcomes.</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{service.description}</p>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Use cases</h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {service.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Tech focus</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {service.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="rounded-full">
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
        className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-border/60 bg-secondary/50 p-8 md:grid-cols-[1.2fr_0.8fr]"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Engagement style</p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">Transparent delivery with artifacts you can keep</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Every engagement includes design tokens, component libraries, docs, and handoff materials so your team can maintain or extend the work with confidence.
          </p>
        </div>
        <div className="grid gap-3">
          {engagement.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-sm"
            >
              <Sparkles className="mt-1 h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  </PublicLayout>
);

export default Services;
