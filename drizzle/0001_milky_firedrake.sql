CREATE TYPE "public"."category" AS ENUM('한식', '양식', '일식', '중식', '아시안', '분식', '카페');--> statement-breakpoint
CREATE TABLE "menus" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" "category" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "spring_session_attributes" ALTER COLUMN "attribute_bytes" SET DATA TYPE text;