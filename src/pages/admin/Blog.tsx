import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '', excerpt: '', status: 'draft', images: [], newImage: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.content) {
      toast({ title: 'Error', description: 'Title and content are required', variant: 'destructive' });
      return;
    }
    
    setLoading(true);
    const slug = newPost.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const { error } = await supabase
      .from('blog_posts')
      .insert({
        title: newPost.title,
        content: newPost.content,
        excerpt: newPost.excerpt || newPost.content.substring(0, 150),
        tags: newPost.tags.split(',').map(t => t.trim()).filter(t => t),
        slug,
        published: newPost.status === 'published',
        images: newPost.images.filter((img: string) => img.trim() !== ''),
      });
    
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Blog post created!' });
      setNewPost({ title: '', content: '', tags: '', excerpt: '', status: 'draft', images: [], newImage: '' });
      fetchPosts();
    }
    setLoading(false);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    setLoading(true);
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Post deleted!' });
      fetchPosts();
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blog Manager</h1>
            <p className="text-muted-foreground">Create and manage blog posts</p>
          </div>
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Write New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Post Title"
              value={newPost.title}
              onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              placeholder="Excerpt (optional, will auto-generate from content)"
              value={newPost.excerpt}
              onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })}
              rows={2}
            />
            <Textarea
              placeholder="Post Content (HTML supported)"
              value={newPost.content}
              onChange={e => setNewPost({ ...newPost, content: e.target.value })}
              rows={10}
            />
            <Input
              placeholder="Tags (comma separated)"
              value={newPost.tags}
              onChange={e => setNewPost({ ...newPost, tags: e.target.value })}
            />
            <div>
              <label className="block mb-1 text-sm font-medium">Images (URLs)</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newPost.newImage}
                  onChange={e => setNewPost({ ...newPost, newImage: e.target.value })}
                  placeholder="https://..."
                />
                <Button type="button" onClick={() => {
                  if (newPost.newImage.trim()) {
                    setNewPost({
                      ...newPost,
                      images: [...newPost.images, newPost.newImage.trim()],
                      newImage: '',
                    });
                  }
                }}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newPost.images.map((img: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                    <span className="text-xs">{img}</span>
                    <Button type="button" size="icon" variant="destructive" onClick={() => {
                      setNewPost({
                        ...newPost,
                        images: newPost.images.filter((_, i) => i !== idx),
                      });
                    }}>×</Button>
                  </div>
                ))}
              </div>
            </div>
            <select
              value={newPost.status}
              onChange={e => setNewPost({ ...newPost, status: e.target.value })}
              className="w-full px-3 py-2 rounded border bg-background"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <Button onClick={handleAddPost} disabled={loading}>
              <Plus className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Create Post'}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>All Posts ({posts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : posts.length ? (
              <div className="space-y-4">
                {posts.map(post => (
                  <div key={post.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{post.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {post.tags?.map((tag: string) => (
                            <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(post.created_at).toLocaleDateString()} • {post.published ? 'Published' : 'Draft'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No posts yet. Create your first one!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
