import { pgTable, pgEnum, serial, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import UserTable from "./user";

const RoleStatus = pgEnum("roleStatus", ["ONGOING", "ELAPSED"]);

const RolesTable = pgTable("roles", {
    id: serial("id").primaryKey().notNull(),
    userId: uuid("userId").notNull().references(() => UserTable.userId),
    title: varchar("title").notNull(),
    description: varchar("description"),
    startedAt: timestamp("startedAt").notNull(),
    endedAt: timestamp("endedAt"),
    roleStatus: RoleStatus("roleStatus").default("ONGOING").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export default RolesTable;
