import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { uuid, varchar, timestamp, serial } from "drizzle-orm/pg-core";

const Occupation = pgEnum("occupation", ["STUDENT", "PROFESSIONAL"])
const AccountStatus = pgEnum("accountStatus", ["ACTIVE", "DELETED", "BANNED"]);
const RoleStatus = pgEnum("roleStatus", ["ONGOING", "ELAPSED"]);

export const UserTable = pgTable("users", {
    userId: uuid("userId").primaryKey().defaultRandom(),
    userName: varchar("userName", { length: 100 }).unique(),
    firstName: varchar("firstName", { length: 100 }).notNull(),
    middleName: varchar("middleName", { length: 100 }),
    lastName: varchar("lastName", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    phoneNumber: varchar("phoneNumber", { length: 10 }).notNull(),
    designation: Occupation("occupation").notNull(),
    accountStatus: AccountStatus("accountStatus").default("ACTIVE").notNull(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    deletedAt: timestamp("deletedAt")
});

export const Roles = pgTable("roles", {
    id: serial("id").primaryKey(),
    // userId -> foreignKey
    title: varchar("title").notNull(),
    description: varchar("description"),
    startedAt: timestamp("startedAt").notNull(),
    endedAt: timestamp("endedAt").notNull(),
    roleStatus: RoleStatus("roleStatus").default("ONGOING").notNull(),
});
