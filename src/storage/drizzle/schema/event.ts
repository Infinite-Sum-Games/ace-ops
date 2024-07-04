import { text } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { uuid, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

const VisibilityStatus = pgEnum("visibilityStatus", ["PUBLIC", "HIDDEN"]);
const EventType = pgEnum("eventType", ["PAID", "UNPAID"]);

export const EventTable = pgTable("events", {
    eventId: uuid("eventId").defaultRandom().primaryKey(),
    eventName: varchar("eventName").notNull(),
    eventType: EventType("eventType").default("UNPAID").notNull(),

    // Should probably convert this to a text
    description: varchar("description").default("No description provided").notNull(),

    visibility: VisibilityStatus("visibility").default("HIDDEN").notNull(),
    posterURL: text("posterURL").default("No URL provided").notNull(),
    bannerURL: text("bannerURL").default("No URL provided").notNull(),
    startTime: timestamp("startTime").notNull(),
    endTime: timestamp("endTime").notNull(),
    seatsTotal: integer("seatsTotal").default(0).notNull(),
    seatsTaken: integer("seatsTaken").default(0).notNull(),
});

export const EventTagTable = pgTable("eventTags", {
    id: serial("id").primaryKey(),
    // eventId -> foreign key
    tag: varchar("tag", { length: 45 }),
});

// -- IDEA: 
// Create a guest table that maintains a list of all known guests and during 
// the creation of new guests, 
//
// export const EventGuestTable = pgTable("eventGuests", {
//     id: serial("id").primaryKey(),
    // eventId -> 
// });
