import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AdminDemos = () => {
  const { toast } = useToast();
  const [demos, setDemos] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editingDemo, setEditingDemo] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'system',
    short_description: '',
    full_description: '',
    demo_url: '',
    tech_stack: '',
  });

  useEffect(() => {
    fetchDemos();
  }, []);

  const fetchDemos = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('type', 'demo')
      .order('created_at', { ascending: false });
    
    if (data) setDemos(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const demoData = {
      ...formData,
      type: 'demo',
      tech_stack: formData.tech_stack.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      if (editingDemo) {
        const { error } = await supabase
          .from('projects')
          .update(demoData)
          .eq('id', editingDemo.id);
        
        if (error) throw error;
        toast({ title: 'Demo updated successfully' });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([demoData]);
        
        if (error) throw error;
        toast({ title: 'Demo created successfully' });
      }

      setOpen(false);
      resetForm();
      fetchDemos();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleEdit = (demo: any) => {
    setEditingDemo(demo);
    setFormData({
      title: demo.title,
      type: demo.type,
      short_description: demo.short_description,
      full_description: demo.full_description || '',
      demo_url: demo.demo_url || '',
      tech_stack: demo.tech_stack?.join(', ') || '',
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this demo?')) return;

    const { error } = await supabase.from('projects').delete().eq('id', id);
    
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Demo deleted successfully' });
      fetchDemos();
    }
  };

  const resetForm = () => {
    setEditingDemo(null);
    setFormData({
      title: '',
      type: 'system',
      short_description: '',
      full_description: '',
      demo_url: '',
      tech_stack: '',
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
            <h1 className="text-3xl font-bold mb-2">Demos Management</h1>
            <p className="text-muted-foreground">Manage demo projects and showcases</p>
          </div>
          <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Demo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDemo ? 'Edit Demo' : 'Add New Demo'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="short_description">Short Description *</Label>
                  <Textarea
                    id="short_description"
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    required
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="full_description">Full Description</Label>
                  <Textarea
                    id="full_description"
                    value={formData.full_description}
                    onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input
                    id="demo_url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <Label htmlFor="tech_stack">Tech Stack (comma-separated)</Label>
                  <Input
                    id="tech_stack"
                    value={formData.tech_stack}
                    onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                    placeholder="React, Node.js, PostgreSQL"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingDemo ? 'Update' : 'Create'} Demo
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
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="hover-lift">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold line-clamp-1">{demo.title}</h3>
                    <Badge variant="secondary">Demo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {demo.short_description}
                  </p>
                  {demo.demo_url && (
                    <a href={demo.demo_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline truncate block">
                      {demo.demo_url}
                    </a>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(demo)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(demo.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {demos.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No demos yet. Create your first one!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDemos;
