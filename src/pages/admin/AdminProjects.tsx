import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "website",
    featured: false,
    short_description: "",
    full_description: "",
    demo_url: "",
    image_url: "",
    tech_stack: [] as string[],
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, type, featured, short_description, full_description, demo_url, image_url, tech_stack, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: "Could not load projects.", variant: "destructive" });
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "website",
      featured: false,
      short_description: "",
      full_description: "",
      demo_url: "",
      image_url: "",
      tech_stack: [],
    });
    setEditing(null);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      title: formData.title,
      type: formData.type,
      featured: formData.featured,
      short_description: formData.short_description,
      full_description: formData.full_description || null,
      demo_url: formData.demo_url || null,
      image_url: formData.image_url || null,
      tech_stack: formData.tech_stack.length ? formData.tech_stack : null,
    };
    const { error } = editing
      ? await supabase.from("projects").update(payload).eq("id", editing.id)
      : await supabase.from("projects").insert(payload);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editing ? "Project updated" : "Project created" });
      setOpen(false);
      resetForm();
      fetchProjects();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Project deleted" });
      fetchProjects();
    }
    setDeletingId(null);
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
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground">Manage all projects and their details</p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </motion.div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{project.type}</Badge>
                  </TableCell>
                  <TableCell>{project.featured && <Badge>Featured</Badge>}</TableCell>
                  <TableCell>{project.created_at ? new Date(project.created_at).toLocaleDateString() : ""}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditing(project);
                        setFormData({
                          title: project.title || "",
                          type: project.type || "website",
                          featured: !!project.featured,
                          short_description: project.short_description || "",
                          full_description: project.full_description || "",
                          demo_url: project.demo_url || "",
                          image_url: project.image_url || "",
                          tech_stack: project.tech_stack || [],
                        });
                        setOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {projects.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No projects yet
            </div>
          )}
          {loading && (
            <div className="py-6 text-center text-muted-foreground text-sm">Loading projects...</div>
          )}
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Project" : "Create Project"}</DialogTitle>
              <DialogDescription>Define the project basics and visibility.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Input
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="website / system / python"
                />
              </div>
              <div className="space-y-2">
                <Label>Short description</Label>
                <Textarea
                  rows={3}
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Optional summary"
                />
              </div>
              <div className="space-y-2">
                <Label>Full description</Label>
                <Textarea
                  rows={5}
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  placeholder="Longer overview, features, and notes"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Demo URL</Label>
                  <Input
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    placeholder="https://demo..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://image..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tech stack (comma separated)</Label>
                <Input
                  value={formData.tech_stack.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tech_stack: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="React, Supabase, Tailwind"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(v) => setFormData({ ...formData, featured: v })}
                />
                <Label>Featured</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving || !formData.title}>
                {saving ? "Saving..." : editing ? "Save changes" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
