import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const submitContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("chat_messages", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const submitRequest = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
    description: v.string(),
    attachmentUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("project_requests", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
