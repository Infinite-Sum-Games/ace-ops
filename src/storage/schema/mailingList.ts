import { pgTable, uuid, varchar, integer, pgEnum, timestamp } from "drizzle-orm/pg-core";

const VisibilityStatus = pgEnum("visibility", ["PUBLIC", "HIDDEN"]);

const MailTable = pgTable("mailLists", {
    listId: uuid("listId").defaultRandom().primaryKey(),
    listName: varchar("listName", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 })
        .default("No description provided").notNull(),
    subscriberCount: integer("subCount").default(0).notNull(),
    visibility: VisibilityStatus("visibility").default("HIDDEN").notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
});

export default MailTable;
