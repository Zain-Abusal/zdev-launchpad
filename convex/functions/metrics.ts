import { query } from "../_generated/server";
import { requireIdentity } from "../utils/auth";

export const counts = query({
  args: {},
  handler: async (ctx) => {
    await requireIdentity(ctx);
    const [clients, projects, blogPosts, requests] = await Promise.all([
      ctx.db.query("clients").collect(),
      ctx.db.query("projects").collect(),
      ctx.db.query("blog_posts").collect(),
      ctx.db.query("project_requests").collect(),
    ]);
    return {
      clients: clients.length,
      projects: projects.length,
      blogPosts: blogPosts.length,
      requests: requests.length,
    };
  },
});
