import { pgTable, uuid, varchar, timestamp, text, pgEnum } from "drizzle-orm/pg-core";

const VisibilityStatus = pgEnum("visibilityStatus", ["PUBLIC", "HIDDEN"]);

const BlogTable = pgTable("blogs", {
    blogId: uuid("blogId").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    blurb: varchar("blurb", { length: 255 }).notNull(),
    coverURL: varchar("coverURL", { length: 500 }).notNull(),
    content: text("content").notNull(),
    visibility: VisibilityStatus("visibility").default("HIDDEN").notNull(),
    tags: varchar("tags", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
});

export default BlogTable;
