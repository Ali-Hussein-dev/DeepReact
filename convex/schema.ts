import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export type Source ={
  _id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  logo_url: string;
  tags: { label: string; value: string }[];
  status: "rejected" | "approved" | "in-review";
  email: string;
  // optional
  affiliate_url?: string;
  og_image_url?: string;
  github?: {
    url: string;
    stars: number;
  };
  sponsored?: boolean;
  note?: string;
  subscribed?: boolean;
}

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
    // embedding: v.array(v.float64()),
    // deprecated
  })
    .index("by_category", ["category"]),
    // .vectorIndex("by_embedding", {
    //   vectorField: "embedding",
    //   dimensions: 1536,
    //   filterFields: ["name", "description","category"],
    // }),
    emails: defineTable({
    email: v.string(),
    verified: v.boolean(),
   })
});

export default schema;
