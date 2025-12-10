import { QueryCtx, MutationCtx, ActionCtx } from "../_generated/server";

export const requireIdentity = async (ctx: QueryCtx | MutationCtx | ActionCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("unauthorized");
  }
  return identity;
};
