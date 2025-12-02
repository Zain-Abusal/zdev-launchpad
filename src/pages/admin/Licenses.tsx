import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, MoreHorizontal, Key, Trash2, Edit, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { logActivity } from "@/lib/activityLogger";
import { useAuth } from "@/contexts/AuthContext";

const generateLicenseKey = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segments: string[] = [];
  for (let i = 0; i < 4; i++) {
    let segment = "";
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  return segments.join("-");
};

const AdminLicenses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [licenses, setLicenses] = useState<any[]>([]);
  const [clientProjects, setClientProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    license_key: generateLicenseKey(),
    client_project_id: "",
    status: "active",
    max_domains: "3",
    expires_at: "",
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [licensesRes, projectsRes] = await Promise.all([
        supabase
          .from("licenses")
          .select("*, client_projects(id, projects(title))")
          .order("created_at", { ascending: false }),
        supabase.from("client_projects").select("id, projects(title)")
      ]);
      if (licensesRes.error) toast({ title: "Error", description: "Could not load licenses", variant: "destructive" });
      if (projectsRes.error) toast({ title: "Error", description: "Could not load projects", variant: "destructive" });
      setLicenses(licensesRes.data || []);
      setClientProjects(projectsRes.data || []);
      setLoading(false);
      if (user) {
        logActivity({ action: "admin_licenses_view", details: "Viewed licenses dashboard", userId: user.id });
      }
    };
    loadData();
  }, [user, toast]);

  const filteredLicenses = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return (licenses || []).filter((license) => {
      return (
        license.license_key?.toLowerCase().includes(query) ||
        license.client_projects?.projects?.title?.toLowerCase().includes(query)
      );
    });
  }, [licenses, searchQuery]);

  const resetForm = () => {
    setFormData({
      license_key: generateLicenseKey(),
      client_project_id: "",
      status: "active",
      max_domains: "3",
      expires_at: "",
    });
  };

  const refreshLicenses = async () => {
    const { data } = await supabase
      .from("licenses")
      .select("*, client_projects(id, projects(title))")
      .order("created_at", { ascending: false });
    setLicenses(data || []);
  };

  const handleCreate = async () => {
    setSaving(true);
    const { error } = await supabase.from("licenses").insert({
      license_key: formData.license_key,
      client_project_id: formData.client_project_id || null,
      status: formData.status,
      max_domains: parseInt(formData.max_domains) || 3,
      expires_at: formData.expires_at || null,
    });
    if (error) {
      toast({ title: "Failed to create license", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "License created successfully" });
      resetForm();
      setIsCreateDialogOpen(false);
      await refreshLicenses();
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!selectedLicense) return;
    setSaving(true);
    const { error } = await supabase
      .from("licenses")
      .update({
        status: formData.status,
        max_domains: parseInt(formData.max_domains) || 3,
        expires_at: formData.expires_at || null,
      })
      .eq("id", selectedLicense.id);
    if (error) {
      toast({ title: "Failed to update license", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "License updated successfully" });
      setIsDetailSheetOpen(false);
      setSelectedLicense(null);
      resetForm();
      await refreshLicenses();
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!selectedLicense) return;
    setDeleting(true);
    const { error } = await supabase.from("licenses").delete().eq("id", selectedLicense.id);
    if (error) {
      toast({ title: "Failed to delete license", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "License deleted successfully" });
      setIsDeleteDialogOpen(false);
      setSelectedLicense(null);
      await refreshLicenses();
    }
    setDeleting(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: "License key copied to clipboard." });
  };

  const openEditSheet = (license: any) => {
    setSelectedLicense(license);
    setFormData({
      license_key: license.license_key || "",
      client_project_id: license.client_project_id || "",
      status: license.status || "active",
      max_domains: license.max_domains?.toString() || "3",
      expires_at: license.expires_at ? license.expires_at.split("T")[0] : "",
    });
    setIsDetailSheetOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "suspended":
      case "locked":
        return "secondary";
      case "expired":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Licenses</h1>
            <p className="text-muted-foreground">Manage software licenses</p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setIsCreateDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create License
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter licenses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License Key</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLicenses?.map((license) => (
                    <TableRow
                      key={license.id}
                      className="cursor-pointer"
                      onClick={() => openEditSheet(license)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {license.license_key.substring(0, 14)}...
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(license.license_key);
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{license.client_projects?.projects?.title || "—"}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(license.status || "")}>{license.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {license.expires_at ? format(new Date(license.expires_at), "MMM dd, yyyy") : "Never"}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditSheet(license)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyToClipboard(license.license_key)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Key
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setSelectedLicense(license);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {!loading && (!filteredLicenses || filteredLicenses.length === 0) && (
              <div className="text-center py-12 text-muted-foreground">
                <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No licenses found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New License</DialogTitle>
            <DialogDescription>Generate a new license key</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>License Key</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.license_key}
                  onChange={(e) => setFormData({ ...formData, license_key: e.target.value })}
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  onClick={() => setFormData({ ...formData, license_key: generateLicenseKey() })}
                >
                  Generate
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Client Project</Label>
              <Select
                value={formData.client_project_id}
                onValueChange={(v) => setFormData({ ...formData, client_project_id: v })}
                disabled={!clientProjects?.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder={clientProjects?.length ? "Select a project" : "No client projects found"} />
                </SelectTrigger>
                <SelectContent>
                  {clientProjects?.map((cp) => (
                    <SelectItem key={cp.id} value={cp.id}>
                      {cp.projects?.title || cp.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!clientProjects?.length && (
                <p className="text-xs text-muted-foreground">No client projects available. Create a client project first.</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Max Domains</Label>
                <Input
                  type="number"
                  value={formData.max_domains}
                  onChange={(e) => setFormData({ ...formData, max_domains: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Expiration Date</Label>
              <Input
                type="date"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={saving}>
              {saving ? "Creating..." : "Create License"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit License</SheetTitle>
            <SheetDescription>Update license details</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 py-6">
            <div className="space-y-2">
              <Label>License Key</Label>
              <div className="flex gap-2">
                <Input value={formData.license_key} disabled className="font-mono" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(formData.license_key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Max Domains</Label>
              <Input
                type="number"
                value={formData.max_domains}
                onChange={(e) => setFormData({ ...formData, max_domains: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Expiration Date</Label>
              <Input
                type="date"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleUpdate} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsDetailSheetOpen(false);
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this license. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminLicenses;
