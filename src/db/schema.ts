import { text, pgTable, serial, boolean } from "drizzle-orm/pg-core";

export const Todo = pgTable("Todo", {
  id: serial("id").primaryKey().unique(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  completed: boolean("completed").default(false).notNull(),
});
