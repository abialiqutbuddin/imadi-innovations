import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Preserve users.role NOT NULL. Its first-user visibility condition is an admin
  // UI concern; this migration changes only additive presentation controls.
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_hero_variant" ADD VALUE 'editorial';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_variant" ADD VALUE 'editorial';
  ALTER TYPE "public"."enum_shared_sections_blocks_hero_variant" ADD VALUE 'editorial';
  ALTER TYPE "public"."enum__shared_sections_v_blocks_hero_variant" ADD VALUE 'editorial';
  ALTER TYPE "public"."enum_services_blocks_hero_variant" ADD VALUE 'editorial';
  ALTER TYPE "public"."enum__services_v_blocks_hero_variant" ADD VALUE 'editorial';
  ALTER TYPE "public"."enum_projects_blocks_hero_variant" ADD VALUE 'editorial';
  ALTER TYPE "public"."enum__projects_v_blocks_hero_variant" ADD VALUE 'editorial';
  ALTER TABLE "pages_blocks_problems_items" ADD COLUMN "href" varchar;
  ALTER TABLE "pages_blocks_problems_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_problems_items" ADD COLUMN "href" varchar;
  ALTER TABLE "_pages_v_blocks_problems_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "shared_sections_blocks_problems_items" ADD COLUMN "href" varchar;
  ALTER TABLE "shared_sections_blocks_problems_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_shared_sections_v_blocks_problems_items" ADD COLUMN "href" varchar;
  ALTER TABLE "_shared_sections_v_blocks_problems_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "services_blocks_problems_items" ADD COLUMN "href" varchar;
  ALTER TABLE "services_blocks_problems_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_services_v_blocks_problems_items" ADD COLUMN "href" varchar;
  ALTER TABLE "_services_v_blocks_problems_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "projects_blocks_problems_items" ADD COLUMN "href" varchar;
  ALTER TABLE "projects_blocks_problems_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_projects_v_blocks_problems_items" ADD COLUMN "href" varchar;
  ALTER TABLE "_projects_v_blocks_problems_items" ADD COLUMN "link_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "footer_logo_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_footer_logo_id" integer;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_footer_logo_id_media_id_fk" FOREIGN KEY ("footer_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_footer_logo_id_media_id_fk" FOREIGN KEY ("version_footer_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_footer_footer_logo_idx" ON "site_settings" USING btree ("footer_logo_id");
  CREATE INDEX "_site_settings_v_version_footer_version_footer_logo_idx" ON "_site_settings_v" USING btree ("version_footer_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_footer_logo_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_footer_logo_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::"public"."enum_pages_blocks_hero_variant";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_hero_variant" USING "variant"::"public"."enum_pages_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::"public"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_hero_variant" USING "variant"::"public"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "shared_sections_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "shared_sections_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_shared_sections_blocks_hero_variant";
  CREATE TYPE "public"."enum_shared_sections_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  ALTER TABLE "shared_sections_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::"public"."enum_shared_sections_blocks_hero_variant";
  ALTER TABLE "shared_sections_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_shared_sections_blocks_hero_variant" USING "variant"::"public"."enum_shared_sections_blocks_hero_variant";
  ALTER TABLE "_shared_sections_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_shared_sections_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__shared_sections_v_blocks_hero_variant";
  CREATE TYPE "public"."enum__shared_sections_v_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  ALTER TABLE "_shared_sections_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::"public"."enum__shared_sections_v_blocks_hero_variant";
  ALTER TABLE "_shared_sections_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__shared_sections_v_blocks_hero_variant" USING "variant"::"public"."enum__shared_sections_v_blocks_hero_variant";
  ALTER TABLE "services_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "services_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_services_blocks_hero_variant";
  CREATE TYPE "public"."enum_services_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  ALTER TABLE "services_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::"public"."enum_services_blocks_hero_variant";
  ALTER TABLE "services_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_services_blocks_hero_variant" USING "variant"::"public"."enum_services_blocks_hero_variant";
  ALTER TABLE "_services_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_services_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__services_v_blocks_hero_variant";
  CREATE TYPE "public"."enum__services_v_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  ALTER TABLE "_services_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::"public"."enum__services_v_blocks_hero_variant";
  ALTER TABLE "_services_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__services_v_blocks_hero_variant" USING "variant"::"public"."enum__services_v_blocks_hero_variant";
  ALTER TABLE "projects_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "projects_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_projects_blocks_hero_variant";
  CREATE TYPE "public"."enum_projects_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  ALTER TABLE "projects_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::"public"."enum_projects_blocks_hero_variant";
  ALTER TABLE "projects_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_projects_blocks_hero_variant" USING "variant"::"public"."enum_projects_blocks_hero_variant";
  ALTER TABLE "_projects_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_projects_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__projects_v_blocks_hero_variant";
  CREATE TYPE "public"."enum__projects_v_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  ALTER TABLE "_projects_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'brand'::"public"."enum__projects_v_blocks_hero_variant";
  ALTER TABLE "_projects_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__projects_v_blocks_hero_variant" USING "variant"::"public"."enum__projects_v_blocks_hero_variant";
  DROP INDEX "site_settings_footer_footer_logo_idx";
  DROP INDEX "_site_settings_v_version_footer_version_footer_logo_idx";
  ALTER TABLE "pages_blocks_problems_items" DROP COLUMN "href";
  ALTER TABLE "pages_blocks_problems_items" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_problems_items" DROP COLUMN "href";
  ALTER TABLE "_pages_v_blocks_problems_items" DROP COLUMN "link_label";
  ALTER TABLE "shared_sections_blocks_problems_items" DROP COLUMN "href";
  ALTER TABLE "shared_sections_blocks_problems_items" DROP COLUMN "link_label";
  ALTER TABLE "_shared_sections_v_blocks_problems_items" DROP COLUMN "href";
  ALTER TABLE "_shared_sections_v_blocks_problems_items" DROP COLUMN "link_label";
  ALTER TABLE "services_blocks_problems_items" DROP COLUMN "href";
  ALTER TABLE "services_blocks_problems_items" DROP COLUMN "link_label";
  ALTER TABLE "_services_v_blocks_problems_items" DROP COLUMN "href";
  ALTER TABLE "_services_v_blocks_problems_items" DROP COLUMN "link_label";
  ALTER TABLE "projects_blocks_problems_items" DROP COLUMN "href";
  ALTER TABLE "projects_blocks_problems_items" DROP COLUMN "link_label";
  ALTER TABLE "_projects_v_blocks_problems_items" DROP COLUMN "href";
  ALTER TABLE "_projects_v_blocks_problems_items" DROP COLUMN "link_label";
  ALTER TABLE "site_settings" DROP COLUMN "footer_logo_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_footer_logo_id";`)
}
