import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { logActivity } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const BUCKET = 'project-images';

const AdminImageManager = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase.storage.from(BUCKET).list('', { limit: 100 });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      setImages([]);
    } else {
      setImages(data?.map((item: any) => item.name) || []);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const filePath = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from(BUCKET).upload(filePath, file);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Image uploaded!' });
      if (user) logActivity('image_upload', `Image uploaded: ${filePath}`, user.id, user.email);
      fetchImages();
      setFile(null);
    }
    setUploading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Upload Image to Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
            <Button onClick={handleUpload} disabled={uploading || !file}>
              {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Images in Storage ({images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="border rounded p-2 flex flex-col items-center">
                  <img
                    src={supabase.storage.from(BUCKET).getPublicUrl(img).data.publicUrl}
                    alt={img}
                    className="w-full h-32 object-cover mb-2 rounded"
                  />
                  <span className="text-xs break-all">{img}</span>
                  <a
                    href={supabase.storage.from(BUCKET).getPublicUrl(img).data.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline break-all mt-1"
                  >
                    {supabase.storage.from(BUCKET).getPublicUrl(img).data.publicUrl}
                  </a>
                </div>
              ))}
              {images.length === 0 && <p className="text-muted-foreground">No images found.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminImageManager;
