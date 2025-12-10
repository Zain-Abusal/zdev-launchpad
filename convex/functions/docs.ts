import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireIdentity } from "../utils/auth";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("docs").collect();
    return docs.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id("docs")),
    title: v.string(),
    category: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    await requireIdentity(ctx);
    const now = Date.now();
    if (args.id) {
      await ctx.db.patch(args.id, {
        title: args.title,
        category: args.category,
        url: args.url,
      });
      return args.id;
    }
    return await ctx.db.insert("docs", {
      title: args.title,
      category: args.category,
      url: args.url,
      createdAt: now,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("docs") },
  handler: async (ctx, { id }) => {
    await requireIdentity(ctx);
    await ctx.db.delete(id);
  },
});
