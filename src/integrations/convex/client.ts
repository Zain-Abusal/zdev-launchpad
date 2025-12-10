import { ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  // We keep this guard because Convex needs a deployment URL to connect.
  // The app will still render, but queries will fail fast with a clear message.
  // eslint-disable-next-line no-console
  console.warn("Missing VITE_CONVEX_URL; Convex client will not connect.");
}

export const convex = new ConvexReactClient(convexUrl || "");
