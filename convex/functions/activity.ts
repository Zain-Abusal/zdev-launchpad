import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireIdentity } from "../utils/auth";

export const log = mutation({
  args: {
    profileId: v.id("profiles"),
    action: v.string(),
    meta: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    await requireIdentity(ctx);
    await ctx.db.insert("activity_logs", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
