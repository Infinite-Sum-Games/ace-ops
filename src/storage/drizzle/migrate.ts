import "dotenv/config";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

const migrateClient = postgres(process.env.DATABASE_URL as string, { max: 1});

const runMigration = async() => {
    await migrate(drizzle(migrateClient), {
        migrationsFolder: "./migrations/",
    });
    await migrateClient.end();
}

runMigration();
