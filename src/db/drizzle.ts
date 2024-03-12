import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

// Fix for "sorry, too many clients already"
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase | undefined;
}

let db: PostgresJsDatabase;

db = drizzle(postgres(process.env.DATABASE_URL as string));
export { db };
