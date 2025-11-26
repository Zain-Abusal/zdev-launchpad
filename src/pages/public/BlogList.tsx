import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const posts = [
  { slug: "launch", title: "Launching the platform", excerpt: "API keys, analytics, and dashboards ready to go.", date: "2024-05-01", tags: ["launch"] },
  { slug: "roadmap", title: "Roadmap", excerpt: "What's coming next for the API and dashboards.", date: "2024-05-10", tags: ["roadmap"] },
  { slug: "security", title: "Security", excerpt: "How we hash keys, enforce scopes, and audit access.", date: "2024-05-20", tags: ["security"] },
];

const BlogList = () => (
  <PublicLayout>
    <section className="container mx-auto px-4 py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground">Stories and updates from the team.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{post.date}</p>
            </CardHeader>
            <CardContent className="text-muted-foreground flex-1">
              <p>{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-primary">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
              <Link to={`/blog/${post.slug}`} className="mt-4 inline-block font-medium text-primary">
                Read more →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </PublicLayout>
);

export default BlogList;
