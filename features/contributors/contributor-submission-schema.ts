import { z } from "zod";

export const contributorSubmissionSchema = z.object({
  name: z.string().min(2),
  personal_website_url: z.string().url().optional(),
  why: z.string().min(10, { message: "Please provide a longer answer at least 10 characters" }),
  role: z.string().optional(),
  twitter_username: z.string().optional(),
});