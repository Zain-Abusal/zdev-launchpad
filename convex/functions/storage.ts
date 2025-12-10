import { action } from "../_generated/server";
import { v } from "convex/values";
import { requireIdentity } from "../utils/auth";

export const createUploadUrl = action({
  args: { prefix: v.optional(v.string()) },
  handler: async (ctx, args) => {
    await requireIdentity(ctx);
    const url = await ctx.storage.generateUploadUrl();
    // Trim a trailing slash so we don't double up when prefixing uploads
    const prefix = args.prefix ? `${args.prefix.replace(/\/$/, "")}/` : "";
    return { uploadUrl: url, prefix };
  },
});

export const getFileUrl = action({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    await requireIdentity(ctx);
    return await ctx.storage.getUrl(storageId);
  },
});
