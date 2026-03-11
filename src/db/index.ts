import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Lazy initialization to avoid errors when DATABASE_URL is not set
let drizzleClient: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!drizzleClient) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL environment variable is not set. Please configure your database connection."
      );
    }
    const sql = neon(databaseUrl);
    drizzleClient = drizzle(sql);
  }
  return drizzleClient;
}

export { getDb as db };
