import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import MailTable from "./mailingList";

const SubStatus = pgEnum("subscriberStatus", ["SUBSCRIBED", "UNSUBSCRIBE"]);

const SubscriberTable = pgTable("subscribers", {
    subscriberId: uuid("subId").defaultRandom().notNull(),
    mailId: uuid("mailId").notNull().references(() => MailTable.listId),
    email: varchar("email", { length: 255 }).notNull(),
    status: SubStatus("subscriberStatus").default("SUBSCRIBED").notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
});

export default SubscriberTable;
