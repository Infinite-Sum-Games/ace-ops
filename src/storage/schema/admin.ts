import { pgEnum, uuid, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";

const AccountStatus = pgEnum("accountStatus", ["ACTIVE", "INACTIVE", "DELETED"]);

const AdminTable = pgTable("admins", {
    adminId: uuid("adminId").primaryKey().defaultRandom(),
    firstName: varchar("firstName", { length: 100 }).notNull(),
    middleName: varchar("middleName", { length: 100 }),
    lastName: varchar("lastName", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    accountStatus: AccountStatus("accountStatus").default("ACTIVE").notNull(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export default AdminTable;
