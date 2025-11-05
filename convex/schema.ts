import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  sources: defineTable({
    name: v.string(),
    description: v.string(),
    url: v.string(),
    category: v.string(),
    logo_url: v.string(),
    tags: v.array(v.object({ label: v.string(), value: v.string() })),
    status: v.union(
      v.literal("rejected"),
      v.literal("approved"),
      v.literal("in-review")
    ),
    email: v.string(),
    // optional
    affiliate_url: v.optional(v.string()),
    og_image_url: v.optional(v.string()),
    github: v.optional(
      v.object({
        url: v.string(),
        stars: v.number(),
      })
    ),
    sponsored: v.optional(v.boolean()),
    note: v.optional(v.string()),
    subscribed: v.optional(v.boolean()),
    embedding: v.array(v.float64()),
    // deprecated
    // github_id: v.optional(v.id('github')),
  })
    .index("by_category", ["category"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["name", "description","category"],
    }),
  // deprecated
  github: defineTable({
    name: v.string(),
    url: v.string(),
    stars: v.number(),
  }),
});
// schema.tables.
export default schema;
