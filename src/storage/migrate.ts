import { migrate } from "drizzle-orm/postgres-js/migrator";

import config from "$/drizzle.config";
import { db, connection } from "@/storage";
import env from "@/env";

if(!env.DB_MIGRATING){
    throw new Error("Error: Set DB_MIGRATING = \"true\" before running migrations");
}

await migrate(db, { migrationsFolder: config.out! });
await connection.end();
