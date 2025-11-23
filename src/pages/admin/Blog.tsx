import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, Tag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '', status: 'draft' });
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
    setLoading(true);
    const slug = newPost.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    await supabase
      .from('blog_posts')
      .insert({
        title: newPost.title,
        content: newPost.content,
        tags: newPost.tags.split(',').map(t => t.trim()),
        slug,
        published: newPost.status === 'published',
        created_at: new Date().toISOString()
      });
    setNewPost({ title: '', content: '', tags: '', status: 'draft' });
    fetchPosts();
    setLoading(false);
  };

  const handleDeletePost = async (id: string) => {
    setLoading(true);
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchPosts();
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Blog Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Write New Post</h4>
              <input
                type="text"
                placeholder="Title"
                className="border rounded px-2 py-1 mb-2 w-full"
                value={newPost.title}
                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
              />
              <textarea
                placeholder="Content"
                className="border rounded px-2 py-1 mb-2 w-full"
                value={newPost.content}
                onChange={e => setNewPost({ ...newPost, content: e.target.value })}
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                className="border rounded px-2 py-1 mb-2 w-full"
                value={newPost.tags}
                onChange={e => setNewPost({ ...newPost, tags: e.target.value })}
              />
              <select
                value={newPost.status}
                onChange={e => setNewPost({ ...newPost, status: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
              <Button size="sm" onClick={handleAddPost} disabled={loading || !newPost.title || !newPost.content}>
                <Plus className="mr-2 h-4 w-4" />Save Post
              </Button>
            </div>
            <h4 className="font-semibold mb-2">All Posts</h4>
            {loading ? (
              <div>Loading...</div>
            ) : posts.length ? (
              <ul className="text-sm">
                {posts.map(post => (
                  <li key={post.id} className="mb-4 border-b pb-2">
                    <div className="font-semibold">{post.title}</div>
                    <div>{post.status}</div>
                    <div>Tags: {post.tags.join(', ')}</div>
                    <Button size="sm" variant="outline" className="mr-2"><Edit className="h-4 w-4" />Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.id)}><Trash2 className="h-4 w-4" />Delete</Button>
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted-foreground">No posts found.</p>}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
