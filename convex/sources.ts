import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
/**
 * TODO
 * - send only necessary fields
 * - join github
 */

export const getAllSources = query({
  args: {},
  handler: async (ctx) => {
    // now i want join sources with github
    return await ctx.db
      .query("sources")
      .filter((s) => s.eq(s.field("status"), "approved"))
      .collect();
  },
});

export const getByCategoryIndex = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const { category } = args;
    return await ctx.db
      .query("sources")
      .withIndex("by_category", (q) => q.eq("category", category))
      .collect();
  },
});
export const getAllSourcesByCategory = query({
  args: {
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sources")
      .filter((s) => s.eq(s.field("category"), args.category))
      .collect();
  },
});

export const submitSource = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    category: v.string(),
    logo_url: v.string(),
    tags: v.array(v.object({ label: v.string(), value: v.string() })),
    description: v.string(),
    email: v.string(),
    // optional fields
    affiliate_url: v.optional(v.string()),
    og_image_url: v.optional(v.string()),
    sponsored: v.optional(v.boolean()),
    subscribed: v.optional(v.boolean()),
    note: v.optional(v.string()),
    github: v.optional(v.object({
      url: v.string(),
      stars: v.number(),
    })),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("sources", {
      name: args.name,
      description: args.description,
      url: args.url,
      category: args.category,
      logo_url: args.logo_url,
      tags: args.tags,
      affiliate_url: args.affiliate_url,
      status: "in-review",
      email: args.email,
      og_image_url: args.og_image_url,
      sponsored: args.sponsored,
      subscribed: args.subscribed,
      note: args.note,
      github: args.github,
      // embedding: await embed(args.description),
    });
  },
});

export const submitEmail = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("emails", {
      email: args.email,
      verified: false,
    });
  },
});
