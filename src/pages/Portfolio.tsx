import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");

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

  const filters = ["All", "website", "system", "python"];
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.type?.toLowerCase() === filter.toLowerCase());

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-background px-4 py-16 md:px-8 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.03),transparent_40%)]" />
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

          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                className={`rounded-full px-4 ${filter === f ? "" : "border-border/60 bg-secondary/60"}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/portfolio/${project.id}`}>
                  <Card className="surface-card h-full border border-border/60 overflow-hidden">
                    {project.image_url && (
                      <div className="aspect-video overflow-hidden rounded-2xl bg-muted">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <CardHeader className="px-0 pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-semibold text-foreground line-clamp-1">{project.title || "Untitled"}</CardTitle>
                        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
                          {project.type || "N/A"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-0">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.short_description ||
                          (project.full_description
                            ? project.full_description.slice(0, 140) + (project.full_description.length > 140 ? "…" : "")
                            : "No description available.")}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="surface-card text-center rounded-3xl border border-border/60 py-10">
              <p className="text-muted-foreground">No projects found for this filter.</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Portfolio;
