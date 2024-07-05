import { pgTable, serial, uuid, timestamp } from "drizzle-orm/pg-core";
import MailTable from "./mailingList";
import SubscriberTable from "./subscribers";

const CampaignTable = pgTable("campaigns", {
    id: serial("id").primaryKey(),
    listId: uuid("listId").notNull().references(() => MailTable.listId),
    subscriberId: uuid("subId").notNull().references(() => SubscriberTable.subscriberId),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
});

export default CampaignTable;
