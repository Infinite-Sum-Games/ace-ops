import { uuid, varchar, pgEnum, timestamp, integer, 
    pgTable  } from "drizzle-orm/pg-core";

const VisibilityStatus = pgEnum("visibilityStatus", ["PUBLIC", "HIDDEN"]);
const EventType = pgEnum("eventType", ["PAID", "UNPAID"]);

const EventTable = pgTable("events", {
    eventId: uuid("eventId").defaultRandom().primaryKey(),
    eventName: varchar("eventName", { length: 255 }).notNull(),
    eventType: EventType("eventType").default("UNPAID").notNull(),
    description: varchar("description", { length: 1000 }).default("No description provided").notNull(),
    visibility: VisibilityStatus("visibility").default("HIDDEN").notNull(),
    posterURL: varchar("posterURL", { length: 500 }).default("No URL provided").notNull(),
    bannerURL: varchar("bannerURL", { length: 500 }).default("No URL provided").notNull(),
    tags: varchar("tags", { length: 255 }).notNull(),
    startTime: timestamp("startTime").notNull(),
    endTime: timestamp("endTime").notNull(),
    seatsTotal: integer("seatsTotal").default(0).notNull(),
    seatsTaken: integer("seatsTaken").default(0).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
});

export default EventTable;
