import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    email: v.string(),
    role: v.string(), // "admin" | "client"
    name: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  clients: defineTable({
    profileId: v.id("profiles"),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    status: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_profile", ["profileId"]),

  projects: defineTable({
    clientId: v.id("clients"),
    title: v.string(),
    slug: v.string(),
    status: v.string(),
    description: v.string(),
    tech: v.array(v.string()),
    demo_url: v.optional(v.string()),
    docs_url: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    createdAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_client", ["clientId"]),

  blog_posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    published: v.boolean(),
    cover_image: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_slug", ["slug"]),

  docs: defineTable({
    title: v.string(),
    category: v.string(),
    url: v.string(),
    createdAt: v.number(),
  }),

  project_requests: defineTable({
    name: v.string(),
    email: v.string(),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
    description: v.string(),
    attachmentUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  chat_messages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  support_tickets: defineTable({
    clientId: v.id("clients"),
    subject: v.string(),
    status: v.string(),
    priority: v.string(),
    attachmentUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_client", ["clientId"]),

  ticket_messages: defineTable({
    ticketId: v.id("support_tickets"),
    authorId: v.id("profiles"),
    body: v.string(),
    createdAt: v.number(),
  }).index("by_ticket", ["ticketId"]),

  licenses: defineTable({
    projectId: v.id("projects"),
    key: v.string(),
    status: v.string(),
    expiry: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_project", ["projectId"]),

  license_domains: defineTable({
    licenseId: v.id("licenses"),
    domain: v.string(),
    createdAt: v.number(),
  }).index("by_license", ["licenseId"]),

  announcements: defineTable({
    text: v.string(),
    active: v.boolean(),
    createdAt: v.number(),
  }),

  maintenance_settings: defineTable({
    status: v.string(),
    message: v.optional(v.string()),
    updatedAt: v.number(),
  }),

  activity_logs: defineTable({
    profileId: v.id("profiles"),
    action: v.string(),
    meta: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_profile", ["profileId"]),
});
