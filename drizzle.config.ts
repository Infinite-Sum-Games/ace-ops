import { defineConfig } from "drizzle-kit";
import env from '@/env';

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_CONNECTION_STRING,
  },
  verbose: true,
  strict: true,
});
