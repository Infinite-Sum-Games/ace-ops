import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";

// Change this to a pool connection later on
const client = new Client({
    connectionString: "postgres://user:password@host:port/db",
});

await client.connect();
const db = drizzle(client);

// const pool = new Pool({
//     connectionString: "postgres://user:password@host:port/db",
// });
//
// const db = drizzle(pool);
