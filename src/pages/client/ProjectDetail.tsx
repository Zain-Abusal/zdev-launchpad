import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ClientProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (id) fetchProject();
  }, [id]);

  const fetchProject = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (data) setProject(data);
  };

  if (!project) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </ClientLayout>
    );
  }

  const hasCustomDocs = project.demo_url && project.demo_url.includes('/docs');

  return (
    <ClientLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <Badge variant="secondary">{project.type}</Badge>
            </div>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat About Project
            </Button>
          </div>
        </motion.div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{project.full_description || project.short_description}</p>
            </div>
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech: string) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Access comprehensive documentation for this project</p>
              {hasCustomDocs ? (
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />Open Custom Documentation
                  </Button>
                </a>
              ) : (
                <Link to="/docs-embed">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />Open General Documentation
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Download project files and resources</p>
              <Button variant="outline" className="w-full" disabled>
                <Download className="mr-2 h-4 w-4" />No Downloads Available
              </Button>
            </CardContent>
          </Card>

          {project.type === 'system' && (
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>License Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">License Key</h4>
                  <code className="text-sm bg-muted px-3 py-2 rounded block">••••-••••-••••-{Math.random().toString(36).substr(2, 4).toUpperCase()}</code>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Status</h4>
                  <Badge variant="default">Active</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Usage is limited to your agreed terms. Redistribution may result in suspension.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientProjectDetail;
