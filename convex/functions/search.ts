import { query } from "../_generated/server";
import { v } from "convex/values";

export const everything = query({
  args: { term: v.string() },
  handler: async (ctx, { term }) => {
    const value = term.toLowerCase();
    const [blog, portfolio, projects] = await Promise.all([
      ctx.db.query("blog_posts").collect(),
      ctx.db.query("projects").collect(),
      ctx.db.query("projects").collect(), // projects used twice: public portfolio + client projects share data
    ]);

    const match = (text?: string) => (text ?? "").toLowerCase().includes(value);

    return {
      blog: blog.filter((b) => match(b.title) || match(b.excerpt) || match(b.content)),
      portfolio: portfolio.filter((p) => match(p.title) || match(p.description) || p.tech.some(match)),
      projects: projects.filter((p) => match(p.title) || match(p.description) || p.tech.some(match)),
    };
  },
});
