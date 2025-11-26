import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const topics = [
  { title: "API key system", body: "Issue scoped keys, hash secrets at rest, and audit every use." },
  { title: "Per-org multi-tenancy", body: "Organizations, members, and RBAC roles keep access clean." },
  { title: "Logs & metrics", body: "Request logs with filters plus metric rollups for dashboards." },
  { title: "Team management", body: "Invite members, assign roles, and manage org settings." },
  { title: "Docs via Mintlify", body: "Docs live in Mintlify with deep links from the app shell." },
];

const Features = () => (
  <PublicLayout>
    <section className="container mx-auto px-4 py-16 space-y-8">
      <div className="max-w-2xl space-y-3">
        <h1 className="text-4xl font-bold">Enterprise-ready from day one</h1>
        <p className="text-lg text-muted-foreground">
          Build with a production-grade foundation: auth, RBAC, observability, billing, and a public API that mirrors your internal models.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {topics.map((topic) => (
          <Card key={topic.title}>
            <CardHeader>
              <CardTitle>{topic.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{topic.body}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  </PublicLayout>
);

export default Features;
