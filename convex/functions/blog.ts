import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireIdentity } from "../utils/auth";

export const list = query({
  args: { search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("blog_posts").collect();
    const filtered = args.search
      ? all.filter((p) => {
          const term = args.search!.toLowerCase();
          return (
            p.title.toLowerCase().includes(term) ||
            p.slug.toLowerCase().includes(term) ||
            p.content.toLowerCase().includes(term) ||
            (p.excerpt ?? "").toLowerCase().includes(term)
          );
        })
      : all;
    return filtered.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const bySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db.query("blog_posts").withIndex("by_slug", (q) => q.eq("slug", slug)).unique();
  },
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id("blog_posts")),
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    cover_image: v.optional(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireIdentity(ctx);
    const timestamp = Date.now();
    if (args.id) {
      await ctx.db.patch(args.id, {
        title: args.title,
        slug: args.slug,
        content: args.content,
        excerpt: args.excerpt,
        cover_image: args.cover_image,
        published: args.published,
        updatedAt: timestamp,
      });
      return args.id;
    }
    return await ctx.db.insert("blog_posts", {
      title: args.title,
      slug: args.slug,
      content: args.content,
      excerpt: args.excerpt,
      cover_image: args.cover_image,
      published: args.published,
      createdAt: timestamp,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("blog_posts") },
  handler: async (ctx, { id }) => {
    await requireIdentity(ctx);
    await ctx.db.delete(id);
  },
});
