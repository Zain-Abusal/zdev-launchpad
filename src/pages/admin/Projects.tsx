import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AdminProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [viewProject, setViewProject] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'website',
    description: '',
    image_url: '',
    demo_url: '',
    documentation_url: '',
    featured: false,
    short_description: '',
    tech_stack: [],
    full_description: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    id: undefined,
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingProject.id);
        if (error) throw error;
        toast({ title: 'Project updated successfully' });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([formData]);
        if (error) throw error;
        toast({ title: 'Project created successfully' });
      }
      setOpen(false);
      resetForm();
      fetchProjects();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      type: project.type,
      description: project.description || '',
      image_url: project.image_url || '',
      demo_url: project.demo_url || '',
      documentation_url: project.documentation_url || '',
      featured: project.featured,
      short_description: project.short_description || '',
      tech_stack: project.tech_stack || [],
      full_description: project.full_description || '',
      created_at: project.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      id: project.id,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Project deleted successfully' });
      fetchProjects();
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      type: 'website',
      description: '',
      image_url: '',
      demo_url: '',
      documentation_url: '',
      featured: false,
      short_description: '',
      tech_stack: [],
      full_description: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      id: undefined,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Projects Management</h1>
            <p className="text-muted-foreground">Add, edit, delete, and view project details</p>
          </div>
          <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 rounded border"
                >
                  <option value="website">Website</option>
                  <option value="system">System</option>
                  <option value="python">Python</option>
                  <option value="demo">Demo</option>
                </select>
                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
                <Input
                  placeholder="Image URL"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
                <Input
                  placeholder="Demo URL"
                  value={formData.demo_url}
                  onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                />
                <Input
                  placeholder="Documentation URL"
                  value={formData.documentation_url}
                  onChange={(e) => setFormData({ ...formData, documentation_url: e.target.value })}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="featured">Featured Project</label>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingProject ? 'Update' : 'Create'} Project
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="hover-lift overflow-hidden">
                {project.image_url && (
                  <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
                )}
                <CardHeader>
                  <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">{project.type}</Badge>
                    {project.featured && <Badge>Featured</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{project.description}</p>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => setViewProject(project)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No projects yet. Create your first one!</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={!!viewProject} onOpenChange={() => setViewProject(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Project Details</DialogTitle>
            </DialogHeader>
            {viewProject && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{viewProject.title}</h2>
                <p className="text-muted-foreground">{viewProject.description}</p>
                {viewProject.image_url && (
                  <img src={viewProject.image_url} alt={viewProject.title} className="w-full h-64 object-cover rounded" />
                )}
                {viewProject.demo_url && (
                  <a href={viewProject.demo_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">View Demo</a>
                )}
                {viewProject.documentation_url && (
                  <a href={viewProject.documentation_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">View Documentation</a>
                )}
                <div className="flex gap-2">
                  <Badge variant="secondary">{viewProject.type}</Badge>
                  {viewProject.featured && <Badge>Featured</Badge>}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
