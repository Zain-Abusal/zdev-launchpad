import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Check, Sparkles } from "lucide-react";

const demos = [
  {
    title: "Inventory Control System",
    description: "Warehouse-grade inventory, order routing, and supplier visibility.",
    features: ["Multi-warehouse stock", "Low-stock alerts", "Order pipeline", "Supplier tracking"],
    type: "System",
    link: "https://demo-inventory.shopzyra.site",
  },
  {
    title: "Publishing/Blog Site",
    description: "Story-focused blog with SEO, author profiles, and content scheduling.",
    features: ["SEO-friendly", "Author pages", "Content calendar", "Fast reading experience"],
    type: "Marketing",
    link: "https://demo-blog.shopzyra.site",
  },
  {
    title: "Data Scraping Bot",
    description: "Headless scrapers that cleanse, enrich, and sync data into your stack.",
    features: ["Scheduled runs", "Data cleaning", "Exports + webhooks", "Slack digests"],
    type: "Automation",
    link: "https://demo.zdev.dev/automation",
  },
];

const Demos = () => (
  <PublicLayout>
    <section className="relative overflow-hidden bg-background px-4 py-16 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_45%)]" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="pill mx-auto w-fit">Interactive demos</p>
          <h1 className="mt-6 text-4xl font-bold text-foreground md:text-5xl">See how projects feel</h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            Polished previews that showcase motion, usability, and production-ready polish.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="bg-secondary/60 text-foreground">Responsive UI</Badge>
            <Badge variant="secondary" className="bg-secondary/60 text-foreground">Auth-ready</Badge>
            <Badge variant="secondary" className="bg-secondary/60 text-foreground">Data aware</Badge>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="-mt-10 px-4 pb-20 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo, index) => (
          <motion.div
            key={demo.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="surface-card h-full border border-border/60">
              <CardHeader className="pb-1">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">{demo.title}</CardTitle>
                  <Badge variant="secondary" className="rounded-full">{demo.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{demo.description}</p>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Highlights</h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {demo.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a href={demo.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="mt-4 w-full rounded-xl border-border/60 bg-secondary/60">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View live demo
                  </Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  </PublicLayout>
);

export default Demos;
