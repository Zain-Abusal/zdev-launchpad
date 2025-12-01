import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Image as ImageIcon, UploadCloud, Copy, RefreshCw } from "lucide-react";

interface MediaItem {
  name: string;
  url: string;
  lastModified?: string;
  size?: number;
}

const AdminMedia = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("project-images").list("", {
      limit: 100,
      offset: 0,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    const mapped: MediaItem[] =
      data?.map((item) => {
        const { data: publicData } = supabase.storage.from("project-images").getPublicUrl(item.name);
        return {
          name: item.name,
          url: publicData.publicUrl,
          lastModified: item.updated_at,
          size: item.metadata?.size,
        };
      }) || [];
    setFiles(mapped);
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!fileToUpload) {
      toast({ title: "Select a file first", variant: "destructive" });
      return;
    }
    setUploading(true);
    const path = `uploads/${Date.now()}-${fileToUpload.name}`;
    const { error } = await supabase.storage.from("project-images").upload(path, fileToUpload);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Uploaded", description: fileToUpload.name });
      fetchMedia();
      setFileToUpload(null);
    }
    setUploading(false);
  };

  const copyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Copied link" });
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="pill w-fit">Media</p>
            <h1 className="text-3xl font-bold text-foreground">Project Images</h1>
            <p className="text-muted-foreground">Browse and upload files from the public bucket.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-border/60" onClick={fetchMedia} disabled={loading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </motion.div>

        <Card className="surface-card border border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <UploadCloud className="h-4 w-4" />
              Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input type="file" accept="image/*" onChange={(e) => setFileToUpload(e.target.files?.[0] || null)} />
            <Button onClick={handleUpload} disabled={uploading} className="w-full md:w-auto">
              {uploading ? "Uploading..." : "Upload to project-images"}
            </Button>
            <p className="text-xs text-muted-foreground">Bucket: project-images (public). Upload paths are prefixed with /uploads/.</p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <p className="text-muted-foreground">Loading media…</p>}
          {!loading &&
            files.map((file, index) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <Card className="surface-card h-full border border-border/60">
                  {file.url && (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <CardContent className="space-y-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-primary" />
                        <p className="text-sm font-semibold text-foreground line-clamp-2">{file.name}</p>
                      </div>
                      {file.lastModified && (
                        <Badge variant="secondary" className="rounded-full">
                          {new Date(file.lastModified).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground break-all">{file.url}</p>
                    <Button variant="outline" size="sm" className="w-full border-border/60" onClick={() => copyLink(file.url)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy link
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
