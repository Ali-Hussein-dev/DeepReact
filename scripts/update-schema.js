/* eslint-disable @typescript-eslint/no-unsafe-call */
import { exec } from "child_process";
import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const projectId = NEXT_PUBLIC_SUPABASE_URL?.replace("https://", "")?.split(".")[0];

if (!projectId) {
    console.error("SUPABASE_PROJECT_ID is not set", projectId);
    process.exit(1);
}
/**
 *
 * IMPORTANT: make sure you're logged in to Supabase CLI (npx supabase login) before running this script.
 *
 * Generate TypeScript types for your database schema.
 *
 */
exec(
    `npx -y supabase gen types typescript --project-id ${projectId} > src/supabase/types/db.types.ts`,
    (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error:`, error);
            return;
        }

        if (stdout) {
            console.log(`stdout: ${stdout}`);
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
    },
);
