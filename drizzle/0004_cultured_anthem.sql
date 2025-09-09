CREATE TABLE "restaurants" (
	"id" serial PRIMARY KEY NOT NULL,
	"del_yn" char(1) DEFAULT 'N' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"kakao_place_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	CONSTRAINT "restaurants_kakao_place_id_unique" UNIQUE("kakao_place_id")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"del_yn" char(1) DEFAULT 'N' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"restaurant_id" integer NOT NULL,
	"author_name" varchar(100) NOT NULL,
	"rating" integer NOT NULL,
	"content" text
);
--> statement-breakpoint
ALTER TABLE "member" DROP CONSTRAINT "member_member_type_check";--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_member_type_check" CHECK ((member_type)
                                          ::text = ANY (ARRAY[('GENERAL'::character varying)::text, ('ADMIN'::character varying)::text]));