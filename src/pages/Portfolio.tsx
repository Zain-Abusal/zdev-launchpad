import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, ArrowRight, Layers } from "lucide-react";

const filters = ["All", "website", "system", "python"];
const sortOptions = [
  { value: "recent", label: "Newest first" },
  { value: "alpha", label: "Alphabetical" },
];

const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });
    if (data) setProjects(data);
  };

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.type?.toLowerCase() === filter.toLowerCase());

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sort === "alpha") {
      return (a.title || "").localeCompare(b.title || "");
    }
    return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
  });

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary px-4 py-16 md:px-8 md:py-20">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-[-10%] h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute right-10 bottom-[-10%] h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="pill mx-auto w-fit">Curated work</p>
            <h1 className="mt-4 text-4xl font-bold text-foreground md:text-5xl">Portfolio</h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Launch sites, dashboards, and automation-heavy builds delivered end to end.
            </p>
          </motion.div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  className={`rounded-full px-4 ${filter === f ? "" : "border-primary/30 bg-secondary/70 text-foreground"}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-secondary/70 px-3 py-1 text-xs text-muted-foreground">
              <span>Sort</span>
              <select
                className="bg-transparent text-foreground outline-none"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-background text-foreground">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/portfolio/${project.id}`}>
                  <Card className="surface-card h-full overflow-hidden border border-border/50 transition-transform duration-200 hover:-translate-y-1">
                    {project.image_url && (
                      <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      </div>
                    )}
                    <CardHeader className="px-0 pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-semibold text-foreground line-clamp-1">
                          {project.title || "Untitled"}
                        </CardTitle>
                        <Badge variant="secondary" className="rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold">
                          {project.type || "N/A"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 px-0">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.short_description ||
                          (project.full_description
                            ? `${project.full_description.slice(0, 140)}${project.full_description.length > 140 ? "..." : ""}`
                            : "No description available.")}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Layers className="h-4 w-4 text-primary" />
                        <span>{project.stack || "Modern web stack"}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="surface-card text-center rounded-3xl border border-border/50 py-10">
              <p className="text-muted-foreground">No projects found for this filter.</p>
              <p className="mt-2 text-sm text-muted-foreground/80">Try a different category or clear the filter.</p>
            </div>
          )}

          <div className="mx-auto grid max-w-4xl gap-6 rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/60 to-background p-8 text-center">
            <div className="flex justify-center">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                Want this quality?
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Bring your brief, get a launch plan</h3>
            <p className="text-base text-muted-foreground">
              If you want something like what you see here, send the intent and constraints. I will reply with a
              roadmap, milestones, and a first-preview date.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link to="/get-started">
                <Button size="lg" className="group">
                  Start a project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-primary/40 bg-secondary/70">
                  View services
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Fast iterations, thoughtful finishes
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Portfolio;
