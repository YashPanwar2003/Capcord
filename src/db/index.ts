import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Only initialize database connection if DATABASE_URL is available
const databaseUrl = process.env.DATABASE_URL;

const sql = databaseUrl ? neon(databaseUrl) : null;
const drizzleClient = sql ? drizzle(sql) : null;

// Export a proxy that throws a helpful error if db is used without DATABASE_URL
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    if (!drizzleClient) {
      throw new Error(
        "DATABASE_URL environment variable is not set. Please configure your database connection."
      );
    }
    return (drizzleClient as Record<string | symbol, unknown>)[prop];
  },
});
