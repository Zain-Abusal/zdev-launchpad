import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ClientProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProjects(data);
  };

  return (
    <ClientLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">My Projects</h1>
          <p className="text-muted-foreground">
            View and manage all your projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{project.title}</CardTitle>
                    <Badge variant="secondary">{project.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {project.short_description}
                  </p>
                  <div className="flex gap-2">
                    <Link to={`/client/projects/${project.id}`}>
                      <Button variant="default" size="sm">View Details</Button>
                    </Link>
                    {project.demo_url && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No projects yet. Contact us to start your first project!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientProjects;
