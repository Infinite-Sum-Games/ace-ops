import { pgTable, varchar, serial, uuid, timestamp } from "drizzle-orm/pg-core";
import AdminTable from "./admin";

const AdminLogin = pgTable("adminLogins", {
    id: serial("id").primaryKey().notNull(),
    adminId: uuid("adminId").notNull().references(() => AdminTable.adminId),
    otp: varchar("otp", { length: 10 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
});

export default AdminLogin;
