import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FolderKanban, Activity, Bell, Link as LinkIcon, Key, Globe, Download, FileText, MessageSquare, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [license, setLicense] = useState<any>(null);
  const [domains, setDomains] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);
  const [billing, setBilling] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchProjects();
      fetchLicense();
      fetchDomains();
      fetchDownloads();
      fetchSupportTickets();
      fetchBilling();
    }
  }, [user]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('client_id', user.id)
      .limit(5);
    if (data) setProjects(data);
  };

  const fetchLicense = async () => {
    const { data } = await supabase
      .from('licenses')
      .select('*')
      .eq('client_id', user.id)
      .single();
    if (data) setLicense(data);
  };

  const fetchDomains = async () => {
    if (!license) return;
    const { data } = await supabase
      .from('domains')
      .select('*')
      .eq('license_id', license.id);
    if (data) setDomains(data);
  };

  const fetchDownloads = async () => {
    const { data } = await supabase
      .from('downloads')
      .select('*')
      .eq('project_id', projects.length ? projects[0].id : null);
    if (data) setDownloads(data);
  };

  const fetchSupportTickets = async () => {
    const { data } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('client_id', user.id);
    if (data) setSupportTickets(data);
  };

  const fetchBilling = async () => {
    const { data } = await supabase
      .from('billing')
      .select('*')
      .eq('client_id', user.id);
    if (data) setBilling(data);
  };

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban },
    { label: 'Active Systems', value: projects.filter(p => p.type === 'system').length, icon: Activity },
    { label: 'Latest Update', value: 'Today', icon: Bell },
  ];

  const notifications = [
    { title: 'Documentation Updated', description: 'New guides available for your project', time: '2h ago' },
    { title: 'New Version Available', description: 'Update available for your dashboard', time: '1d ago' },
  ];

  return (
    <ClientLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your projects and activity
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* License Key & Domains */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle><Key className="inline mr-2" />License Key</CardTitle>
            </CardHeader>
            <CardContent>
              {license ? (
                <div>
                  <code className="text-sm bg-muted px-3 py-2 rounded block mb-2">{license.key}</code>
                  <p className="text-xs text-muted-foreground mb-2">Tier: {license.tier}</p>
                  <p className="text-xs text-muted-foreground mb-2">Status: {license.status}</p>
                  <p className="text-xs text-muted-foreground mb-2">Usage: {license.usage_count}</p>
                </div>
              ) : <p className="text-muted-foreground">No license found.</p>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle><Globe className="inline mr-2" />Domain Activation</CardTitle>
            </CardHeader>
            <CardContent>
              {domains.length ? (
                <ul className="text-sm">
                  {domains.map((domain: any) => (
                    <li key={domain.id} className="mb-1">{domain.domain} - {domain.activated ? 'Active' : 'Inactive'}</li>
                  ))}
                </ul>
              ) : <p className="text-muted-foreground">No domains found.</p>}
            </CardContent>
          </Card>
        </div>

        {/* Files & Downloads */}
        <Card>
          <CardHeader>
            <CardTitle><Download className="inline mr-2" />Files & Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            {downloads.length ? (
              <ul className="text-sm">
                {downloads.map((file: any) => (
                  <li key={file.id} className="mb-2">
                    <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      {file.description || file.file_url}
                    </a>
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted-foreground">No downloads available.</p>}
          </CardContent>
        </Card>

        {/* Documentation Link */}
        <Card>
          <CardHeader>
            <CardTitle><FileText className="inline mr-2" />Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <a href="/docs-embed" className="text-primary underline">View Documentation</a>
          </CardContent>
        </Card>

        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle><MessageSquare className="inline mr-2" />Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            {supportTickets.length ? (
              <ul className="text-sm">
                {supportTickets.map((ticket: any) => (
                  <li key={ticket.id} className="mb-2">
                    <span className="font-semibold">{ticket.subject}</span> - {ticket.status}
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted-foreground">No support tickets found.</p>}
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle><CreditCard className="inline mr-2" />Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            {billing.length ? (
              <ul className="text-sm">
                {billing.map((bill: any) => (
                  <li key={bill.id} className="mb-2">
                    {bill.description} - ${bill.amount}
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted-foreground">No billing history found.</p>}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Projects</CardTitle>
                <Link to="/client/projects">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div>
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.type}</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                ))}
                {projects.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No projects yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg border border-border">
                    <Bell className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Project documentation accessed', 'License verified', 'Support ticket created'].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{activity}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {index === 0 ? 'Just now' : `${index}h ago`}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;
