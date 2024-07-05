import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";
import UserTable from "./user";

const AlumniTable = pgTable("alumni", {
    alumniId: uuid("alumniId").notNull().references(() => UserTable.userId),
    userName: varchar("userName", { length: 100 }).unique(),
    firstName: varchar("firstName", { length: 100 }).notNull(),
    middleName: varchar("middleName", { length: 100 }),
    lastName: varchar("lastName", { length: 100 }).notNull(),
    remarks: varchar("remarks", { length: 500 }).notNull(),
    graduationYear: integer("graduationYear").default(2026).notNull(),
});

export default AlumniTable;
