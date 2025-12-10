import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireIdentity } from "../utils/auth";

export const list = query({
  args: { featured: v.optional(v.boolean()), clientId: v.optional(v.id("clients")) },
  handler: async (ctx, args) => {
    let q = ctx.db.query("projects");
    if (args.clientId) {
      q = q.withIndex("by_client", (idx) => idx.eq("clientId", args.clientId!));
    }
    const projects = await q.collect();
    const filtered = args.featured ? projects.filter((p) => p.featured) : projects;
    return filtered.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const bySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db.query("projects").withIndex("by_slug", (q) => q.eq("slug", slug)).unique();
  },
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id("projects")),
    clientId: v.id("clients"),
    title: v.string(),
    slug: v.string(),
    status: v.string(),
    description: v.string(),
    tech: v.array(v.string()),
    demo_url: v.optional(v.string()),
    docs_url: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireIdentity(ctx);
    const timestamp = Date.now();
    if (args.id) {
      await ctx.db.patch(args.id, {
        clientId: args.clientId,
        title: args.title,
        slug: args.slug,
        status: args.status,
        description: args.description,
        tech: args.tech,
        demo_url: args.demo_url,
        docs_url: args.docs_url,
        featured: args.featured,
      });
      return args.id;
    }
    return await ctx.db.insert("projects", {
      clientId: args.clientId,
      title: args.title,
      slug: args.slug,
      status: args.status,
      description: args.description,
      tech: args.tech,
      demo_url: args.demo_url,
      docs_url: args.docs_url,
      featured: args.featured,
      createdAt: timestamp,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    await requireIdentity(ctx);
    await ctx.db.delete(id);
  },
});
