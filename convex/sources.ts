import { mutation, query, action, internalAction, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { embed } from "../src/lib/embed";
import { Id } from "./_generated/dataModel";
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

// Helper query for testing - gets all sources regardless of status
export const getAllSourcesForTesting = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sources").collect();
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

export const submitSource = action({
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

  handler: async (ctx, args): Promise<Id<"sources">> => {
    // Generate embedding using fetch (allowed in actions)
    const tagLabels = args.tags.map(tag => tag.label).join(", ");
    const embeddingText = `name: ${args.name}, description: ${args.description}, category: ${args.category}, ${!!tagLabels ? `tags: ${tagLabels}` : ""}`;
    const embedding = await embed(embeddingText);
    
    // Insert the source using internal mutation
    return await ctx.runMutation(internal.sources.insertSource, {
      ...args,
      embedding,
    });
  },
});

// Internal mutation to insert source data
export const insertSource = internalMutation({
  args: {
    name: v.string(),
    url: v.string(),
    category: v.string(),
    logo_url: v.string(),
    tags: v.array(v.object({ label: v.string(), value: v.string() })),
    description: v.string(),
    email: v.string(),
    embedding: v.array(v.float64()),
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
      // status: isDevEnv ? "approved" : "in-review",
      status: "approved",
      email: args.email,
      og_image_url: args.og_image_url,
      sponsored: args.sponsored,
      subscribed: args.subscribed,
      note: args.note,
      github: args.github,
      embedding: args.embedding,
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

// 1. Public mutation to update source name and description
export const updateSource = mutation({
  args: {
    sourceId: v.id("sources"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    url: v.optional(v.string()),
    tags: v.optional(v.array(v.object({ label: v.string(), value: v.string() }))),
    logo_url: v.optional(v.string()),
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
    const { sourceId, name, description, category, tags, ...otherFields } = args;
    
    // Get current source to check if name or description changed
    const currentSource = await ctx.db.get(sourceId);
    if (!currentSource) {
      throw new Error("Source not found");
    }

    // Update the source with new fields
    await ctx.db.patch(sourceId, {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(category !== undefined && { category }),
      ...(tags !== undefined && { tags }),
      ...Object.fromEntries(
        Object.entries(otherFields).filter(([_, value]) => value !== undefined)
      ),
    });

    // Check if embedding needs to be generated
    const nameChanged = name !== undefined && name !== currentSource.name;
    const descriptionChanged = description !== undefined && description !== currentSource.description;
    const categoryChanged = category !== undefined && category !== currentSource.category;
    const tagsChanged = tags !== undefined && tags !== currentSource.tags;
    const hasNoEmbedding = !currentSource.embedding || currentSource.embedding.length === 0;
    
    // Generate embedding if fields changed OR if source has no embedding
    if (nameChanged || descriptionChanged || categoryChanged || tagsChanged || hasNoEmbedding) {
      console.log('Embedding update triggered for source:', sourceId, {
        nameChanged,
        descriptionChanged,
        categoryChanged,
        tagsChanged,
        hasNoEmbedding
      });
      
      const finalName = name ?? currentSource.name;
      const finalDescription = description ?? currentSource.description;
      const finalCategory = category ?? currentSource.category;
      const finalTags = tags ?? currentSource.tags;
      
      await ctx.scheduler.runAfter(0, internal.sources.generateEmbedding, {
        sourceId,
        name: finalName,
        description: finalDescription,
        category: finalCategory,
        tags: finalTags
      });
    } else {
      console.log('No embedding update needed for source:', sourceId);
    }

    return sourceId;
  },
});

// 2. Internal action to generate embedding
export const generateEmbedding = internalAction({
  args: {
    sourceId: v.id("sources"),
    name: v.string(),
    description: v.string(),
    category: v.string(),
    tags: v.array(v.object({ label: v.string(), value: v.string() })),
  },
  handler: async (ctx, args) => {
    console.log('Generating embedding for source:', args.sourceId);
    
    // Generate embedding from name + description
    const tagLabels = args.tags.map(tag => tag.label).join(", ");
    const embeddingText = `name: ${args.name}, description: ${args.description}, category: ${args.category}, tags: ${tagLabels}`;
    
    try {
      const embedding = await embed(embeddingText);
      console.log('Embedding generated successfully, length:', embedding.length);
      
      // Update the source with the new embedding
      await ctx.runMutation(internal.sources.updateSourceEmbedding, {
        sourceId: args.sourceId,
        embedding,
      });
      
      console.log('Embedding updated in database for source:', args.sourceId);
    } catch (error) {
      console.error('Failed to generate or update embedding:', error);
      throw error;
    }
  },
});

// 3. Internal mutation to update source with embedding
export const updateSourceEmbedding = internalMutation({
  args: {
    sourceId: v.id("sources"),
    embedding: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sourceId, {
      embedding: args.embedding,
    });
  },
});

// Helper mutation to generate embeddings for all sources without them
export const generateMissingEmbeddings = mutation({
  args: {},
  handler: async (ctx) => {
    const sourcesWithoutEmbeddings = await ctx.db
      .query("sources")
      .filter((q) => q.or(
        q.eq(q.field("embedding"), undefined),
        q.eq(q.field("embedding"), [])
      ))
      .collect();
    
    console.log(`Found ${sourcesWithoutEmbeddings.length} sources without embeddings`);
    
    for (const source of sourcesWithoutEmbeddings) {
      await ctx.scheduler.runAfter(0, internal.sources.generateEmbedding, {
        sourceId: source._id,
        name: source.name,
        description: source.description,
        category: source.category,
        tags: source.tags
      });
    }
    
    return { processedCount: sourcesWithoutEmbeddings.length };
  },
});
