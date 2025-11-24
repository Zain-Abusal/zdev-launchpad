import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (data) setPosts(data);
  };

  return (
    <PublicLayout>
      <section className="min-h-screen px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts on web development, automation, and building great software
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.2, type: 'spring' }}
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="card-minimal h-full overflow-hidden hover:shadow-2xl transition-all group">
                  {post.cover_img && (
                    <div className="aspect-video bg-muted overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <img
                        src={post.cover_img}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </section>
    </PublicLayout>
  );
};

export default Blog;
