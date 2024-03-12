CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"text" text NOT NULL,
	"completed" boolean DEFAULT false
);
