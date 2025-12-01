import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading...</div>
      </PublicLayout>
    );
  }

  if (!post) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Blog post not found.</div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-background px-4 py-16 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.03),transparent_40%)]" />
        <div className="container relative z-10 mx-auto max-w-4xl">
          <Card className="surface-card border border-border/60">
            <CardHeader className="space-y-3">
              <CardTitle className="text-3xl font-bold text-foreground">{post.title}</CardTitle>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed text-foreground">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
};

export default BlogPost;
