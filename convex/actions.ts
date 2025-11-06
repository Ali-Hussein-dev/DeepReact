import { action } from "./_generated/server";
import { v } from "convex/values";
import { getRepoStarsCount } from "../src/lib/github";

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