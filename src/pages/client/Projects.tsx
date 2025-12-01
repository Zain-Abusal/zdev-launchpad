import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FolderKanban, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { logActivity } from '@/lib/activityLogger';

const ClientProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const { user } = useAuth();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    fetchProjects();
    if (user && !logged) {
      logActivity({ action: 'client_projects_view', details: 'Viewed projects list', userId: user.id });
      setLogged(true);
    }
  }, [user, logged]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProjects(data);
  };

  return (
    <ClientLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="pill w-fit">Your builds</p>
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="text-muted-foreground">Access, monitor, and launch the work in progress.</p>
          </div>
          <Button variant="outline" className="border-primary/30">
            <Sparkles className="mr-2 h-4 w-4" />
            Request enhancement
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="surface-card border border-border/60 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FolderKanban className="h-4 w-4 text-primary" />
                        {project.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground capitalize">{project.type}</p>
                    </div>
                    <Badge variant="secondary" className="rounded-full">{project.type || 'N/A'}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.short_description || 'No description provided yet.'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/client/projects/${project.id}`}>
                      <Button variant="default" size="sm">View details</Button>
                    </Link>
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <Card className="surface-card border border-border/60">
            <CardContent className="py-12 text-center space-y-2">
              <p className="text-muted-foreground">No projects yet. Contact us to start your first project!</p>
              <Button size="sm">Start a project</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientProjects;
