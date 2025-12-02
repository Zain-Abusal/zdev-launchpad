import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import * as Sentry from "@sentry/react";

Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })
const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
  };

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-background px-4 py-16 md:px-8 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.03),transparent_40%)]" />
        <div className="container relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="pill mx-auto w-fit">Notes from the build</p>
            <h1 className="mt-4 text-4xl font-bold text-foreground md:text-5xl">Blog</h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Short, practical notes from builds and launches.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <Card className="surface-card h-full border border-border/60 overflow-hidden">
                    {post.cover_img && (
                      <div className="aspect-video overflow-hidden rounded-2xl bg-muted">
                        <img
                          src={post.cover_img}
                          alt={post.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <CardHeader className="px-0 pb-2">
                      <CardTitle className="text-lg font-semibold text-foreground mb-1 line-clamp-2">{post.title}</CardTitle>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 px-0">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt || post.content?.slice(0, 120)}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="surface-card text-center rounded-3xl border border-border/60 py-10">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Blog;
