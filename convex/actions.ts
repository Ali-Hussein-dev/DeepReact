import {
  action,
  internalQuery,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { getRepoStarsCount } from "../src/lib/github";
import { embed } from "../src/lib/embed";
import { Doc } from "./_generated/dataModel";

export const getRepoInfoAction = action({
  args: {
    url: v.string(),
  },
  handler: async (_, args) => {
    const { url } = args;
    const stars = await getRepoStarsCount(url);
    return { url, stars };
  },
});

export const fetchSourcesResults = internalQuery({
  args: { ids: v.array(v.id("sources")) },
  handler: async (ctx, args) => {
    const results = [];
    for (const id of args.ids) {
      const doc = await ctx.db.get(id);
      if (doc === null) {
        continue;
      }
      // Exclude embedding and other heavy fields from the response
      const { embedding, ...filteredSource } = doc;
      results.push(filteredSource);
    }
    return results;
  },
});

export const similarSources = action({
  args: {
    descriptionQuery: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Generate an embedding from your favorite third party API:
    const embedding = await embed(args.descriptionQuery);
    // 2. Then search for similar sources using vector similarity!
    const results = await ctx.vectorSearch("sources", "by_embedding", {
      vector: embedding,
      limit: 16,
      // Remove the exact match filter to allow semantic similarity search
      // filter: (q) => q.eq("status", "approved"), // Optional: only search approved sources
    });
    // 3. Fetch the results
    const sources: Array<Doc<"sources">> = await ctx.runQuery(
      internal.actions.fetchSourcesResults,
      { ids: results.map((result) => result._id) },
    );
    return sources;
  },
});