import { Table, getTableName, sql } from "drizzle-orm";
import env from '@/env';
import { db, connection } from '@/storage';
import * as schema from "@/storage/schema";
import * as seeds from './seeds';

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

for (const table of [
    schema.AdminTable,
    schema.AdminLoginTable,
    schema.AlumniTable,
    schema.BlogTable,
    schema.CampaignTable,
    schema.EventTable,
    schema.MailTable,
    schema.RegistrationTable,
    schema.RoleTable,
    schema.SubscriberTable,
    schema.UserTable
]) {
    // db.delete // clears the table without resetting data 
    // eg: If 5 records are deleted - id begins for 6, not 1 after delete
    await resetTable(db, table);
}

await seeds.AdminTable(db);
await seeds.AdminLoginTable(db);
await seeds.AlumniTable(db);
await seeds.BlogTable(db);
await seeds.CampaignTable(db);
await seeds.EventTable(db);
await seeds.MailTable(db);
await seeds.RegistrationTable(db);
await seeds.RoleTable(db);
await seeds.SubscriberTable(db);
await seeds.UserTable(db);

await connection.end();
