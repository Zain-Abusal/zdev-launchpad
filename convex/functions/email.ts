import { action } from "../_generated/server";
import { v } from "convex/values";
import { requireIdentity } from "../utils/auth";

export const send = action({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
  },
  handler: async (_ctx, args) => {
    await requireIdentity(_ctx);
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("Missing RESEND_API_KEY");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ZDev <no-reply@zdev.dev>",
        to: [args.to],
        subject: args.subject,
        html: args.html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Resend error: ${res.status} ${body}`);
    }
  },
});
