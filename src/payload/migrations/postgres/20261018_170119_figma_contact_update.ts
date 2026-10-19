import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Keep users.role NOT NULL. Conditional admin visibility is unrelated to this
  // additive contact and editorial presentation upgrade.
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_contact_variant" AS ENUM('standard', 'page');
  CREATE TYPE "public"."enum_pages_blocks_contact_channels_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('standard', 'consultation');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_variant" AS ENUM('standard', 'page');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_channels_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('standard', 'consultation');
  CREATE TYPE "public"."enum_shared_sections_blocks_contact_variant" AS ENUM('standard', 'page');
  CREATE TYPE "public"."enum_shared_sections_blocks_contact_channels_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_cta_variant" AS ENUM('standard', 'consultation');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_contact_variant" AS ENUM('standard', 'page');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_contact_channels_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_cta_variant" AS ENUM('standard', 'consultation');
  CREATE TYPE "public"."enum_services_blocks_contact_variant" AS ENUM('standard', 'page');
  CREATE TYPE "public"."enum_services_blocks_contact_channels_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_cta_variant" AS ENUM('standard', 'consultation');
  CREATE TYPE "public"."enum__services_v_blocks_contact_variant" AS ENUM('standard', 'page');
  CREATE TYPE "public"."enum__services_v_blocks_contact_channels_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_cta_variant" AS ENUM('standard', 'consultation');
  CREATE TYPE "public"."enum_projects_blocks_contact_variant" AS ENUM('standard', 'page');
  CREATE TYPE "public"."enum_projects_blocks_contact_channels_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_cta_variant" AS ENUM('standard', 'consultation');
  CREATE TYPE "public"."enum__projects_v_blocks_contact_variant" AS ENUM('standard', 'page');
  CREATE TYPE "public"."enum__projects_v_blocks_contact_channels_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_cta_variant" AS ENUM('standard', 'consultation');
  CREATE TABLE "pages_blocks_con_ad7a51b693bc_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_label" varchar,
  	"link_href" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_contact_channels_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_blocks__f70db0582cff_channels_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_contact_channels_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections__db6487a0c8af_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_label" varchar,
  	"link_href" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_contact_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_contact_channels_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__shared_sections_80dfe17484cb_channels_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_contact_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_contact_channels_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks__0a1d71bfd6e3_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_label" varchar,
  	"link_href" varchar
  );
  
  CREATE TABLE "services_blocks_contact_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_contact_channels_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_bloc_64890d69a404_channels_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_contact_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_contact_channels_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks__6e48196db552_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_label" varchar,
  	"link_href" varchar
  );
  
  CREATE TABLE "projects_blocks_contact_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_contact_channels_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__projects_v_bloc_9e545a56d8e1_channels_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_contact_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_contact_channels_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "variant" "enum_pages_blocks_contact_variant" DEFAULT 'standard';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "preferred_time_label" varchar DEFAULT 'Preferred time (optional)';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "preferred_time_placeholder" varchar DEFAULT 'A convenient time and your time zone';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "card_image_id" integer;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "variant" "enum_pages_blocks_cta_variant" DEFAULT 'standard';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "variant" "enum__pages_v_blocks_contact_variant" DEFAULT 'standard';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "preferred_time_label" varchar DEFAULT 'Preferred time (optional)';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "preferred_time_placeholder" varchar DEFAULT 'A convenient time and your time zone';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "card_image_id" integer;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "variant" "enum__pages_v_blocks_cta_variant" DEFAULT 'standard';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "image_id" integer;
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "variant" "enum_shared_sections_blocks_contact_variant" DEFAULT 'standard';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "preferred_time_label" varchar DEFAULT 'Preferred time (optional)';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "preferred_time_placeholder" varchar DEFAULT 'A convenient time and your time zone';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "card_image_id" integer;
  ALTER TABLE "shared_sections_blocks_cta" ADD COLUMN "variant" "enum_shared_sections_blocks_cta_variant" DEFAULT 'standard';
  ALTER TABLE "shared_sections_blocks_cta" ADD COLUMN "image_id" integer;
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "variant" "enum__shared_sections_v_blocks_contact_variant" DEFAULT 'standard';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "preferred_time_label" varchar DEFAULT 'Preferred time (optional)';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "preferred_time_placeholder" varchar DEFAULT 'A convenient time and your time zone';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "card_image_id" integer;
  ALTER TABLE "_shared_sections_v_blocks_cta" ADD COLUMN "variant" "enum__shared_sections_v_blocks_cta_variant" DEFAULT 'standard';
  ALTER TABLE "_shared_sections_v_blocks_cta" ADD COLUMN "image_id" integer;
  ALTER TABLE "services_blocks_contact" ADD COLUMN "variant" "enum_services_blocks_contact_variant" DEFAULT 'standard';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "preferred_time_label" varchar DEFAULT 'Preferred time (optional)';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "preferred_time_placeholder" varchar DEFAULT 'A convenient time and your time zone';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "card_image_id" integer;
  ALTER TABLE "services_blocks_cta" ADD COLUMN "variant" "enum_services_blocks_cta_variant" DEFAULT 'standard';
  ALTER TABLE "services_blocks_cta" ADD COLUMN "image_id" integer;
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "variant" "enum__services_v_blocks_contact_variant" DEFAULT 'standard';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "preferred_time_label" varchar DEFAULT 'Preferred time (optional)';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "preferred_time_placeholder" varchar DEFAULT 'A convenient time and your time zone';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "card_image_id" integer;
  ALTER TABLE "_services_v_blocks_cta" ADD COLUMN "variant" "enum__services_v_blocks_cta_variant" DEFAULT 'standard';
  ALTER TABLE "_services_v_blocks_cta" ADD COLUMN "image_id" integer;
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "variant" "enum_projects_blocks_contact_variant" DEFAULT 'standard';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "preferred_time_label" varchar DEFAULT 'Preferred time (optional)';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "preferred_time_placeholder" varchar DEFAULT 'A convenient time and your time zone';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "card_image_id" integer;
  ALTER TABLE "projects_blocks_cta" ADD COLUMN "variant" "enum_projects_blocks_cta_variant" DEFAULT 'standard';
  ALTER TABLE "projects_blocks_cta" ADD COLUMN "image_id" integer;
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "variant" "enum__projects_v_blocks_contact_variant" DEFAULT 'standard';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "preferred_time_label" varchar DEFAULT 'Preferred time (optional)';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "preferred_time_placeholder" varchar DEFAULT 'A convenient time and your time zone';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "card_image_id" integer;
  ALTER TABLE "_projects_v_blocks_cta" ADD COLUMN "variant" "enum__projects_v_blocks_cta_variant" DEFAULT 'standard';
  ALTER TABLE "_projects_v_blocks_cta" ADD COLUMN "image_id" integer;
  ALTER TABLE "enquiries" ADD COLUMN "preferred_time" varchar;
  ALTER TABLE "pages_blocks_con_ad7a51b693bc_channels" ADD CONSTRAINT "pages_blocks_con_ad7a51b693bc_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_channels" ADD CONSTRAINT "pages_blocks_contact_channels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_channels" ADD CONSTRAINT "pages_blocks_contact_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_blocks__f70db0582cff_channels_v" ADD CONSTRAINT "__pages_v_blocks__f70db0582cff_channels_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_channels" ADD CONSTRAINT "_pages_v_blocks_contact_channels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_channels" ADD CONSTRAINT "_pages_v_blocks_contact_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections__db6487a0c8af_channels" ADD CONSTRAINT "shared_sections__db6487a0c8af_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_contact_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_contact_channels" ADD CONSTRAINT "shared_sections_blocks_contact_channels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_contact_channels" ADD CONSTRAINT "shared_sections_blocks_contact_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__shared_sections_80dfe17484cb_channels_v" ADD CONSTRAINT "__shared_sections_80dfe17484cb_channels_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_contact_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_contact_channels" ADD CONSTRAINT "_shared_sections_v_blocks_contact_channels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_contact_channels" ADD CONSTRAINT "_shared_sections_v_blocks_contact_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks__0a1d71bfd6e3_channels" ADD CONSTRAINT "services_blocks__0a1d71bfd6e3_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_contact_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_channels" ADD CONSTRAINT "services_blocks_contact_channels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_channels" ADD CONSTRAINT "services_blocks_contact_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_bloc_64890d69a404_channels_v" ADD CONSTRAINT "__services_v_bloc_64890d69a404_channels_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_contact_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact_channels" ADD CONSTRAINT "_services_v_blocks_contact_channels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact_channels" ADD CONSTRAINT "_services_v_blocks_contact_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks__6e48196db552_channels" ADD CONSTRAINT "projects_blocks__6e48196db552_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_contact_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact_channels" ADD CONSTRAINT "projects_blocks_contact_channels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact_channels" ADD CONSTRAINT "projects_blocks_contact_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__projects_v_bloc_9e545a56d8e1_channels_v" ADD CONSTRAINT "__projects_v_bloc_9e545a56d8e1_channels_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_contact_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact_channels" ADD CONSTRAINT "_projects_v_blocks_contact_channels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact_channels" ADD CONSTRAINT "_projects_v_blocks_contact_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_con_ad7a51b693bc_channels_order_idx" ON "pages_blocks_con_ad7a51b693bc_channels" USING btree ("_order");
  CREATE INDEX "pages_blocks_con_ad7a51b693bc_channels_parent_id_idx" ON "pages_blocks_con_ad7a51b693bc_channels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_channels_order_idx" ON "pages_blocks_contact_channels" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_channels_parent_id_idx" ON "pages_blocks_contact_channels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_channels_path_idx" ON "pages_blocks_contact_channels" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_channels_image_idx" ON "pages_blocks_contact_channels" USING btree ("image_id");
  CREATE INDEX "__pages_v_blocks__f70db0582cff_channels_v_order_idx" ON "__pages_v_blocks__f70db0582cff_channels_v" USING btree ("_order");
  CREATE INDEX "__pages_v_blocks__f70db0582cff_channels_v_parent_id_idx" ON "__pages_v_blocks__f70db0582cff_channels_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_channels_order_idx" ON "_pages_v_blocks_contact_channels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_channels_parent_id_idx" ON "_pages_v_blocks_contact_channels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_channels_path_idx" ON "_pages_v_blocks_contact_channels" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_channels_image_idx" ON "_pages_v_blocks_contact_channels" USING btree ("image_id");
  CREATE INDEX "shared_sections__db6487a0c8af_channels_order_idx" ON "shared_sections__db6487a0c8af_channels" USING btree ("_order");
  CREATE INDEX "shared_sections__db6487a0c8af_channels_parent_id_idx" ON "shared_sections__db6487a0c8af_channels" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_contact_channels_order_idx" ON "shared_sections_blocks_contact_channels" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_contact_channels_parent_id_idx" ON "shared_sections_blocks_contact_channels" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_contact_channels_path_idx" ON "shared_sections_blocks_contact_channels" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_contact_channels_image_idx" ON "shared_sections_blocks_contact_channels" USING btree ("image_id");
  CREATE INDEX "__shared_sections_80dfe17484cb_channels_v_order_idx" ON "__shared_sections_80dfe17484cb_channels_v" USING btree ("_order");
  CREATE INDEX "__shared_sections_80dfe17484cb_channels_v_parent_id_idx" ON "__shared_sections_80dfe17484cb_channels_v" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_contact_channels_order_idx" ON "_shared_sections_v_blocks_contact_channels" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_contact_channels_parent_id_idx" ON "_shared_sections_v_blocks_contact_channels" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_contact_channels_path_idx" ON "_shared_sections_v_blocks_contact_channels" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_contact_channels_image_idx" ON "_shared_sections_v_blocks_contact_channels" USING btree ("image_id");
  CREATE INDEX "services_blocks__0a1d71bfd6e3_channels_order_idx" ON "services_blocks__0a1d71bfd6e3_channels" USING btree ("_order");
  CREATE INDEX "services_blocks__0a1d71bfd6e3_channels_parent_id_idx" ON "services_blocks__0a1d71bfd6e3_channels" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_channels_order_idx" ON "services_blocks_contact_channels" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_channels_parent_id_idx" ON "services_blocks_contact_channels" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_channels_path_idx" ON "services_blocks_contact_channels" USING btree ("_path");
  CREATE INDEX "services_blocks_contact_channels_image_idx" ON "services_blocks_contact_channels" USING btree ("image_id");
  CREATE INDEX "__services_v_bloc_64890d69a404_channels_v_order_idx" ON "__services_v_bloc_64890d69a404_channels_v" USING btree ("_order");
  CREATE INDEX "__services_v_bloc_64890d69a404_channels_v_parent_id_idx" ON "__services_v_bloc_64890d69a404_channels_v" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_channels_order_idx" ON "_services_v_blocks_contact_channels" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_contact_channels_parent_id_idx" ON "_services_v_blocks_contact_channels" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_channels_path_idx" ON "_services_v_blocks_contact_channels" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_contact_channels_image_idx" ON "_services_v_blocks_contact_channels" USING btree ("image_id");
  CREATE INDEX "projects_blocks__6e48196db552_channels_order_idx" ON "projects_blocks__6e48196db552_channels" USING btree ("_order");
  CREATE INDEX "projects_blocks__6e48196db552_channels_parent_id_idx" ON "projects_blocks__6e48196db552_channels" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_channels_order_idx" ON "projects_blocks_contact_channels" USING btree ("_order");
  CREATE INDEX "projects_blocks_contact_channels_parent_id_idx" ON "projects_blocks_contact_channels" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_channels_path_idx" ON "projects_blocks_contact_channels" USING btree ("_path");
  CREATE INDEX "projects_blocks_contact_channels_image_idx" ON "projects_blocks_contact_channels" USING btree ("image_id");
  CREATE INDEX "__projects_v_bloc_9e545a56d8e1_channels_v_order_idx" ON "__projects_v_bloc_9e545a56d8e1_channels_v" USING btree ("_order");
  CREATE INDEX "__projects_v_bloc_9e545a56d8e1_channels_v_parent_id_idx" ON "__projects_v_bloc_9e545a56d8e1_channels_v" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_contact_channels_order_idx" ON "_projects_v_blocks_contact_channels" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_contact_channels_parent_id_idx" ON "_projects_v_blocks_contact_channels" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_contact_channels_path_idx" ON "_projects_v_blocks_contact_channels" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_contact_channels_image_idx" ON "_projects_v_blocks_contact_channels" USING btree ("image_id");
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_contact" ADD CONSTRAINT "shared_sections_blocks_contact_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_cta" ADD CONSTRAINT "shared_sections_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD CONSTRAINT "_shared_sections_v_blocks_contact_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_cta" ADD CONSTRAINT "_shared_sections_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_contact" ADD CONSTRAINT "services_blocks_contact_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact" ADD CONSTRAINT "_services_v_blocks_contact_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta" ADD CONSTRAINT "_services_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact" ADD CONSTRAINT "projects_blocks_contact_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta" ADD CONSTRAINT "projects_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact" ADD CONSTRAINT "_projects_v_blocks_contact_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_cta" ADD CONSTRAINT "_projects_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_card_image_idx" ON "pages_blocks_contact" USING btree ("card_image_id");
  CREATE INDEX "pages_blocks_cta_image_idx" ON "pages_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_contact_card_image_idx" ON "_pages_v_blocks_contact" USING btree ("card_image_id");
  CREATE INDEX "_pages_v_blocks_cta_image_idx" ON "_pages_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "shared_sections_blocks_contact_card_image_idx" ON "shared_sections_blocks_contact" USING btree ("card_image_id");
  CREATE INDEX "shared_sections_blocks_cta_image_idx" ON "shared_sections_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_shared_sections_v_blocks_contact_card_image_idx" ON "_shared_sections_v_blocks_contact" USING btree ("card_image_id");
  CREATE INDEX "_shared_sections_v_blocks_cta_image_idx" ON "_shared_sections_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "services_blocks_contact_card_image_idx" ON "services_blocks_contact" USING btree ("card_image_id");
  CREATE INDEX "services_blocks_cta_image_idx" ON "services_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_contact_card_image_idx" ON "_services_v_blocks_contact" USING btree ("card_image_id");
  CREATE INDEX "_services_v_blocks_cta_image_idx" ON "_services_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "projects_blocks_contact_card_image_idx" ON "projects_blocks_contact" USING btree ("card_image_id");
  CREATE INDEX "projects_blocks_cta_image_idx" ON "projects_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_contact_card_image_idx" ON "_projects_v_blocks_contact" USING btree ("card_image_id");
  CREATE INDEX "_projects_v_blocks_cta_image_idx" ON "_projects_v_blocks_cta" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_con_ad7a51b693bc_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__pages_v_blocks__f70db0582cff_channels_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shared_sections__db6487a0c8af_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shared_sections_blocks_contact_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__shared_sections_80dfe17484cb_channels_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_shared_sections_v_blocks_contact_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks__0a1d71bfd6e3_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_contact_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__services_v_bloc_64890d69a404_channels_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_contact_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks__6e48196db552_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_contact_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__projects_v_bloc_9e545a56d8e1_channels_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_contact_channels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_con_ad7a51b693bc_channels" CASCADE;
  DROP TABLE "pages_blocks_contact_channels" CASCADE;
  DROP TABLE "__pages_v_blocks__f70db0582cff_channels_v" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_channels" CASCADE;
  DROP TABLE "shared_sections__db6487a0c8af_channels" CASCADE;
  DROP TABLE "shared_sections_blocks_contact_channels" CASCADE;
  DROP TABLE "__shared_sections_80dfe17484cb_channels_v" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_contact_channels" CASCADE;
  DROP TABLE "services_blocks__0a1d71bfd6e3_channels" CASCADE;
  DROP TABLE "services_blocks_contact_channels" CASCADE;
  DROP TABLE "__services_v_bloc_64890d69a404_channels_v" CASCADE;
  DROP TABLE "_services_v_blocks_contact_channels" CASCADE;
  DROP TABLE "projects_blocks__6e48196db552_channels" CASCADE;
  DROP TABLE "projects_blocks_contact_channels" CASCADE;
  DROP TABLE "__projects_v_bloc_9e545a56d8e1_channels_v" CASCADE;
  DROP TABLE "_projects_v_blocks_contact_channels" CASCADE;
  ALTER TABLE "pages_blocks_contact" DROP CONSTRAINT "pages_blocks_contact_card_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_cta" DROP CONSTRAINT "pages_blocks_cta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_contact" DROP CONSTRAINT "_pages_v_blocks_contact_card_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_cta" DROP CONSTRAINT "_pages_v_blocks_cta_image_id_media_id_fk";
  
  ALTER TABLE "shared_sections_blocks_contact" DROP CONSTRAINT "shared_sections_blocks_contact_card_image_id_media_id_fk";
  
  ALTER TABLE "shared_sections_blocks_cta" DROP CONSTRAINT "shared_sections_blocks_cta_image_id_media_id_fk";
  
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP CONSTRAINT "_shared_sections_v_blocks_contact_card_image_id_media_id_fk";
  
  ALTER TABLE "_shared_sections_v_blocks_cta" DROP CONSTRAINT "_shared_sections_v_blocks_cta_image_id_media_id_fk";
  
  ALTER TABLE "services_blocks_contact" DROP CONSTRAINT "services_blocks_contact_card_image_id_media_id_fk";
  
  ALTER TABLE "services_blocks_cta" DROP CONSTRAINT "services_blocks_cta_image_id_media_id_fk";
  
  ALTER TABLE "_services_v_blocks_contact" DROP CONSTRAINT "_services_v_blocks_contact_card_image_id_media_id_fk";
  
  ALTER TABLE "_services_v_blocks_cta" DROP CONSTRAINT "_services_v_blocks_cta_image_id_media_id_fk";
  
  ALTER TABLE "projects_blocks_contact" DROP CONSTRAINT "projects_blocks_contact_card_image_id_media_id_fk";
  
  ALTER TABLE "projects_blocks_cta" DROP CONSTRAINT "projects_blocks_cta_image_id_media_id_fk";
  
  ALTER TABLE "_projects_v_blocks_contact" DROP CONSTRAINT "_projects_v_blocks_contact_card_image_id_media_id_fk";
  
  ALTER TABLE "_projects_v_blocks_cta" DROP CONSTRAINT "_projects_v_blocks_cta_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_contact_card_image_idx";
  DROP INDEX "pages_blocks_cta_image_idx";
  DROP INDEX "_pages_v_blocks_contact_card_image_idx";
  DROP INDEX "_pages_v_blocks_cta_image_idx";
  DROP INDEX "shared_sections_blocks_contact_card_image_idx";
  DROP INDEX "shared_sections_blocks_cta_image_idx";
  DROP INDEX "_shared_sections_v_blocks_contact_card_image_idx";
  DROP INDEX "_shared_sections_v_blocks_cta_image_idx";
  DROP INDEX "services_blocks_contact_card_image_idx";
  DROP INDEX "services_blocks_cta_image_idx";
  DROP INDEX "_services_v_blocks_contact_card_image_idx";
  DROP INDEX "_services_v_blocks_cta_image_idx";
  DROP INDEX "projects_blocks_contact_card_image_idx";
  DROP INDEX "projects_blocks_cta_image_idx";
  DROP INDEX "_projects_v_blocks_contact_card_image_idx";
  DROP INDEX "_projects_v_blocks_cta_image_idx";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "variant";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "preferred_time_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "preferred_time_placeholder";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "card_image_id";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "variant";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "preferred_time_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "preferred_time_placeholder";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "card_image_id";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "image_id";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "variant";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "preferred_time_label";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "preferred_time_placeholder";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "card_image_id";
  ALTER TABLE "shared_sections_blocks_cta" DROP COLUMN "variant";
  ALTER TABLE "shared_sections_blocks_cta" DROP COLUMN "image_id";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "variant";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "preferred_time_label";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "preferred_time_placeholder";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "card_image_id";
  ALTER TABLE "_shared_sections_v_blocks_cta" DROP COLUMN "variant";
  ALTER TABLE "_shared_sections_v_blocks_cta" DROP COLUMN "image_id";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "variant";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "preferred_time_label";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "preferred_time_placeholder";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "card_image_id";
  ALTER TABLE "services_blocks_cta" DROP COLUMN "variant";
  ALTER TABLE "services_blocks_cta" DROP COLUMN "image_id";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "variant";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "preferred_time_label";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "preferred_time_placeholder";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "card_image_id";
  ALTER TABLE "_services_v_blocks_cta" DROP COLUMN "variant";
  ALTER TABLE "_services_v_blocks_cta" DROP COLUMN "image_id";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "variant";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "preferred_time_label";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "preferred_time_placeholder";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "card_image_id";
  ALTER TABLE "projects_blocks_cta" DROP COLUMN "variant";
  ALTER TABLE "projects_blocks_cta" DROP COLUMN "image_id";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "variant";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "preferred_time_label";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "preferred_time_placeholder";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "card_image_id";
  ALTER TABLE "_projects_v_blocks_cta" DROP COLUMN "variant";
  ALTER TABLE "_projects_v_blocks_cta" DROP COLUMN "image_id";
  ALTER TABLE "enquiries" DROP COLUMN "preferred_time";
  DROP TYPE "public"."enum_pages_blocks_contact_variant";
  DROP TYPE "public"."enum_pages_blocks_contact_channels_theme";
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_contact_variant";
  DROP TYPE "public"."enum__pages_v_blocks_contact_channels_theme";
  DROP TYPE "public"."enum__pages_v_blocks_cta_variant";
  DROP TYPE "public"."enum_shared_sections_blocks_contact_variant";
  DROP TYPE "public"."enum_shared_sections_blocks_contact_channels_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_cta_variant";
  DROP TYPE "public"."enum__shared_sections_v_blocks_contact_variant";
  DROP TYPE "public"."enum__shared_sections_v_blocks_contact_channels_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_cta_variant";
  DROP TYPE "public"."enum_services_blocks_contact_variant";
  DROP TYPE "public"."enum_services_blocks_contact_channels_theme";
  DROP TYPE "public"."enum_services_blocks_cta_variant";
  DROP TYPE "public"."enum__services_v_blocks_contact_variant";
  DROP TYPE "public"."enum__services_v_blocks_contact_channels_theme";
  DROP TYPE "public"."enum__services_v_blocks_cta_variant";
  DROP TYPE "public"."enum_projects_blocks_contact_variant";
  DROP TYPE "public"."enum_projects_blocks_contact_channels_theme";
  DROP TYPE "public"."enum_projects_blocks_cta_variant";
  DROP TYPE "public"."enum__projects_v_blocks_contact_variant";
  DROP TYPE "public"."enum__projects_v_blocks_contact_channels_theme";
  DROP TYPE "public"."enum__projects_v_blocks_cta_variant";`)
}
