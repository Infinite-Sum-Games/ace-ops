import { pgTable, pgEnum, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

const Occupation = pgEnum("occupation", ["STUDENT", "PROFESSIONAL"])

const RegistrationTable = pgTable("users", {
    tempId: uuid("userId").primaryKey().defaultRandom(),
    userName: varchar("userName", { length: 100 }).unique(),
    firstName: varchar("firstName", { length: 100 }).notNull(),
    middleName: varchar("middleName", { length: 100 }),
    lastName: varchar("lastName", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    phoneNumber: varchar("phoneNumber", { length: 10 }).notNull(),
    designation: Occupation("occupation").default("STUDENT").notNull(),
    organization: varchar("organization", { length: 255 }).notNull(),
    otp: varchar("otp", { length: 10 }).notNull(),
    createdAt: timestamp("createdAt").notNull(),
});

export default RegistrationTable;
