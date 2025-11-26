import { useParams } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = {
  launch: { title: "Launching the platform", content: "We built a full-stack API platform with dashboards and Mintlify docs." },
  roadmap: { title: "Roadmap", content: "Upcoming: rate limit policies, webhooks, and deeper analytics." },
  security: { title: "Security", content: "API keys are hashed, scoped, and fully audited." },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? posts[slug as keyof typeof posts] : null;

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-16">
        {post ? (
          <Card>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">{post.content}</CardContent>
          </Card>
        ) : (
          <p className="text-muted-foreground">Post not found.</p>
        )}
      </section>
    </PublicLayout>
  );
};

export default BlogPost;
