import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Key, MessageSquare, ListChecks, RefreshCw, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ClientProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'features' | 'status' | 'feedback' | 'changelog'>('summary');
  const [feedback, setFeedback] = useState<any[]>([]);
  const [changelog, setChangelog] = useState<any[]>([]);

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
    fetchFeedback();
    fetchChangelog();
  };

  const fetchFeedback = async () => {
    const { data } = await supabase
      .from('project_feedback')
      .select('*')
      .eq('project_id', id);
    if (data) setFeedback(data);
  };

  const fetchChangelog = async () => {
    const { data } = await supabase
      .from('project_changelog')
      .select('*')
      .eq('project_id', id);
    if (data) setChangelog(data);
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

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <Button size="sm" variant={activeTab === 'summary' ? 'default' : 'outline'} onClick={() => setActiveTab('summary')}><ListChecks className="mr-1 h-4 w-4" />Summary</Button>
          <Button size="sm" variant={activeTab === 'features' ? 'default' : 'outline'} onClick={() => setActiveTab('features')}><ListChecks className="mr-1 h-4 w-4" />Features</Button>
          <Button size="sm" variant={activeTab === 'status' ? 'default' : 'outline'} onClick={() => setActiveTab('status')}><RefreshCw className="mr-1 h-4 w-4" />Status</Button>
          <Button size="sm" variant={activeTab === 'feedback' ? 'default' : 'outline'} onClick={() => setActiveTab('feedback')}><MessageCircle className="mr-1 h-4 w-4" />Feedback</Button>
          <Button size="sm" variant={activeTab === 'changelog' ? 'default' : 'outline'} onClick={() => setActiveTab('changelog')}><FileText className="mr-1 h-4 w-4" />Changelog</Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'summary' && (
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{project.full_description || project.short_description}</p>
              </div>
              {project.tech_stack && (
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
        )}

        {activeTab === 'features' && (
          <Card>
            <CardHeader>
              <CardTitle>Features List</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm">
                {project.features && project.features.length ? (
                  project.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))
                ) : <li>No features listed.</li>}
              </ul>
            </CardContent>
          </Card>
        )}

        {activeTab === 'status' && (
          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="default">{project.status || 'Unknown'}</Badge>
            </CardContent>
          </Card>
        )}

        {activeTab === 'feedback' && (
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {feedback.length ? (
                <ul className="text-sm">
                  {feedback.map((fb: any) => (
                    <li key={fb.id} className="mb-2">{fb.message} <span className="text-xs text-muted-foreground">({fb.created_at})</span></li>
                  ))}
                </ul>
              ) : <p className="text-muted-foreground">No feedback yet.</p>}
            </CardContent>
          </Card>
        )}

        {activeTab === 'changelog' && (
          <Card>
            <CardHeader>
              <CardTitle>Updates & Changelog</CardTitle>
            </CardHeader>
            <CardContent>
              {changelog.length ? (
                <ul className="text-sm">
                  {changelog.map((log: any) => (
                    <li key={log.id} className="mb-2">{log.update} <span className="text-xs text-muted-foreground">({log.created_at})</span></li>
                  ))}
                </ul>
              ) : <p className="text-muted-foreground">No updates yet.</p>}
            </CardContent>
          </Card>
        )}

        {/* Documentation, Downloads, License (if system) */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Access comprehensive documentation for this project</p>
              {project.demo_url && project.demo_url.includes('/docs') ? (
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

          {/* Downloads */}
          <Card>
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

          {/* License (if system) */}
          {project.type === 'system' && (
            <Card>
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
