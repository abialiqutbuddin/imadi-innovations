import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "labels_service_benefits_heading" varchar DEFAULT 'Built around your business';
  ALTER TABLE "site_settings" ADD COLUMN "labels_industry_label" varchar DEFAULT 'Industry';
  ALTER TABLE "site_settings" ADD COLUMN "labels_gallery_heading" varchar DEFAULT 'The experience';
  ALTER TABLE "site_settings" ADD COLUMN "labels_visit_project" varchar DEFAULT 'Visit project';
  ALTER TABLE "site_settings" ADD COLUMN "labels_more_insights" varchar DEFAULT 'Keep exploring';
  ALTER TABLE "site_settings" ADD COLUMN "labels_explore_label" varchar DEFAULT 'Explore';
  ALTER TABLE "site_settings" ADD COLUMN "labels_privacy_label" varchar DEFAULT 'Privacy policy';
  ALTER TABLE "site_settings" ADD COLUMN "labels_skip_link" varchar DEFAULT 'Skip to content';
  ALTER TABLE "site_settings" ADD COLUMN "labels_home_breadcrumb" varchar DEFAULT 'Home';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_labels_service_benefits_heading" varchar DEFAULT 'Built around your business';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_labels_industry_label" varchar DEFAULT 'Industry';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_labels_gallery_heading" varchar DEFAULT 'The experience';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_labels_visit_project" varchar DEFAULT 'Visit project';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_labels_more_insights" varchar DEFAULT 'Keep exploring';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_labels_explore_label" varchar DEFAULT 'Explore';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_labels_privacy_label" varchar DEFAULT 'Privacy policy';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_labels_skip_link" varchar DEFAULT 'Skip to content';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_labels_home_breadcrumb" varchar DEFAULT 'Home';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "labels_service_benefits_heading";
  ALTER TABLE "site_settings" DROP COLUMN "labels_industry_label";
  ALTER TABLE "site_settings" DROP COLUMN "labels_gallery_heading";
  ALTER TABLE "site_settings" DROP COLUMN "labels_visit_project";
  ALTER TABLE "site_settings" DROP COLUMN "labels_more_insights";
  ALTER TABLE "site_settings" DROP COLUMN "labels_explore_label";
  ALTER TABLE "site_settings" DROP COLUMN "labels_privacy_label";
  ALTER TABLE "site_settings" DROP COLUMN "labels_skip_link";
  ALTER TABLE "site_settings" DROP COLUMN "labels_home_breadcrumb";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_labels_service_benefits_heading";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_labels_industry_label";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_labels_gallery_heading";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_labels_visit_project";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_labels_more_insights";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_labels_explore_label";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_labels_privacy_label";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_labels_skip_link";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_labels_home_breadcrumb";`)
}
