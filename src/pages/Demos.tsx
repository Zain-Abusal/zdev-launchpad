import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Demos = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Demos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive demonstrations of various projects and capabilities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center col-span-3">Loading...</p>
          ) : projects.length === 0 ? (
            <p className="text-center col-span-3">No projects found.</p>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift hover-scale">
                  {project.image_url && (
                    <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant="secondary">{project.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Tech Stack:</h4>
                      <ul className="space-y-1">
                        {project.tech_stack && project.tech_stack.map((tech: string) => (
                          <li key={tech} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-0.5">•</span>
                            <span className="text-muted-foreground">{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full" disabled={!project.demo_url}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {project.demo_url ? (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer">View Demo</a>
                      ) : 'Demo Unavailable'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Demos;
