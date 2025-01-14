import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// 1) COMMUNITIES
export const communities = pgTable("communities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`NOW()`)
    .notNull(),
});

// 2) COMMUNITY MEMBERS (ara tablo)
// Clerk kullandığınız için "clerkUserId" (string) ile ilişki kurulabilir
export const communityMembers = pgTable(
  "community_members",
  {
    clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull(),
    communityId: integer("community_id").notNull(),
    communityRole: varchar("community_role", { length: 50 }).default("MEMBER"),
    joinedAt: timestamp("joined_at")
      .default(sql`NOW()`)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey(table.clerkUserId, table.communityId),
    };
  }
);

// 3) EVENTS
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  eventDate: timestamp("event_date").notNull(),
  communityId: integer("community_id"), // opsiyonel olarak topluluğa bağlı
  participantLimit: integer("participant_limit"),
  createdAt: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
});

// 4) RSVPS
export const rsvps = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull(),
  eventId: integer("event_id").notNull(),
  status: varchar("status", { length: 10 }).default("MAYBE"), // "GOING", "MAYBE", "NOT"
  createdAt: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
});

// 5) NOTIFICATIONS
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
});
