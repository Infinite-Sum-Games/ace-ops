import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";
import * as schema from '@/storage/schema/';
import env from "@/env";

export const connection = postgres(env.DB_CONNECTION_STRING, {
  max: (env.DB_MIGRATING || env.DB_SEEDING) ? 1 : 50,
  onnotice: env.DB_SEEDING ? () => {} : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type db = typeof db;
export default db;
