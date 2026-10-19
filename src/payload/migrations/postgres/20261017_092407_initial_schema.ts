import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_pages_blocks_hero_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  CREATE TYPE "public"."enum_pages_blocks_stats_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_problems_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_services_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_services_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_projects_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_projects_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_process_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_product_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_product_composition" AS ENUM('single', 'dashboard');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_posts_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_posts_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_contact_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_faqs_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_faqs_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_cta_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_rich_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_split_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_blocks_split_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_gallery_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_problems_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_services_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_services_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_process_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_product_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_product_composition" AS ENUM('single', 'dashboard');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_faqs_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_faqs_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_shared_sections_blocks_hero_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  CREATE TYPE "public"."enum_shared_sections_blocks_stats_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_problems_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_services_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_services_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_shared_sections_blocks_projects_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_projects_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_shared_sections_blocks_process_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_product_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_product_composition" AS ENUM('single', 'dashboard');
  CREATE TYPE "public"."enum_shared_sections_blocks_testimonials_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_testimonials_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_shared_sections_blocks_posts_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_posts_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_shared_sections_blocks_contact_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_faqs_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_faqs_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_shared_sections_blocks_cta_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_rich_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_split_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_blocks_split_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_shared_sections_blocks_gallery_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_shared_sections_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_hero_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_stats_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_problems_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_services_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_services_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_projects_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_projects_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_process_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_product_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_product_composition" AS ENUM('single', 'dashboard');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_testimonials_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_testimonials_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_posts_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_posts_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_contact_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_faqs_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_faqs_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_cta_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_rich_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_split_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_split_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_gallery_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__shared_sections_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_blocks_hero_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  CREATE TYPE "public"."enum_services_blocks_stats_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_problems_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_services_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_services_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_services_blocks_projects_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_projects_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_services_blocks_process_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_product_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_product_composition" AS ENUM('single', 'dashboard');
  CREATE TYPE "public"."enum_services_blocks_testimonials_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_testimonials_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_services_blocks_posts_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_posts_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_services_blocks_contact_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_faqs_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_faqs_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_services_blocks_cta_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_rich_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_split_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_blocks_split_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_services_blocks_gallery_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_blocks_hero_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  CREATE TYPE "public"."enum__services_v_blocks_stats_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_problems_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_services_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_services_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_projects_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_projects_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_process_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_product_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_product_composition" AS ENUM('single', 'dashboard');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_posts_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_posts_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_contact_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_faqs_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_faqs_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__services_v_blocks_cta_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_rich_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_split_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_blocks_split_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__services_v_blocks_gallery_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_blocks_hero_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  CREATE TYPE "public"."enum_projects_blocks_stats_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_problems_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_services_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_services_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_projects_blocks_projects_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_projects_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_projects_blocks_process_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_product_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_product_composition" AS ENUM('single', 'dashboard');
  CREATE TYPE "public"."enum_projects_blocks_testimonials_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_testimonials_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_projects_blocks_posts_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_posts_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_projects_blocks_contact_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_faqs_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_faqs_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum_projects_blocks_cta_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_rich_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_split_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_blocks_split_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_projects_blocks_gallery_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_hero_variant" AS ENUM('brand', 'split', 'centered');
  CREATE TYPE "public"."enum__projects_v_blocks_stats_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_problems_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_services_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_services_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__projects_v_blocks_projects_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_projects_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__projects_v_blocks_process_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_product_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_product_composition" AS ENUM('single', 'dashboard');
  CREATE TYPE "public"."enum__projects_v_blocks_testimonials_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_testimonials_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__projects_v_blocks_posts_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_posts_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__projects_v_blocks_contact_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_faqs_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_faqs_selection_mode" AS ENUM('featured', 'all', 'selected');
  CREATE TYPE "public"."enum__projects_v_blocks_cta_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_rich_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_split_content_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_blocks_split_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__projects_v_blocks_gallery_theme" AS ENUM('light', 'dark', 'lavender');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'contacted', 'in-progress', 'closed');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_hero_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"trailing_title" varchar,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'brand',
  	"badge" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_problems_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_problems_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_services_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_pages_blocks_services_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_projects_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_pages_blocks_projects_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"show_filters" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_process_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"background_image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pro_150499696b41_extra_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_product_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_product" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_product_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name" varchar,
  	"logo_id" integer,
  	"image_id" integer,
  	"composition" "enum_pages_blocks_product_composition" DEFAULT 'single',
  	"image_caption" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_pages_blocks_testimonials_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_posts_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_pages_blocks_posts_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_contact_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name_label" varchar DEFAULT 'Your name',
  	"name_placeholder" varchar DEFAULT 'Your full name',
  	"email_label" varchar DEFAULT 'Email address',
  	"email_placeholder" varchar DEFAULT 'you@company.com',
  	"company_label" varchar DEFAULT 'Company (optional)',
  	"company_placeholder" varchar DEFAULT 'Your company name',
  	"service_label" varchar DEFAULT 'What can we help with?',
  	"service_placeholder" varchar DEFAULT 'Choose a service',
  	"budget_label" varchar DEFAULT 'Project budget (optional)',
  	"budget_placeholder" varchar DEFAULT 'Select a range',
  	"message_label" varchar DEFAULT 'Tell us about your project',
  	"message_placeholder" varchar DEFAULT 'What would you like to build or improve?',
  	"submit_label" varchar DEFAULT 'Send enquiry',
  	"submitting_label" varchar DEFAULT 'Sending your enquiry…',
  	"error_message" varchar DEFAULT 'We could not save your enquiry. Please try again, or contact us by email.',
  	"privacy_note" varchar DEFAULT 'We use your details to respond to your enquiry.',
  	"card_title" varchar,
  	"card_button_label" varchar,
  	"card_button_href" varchar,
  	"success_message" varchar DEFAULT 'Thank you. Your enquiry has been saved and our team will be in touch.',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_faqs_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_pages_blocks_faqs_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"support_title" varchar,
  	"support_description" varchar,
  	"image_id" integer,
  	"action_label" varchar,
  	"action_href" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_rich_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split_content_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_split_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_split_content_image_position" DEFAULT 'right',
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_pages_blocks_gallery_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"section_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_hero_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"trailing_title" varchar,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'brand',
  	"badge" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_problems_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_problems_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_services_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__pages_v_blocks_services_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_projects_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__pages_v_blocks_projects_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"show_filters" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_process_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"background_image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_blocks__ea3525432fe9_extra_images_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_product_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name" varchar,
  	"logo_id" integer,
  	"image_id" integer,
  	"composition" "enum__pages_v_blocks_product_composition" DEFAULT 'single',
  	"image_caption" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__pages_v_blocks_testimonials_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_posts_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__pages_v_blocks_posts_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_contact_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name_label" varchar DEFAULT 'Your name',
  	"name_placeholder" varchar DEFAULT 'Your full name',
  	"email_label" varchar DEFAULT 'Email address',
  	"email_placeholder" varchar DEFAULT 'you@company.com',
  	"company_label" varchar DEFAULT 'Company (optional)',
  	"company_placeholder" varchar DEFAULT 'Your company name',
  	"service_label" varchar DEFAULT 'What can we help with?',
  	"service_placeholder" varchar DEFAULT 'Choose a service',
  	"budget_label" varchar DEFAULT 'Project budget (optional)',
  	"budget_placeholder" varchar DEFAULT 'Select a range',
  	"message_label" varchar DEFAULT 'Tell us about your project',
  	"message_placeholder" varchar DEFAULT 'What would you like to build or improve?',
  	"submit_label" varchar DEFAULT 'Send enquiry',
  	"submitting_label" varchar DEFAULT 'Sending your enquiry…',
  	"error_message" varchar DEFAULT 'We could not save your enquiry. Please try again, or contact us by email.',
  	"privacy_note" varchar DEFAULT 'We use your details to respond to your enquiry.',
  	"card_title" varchar,
  	"card_button_label" varchar,
  	"card_button_href" varchar,
  	"success_message" varchar DEFAULT 'Thank you. Your enquiry has been saved and our team will be in touch.',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_faqs_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__pages_v_blocks_faqs_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"support_title" varchar,
  	"support_description" varchar,
  	"image_id" integer,
  	"action_label" varchar,
  	"action_href" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_rich_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_content_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_split_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_split_content_image_position" DEFAULT 'right',
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__pages_v_blocks_gallery_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"section_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "shared_sections_blocks_hero_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_hero_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"trailing_title" varchar,
  	"variant" "enum_shared_sections_blocks_hero_variant" DEFAULT 'brand',
  	"badge" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_problems_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_problems_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_services_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_shared_sections_blocks_services_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_projects_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_shared_sections_blocks_projects_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"show_filters" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_process_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"background_image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections__98fa94584746_extra_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_product_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_product" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_product_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name" varchar,
  	"logo_id" integer,
  	"image_id" integer,
  	"composition" "enum_shared_sections_blocks_product_composition" DEFAULT 'single',
  	"image_caption" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_shared_sections_blocks_testimonials_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_posts_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_shared_sections_blocks_posts_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_contact_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_contact_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name_label" varchar DEFAULT 'Your name',
  	"name_placeholder" varchar DEFAULT 'Your full name',
  	"email_label" varchar DEFAULT 'Email address',
  	"email_placeholder" varchar DEFAULT 'you@company.com',
  	"company_label" varchar DEFAULT 'Company (optional)',
  	"company_placeholder" varchar DEFAULT 'Your company name',
  	"service_label" varchar DEFAULT 'What can we help with?',
  	"service_placeholder" varchar DEFAULT 'Choose a service',
  	"budget_label" varchar DEFAULT 'Project budget (optional)',
  	"budget_placeholder" varchar DEFAULT 'Select a range',
  	"message_label" varchar DEFAULT 'Tell us about your project',
  	"message_placeholder" varchar DEFAULT 'What would you like to build or improve?',
  	"submit_label" varchar DEFAULT 'Send enquiry',
  	"submitting_label" varchar DEFAULT 'Sending your enquiry…',
  	"error_message" varchar DEFAULT 'We could not save your enquiry. Please try again, or contact us by email.',
  	"privacy_note" varchar DEFAULT 'We use your details to respond to your enquiry.',
  	"card_title" varchar,
  	"card_button_label" varchar,
  	"card_button_href" varchar,
  	"success_message" varchar DEFAULT 'Thank you. Your enquiry has been saved and our team will be in touch.',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_faqs_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_shared_sections_blocks_faqs_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"support_title" varchar,
  	"support_description" varchar,
  	"image_id" integer,
  	"action_label" varchar,
  	"action_href" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_rich_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_split_content_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_split_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"image_position" "enum_shared_sections_blocks_split_content_image_position" DEFAULT 'right',
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "shared_sections_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_shared_sections_blocks_gallery_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "shared_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_shared_sections_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "shared_sections_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_shared_sections_v_blocks_hero_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_hero_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"trailing_title" varchar,
  	"variant" "enum__shared_sections_v_blocks_hero_variant" DEFAULT 'brand',
  	"badge" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_problems_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_problems_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_services_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__shared_sections_v_blocks_services_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_projects_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__shared_sections_v_blocks_projects_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"show_filters" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_process_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"background_image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__shared_sections_beac5e433a6d_extra_images_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_product_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_product" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_product_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name" varchar,
  	"logo_id" integer,
  	"image_id" integer,
  	"composition" "enum__shared_sections_v_blocks_product_composition" DEFAULT 'single',
  	"image_caption" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__shared_sections_v_blocks_testimonials_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_posts_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__shared_sections_v_blocks_posts_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_contact_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_contact_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name_label" varchar DEFAULT 'Your name',
  	"name_placeholder" varchar DEFAULT 'Your full name',
  	"email_label" varchar DEFAULT 'Email address',
  	"email_placeholder" varchar DEFAULT 'you@company.com',
  	"company_label" varchar DEFAULT 'Company (optional)',
  	"company_placeholder" varchar DEFAULT 'Your company name',
  	"service_label" varchar DEFAULT 'What can we help with?',
  	"service_placeholder" varchar DEFAULT 'Choose a service',
  	"budget_label" varchar DEFAULT 'Project budget (optional)',
  	"budget_placeholder" varchar DEFAULT 'Select a range',
  	"message_label" varchar DEFAULT 'Tell us about your project',
  	"message_placeholder" varchar DEFAULT 'What would you like to build or improve?',
  	"submit_label" varchar DEFAULT 'Send enquiry',
  	"submitting_label" varchar DEFAULT 'Sending your enquiry…',
  	"error_message" varchar DEFAULT 'We could not save your enquiry. Please try again, or contact us by email.',
  	"privacy_note" varchar DEFAULT 'We use your details to respond to your enquiry.',
  	"card_title" varchar,
  	"card_button_label" varchar,
  	"card_button_href" varchar,
  	"success_message" varchar DEFAULT 'Thank you. Your enquiry has been saved and our team will be in touch.',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_faqs_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__shared_sections_v_blocks_faqs_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"support_title" varchar,
  	"support_description" varchar,
  	"image_id" integer,
  	"action_label" varchar,
  	"action_href" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_rich_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_split_content_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_split_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"image_position" "enum__shared_sections_v_blocks_split_content_image_position" DEFAULT 'right',
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_shared_sections_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__shared_sections_v_blocks_gallery_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_shared_sections_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__shared_sections_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_shared_sections_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "services_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "services_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "services_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services_blocks_hero_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_hero_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"trailing_title" varchar,
  	"variant" "enum_services_blocks_hero_variant" DEFAULT 'brand',
  	"badge" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_problems_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "services_blocks_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_problems_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_services_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_services_blocks_services_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_projects_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_services_blocks_projects_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"show_filters" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "services_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_process_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"background_image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks__5a63a975b80a_extra_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "services_blocks_product_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_product" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_product_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name" varchar,
  	"logo_id" integer,
  	"image_id" integer,
  	"composition" "enum_services_blocks_product_composition" DEFAULT 'single',
  	"image_caption" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_services_blocks_testimonials_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_posts_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_services_blocks_posts_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_contact_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "services_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_contact_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name_label" varchar DEFAULT 'Your name',
  	"name_placeholder" varchar DEFAULT 'Your full name',
  	"email_label" varchar DEFAULT 'Email address',
  	"email_placeholder" varchar DEFAULT 'you@company.com',
  	"company_label" varchar DEFAULT 'Company (optional)',
  	"company_placeholder" varchar DEFAULT 'Your company name',
  	"service_label" varchar DEFAULT 'What can we help with?',
  	"service_placeholder" varchar DEFAULT 'Choose a service',
  	"budget_label" varchar DEFAULT 'Project budget (optional)',
  	"budget_placeholder" varchar DEFAULT 'Select a range',
  	"message_label" varchar DEFAULT 'Tell us about your project',
  	"message_placeholder" varchar DEFAULT 'What would you like to build or improve?',
  	"submit_label" varchar DEFAULT 'Send enquiry',
  	"submitting_label" varchar DEFAULT 'Sending your enquiry…',
  	"error_message" varchar DEFAULT 'We could not save your enquiry. Please try again, or contact us by email.',
  	"privacy_note" varchar DEFAULT 'We use your details to respond to your enquiry.',
  	"card_title" varchar,
  	"card_button_label" varchar,
  	"card_button_href" varchar,
  	"success_message" varchar DEFAULT 'Thank you. Your enquiry has been saved and our team will be in touch.',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_faqs_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_services_blocks_faqs_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"support_title" varchar,
  	"support_description" varchar,
  	"image_id" integer,
  	"action_label" varchar,
  	"action_href" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_rich_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_split_content_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "services_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_split_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"image_position" "enum_services_blocks_split_content_image_position" DEFAULT 'right',
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "services_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_services_blocks_gallery_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"section_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"eyebrow" varchar,
  	"highlight" varchar,
  	"icon" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_services_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_hero_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"trailing_title" varchar,
  	"variant" "enum__services_v_blocks_hero_variant" DEFAULT 'brand',
  	"badge" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_problems_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_problems_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_services_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__services_v_blocks_services_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_projects_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__services_v_blocks_projects_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"show_filters" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_process_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"background_image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_bloc_1f49bb99e465_extra_images_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_product_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_product" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_product_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name" varchar,
  	"logo_id" integer,
  	"image_id" integer,
  	"composition" "enum__services_v_blocks_product_composition" DEFAULT 'single',
  	"image_caption" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__services_v_blocks_testimonials_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_posts_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__services_v_blocks_posts_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_contact_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_contact_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name_label" varchar DEFAULT 'Your name',
  	"name_placeholder" varchar DEFAULT 'Your full name',
  	"email_label" varchar DEFAULT 'Email address',
  	"email_placeholder" varchar DEFAULT 'you@company.com',
  	"company_label" varchar DEFAULT 'Company (optional)',
  	"company_placeholder" varchar DEFAULT 'Your company name',
  	"service_label" varchar DEFAULT 'What can we help with?',
  	"service_placeholder" varchar DEFAULT 'Choose a service',
  	"budget_label" varchar DEFAULT 'Project budget (optional)',
  	"budget_placeholder" varchar DEFAULT 'Select a range',
  	"message_label" varchar DEFAULT 'Tell us about your project',
  	"message_placeholder" varchar DEFAULT 'What would you like to build or improve?',
  	"submit_label" varchar DEFAULT 'Send enquiry',
  	"submitting_label" varchar DEFAULT 'Sending your enquiry…',
  	"error_message" varchar DEFAULT 'We could not save your enquiry. Please try again, or contact us by email.',
  	"privacy_note" varchar DEFAULT 'We use your details to respond to your enquiry.',
  	"card_title" varchar,
  	"card_button_label" varchar,
  	"card_button_href" varchar,
  	"success_message" varchar DEFAULT 'Thank you. Your enquiry has been saved and our team will be in touch.',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_faqs_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__services_v_blocks_faqs_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"support_title" varchar,
  	"support_description" varchar,
  	"image_id" integer,
  	"action_label" varchar,
  	"action_href" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_rich_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_split_content_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_split_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"image_position" "enum__services_v_blocks_split_content_image_position" DEFAULT 'right',
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__services_v_blocks_gallery_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"section_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_eyebrow" varchar,
  	"version_highlight" varchar,
  	"version_icon" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "projects_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "projects_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "projects_blocks_hero_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_hero_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"trailing_title" varchar,
  	"variant" "enum_projects_blocks_hero_variant" DEFAULT 'brand',
  	"badge" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "projects_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_problems_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "projects_blocks_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_problems_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_services_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_projects_blocks_services_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_projects_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_projects_blocks_projects_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"show_filters" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "projects_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_process_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"background_image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks__371b24084e14_extra_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "projects_blocks_product_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_blocks_product" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_product_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name" varchar,
  	"logo_id" integer,
  	"image_id" integer,
  	"composition" "enum_projects_blocks_product_composition" DEFAULT 'single',
  	"image_caption" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_projects_blocks_testimonials_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_posts_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_projects_blocks_posts_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_contact_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "projects_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_contact_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name_label" varchar DEFAULT 'Your name',
  	"name_placeholder" varchar DEFAULT 'Your full name',
  	"email_label" varchar DEFAULT 'Email address',
  	"email_placeholder" varchar DEFAULT 'you@company.com',
  	"company_label" varchar DEFAULT 'Company (optional)',
  	"company_placeholder" varchar DEFAULT 'Your company name',
  	"service_label" varchar DEFAULT 'What can we help with?',
  	"service_placeholder" varchar DEFAULT 'Choose a service',
  	"budget_label" varchar DEFAULT 'Project budget (optional)',
  	"budget_placeholder" varchar DEFAULT 'Select a range',
  	"message_label" varchar DEFAULT 'Tell us about your project',
  	"message_placeholder" varchar DEFAULT 'What would you like to build or improve?',
  	"submit_label" varchar DEFAULT 'Send enquiry',
  	"submitting_label" varchar DEFAULT 'Sending your enquiry…',
  	"error_message" varchar DEFAULT 'We could not save your enquiry. Please try again, or contact us by email.',
  	"privacy_note" varchar DEFAULT 'We use your details to respond to your enquiry.',
  	"card_title" varchar,
  	"card_button_label" varchar,
  	"card_button_href" varchar,
  	"success_message" varchar DEFAULT 'Thank you. Your enquiry has been saved and our team will be in touch.',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_faqs_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum_projects_blocks_faqs_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"support_title" varchar,
  	"support_description" varchar,
  	"image_id" integer,
  	"action_label" varchar,
  	"action_href" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_rich_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_split_content_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "projects_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_split_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"image_position" "enum_projects_blocks_split_content_image_position" DEFAULT 'right',
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "projects_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum_projects_blocks_gallery_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"section_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"client" varchar,
  	"industry" varchar,
  	"year" varchar,
  	"project_u_r_l" varchar,
  	"cover_image_id" integer,
  	"challenge" varchar,
  	"solution" varchar,
  	"testimonial_id" integer,
  	"content" jsonb,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_projects_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_hero_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"trailing_title" varchar,
  	"variant" "enum__projects_v_blocks_hero_variant" DEFAULT 'brand',
  	"badge" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_stats_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_problems_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_problems_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_services_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__projects_v_blocks_services_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_projects_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__projects_v_blocks_projects_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"show_filters" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_process_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"background_image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__projects_v_bloc_61ab51df60b2_extra_images_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_product_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_product" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_product_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name" varchar,
  	"logo_id" integer,
  	"image_id" integer,
  	"composition" "enum__projects_v_blocks_product_composition" DEFAULT 'single',
  	"image_caption" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_testimonials_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__projects_v_blocks_testimonials_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_posts_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__projects_v_blocks_posts_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_contact_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_contact_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"name_label" varchar DEFAULT 'Your name',
  	"name_placeholder" varchar DEFAULT 'Your full name',
  	"email_label" varchar DEFAULT 'Email address',
  	"email_placeholder" varchar DEFAULT 'you@company.com',
  	"company_label" varchar DEFAULT 'Company (optional)',
  	"company_placeholder" varchar DEFAULT 'Your company name',
  	"service_label" varchar DEFAULT 'What can we help with?',
  	"service_placeholder" varchar DEFAULT 'Choose a service',
  	"budget_label" varchar DEFAULT 'Project budget (optional)',
  	"budget_placeholder" varchar DEFAULT 'Select a range',
  	"message_label" varchar DEFAULT 'Tell us about your project',
  	"message_placeholder" varchar DEFAULT 'What would you like to build or improve?',
  	"submit_label" varchar DEFAULT 'Send enquiry',
  	"submitting_label" varchar DEFAULT 'Sending your enquiry…',
  	"error_message" varchar DEFAULT 'We could not save your enquiry. Please try again, or contact us by email.',
  	"privacy_note" varchar DEFAULT 'We use your details to respond to your enquiry.',
  	"card_title" varchar,
  	"card_button_label" varchar,
  	"card_button_href" varchar,
  	"success_message" varchar DEFAULT 'Thank you. Your enquiry has been saved and our team will be in touch.',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_faqs_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"selection_mode" "enum__projects_v_blocks_faqs_selection_mode" DEFAULT 'featured',
  	"max_items" numeric DEFAULT 0,
  	"support_title" varchar,
  	"support_description" varchar,
  	"image_id" integer,
  	"action_label" varchar,
  	"action_href" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_cta_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_rich_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_split_content_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_split_content_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"image_id" integer,
  	"image_position" "enum__projects_v_blocks_split_content_image_position" DEFAULT 'right',
  	"content" jsonb,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"theme" "enum__projects_v_blocks_gallery_theme" DEFAULT 'light',
  	"anchor" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_shared_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"section_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_client" varchar,
  	"version_industry" varchar,
  	"version_year" varchar,
  	"version_project_u_r_l" varchar,
  	"version_cover_image_id" integer,
  	"version_challenge" varchar,
  	"version_solution" varchar,
  	"version_testimonial_id" integer,
  	"version_content" jsonb,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"photo_id" integer,
  	"company_logo_id" integer,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "testimonials_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_quote" varchar,
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_company" varchar,
  	"version_photo_id" integer,
  	"version_company_logo_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_testimonials_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"author" varchar DEFAULT 'Imadi Innovations',
  	"category" varchar,
  	"published_at" timestamp(3) with time zone,
  	"read_time" varchar,
  	"body" jsonb,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_author" varchar DEFAULT 'Imadi Innovations',
  	"version_category" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_read_time" varchar,
  	"version_body" jsonb,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faqs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "faqs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "_faqs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_question" varchar,
  	"version_answer" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faqs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_faqs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"company" varchar,
  	"service" varchar,
  	"budget" varchar,
  	"message" varchar NOT NULL,
  	"source" varchar,
  	"status" "enum_enquiries_status" DEFAULT 'new',
  	"internal_notes" varchar,
  	"ip_hash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"shared_sections_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer,
  	"enquiries_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "site_settings_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "site_settings_footer_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'Imadi Innovations',
  	"tagline" varchar,
  	"description" varchar,
  	"logo_id" integer,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"contact_address" varchar,
  	"booking_label" varchar,
  	"booking_href" varchar,
  	"footer_headline" varchar,
  	"footer_highlight" varchar,
  	"footer_description" varchar,
  	"footer_copyright" varchar,
  	"labels_projects_link" varchar DEFAULT 'Explore all projects',
  	"labels_services_link" varchar DEFAULT 'Explore our services',
  	"labels_posts_link" varchar DEFAULT 'View all insights',
  	"labels_contact_link" varchar DEFAULT 'Let’s talk',
  	"labels_project_read_more" varchar DEFAULT 'View case study',
  	"labels_service_read_more" varchar DEFAULT 'Explore service',
  	"labels_post_read_more" varchar DEFAULT 'Read article',
  	"labels_all_filter" varchar DEFAULT 'All projects',
  	"labels_filter_label" varchar DEFAULT 'Filter by service',
  	"labels_open_menu" varchar DEFAULT 'Open menu',
  	"labels_close_menu" varchar DEFAULT 'Close menu',
  	"labels_previous_slide" varchar DEFAULT 'Previous testimonial',
  	"labels_next_slide" varchar DEFAULT 'Next testimonial',
  	"labels_form_error" varchar DEFAULT 'Please check the highlighted fields.',
  	"labels_form_name_error" varchar DEFAULT 'Enter your name.',
  	"labels_form_email_error" varchar DEFAULT 'Enter a valid email address.',
  	"labels_form_message_error" varchar DEFAULT 'Please tell us a little more (at least 20 characters).',
  	"labels_back_to_projects" varchar DEFAULT 'Back to projects',
  	"labels_back_to_insights" varchar DEFAULT 'Back to insights',
  	"labels_related_projects" varchar DEFAULT 'Related projects',
  	"labels_related_services" varchar DEFAULT 'Related services',
  	"labels_challenge_heading" varchar DEFAULT 'The challenge',
  	"labels_solution_heading" varchar DEFAULT 'Our approach',
  	"labels_results_heading" varchar DEFAULT 'The outcome',
  	"labels_client_label" varchar DEFAULT 'Client',
  	"labels_services_label" varchar DEFAULT 'Services',
  	"labels_year_label" varchar DEFAULT 'Year',
  	"labels_preview_notice" varchar DEFAULT 'Draft preview — unpublished content',
  	"labels_exit_preview" varchar DEFAULT 'Exit preview',
  	"labels_empty_projects" varchar DEFAULT 'More projects are on the way.',
  	"labels_empty_posts" varchar DEFAULT 'New insights are coming soon.',
  	"labels_not_found_title" varchar DEFAULT 'This page has moved.',
  	"labels_not_found_description" varchar DEFAULT 'Let’s get you back to exploring what we can build together.',
  	"labels_home_link" varchar DEFAULT 'Back to home',
  	"_status" "enum_site_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_settings_v_version_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_footer_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_company_name" varchar DEFAULT 'Imadi Innovations',
  	"version_tagline" varchar,
  	"version_description" varchar,
  	"version_logo_id" integer,
  	"version_contact_email" varchar,
  	"version_contact_phone" varchar,
  	"version_contact_address" varchar,
  	"version_booking_label" varchar,
  	"version_booking_href" varchar,
  	"version_footer_headline" varchar,
  	"version_footer_highlight" varchar,
  	"version_footer_description" varchar,
  	"version_footer_copyright" varchar,
  	"version_labels_projects_link" varchar DEFAULT 'Explore all projects',
  	"version_labels_services_link" varchar DEFAULT 'Explore our services',
  	"version_labels_posts_link" varchar DEFAULT 'View all insights',
  	"version_labels_contact_link" varchar DEFAULT 'Let’s talk',
  	"version_labels_project_read_more" varchar DEFAULT 'View case study',
  	"version_labels_service_read_more" varchar DEFAULT 'Explore service',
  	"version_labels_post_read_more" varchar DEFAULT 'Read article',
  	"version_labels_all_filter" varchar DEFAULT 'All projects',
  	"version_labels_filter_label" varchar DEFAULT 'Filter by service',
  	"version_labels_open_menu" varchar DEFAULT 'Open menu',
  	"version_labels_close_menu" varchar DEFAULT 'Close menu',
  	"version_labels_previous_slide" varchar DEFAULT 'Previous testimonial',
  	"version_labels_next_slide" varchar DEFAULT 'Next testimonial',
  	"version_labels_form_error" varchar DEFAULT 'Please check the highlighted fields.',
  	"version_labels_form_name_error" varchar DEFAULT 'Enter your name.',
  	"version_labels_form_email_error" varchar DEFAULT 'Enter a valid email address.',
  	"version_labels_form_message_error" varchar DEFAULT 'Please tell us a little more (at least 20 characters).',
  	"version_labels_back_to_projects" varchar DEFAULT 'Back to projects',
  	"version_labels_back_to_insights" varchar DEFAULT 'Back to insights',
  	"version_labels_related_projects" varchar DEFAULT 'Related projects',
  	"version_labels_related_services" varchar DEFAULT 'Related services',
  	"version_labels_challenge_heading" varchar DEFAULT 'The challenge',
  	"version_labels_solution_heading" varchar DEFAULT 'Our approach',
  	"version_labels_results_heading" varchar DEFAULT 'The outcome',
  	"version_labels_client_label" varchar DEFAULT 'Client',
  	"version_labels_services_label" varchar DEFAULT 'Services',
  	"version_labels_year_label" varchar DEFAULT 'Year',
  	"version_labels_preview_notice" varchar DEFAULT 'Draft preview — unpublished content',
  	"version_labels_exit_preview" varchar DEFAULT 'Exit preview',
  	"version_labels_empty_projects" varchar DEFAULT 'More projects are on the way.',
  	"version_labels_empty_posts" varchar DEFAULT 'New insights are coming soon.',
  	"version_labels_not_found_title" varchar DEFAULT 'This page has moved.',
  	"version_labels_not_found_description" varchar DEFAULT 'Let’s get you back to exploring what we can build together.',
  	"version_labels_home_link" varchar DEFAULT 'Back to home',
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_proof" ADD CONSTRAINT "pages_blocks_hero_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_problems_items" ADD CONSTRAINT "pages_blocks_problems_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_problems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_problems" ADD CONSTRAINT "pages_blocks_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pro_150499696b41_extra_images" ADD CONSTRAINT "pages_blocks_pro_150499696b41_extra_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pro_150499696b41_extra_images" ADD CONSTRAINT "pages_blocks_pro_150499696b41_extra_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_features" ADD CONSTRAINT "pages_blocks_product_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product" ADD CONSTRAINT "pages_blocks_product_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product" ADD CONSTRAINT "pages_blocks_product_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product" ADD CONSTRAINT "pages_blocks_product_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts" ADD CONSTRAINT "pages_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_budget_options" ADD CONSTRAINT "pages_blocks_contact_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faqs" ADD CONSTRAINT "pages_blocks_faqs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faqs" ADD CONSTRAINT "pages_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_content" ADD CONSTRAINT "pages_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content_items" ADD CONSTRAINT "pages_blocks_split_content_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content" ADD CONSTRAINT "pages_blocks_split_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content" ADD CONSTRAINT "pages_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_shared_section" ADD CONSTRAINT "pages_blocks_shared_section_section_id_shared_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."shared_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_shared_section" ADD CONSTRAINT "pages_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_proof" ADD CONSTRAINT "_pages_v_blocks_hero_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_problems_items" ADD CONSTRAINT "_pages_v_blocks_problems_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_problems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_problems" ADD CONSTRAINT "_pages_v_blocks_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services" ADD CONSTRAINT "_pages_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects" ADD CONSTRAINT "_pages_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process" ADD CONSTRAINT "_pages_v_blocks_process_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process" ADD CONSTRAINT "_pages_v_blocks_process_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process" ADD CONSTRAINT "_pages_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_blocks__ea3525432fe9_extra_images_v" ADD CONSTRAINT "__pages_v_blocks__ea3525432fe9_extra_images_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_blocks__ea3525432fe9_extra_images_v" ADD CONSTRAINT "__pages_v_blocks__ea3525432fe9_extra_images_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_features" ADD CONSTRAINT "_pages_v_blocks_product_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product" ADD CONSTRAINT "_pages_v_blocks_product_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product" ADD CONSTRAINT "_pages_v_blocks_product_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product" ADD CONSTRAINT "_pages_v_blocks_product_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts" ADD CONSTRAINT "_pages_v_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_budget_options" ADD CONSTRAINT "_pages_v_blocks_contact_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faqs" ADD CONSTRAINT "_pages_v_blocks_faqs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faqs" ADD CONSTRAINT "_pages_v_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_content" ADD CONSTRAINT "_pages_v_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content_items" ADD CONSTRAINT "_pages_v_blocks_split_content_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content" ADD CONSTRAINT "_pages_v_blocks_split_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content" ADD CONSTRAINT "_pages_v_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_shared_section" ADD CONSTRAINT "_pages_v_blocks_shared_section_section_id_shared_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."shared_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_shared_section" ADD CONSTRAINT "_pages_v_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_hero_proof" ADD CONSTRAINT "shared_sections_blocks_hero_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_hero" ADD CONSTRAINT "shared_sections_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_hero" ADD CONSTRAINT "shared_sections_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_stats_items" ADD CONSTRAINT "shared_sections_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_stats" ADD CONSTRAINT "shared_sections_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_problems_items" ADD CONSTRAINT "shared_sections_blocks_problems_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_problems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_problems" ADD CONSTRAINT "shared_sections_blocks_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_services" ADD CONSTRAINT "shared_sections_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_projects" ADD CONSTRAINT "shared_sections_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_process_steps" ADD CONSTRAINT "shared_sections_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_process" ADD CONSTRAINT "shared_sections_blocks_process_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_process" ADD CONSTRAINT "shared_sections_blocks_process_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_process" ADD CONSTRAINT "shared_sections_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections__98fa94584746_extra_images" ADD CONSTRAINT "shared_sections__98fa94584746_extra_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections__98fa94584746_extra_images" ADD CONSTRAINT "shared_sections__98fa94584746_extra_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_product_features" ADD CONSTRAINT "shared_sections_blocks_product_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_product" ADD CONSTRAINT "shared_sections_blocks_product_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_product" ADD CONSTRAINT "shared_sections_blocks_product_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_product" ADD CONSTRAINT "shared_sections_blocks_product_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_testimonials" ADD CONSTRAINT "shared_sections_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_posts" ADD CONSTRAINT "shared_sections_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_contact_budget_options" ADD CONSTRAINT "shared_sections_blocks_contact_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_contact" ADD CONSTRAINT "shared_sections_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_faqs" ADD CONSTRAINT "shared_sections_blocks_faqs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_faqs" ADD CONSTRAINT "shared_sections_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_cta" ADD CONSTRAINT "shared_sections_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_rich_content" ADD CONSTRAINT "shared_sections_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_split_content_items" ADD CONSTRAINT "shared_sections_blocks_split_content_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_split_content" ADD CONSTRAINT "shared_sections_blocks_split_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_split_content" ADD CONSTRAINT "shared_sections_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_gallery_images" ADD CONSTRAINT "shared_sections_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_gallery_images" ADD CONSTRAINT "shared_sections_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_blocks_gallery" ADD CONSTRAINT "shared_sections_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_rels" ADD CONSTRAINT "shared_sections_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_rels" ADD CONSTRAINT "shared_sections_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_rels" ADD CONSTRAINT "shared_sections_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_rels" ADD CONSTRAINT "shared_sections_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_rels" ADD CONSTRAINT "shared_sections_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections_rels" ADD CONSTRAINT "shared_sections_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_hero_proof" ADD CONSTRAINT "_shared_sections_v_blocks_hero_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_hero" ADD CONSTRAINT "_shared_sections_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_hero" ADD CONSTRAINT "_shared_sections_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_stats_items" ADD CONSTRAINT "_shared_sections_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_stats" ADD CONSTRAINT "_shared_sections_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_problems_items" ADD CONSTRAINT "_shared_sections_v_blocks_problems_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_problems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_problems" ADD CONSTRAINT "_shared_sections_v_blocks_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_services" ADD CONSTRAINT "_shared_sections_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_projects" ADD CONSTRAINT "_shared_sections_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_process_steps" ADD CONSTRAINT "_shared_sections_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_process" ADD CONSTRAINT "_shared_sections_v_blocks_process_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_process" ADD CONSTRAINT "_shared_sections_v_blocks_process_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_process" ADD CONSTRAINT "_shared_sections_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__shared_sections_beac5e433a6d_extra_images_v" ADD CONSTRAINT "__shared_sections_beac5e433a6d_extra_images_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__shared_sections_beac5e433a6d_extra_images_v" ADD CONSTRAINT "__shared_sections_beac5e433a6d_extra_images_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_product_features" ADD CONSTRAINT "_shared_sections_v_blocks_product_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_product" ADD CONSTRAINT "_shared_sections_v_blocks_product_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_product" ADD CONSTRAINT "_shared_sections_v_blocks_product_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_product" ADD CONSTRAINT "_shared_sections_v_blocks_product_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_testimonials" ADD CONSTRAINT "_shared_sections_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_posts" ADD CONSTRAINT "_shared_sections_v_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_contact_budget_options" ADD CONSTRAINT "_shared_sections_v_blocks_contact_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD CONSTRAINT "_shared_sections_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_faqs" ADD CONSTRAINT "_shared_sections_v_blocks_faqs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_faqs" ADD CONSTRAINT "_shared_sections_v_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_cta" ADD CONSTRAINT "_shared_sections_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_rich_content" ADD CONSTRAINT "_shared_sections_v_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_split_content_items" ADD CONSTRAINT "_shared_sections_v_blocks_split_content_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_split_content" ADD CONSTRAINT "_shared_sections_v_blocks_split_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_split_content" ADD CONSTRAINT "_shared_sections_v_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_gallery_images" ADD CONSTRAINT "_shared_sections_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_gallery_images" ADD CONSTRAINT "_shared_sections_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_blocks_gallery" ADD CONSTRAINT "_shared_sections_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v" ADD CONSTRAINT "_shared_sections_v_parent_id_shared_sections_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."shared_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_rels" ADD CONSTRAINT "_shared_sections_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_shared_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_rels" ADD CONSTRAINT "_shared_sections_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_rels" ADD CONSTRAINT "_shared_sections_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_rels" ADD CONSTRAINT "_shared_sections_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_rels" ADD CONSTRAINT "_shared_sections_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shared_sections_v_rels" ADD CONSTRAINT "_shared_sections_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_tags" ADD CONSTRAINT "services_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_benefits" ADD CONSTRAINT "services_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_statistics" ADD CONSTRAINT "services_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_proof" ADD CONSTRAINT "services_blocks_hero_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items" ADD CONSTRAINT "services_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats" ADD CONSTRAINT "services_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_problems_items" ADD CONSTRAINT "services_blocks_problems_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_problems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_problems" ADD CONSTRAINT "services_blocks_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services" ADD CONSTRAINT "services_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_projects" ADD CONSTRAINT "services_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_steps" ADD CONSTRAINT "services_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process" ADD CONSTRAINT "services_blocks_process_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_process" ADD CONSTRAINT "services_blocks_process_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_process" ADD CONSTRAINT "services_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks__5a63a975b80a_extra_images" ADD CONSTRAINT "services_blocks__5a63a975b80a_extra_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks__5a63a975b80a_extra_images" ADD CONSTRAINT "services_blocks__5a63a975b80a_extra_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_product_features" ADD CONSTRAINT "services_blocks_product_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_product" ADD CONSTRAINT "services_blocks_product_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_product" ADD CONSTRAINT "services_blocks_product_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_product" ADD CONSTRAINT "services_blocks_product_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials" ADD CONSTRAINT "services_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_posts" ADD CONSTRAINT "services_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact_budget_options" ADD CONSTRAINT "services_blocks_contact_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact" ADD CONSTRAINT "services_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faqs" ADD CONSTRAINT "services_blocks_faqs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_faqs" ADD CONSTRAINT "services_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_content" ADD CONSTRAINT "services_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_split_content_items" ADD CONSTRAINT "services_blocks_split_content_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_split_content" ADD CONSTRAINT "services_blocks_split_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_split_content" ADD CONSTRAINT "services_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_images" ADD CONSTRAINT "services_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_images" ADD CONSTRAINT "services_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery" ADD CONSTRAINT "services_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_shared_section" ADD CONSTRAINT "services_blocks_shared_section_section_id_shared_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."shared_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_shared_section" ADD CONSTRAINT "services_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_tags" ADD CONSTRAINT "_services_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_benefits" ADD CONSTRAINT "_services_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_statistics" ADD CONSTRAINT "_services_v_version_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_proof" ADD CONSTRAINT "_services_v_blocks_hero_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items" ADD CONSTRAINT "_services_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats" ADD CONSTRAINT "_services_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_problems_items" ADD CONSTRAINT "_services_v_blocks_problems_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_problems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_problems" ADD CONSTRAINT "_services_v_blocks_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_services" ADD CONSTRAINT "_services_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_projects" ADD CONSTRAINT "_services_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_steps" ADD CONSTRAINT "_services_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process" ADD CONSTRAINT "_services_v_blocks_process_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process" ADD CONSTRAINT "_services_v_blocks_process_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process" ADD CONSTRAINT "_services_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_bloc_1f49bb99e465_extra_images_v" ADD CONSTRAINT "__services_v_bloc_1f49bb99e465_extra_images_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_bloc_1f49bb99e465_extra_images_v" ADD CONSTRAINT "__services_v_bloc_1f49bb99e465_extra_images_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_product_features" ADD CONSTRAINT "_services_v_blocks_product_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_product" ADD CONSTRAINT "_services_v_blocks_product_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_product" ADD CONSTRAINT "_services_v_blocks_product_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_product" ADD CONSTRAINT "_services_v_blocks_product_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials" ADD CONSTRAINT "_services_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_posts" ADD CONSTRAINT "_services_v_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact_budget_options" ADD CONSTRAINT "_services_v_blocks_contact_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_contact" ADD CONSTRAINT "_services_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faqs" ADD CONSTRAINT "_services_v_blocks_faqs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faqs" ADD CONSTRAINT "_services_v_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta" ADD CONSTRAINT "_services_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_content" ADD CONSTRAINT "_services_v_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_split_content_items" ADD CONSTRAINT "_services_v_blocks_split_content_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_split_content" ADD CONSTRAINT "_services_v_blocks_split_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_split_content" ADD CONSTRAINT "_services_v_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_gallery_images" ADD CONSTRAINT "_services_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_gallery_images" ADD CONSTRAINT "_services_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_gallery" ADD CONSTRAINT "_services_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_shared_section" ADD CONSTRAINT "_services_v_blocks_shared_section_section_id_shared_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."shared_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_shared_section" ADD CONSTRAINT "_services_v_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_categories" ADD CONSTRAINT "projects_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_results" ADD CONSTRAINT "projects_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero_proof" ADD CONSTRAINT "projects_blocks_hero_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_hero" ADD CONSTRAINT "projects_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats_items" ADD CONSTRAINT "projects_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_stats" ADD CONSTRAINT "projects_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_problems_items" ADD CONSTRAINT "projects_blocks_problems_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_problems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_problems" ADD CONSTRAINT "projects_blocks_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_services" ADD CONSTRAINT "projects_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_projects" ADD CONSTRAINT "projects_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_process_steps" ADD CONSTRAINT "projects_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_process" ADD CONSTRAINT "projects_blocks_process_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_process" ADD CONSTRAINT "projects_blocks_process_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_process" ADD CONSTRAINT "projects_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks__371b24084e14_extra_images" ADD CONSTRAINT "projects_blocks__371b24084e14_extra_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks__371b24084e14_extra_images" ADD CONSTRAINT "projects_blocks__371b24084e14_extra_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_product_features" ADD CONSTRAINT "projects_blocks_product_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_product" ADD CONSTRAINT "projects_blocks_product_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_product" ADD CONSTRAINT "projects_blocks_product_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_product" ADD CONSTRAINT "projects_blocks_product_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_testimonials" ADD CONSTRAINT "projects_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_posts" ADD CONSTRAINT "projects_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact_budget_options" ADD CONSTRAINT "projects_blocks_contact_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_contact" ADD CONSTRAINT "projects_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_faqs" ADD CONSTRAINT "projects_blocks_faqs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_faqs" ADD CONSTRAINT "projects_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_cta" ADD CONSTRAINT "projects_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_content" ADD CONSTRAINT "projects_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_split_content_items" ADD CONSTRAINT "projects_blocks_split_content_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_split_content" ADD CONSTRAINT "projects_blocks_split_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_split_content" ADD CONSTRAINT "projects_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery" ADD CONSTRAINT "projects_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_shared_section" ADD CONSTRAINT "projects_blocks_shared_section_section_id_shared_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."shared_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_shared_section" ADD CONSTRAINT "projects_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_categories" ADD CONSTRAINT "_projects_v_version_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_results" ADD CONSTRAINT "_projects_v_version_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero_proof" ADD CONSTRAINT "_projects_v_blocks_hero_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_hero" ADD CONSTRAINT "_projects_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats_items" ADD CONSTRAINT "_projects_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_stats" ADD CONSTRAINT "_projects_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_problems_items" ADD CONSTRAINT "_projects_v_blocks_problems_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_problems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_problems" ADD CONSTRAINT "_projects_v_blocks_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_services" ADD CONSTRAINT "_projects_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_projects" ADD CONSTRAINT "_projects_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_process_steps" ADD CONSTRAINT "_projects_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_process" ADD CONSTRAINT "_projects_v_blocks_process_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_process" ADD CONSTRAINT "_projects_v_blocks_process_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_process" ADD CONSTRAINT "_projects_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__projects_v_bloc_61ab51df60b2_extra_images_v" ADD CONSTRAINT "__projects_v_bloc_61ab51df60b2_extra_images_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__projects_v_bloc_61ab51df60b2_extra_images_v" ADD CONSTRAINT "__projects_v_bloc_61ab51df60b2_extra_images_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_product_features" ADD CONSTRAINT "_projects_v_blocks_product_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_product" ADD CONSTRAINT "_projects_v_blocks_product_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_product" ADD CONSTRAINT "_projects_v_blocks_product_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_product" ADD CONSTRAINT "_projects_v_blocks_product_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_testimonials" ADD CONSTRAINT "_projects_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_posts" ADD CONSTRAINT "_projects_v_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact_budget_options" ADD CONSTRAINT "_projects_v_blocks_contact_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_contact" ADD CONSTRAINT "_projects_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faqs" ADD CONSTRAINT "_projects_v_blocks_faqs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_faqs" ADD CONSTRAINT "_projects_v_blocks_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_cta" ADD CONSTRAINT "_projects_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_content" ADD CONSTRAINT "_projects_v_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_split_content_items" ADD CONSTRAINT "_projects_v_blocks_split_content_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_split_content" ADD CONSTRAINT "_projects_v_blocks_split_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_split_content" ADD CONSTRAINT "_projects_v_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery" ADD CONSTRAINT "_projects_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_shared_section" ADD CONSTRAINT "_projects_v_blocks_shared_section_section_id_shared_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."shared_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_shared_section" ADD CONSTRAINT "_projects_v_blocks_shared_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_testimonial_id_testimonials_id_fk" FOREIGN KEY ("version_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_rels" ADD CONSTRAINT "testimonials_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_rels" ADD CONSTRAINT "testimonials_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_company_logo_id_media_id_fk" FOREIGN KEY ("version_company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v_rels" ADD CONSTRAINT "_testimonials_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_testimonials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testimonials_v_rels" ADD CONSTRAINT "_testimonials_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs_rels" ADD CONSTRAINT "faqs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_rels" ADD CONSTRAINT "faqs_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v_rels" ADD CONSTRAINT "_faqs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_faqs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v_rels" ADD CONSTRAINT "_faqs_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shared_sections_fk" FOREIGN KEY ("shared_sections_id") REFERENCES "public"."shared_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_navigation" ADD CONSTRAINT "site_settings_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_navigation" ADD CONSTRAINT "site_settings_footer_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_socials" ADD CONSTRAINT "_site_settings_v_version_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_navigation" ADD CONSTRAINT "_site_settings_v_version_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_footer_navigation" ADD CONSTRAINT "_site_settings_v_version_footer_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "pages_blocks_hero_proof_order_idx" ON "pages_blocks_hero_proof" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_proof_parent_id_idx" ON "pages_blocks_hero_proof" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_problems_items_order_idx" ON "pages_blocks_problems_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_problems_items_parent_id_idx" ON "pages_blocks_problems_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_problems_order_idx" ON "pages_blocks_problems" USING btree ("_order");
  CREATE INDEX "pages_blocks_problems_parent_id_idx" ON "pages_blocks_problems" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_problems_path_idx" ON "pages_blocks_problems" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_projects_order_idx" ON "pages_blocks_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_parent_id_idx" ON "pages_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_path_idx" ON "pages_blocks_projects" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_order_idx" ON "pages_blocks_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_parent_id_idx" ON "pages_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_path_idx" ON "pages_blocks_process" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_image_idx" ON "pages_blocks_process" USING btree ("image_id");
  CREATE INDEX "pages_blocks_process_background_image_idx" ON "pages_blocks_process" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_pro_150499696b41_extra_images_order_idx" ON "pages_blocks_pro_150499696b41_extra_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_pro_150499696b41_extra_images_parent_id_idx" ON "pages_blocks_pro_150499696b41_extra_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pro_150499696b41_extra_images_image_idx" ON "pages_blocks_pro_150499696b41_extra_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_product_features_order_idx" ON "pages_blocks_product_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_features_parent_id_idx" ON "pages_blocks_product_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_order_idx" ON "pages_blocks_product" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_parent_id_idx" ON "pages_blocks_product" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_path_idx" ON "pages_blocks_product" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_logo_idx" ON "pages_blocks_product" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_product_image_idx" ON "pages_blocks_product" USING btree ("image_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_posts_order_idx" ON "pages_blocks_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_posts_parent_id_idx" ON "pages_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_posts_path_idx" ON "pages_blocks_posts" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_budget_options_order_idx" ON "pages_blocks_contact_budget_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_budget_options_parent_id_idx" ON "pages_blocks_contact_budget_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_faqs_order_idx" ON "pages_blocks_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_faqs_parent_id_idx" ON "pages_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faqs_path_idx" ON "pages_blocks_faqs" USING btree ("_path");
  CREATE INDEX "pages_blocks_faqs_image_idx" ON "pages_blocks_faqs" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_content_order_idx" ON "pages_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_content_parent_id_idx" ON "pages_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_content_path_idx" ON "pages_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_content_items_order_idx" ON "pages_blocks_split_content_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_content_items_parent_id_idx" ON "pages_blocks_split_content_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_order_idx" ON "pages_blocks_split_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_content_parent_id_idx" ON "pages_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_path_idx" ON "pages_blocks_split_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_content_image_idx" ON "pages_blocks_split_content" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_shared_section_order_idx" ON "pages_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_shared_section_parent_id_idx" ON "pages_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_shared_section_path_idx" ON "pages_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_shared_section_section_idx" ON "pages_blocks_shared_section" USING btree ("section_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_blocks_hero_proof_order_idx" ON "_pages_v_blocks_hero_proof" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_proof_parent_id_idx" ON "_pages_v_blocks_hero_proof" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_problems_items_order_idx" ON "_pages_v_blocks_problems_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_problems_items_parent_id_idx" ON "_pages_v_blocks_problems_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_problems_order_idx" ON "_pages_v_blocks_problems" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_problems_parent_id_idx" ON "_pages_v_blocks_problems" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_problems_path_idx" ON "_pages_v_blocks_problems" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_order_idx" ON "_pages_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_parent_id_idx" ON "_pages_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_path_idx" ON "_pages_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_projects_order_idx" ON "_pages_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_parent_id_idx" ON "_pages_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_path_idx" ON "_pages_v_blocks_projects" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_order_idx" ON "_pages_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_parent_id_idx" ON "_pages_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_path_idx" ON "_pages_v_blocks_process" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_image_idx" ON "_pages_v_blocks_process" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_process_background_image_idx" ON "_pages_v_blocks_process" USING btree ("background_image_id");
  CREATE INDEX "__pages_v_blocks__ea3525432fe9_extra_images_v_order_idx" ON "__pages_v_blocks__ea3525432fe9_extra_images_v" USING btree ("_order");
  CREATE INDEX "__pages_v_blocks__ea3525432fe9_extra_images_v_parent_id_idx" ON "__pages_v_blocks__ea3525432fe9_extra_images_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_blocks__ea3525432fe9_extra_images_v_image_idx" ON "__pages_v_blocks__ea3525432fe9_extra_images_v" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_product_features_order_idx" ON "_pages_v_blocks_product_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_features_parent_id_idx" ON "_pages_v_blocks_product_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_order_idx" ON "_pages_v_blocks_product" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_parent_id_idx" ON "_pages_v_blocks_product" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_path_idx" ON "_pages_v_blocks_product" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_logo_idx" ON "_pages_v_blocks_product" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_product_image_idx" ON "_pages_v_blocks_product" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_posts_order_idx" ON "_pages_v_blocks_posts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_posts_parent_id_idx" ON "_pages_v_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_posts_path_idx" ON "_pages_v_blocks_posts" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_budget_options_order_idx" ON "_pages_v_blocks_contact_budget_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_budget_options_parent_id_idx" ON "_pages_v_blocks_contact_budget_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faqs_order_idx" ON "_pages_v_blocks_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faqs_parent_id_idx" ON "_pages_v_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faqs_path_idx" ON "_pages_v_blocks_faqs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faqs_image_idx" ON "_pages_v_blocks_faqs" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_content_order_idx" ON "_pages_v_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_content_parent_id_idx" ON "_pages_v_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_content_path_idx" ON "_pages_v_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_content_items_order_idx" ON "_pages_v_blocks_split_content_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_content_items_parent_id_idx" ON "_pages_v_blocks_split_content_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_order_idx" ON "_pages_v_blocks_split_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_content_parent_id_idx" ON "_pages_v_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_path_idx" ON "_pages_v_blocks_split_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_content_image_idx" ON "_pages_v_blocks_split_content" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_shared_section_order_idx" ON "_pages_v_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_shared_section_parent_id_idx" ON "_pages_v_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_shared_section_path_idx" ON "_pages_v_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_shared_section_section_idx" ON "_pages_v_blocks_shared_section" USING btree ("section_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "_pages_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "shared_sections_blocks_hero_proof_order_idx" ON "shared_sections_blocks_hero_proof" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_hero_proof_parent_id_idx" ON "shared_sections_blocks_hero_proof" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_hero_order_idx" ON "shared_sections_blocks_hero" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_hero_parent_id_idx" ON "shared_sections_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_hero_path_idx" ON "shared_sections_blocks_hero" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_hero_image_idx" ON "shared_sections_blocks_hero" USING btree ("image_id");
  CREATE INDEX "shared_sections_blocks_stats_items_order_idx" ON "shared_sections_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_stats_items_parent_id_idx" ON "shared_sections_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_stats_order_idx" ON "shared_sections_blocks_stats" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_stats_parent_id_idx" ON "shared_sections_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_stats_path_idx" ON "shared_sections_blocks_stats" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_problems_items_order_idx" ON "shared_sections_blocks_problems_items" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_problems_items_parent_id_idx" ON "shared_sections_blocks_problems_items" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_problems_order_idx" ON "shared_sections_blocks_problems" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_problems_parent_id_idx" ON "shared_sections_blocks_problems" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_problems_path_idx" ON "shared_sections_blocks_problems" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_services_order_idx" ON "shared_sections_blocks_services" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_services_parent_id_idx" ON "shared_sections_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_services_path_idx" ON "shared_sections_blocks_services" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_projects_order_idx" ON "shared_sections_blocks_projects" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_projects_parent_id_idx" ON "shared_sections_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_projects_path_idx" ON "shared_sections_blocks_projects" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_process_steps_order_idx" ON "shared_sections_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_process_steps_parent_id_idx" ON "shared_sections_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_process_order_idx" ON "shared_sections_blocks_process" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_process_parent_id_idx" ON "shared_sections_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_process_path_idx" ON "shared_sections_blocks_process" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_process_image_idx" ON "shared_sections_blocks_process" USING btree ("image_id");
  CREATE INDEX "shared_sections_blocks_process_background_image_idx" ON "shared_sections_blocks_process" USING btree ("background_image_id");
  CREATE INDEX "shared_sections__98fa94584746_extra_images_order_idx" ON "shared_sections__98fa94584746_extra_images" USING btree ("_order");
  CREATE INDEX "shared_sections__98fa94584746_extra_images_parent_id_idx" ON "shared_sections__98fa94584746_extra_images" USING btree ("_parent_id");
  CREATE INDEX "shared_sections__98fa94584746_extra_images_image_idx" ON "shared_sections__98fa94584746_extra_images" USING btree ("image_id");
  CREATE INDEX "shared_sections_blocks_product_features_order_idx" ON "shared_sections_blocks_product_features" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_product_features_parent_id_idx" ON "shared_sections_blocks_product_features" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_product_order_idx" ON "shared_sections_blocks_product" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_product_parent_id_idx" ON "shared_sections_blocks_product" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_product_path_idx" ON "shared_sections_blocks_product" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_product_logo_idx" ON "shared_sections_blocks_product" USING btree ("logo_id");
  CREATE INDEX "shared_sections_blocks_product_image_idx" ON "shared_sections_blocks_product" USING btree ("image_id");
  CREATE INDEX "shared_sections_blocks_testimonials_order_idx" ON "shared_sections_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_testimonials_parent_id_idx" ON "shared_sections_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_testimonials_path_idx" ON "shared_sections_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_posts_order_idx" ON "shared_sections_blocks_posts" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_posts_parent_id_idx" ON "shared_sections_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_posts_path_idx" ON "shared_sections_blocks_posts" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_contact_budget_options_order_idx" ON "shared_sections_blocks_contact_budget_options" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_contact_budget_options_parent_id_idx" ON "shared_sections_blocks_contact_budget_options" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_contact_order_idx" ON "shared_sections_blocks_contact" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_contact_parent_id_idx" ON "shared_sections_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_contact_path_idx" ON "shared_sections_blocks_contact" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_faqs_order_idx" ON "shared_sections_blocks_faqs" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_faqs_parent_id_idx" ON "shared_sections_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_faqs_path_idx" ON "shared_sections_blocks_faqs" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_faqs_image_idx" ON "shared_sections_blocks_faqs" USING btree ("image_id");
  CREATE INDEX "shared_sections_blocks_cta_order_idx" ON "shared_sections_blocks_cta" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_cta_parent_id_idx" ON "shared_sections_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_cta_path_idx" ON "shared_sections_blocks_cta" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_rich_content_order_idx" ON "shared_sections_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_rich_content_parent_id_idx" ON "shared_sections_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_rich_content_path_idx" ON "shared_sections_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_split_content_items_order_idx" ON "shared_sections_blocks_split_content_items" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_split_content_items_parent_id_idx" ON "shared_sections_blocks_split_content_items" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_split_content_order_idx" ON "shared_sections_blocks_split_content" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_split_content_parent_id_idx" ON "shared_sections_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_split_content_path_idx" ON "shared_sections_blocks_split_content" USING btree ("_path");
  CREATE INDEX "shared_sections_blocks_split_content_image_idx" ON "shared_sections_blocks_split_content" USING btree ("image_id");
  CREATE INDEX "shared_sections_blocks_gallery_images_order_idx" ON "shared_sections_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_gallery_images_parent_id_idx" ON "shared_sections_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_gallery_images_image_idx" ON "shared_sections_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "shared_sections_blocks_gallery_order_idx" ON "shared_sections_blocks_gallery" USING btree ("_order");
  CREATE INDEX "shared_sections_blocks_gallery_parent_id_idx" ON "shared_sections_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "shared_sections_blocks_gallery_path_idx" ON "shared_sections_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "shared_sections_slug_idx" ON "shared_sections" USING btree ("slug");
  CREATE INDEX "shared_sections_updated_at_idx" ON "shared_sections" USING btree ("updated_at");
  CREATE INDEX "shared_sections_created_at_idx" ON "shared_sections" USING btree ("created_at");
  CREATE INDEX "shared_sections__status_idx" ON "shared_sections" USING btree ("_status");
  CREATE INDEX "shared_sections_rels_order_idx" ON "shared_sections_rels" USING btree ("order");
  CREATE INDEX "shared_sections_rels_parent_idx" ON "shared_sections_rels" USING btree ("parent_id");
  CREATE INDEX "shared_sections_rels_path_idx" ON "shared_sections_rels" USING btree ("path");
  CREATE INDEX "shared_sections_rels_services_id_idx" ON "shared_sections_rels" USING btree ("services_id");
  CREATE INDEX "shared_sections_rels_projects_id_idx" ON "shared_sections_rels" USING btree ("projects_id");
  CREATE INDEX "shared_sections_rels_testimonials_id_idx" ON "shared_sections_rels" USING btree ("testimonials_id");
  CREATE INDEX "shared_sections_rels_posts_id_idx" ON "shared_sections_rels" USING btree ("posts_id");
  CREATE INDEX "shared_sections_rels_faqs_id_idx" ON "shared_sections_rels" USING btree ("faqs_id");
  CREATE INDEX "_shared_sections_v_blocks_hero_proof_order_idx" ON "_shared_sections_v_blocks_hero_proof" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_hero_proof_parent_id_idx" ON "_shared_sections_v_blocks_hero_proof" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_hero_order_idx" ON "_shared_sections_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_hero_parent_id_idx" ON "_shared_sections_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_hero_path_idx" ON "_shared_sections_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_hero_image_idx" ON "_shared_sections_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_shared_sections_v_blocks_stats_items_order_idx" ON "_shared_sections_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_stats_items_parent_id_idx" ON "_shared_sections_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_stats_order_idx" ON "_shared_sections_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_stats_parent_id_idx" ON "_shared_sections_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_stats_path_idx" ON "_shared_sections_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_problems_items_order_idx" ON "_shared_sections_v_blocks_problems_items" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_problems_items_parent_id_idx" ON "_shared_sections_v_blocks_problems_items" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_problems_order_idx" ON "_shared_sections_v_blocks_problems" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_problems_parent_id_idx" ON "_shared_sections_v_blocks_problems" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_problems_path_idx" ON "_shared_sections_v_blocks_problems" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_services_order_idx" ON "_shared_sections_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_services_parent_id_idx" ON "_shared_sections_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_services_path_idx" ON "_shared_sections_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_projects_order_idx" ON "_shared_sections_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_projects_parent_id_idx" ON "_shared_sections_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_projects_path_idx" ON "_shared_sections_v_blocks_projects" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_process_steps_order_idx" ON "_shared_sections_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_process_steps_parent_id_idx" ON "_shared_sections_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_process_order_idx" ON "_shared_sections_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_process_parent_id_idx" ON "_shared_sections_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_process_path_idx" ON "_shared_sections_v_blocks_process" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_process_image_idx" ON "_shared_sections_v_blocks_process" USING btree ("image_id");
  CREATE INDEX "_shared_sections_v_blocks_process_background_image_idx" ON "_shared_sections_v_blocks_process" USING btree ("background_image_id");
  CREATE INDEX "__shared_sections_beac5e433a6d_extra_images_v_order_idx" ON "__shared_sections_beac5e433a6d_extra_images_v" USING btree ("_order");
  CREATE INDEX "__shared_sections_beac5e433a6d_extra_images_v_parent_id_idx" ON "__shared_sections_beac5e433a6d_extra_images_v" USING btree ("_parent_id");
  CREATE INDEX "__shared_sections_beac5e433a6d_extra_images_v_image_idx" ON "__shared_sections_beac5e433a6d_extra_images_v" USING btree ("image_id");
  CREATE INDEX "_shared_sections_v_blocks_product_features_order_idx" ON "_shared_sections_v_blocks_product_features" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_product_features_parent_id_idx" ON "_shared_sections_v_blocks_product_features" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_product_order_idx" ON "_shared_sections_v_blocks_product" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_product_parent_id_idx" ON "_shared_sections_v_blocks_product" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_product_path_idx" ON "_shared_sections_v_blocks_product" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_product_logo_idx" ON "_shared_sections_v_blocks_product" USING btree ("logo_id");
  CREATE INDEX "_shared_sections_v_blocks_product_image_idx" ON "_shared_sections_v_blocks_product" USING btree ("image_id");
  CREATE INDEX "_shared_sections_v_blocks_testimonials_order_idx" ON "_shared_sections_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_testimonials_parent_id_idx" ON "_shared_sections_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_testimonials_path_idx" ON "_shared_sections_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_posts_order_idx" ON "_shared_sections_v_blocks_posts" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_posts_parent_id_idx" ON "_shared_sections_v_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_posts_path_idx" ON "_shared_sections_v_blocks_posts" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_contact_budget_options_order_idx" ON "_shared_sections_v_blocks_contact_budget_options" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_contact_budget_options_parent_id_idx" ON "_shared_sections_v_blocks_contact_budget_options" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_contact_order_idx" ON "_shared_sections_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_contact_parent_id_idx" ON "_shared_sections_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_contact_path_idx" ON "_shared_sections_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_faqs_order_idx" ON "_shared_sections_v_blocks_faqs" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_faqs_parent_id_idx" ON "_shared_sections_v_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_faqs_path_idx" ON "_shared_sections_v_blocks_faqs" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_faqs_image_idx" ON "_shared_sections_v_blocks_faqs" USING btree ("image_id");
  CREATE INDEX "_shared_sections_v_blocks_cta_order_idx" ON "_shared_sections_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_cta_parent_id_idx" ON "_shared_sections_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_cta_path_idx" ON "_shared_sections_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_rich_content_order_idx" ON "_shared_sections_v_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_rich_content_parent_id_idx" ON "_shared_sections_v_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_rich_content_path_idx" ON "_shared_sections_v_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_split_content_items_order_idx" ON "_shared_sections_v_blocks_split_content_items" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_split_content_items_parent_id_idx" ON "_shared_sections_v_blocks_split_content_items" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_split_content_order_idx" ON "_shared_sections_v_blocks_split_content" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_split_content_parent_id_idx" ON "_shared_sections_v_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_split_content_path_idx" ON "_shared_sections_v_blocks_split_content" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_blocks_split_content_image_idx" ON "_shared_sections_v_blocks_split_content" USING btree ("image_id");
  CREATE INDEX "_shared_sections_v_blocks_gallery_images_order_idx" ON "_shared_sections_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_gallery_images_parent_id_idx" ON "_shared_sections_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_gallery_images_image_idx" ON "_shared_sections_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_shared_sections_v_blocks_gallery_order_idx" ON "_shared_sections_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_shared_sections_v_blocks_gallery_parent_id_idx" ON "_shared_sections_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_shared_sections_v_blocks_gallery_path_idx" ON "_shared_sections_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_shared_sections_v_parent_idx" ON "_shared_sections_v" USING btree ("parent_id");
  CREATE INDEX "_shared_sections_v_version_version_slug_idx" ON "_shared_sections_v" USING btree ("version_slug");
  CREATE INDEX "_shared_sections_v_version_version_updated_at_idx" ON "_shared_sections_v" USING btree ("version_updated_at");
  CREATE INDEX "_shared_sections_v_version_version_created_at_idx" ON "_shared_sections_v" USING btree ("version_created_at");
  CREATE INDEX "_shared_sections_v_version_version__status_idx" ON "_shared_sections_v" USING btree ("version__status");
  CREATE INDEX "_shared_sections_v_created_at_idx" ON "_shared_sections_v" USING btree ("created_at");
  CREATE INDEX "_shared_sections_v_updated_at_idx" ON "_shared_sections_v" USING btree ("updated_at");
  CREATE INDEX "_shared_sections_v_latest_idx" ON "_shared_sections_v" USING btree ("latest");
  CREATE INDEX "_shared_sections_v_autosave_idx" ON "_shared_sections_v" USING btree ("autosave");
  CREATE INDEX "_shared_sections_v_rels_order_idx" ON "_shared_sections_v_rels" USING btree ("order");
  CREATE INDEX "_shared_sections_v_rels_parent_idx" ON "_shared_sections_v_rels" USING btree ("parent_id");
  CREATE INDEX "_shared_sections_v_rels_path_idx" ON "_shared_sections_v_rels" USING btree ("path");
  CREATE INDEX "_shared_sections_v_rels_services_id_idx" ON "_shared_sections_v_rels" USING btree ("services_id");
  CREATE INDEX "_shared_sections_v_rels_projects_id_idx" ON "_shared_sections_v_rels" USING btree ("projects_id");
  CREATE INDEX "_shared_sections_v_rels_testimonials_id_idx" ON "_shared_sections_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_shared_sections_v_rels_posts_id_idx" ON "_shared_sections_v_rels" USING btree ("posts_id");
  CREATE INDEX "_shared_sections_v_rels_faqs_id_idx" ON "_shared_sections_v_rels" USING btree ("faqs_id");
  CREATE INDEX "services_tags_order_idx" ON "services_tags" USING btree ("_order");
  CREATE INDEX "services_tags_parent_id_idx" ON "services_tags" USING btree ("_parent_id");
  CREATE INDEX "services_benefits_order_idx" ON "services_benefits" USING btree ("_order");
  CREATE INDEX "services_benefits_parent_id_idx" ON "services_benefits" USING btree ("_parent_id");
  CREATE INDEX "services_statistics_order_idx" ON "services_statistics" USING btree ("_order");
  CREATE INDEX "services_statistics_parent_id_idx" ON "services_statistics" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_proof_order_idx" ON "services_blocks_hero_proof" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_proof_parent_id_idx" ON "services_blocks_hero_proof" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_image_idx" ON "services_blocks_hero" USING btree ("image_id");
  CREATE INDEX "services_blocks_stats_items_order_idx" ON "services_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_items_parent_id_idx" ON "services_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_order_idx" ON "services_blocks_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_parent_id_idx" ON "services_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_path_idx" ON "services_blocks_stats" USING btree ("_path");
  CREATE INDEX "services_blocks_problems_items_order_idx" ON "services_blocks_problems_items" USING btree ("_order");
  CREATE INDEX "services_blocks_problems_items_parent_id_idx" ON "services_blocks_problems_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_problems_order_idx" ON "services_blocks_problems" USING btree ("_order");
  CREATE INDEX "services_blocks_problems_parent_id_idx" ON "services_blocks_problems" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_problems_path_idx" ON "services_blocks_problems" USING btree ("_path");
  CREATE INDEX "services_blocks_services_order_idx" ON "services_blocks_services" USING btree ("_order");
  CREATE INDEX "services_blocks_services_parent_id_idx" ON "services_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_path_idx" ON "services_blocks_services" USING btree ("_path");
  CREATE INDEX "services_blocks_projects_order_idx" ON "services_blocks_projects" USING btree ("_order");
  CREATE INDEX "services_blocks_projects_parent_id_idx" ON "services_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_projects_path_idx" ON "services_blocks_projects" USING btree ("_path");
  CREATE INDEX "services_blocks_process_steps_order_idx" ON "services_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_process_steps_parent_id_idx" ON "services_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_process_order_idx" ON "services_blocks_process" USING btree ("_order");
  CREATE INDEX "services_blocks_process_parent_id_idx" ON "services_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_process_path_idx" ON "services_blocks_process" USING btree ("_path");
  CREATE INDEX "services_blocks_process_image_idx" ON "services_blocks_process" USING btree ("image_id");
  CREATE INDEX "services_blocks_process_background_image_idx" ON "services_blocks_process" USING btree ("background_image_id");
  CREATE INDEX "services_blocks__5a63a975b80a_extra_images_order_idx" ON "services_blocks__5a63a975b80a_extra_images" USING btree ("_order");
  CREATE INDEX "services_blocks__5a63a975b80a_extra_images_parent_id_idx" ON "services_blocks__5a63a975b80a_extra_images" USING btree ("_parent_id");
  CREATE INDEX "services_blocks__5a63a975b80a_extra_images_image_idx" ON "services_blocks__5a63a975b80a_extra_images" USING btree ("image_id");
  CREATE INDEX "services_blocks_product_features_order_idx" ON "services_blocks_product_features" USING btree ("_order");
  CREATE INDEX "services_blocks_product_features_parent_id_idx" ON "services_blocks_product_features" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_product_order_idx" ON "services_blocks_product" USING btree ("_order");
  CREATE INDEX "services_blocks_product_parent_id_idx" ON "services_blocks_product" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_product_path_idx" ON "services_blocks_product" USING btree ("_path");
  CREATE INDEX "services_blocks_product_logo_idx" ON "services_blocks_product" USING btree ("logo_id");
  CREATE INDEX "services_blocks_product_image_idx" ON "services_blocks_product" USING btree ("image_id");
  CREATE INDEX "services_blocks_testimonials_order_idx" ON "services_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_parent_id_idx" ON "services_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_path_idx" ON "services_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "services_blocks_posts_order_idx" ON "services_blocks_posts" USING btree ("_order");
  CREATE INDEX "services_blocks_posts_parent_id_idx" ON "services_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_posts_path_idx" ON "services_blocks_posts" USING btree ("_path");
  CREATE INDEX "services_blocks_contact_budget_options_order_idx" ON "services_blocks_contact_budget_options" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_budget_options_parent_id_idx" ON "services_blocks_contact_budget_options" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_order_idx" ON "services_blocks_contact" USING btree ("_order");
  CREATE INDEX "services_blocks_contact_parent_id_idx" ON "services_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact_path_idx" ON "services_blocks_contact" USING btree ("_path");
  CREATE INDEX "services_blocks_faqs_order_idx" ON "services_blocks_faqs" USING btree ("_order");
  CREATE INDEX "services_blocks_faqs_parent_id_idx" ON "services_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faqs_path_idx" ON "services_blocks_faqs" USING btree ("_path");
  CREATE INDEX "services_blocks_faqs_image_idx" ON "services_blocks_faqs" USING btree ("image_id");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE INDEX "services_blocks_rich_content_order_idx" ON "services_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_content_parent_id_idx" ON "services_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_content_path_idx" ON "services_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "services_blocks_split_content_items_order_idx" ON "services_blocks_split_content_items" USING btree ("_order");
  CREATE INDEX "services_blocks_split_content_items_parent_id_idx" ON "services_blocks_split_content_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_split_content_order_idx" ON "services_blocks_split_content" USING btree ("_order");
  CREATE INDEX "services_blocks_split_content_parent_id_idx" ON "services_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_split_content_path_idx" ON "services_blocks_split_content" USING btree ("_path");
  CREATE INDEX "services_blocks_split_content_image_idx" ON "services_blocks_split_content" USING btree ("image_id");
  CREATE INDEX "services_blocks_gallery_images_order_idx" ON "services_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_images_parent_id_idx" ON "services_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_images_image_idx" ON "services_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "services_blocks_gallery_order_idx" ON "services_blocks_gallery" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_parent_id_idx" ON "services_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_path_idx" ON "services_blocks_gallery" USING btree ("_path");
  CREATE INDEX "services_blocks_shared_section_order_idx" ON "services_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "services_blocks_shared_section_parent_id_idx" ON "services_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_shared_section_path_idx" ON "services_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "services_blocks_shared_section_section_idx" ON "services_blocks_shared_section" USING btree ("section_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_hero_image_idx" ON "services" USING btree ("hero_image_id");
  CREATE INDEX "services_seo_seo_image_idx" ON "services" USING btree ("seo_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_projects_id_idx" ON "services_rels" USING btree ("projects_id");
  CREATE INDEX "services_rels_testimonials_id_idx" ON "services_rels" USING btree ("testimonials_id");
  CREATE INDEX "services_rels_posts_id_idx" ON "services_rels" USING btree ("posts_id");
  CREATE INDEX "services_rels_faqs_id_idx" ON "services_rels" USING btree ("faqs_id");
  CREATE INDEX "_services_v_version_tags_order_idx" ON "_services_v_version_tags" USING btree ("_order");
  CREATE INDEX "_services_v_version_tags_parent_id_idx" ON "_services_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_benefits_order_idx" ON "_services_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_services_v_version_benefits_parent_id_idx" ON "_services_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_statistics_order_idx" ON "_services_v_version_statistics" USING btree ("_order");
  CREATE INDEX "_services_v_version_statistics_parent_id_idx" ON "_services_v_version_statistics" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_proof_order_idx" ON "_services_v_blocks_hero_proof" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_proof_parent_id_idx" ON "_services_v_blocks_hero_proof" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_order_idx" ON "_services_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_parent_id_idx" ON "_services_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_path_idx" ON "_services_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_hero_image_idx" ON "_services_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_stats_items_order_idx" ON "_services_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_items_parent_id_idx" ON "_services_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_order_idx" ON "_services_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_parent_id_idx" ON "_services_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_path_idx" ON "_services_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_problems_items_order_idx" ON "_services_v_blocks_problems_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_problems_items_parent_id_idx" ON "_services_v_blocks_problems_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_problems_order_idx" ON "_services_v_blocks_problems" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_problems_parent_id_idx" ON "_services_v_blocks_problems" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_problems_path_idx" ON "_services_v_blocks_problems" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_services_order_idx" ON "_services_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_services_parent_id_idx" ON "_services_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_services_path_idx" ON "_services_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_projects_order_idx" ON "_services_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_projects_parent_id_idx" ON "_services_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_projects_path_idx" ON "_services_v_blocks_projects" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_process_steps_order_idx" ON "_services_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_process_steps_parent_id_idx" ON "_services_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_process_order_idx" ON "_services_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_process_parent_id_idx" ON "_services_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_process_path_idx" ON "_services_v_blocks_process" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_process_image_idx" ON "_services_v_blocks_process" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_process_background_image_idx" ON "_services_v_blocks_process" USING btree ("background_image_id");
  CREATE INDEX "__services_v_bloc_1f49bb99e465_extra_images_v_order_idx" ON "__services_v_bloc_1f49bb99e465_extra_images_v" USING btree ("_order");
  CREATE INDEX "__services_v_bloc_1f49bb99e465_extra_images_v_parent_id_idx" ON "__services_v_bloc_1f49bb99e465_extra_images_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_bloc_1f49bb99e465_extra_images_v_image_idx" ON "__services_v_bloc_1f49bb99e465_extra_images_v" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_product_features_order_idx" ON "_services_v_blocks_product_features" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_product_features_parent_id_idx" ON "_services_v_blocks_product_features" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_product_order_idx" ON "_services_v_blocks_product" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_product_parent_id_idx" ON "_services_v_blocks_product" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_product_path_idx" ON "_services_v_blocks_product" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_product_logo_idx" ON "_services_v_blocks_product" USING btree ("logo_id");
  CREATE INDEX "_services_v_blocks_product_image_idx" ON "_services_v_blocks_product" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_testimonials_order_idx" ON "_services_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_parent_id_idx" ON "_services_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_path_idx" ON "_services_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_posts_order_idx" ON "_services_v_blocks_posts" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_posts_parent_id_idx" ON "_services_v_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_posts_path_idx" ON "_services_v_blocks_posts" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_contact_budget_options_order_idx" ON "_services_v_blocks_contact_budget_options" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_contact_budget_options_parent_id_idx" ON "_services_v_blocks_contact_budget_options" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_order_idx" ON "_services_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_contact_parent_id_idx" ON "_services_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_contact_path_idx" ON "_services_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_faqs_order_idx" ON "_services_v_blocks_faqs" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faqs_parent_id_idx" ON "_services_v_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faqs_path_idx" ON "_services_v_blocks_faqs" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_faqs_image_idx" ON "_services_v_blocks_faqs" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_cta_order_idx" ON "_services_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_parent_id_idx" ON "_services_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_path_idx" ON "_services_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_rich_content_order_idx" ON "_services_v_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_rich_content_parent_id_idx" ON "_services_v_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_content_path_idx" ON "_services_v_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_split_content_items_order_idx" ON "_services_v_blocks_split_content_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_split_content_items_parent_id_idx" ON "_services_v_blocks_split_content_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_split_content_order_idx" ON "_services_v_blocks_split_content" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_split_content_parent_id_idx" ON "_services_v_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_split_content_path_idx" ON "_services_v_blocks_split_content" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_split_content_image_idx" ON "_services_v_blocks_split_content" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_gallery_images_order_idx" ON "_services_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_gallery_images_parent_id_idx" ON "_services_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_gallery_images_image_idx" ON "_services_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_gallery_order_idx" ON "_services_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_gallery_parent_id_idx" ON "_services_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_gallery_path_idx" ON "_services_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_shared_section_order_idx" ON "_services_v_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_shared_section_parent_id_idx" ON "_services_v_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_shared_section_path_idx" ON "_services_v_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_shared_section_section_idx" ON "_services_v_blocks_shared_section" USING btree ("section_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_hero_image_idx" ON "_services_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_services_v_version_seo_version_seo_image_idx" ON "_services_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_rels_projects_id_idx" ON "_services_v_rels" USING btree ("projects_id");
  CREATE INDEX "_services_v_rels_testimonials_id_idx" ON "_services_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_services_v_rels_posts_id_idx" ON "_services_v_rels" USING btree ("posts_id");
  CREATE INDEX "_services_v_rels_faqs_id_idx" ON "_services_v_rels" USING btree ("faqs_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE INDEX "projects_categories_order_idx" ON "projects_categories" USING btree ("_order");
  CREATE INDEX "projects_categories_parent_id_idx" ON "projects_categories" USING btree ("_parent_id");
  CREATE INDEX "projects_results_order_idx" ON "projects_results" USING btree ("_order");
  CREATE INDEX "projects_results_parent_id_idx" ON "projects_results" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_proof_order_idx" ON "projects_blocks_hero_proof" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_proof_parent_id_idx" ON "projects_blocks_hero_proof" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_order_idx" ON "projects_blocks_hero" USING btree ("_order");
  CREATE INDEX "projects_blocks_hero_parent_id_idx" ON "projects_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_hero_path_idx" ON "projects_blocks_hero" USING btree ("_path");
  CREATE INDEX "projects_blocks_hero_image_idx" ON "projects_blocks_hero" USING btree ("image_id");
  CREATE INDEX "projects_blocks_stats_items_order_idx" ON "projects_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_items_parent_id_idx" ON "projects_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_order_idx" ON "projects_blocks_stats" USING btree ("_order");
  CREATE INDEX "projects_blocks_stats_parent_id_idx" ON "projects_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_stats_path_idx" ON "projects_blocks_stats" USING btree ("_path");
  CREATE INDEX "projects_blocks_problems_items_order_idx" ON "projects_blocks_problems_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_problems_items_parent_id_idx" ON "projects_blocks_problems_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_problems_order_idx" ON "projects_blocks_problems" USING btree ("_order");
  CREATE INDEX "projects_blocks_problems_parent_id_idx" ON "projects_blocks_problems" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_problems_path_idx" ON "projects_blocks_problems" USING btree ("_path");
  CREATE INDEX "projects_blocks_services_order_idx" ON "projects_blocks_services" USING btree ("_order");
  CREATE INDEX "projects_blocks_services_parent_id_idx" ON "projects_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_services_path_idx" ON "projects_blocks_services" USING btree ("_path");
  CREATE INDEX "projects_blocks_projects_order_idx" ON "projects_blocks_projects" USING btree ("_order");
  CREATE INDEX "projects_blocks_projects_parent_id_idx" ON "projects_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_projects_path_idx" ON "projects_blocks_projects" USING btree ("_path");
  CREATE INDEX "projects_blocks_process_steps_order_idx" ON "projects_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "projects_blocks_process_steps_parent_id_idx" ON "projects_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_process_order_idx" ON "projects_blocks_process" USING btree ("_order");
  CREATE INDEX "projects_blocks_process_parent_id_idx" ON "projects_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_process_path_idx" ON "projects_blocks_process" USING btree ("_path");
  CREATE INDEX "projects_blocks_process_image_idx" ON "projects_blocks_process" USING btree ("image_id");
  CREATE INDEX "projects_blocks_process_background_image_idx" ON "projects_blocks_process" USING btree ("background_image_id");
  CREATE INDEX "projects_blocks__371b24084e14_extra_images_order_idx" ON "projects_blocks__371b24084e14_extra_images" USING btree ("_order");
  CREATE INDEX "projects_blocks__371b24084e14_extra_images_parent_id_idx" ON "projects_blocks__371b24084e14_extra_images" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks__371b24084e14_extra_images_image_idx" ON "projects_blocks__371b24084e14_extra_images" USING btree ("image_id");
  CREATE INDEX "projects_blocks_product_features_order_idx" ON "projects_blocks_product_features" USING btree ("_order");
  CREATE INDEX "projects_blocks_product_features_parent_id_idx" ON "projects_blocks_product_features" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_product_order_idx" ON "projects_blocks_product" USING btree ("_order");
  CREATE INDEX "projects_blocks_product_parent_id_idx" ON "projects_blocks_product" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_product_path_idx" ON "projects_blocks_product" USING btree ("_path");
  CREATE INDEX "projects_blocks_product_logo_idx" ON "projects_blocks_product" USING btree ("logo_id");
  CREATE INDEX "projects_blocks_product_image_idx" ON "projects_blocks_product" USING btree ("image_id");
  CREATE INDEX "projects_blocks_testimonials_order_idx" ON "projects_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "projects_blocks_testimonials_parent_id_idx" ON "projects_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_testimonials_path_idx" ON "projects_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "projects_blocks_posts_order_idx" ON "projects_blocks_posts" USING btree ("_order");
  CREATE INDEX "projects_blocks_posts_parent_id_idx" ON "projects_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_posts_path_idx" ON "projects_blocks_posts" USING btree ("_path");
  CREATE INDEX "projects_blocks_contact_budget_options_order_idx" ON "projects_blocks_contact_budget_options" USING btree ("_order");
  CREATE INDEX "projects_blocks_contact_budget_options_parent_id_idx" ON "projects_blocks_contact_budget_options" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_order_idx" ON "projects_blocks_contact" USING btree ("_order");
  CREATE INDEX "projects_blocks_contact_parent_id_idx" ON "projects_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_contact_path_idx" ON "projects_blocks_contact" USING btree ("_path");
  CREATE INDEX "projects_blocks_faqs_order_idx" ON "projects_blocks_faqs" USING btree ("_order");
  CREATE INDEX "projects_blocks_faqs_parent_id_idx" ON "projects_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_faqs_path_idx" ON "projects_blocks_faqs" USING btree ("_path");
  CREATE INDEX "projects_blocks_faqs_image_idx" ON "projects_blocks_faqs" USING btree ("image_id");
  CREATE INDEX "projects_blocks_cta_order_idx" ON "projects_blocks_cta" USING btree ("_order");
  CREATE INDEX "projects_blocks_cta_parent_id_idx" ON "projects_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_cta_path_idx" ON "projects_blocks_cta" USING btree ("_path");
  CREATE INDEX "projects_blocks_rich_content_order_idx" ON "projects_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_content_parent_id_idx" ON "projects_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_content_path_idx" ON "projects_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "projects_blocks_split_content_items_order_idx" ON "projects_blocks_split_content_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_split_content_items_parent_id_idx" ON "projects_blocks_split_content_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_split_content_order_idx" ON "projects_blocks_split_content" USING btree ("_order");
  CREATE INDEX "projects_blocks_split_content_parent_id_idx" ON "projects_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_split_content_path_idx" ON "projects_blocks_split_content" USING btree ("_path");
  CREATE INDEX "projects_blocks_split_content_image_idx" ON "projects_blocks_split_content" USING btree ("image_id");
  CREATE INDEX "projects_blocks_gallery_images_order_idx" ON "projects_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_images_parent_id_idx" ON "projects_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_images_image_idx" ON "projects_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "projects_blocks_gallery_order_idx" ON "projects_blocks_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_parent_id_idx" ON "projects_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_path_idx" ON "projects_blocks_gallery" USING btree ("_path");
  CREATE INDEX "projects_blocks_shared_section_order_idx" ON "projects_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "projects_blocks_shared_section_parent_id_idx" ON "projects_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_shared_section_path_idx" ON "projects_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "projects_blocks_shared_section_section_idx" ON "projects_blocks_shared_section" USING btree ("section_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX "projects_testimonial_idx" ON "projects" USING btree ("testimonial_id");
  CREATE INDEX "projects_seo_seo_image_idx" ON "projects" USING btree ("seo_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_services_id_idx" ON "projects_rels" USING btree ("services_id");
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id");
  CREATE INDEX "projects_rels_testimonials_id_idx" ON "projects_rels" USING btree ("testimonials_id");
  CREATE INDEX "projects_rels_posts_id_idx" ON "projects_rels" USING btree ("posts_id");
  CREATE INDEX "projects_rels_faqs_id_idx" ON "projects_rels" USING btree ("faqs_id");
  CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_projects_v_version_categories_order_idx" ON "_projects_v_version_categories" USING btree ("_order");
  CREATE INDEX "_projects_v_version_categories_parent_id_idx" ON "_projects_v_version_categories" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_results_order_idx" ON "_projects_v_version_results" USING btree ("_order");
  CREATE INDEX "_projects_v_version_results_parent_id_idx" ON "_projects_v_version_results" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_proof_order_idx" ON "_projects_v_blocks_hero_proof" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_proof_parent_id_idx" ON "_projects_v_blocks_hero_proof" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_order_idx" ON "_projects_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_hero_parent_id_idx" ON "_projects_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_hero_path_idx" ON "_projects_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_hero_image_idx" ON "_projects_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_stats_items_order_idx" ON "_projects_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_items_parent_id_idx" ON "_projects_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_order_idx" ON "_projects_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_stats_parent_id_idx" ON "_projects_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_stats_path_idx" ON "_projects_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_problems_items_order_idx" ON "_projects_v_blocks_problems_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_problems_items_parent_id_idx" ON "_projects_v_blocks_problems_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_problems_order_idx" ON "_projects_v_blocks_problems" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_problems_parent_id_idx" ON "_projects_v_blocks_problems" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_problems_path_idx" ON "_projects_v_blocks_problems" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_services_order_idx" ON "_projects_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_services_parent_id_idx" ON "_projects_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_services_path_idx" ON "_projects_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_projects_order_idx" ON "_projects_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_projects_parent_id_idx" ON "_projects_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_projects_path_idx" ON "_projects_v_blocks_projects" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_process_steps_order_idx" ON "_projects_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_process_steps_parent_id_idx" ON "_projects_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_process_order_idx" ON "_projects_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_process_parent_id_idx" ON "_projects_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_process_path_idx" ON "_projects_v_blocks_process" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_process_image_idx" ON "_projects_v_blocks_process" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_process_background_image_idx" ON "_projects_v_blocks_process" USING btree ("background_image_id");
  CREATE INDEX "__projects_v_bloc_61ab51df60b2_extra_images_v_order_idx" ON "__projects_v_bloc_61ab51df60b2_extra_images_v" USING btree ("_order");
  CREATE INDEX "__projects_v_bloc_61ab51df60b2_extra_images_v_parent_id_idx" ON "__projects_v_bloc_61ab51df60b2_extra_images_v" USING btree ("_parent_id");
  CREATE INDEX "__projects_v_bloc_61ab51df60b2_extra_images_v_image_idx" ON "__projects_v_bloc_61ab51df60b2_extra_images_v" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_product_features_order_idx" ON "_projects_v_blocks_product_features" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_product_features_parent_id_idx" ON "_projects_v_blocks_product_features" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_product_order_idx" ON "_projects_v_blocks_product" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_product_parent_id_idx" ON "_projects_v_blocks_product" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_product_path_idx" ON "_projects_v_blocks_product" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_product_logo_idx" ON "_projects_v_blocks_product" USING btree ("logo_id");
  CREATE INDEX "_projects_v_blocks_product_image_idx" ON "_projects_v_blocks_product" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_testimonials_order_idx" ON "_projects_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_testimonials_parent_id_idx" ON "_projects_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_testimonials_path_idx" ON "_projects_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_posts_order_idx" ON "_projects_v_blocks_posts" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_posts_parent_id_idx" ON "_projects_v_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_posts_path_idx" ON "_projects_v_blocks_posts" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_contact_budget_options_order_idx" ON "_projects_v_blocks_contact_budget_options" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_contact_budget_options_parent_id_idx" ON "_projects_v_blocks_contact_budget_options" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_contact_order_idx" ON "_projects_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_contact_parent_id_idx" ON "_projects_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_contact_path_idx" ON "_projects_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_faqs_order_idx" ON "_projects_v_blocks_faqs" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_faqs_parent_id_idx" ON "_projects_v_blocks_faqs" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_faqs_path_idx" ON "_projects_v_blocks_faqs" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_faqs_image_idx" ON "_projects_v_blocks_faqs" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_cta_order_idx" ON "_projects_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_cta_parent_id_idx" ON "_projects_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_cta_path_idx" ON "_projects_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_rich_content_order_idx" ON "_projects_v_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_rich_content_parent_id_idx" ON "_projects_v_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_content_path_idx" ON "_projects_v_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_split_content_items_order_idx" ON "_projects_v_blocks_split_content_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_split_content_items_parent_id_idx" ON "_projects_v_blocks_split_content_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_split_content_order_idx" ON "_projects_v_blocks_split_content" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_split_content_parent_id_idx" ON "_projects_v_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_split_content_path_idx" ON "_projects_v_blocks_split_content" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_split_content_image_idx" ON "_projects_v_blocks_split_content" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_order_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_images_parent_id_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_image_idx" ON "_projects_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_gallery_order_idx" ON "_projects_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_parent_id_idx" ON "_projects_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_path_idx" ON "_projects_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_shared_section_order_idx" ON "_projects_v_blocks_shared_section" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_shared_section_parent_id_idx" ON "_projects_v_blocks_shared_section" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_shared_section_path_idx" ON "_projects_v_blocks_shared_section" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_shared_section_section_idx" ON "_projects_v_blocks_shared_section" USING btree ("section_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_version_testimonial_idx" ON "_projects_v" USING btree ("version_testimonial_id");
  CREATE INDEX "_projects_v_version_seo_version_seo_image_idx" ON "_projects_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_services_id_idx" ON "_projects_v_rels" USING btree ("services_id");
  CREATE INDEX "_projects_v_rels_projects_id_idx" ON "_projects_v_rels" USING btree ("projects_id");
  CREATE INDEX "_projects_v_rels_testimonials_id_idx" ON "_projects_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_projects_v_rels_posts_id_idx" ON "_projects_v_rels" USING btree ("posts_id");
  CREATE INDEX "_projects_v_rels_faqs_id_idx" ON "_projects_v_rels" USING btree ("faqs_id");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_company_logo_idx" ON "testimonials" USING btree ("company_logo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE INDEX "testimonials_rels_order_idx" ON "testimonials_rels" USING btree ("order");
  CREATE INDEX "testimonials_rels_parent_idx" ON "testimonials_rels" USING btree ("parent_id");
  CREATE INDEX "testimonials_rels_path_idx" ON "testimonials_rels" USING btree ("path");
  CREATE INDEX "testimonials_rels_services_id_idx" ON "testimonials_rels" USING btree ("services_id");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_photo_idx" ON "_testimonials_v" USING btree ("version_photo_id");
  CREATE INDEX "_testimonials_v_version_version_company_logo_idx" ON "_testimonials_v" USING btree ("version_company_logo_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "_testimonials_v_autosave_idx" ON "_testimonials_v" USING btree ("autosave");
  CREATE INDEX "_testimonials_v_rels_order_idx" ON "_testimonials_v_rels" USING btree ("order");
  CREATE INDEX "_testimonials_v_rels_parent_idx" ON "_testimonials_v_rels" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_rels_path_idx" ON "_testimonials_v_rels" USING btree ("path");
  CREATE INDEX "_testimonials_v_rels_services_id_idx" ON "_testimonials_v_rels" USING btree ("services_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_seo_seo_image_idx" ON "posts" USING btree ("seo_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_seo_version_seo_image_idx" ON "_posts_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "faqs__status_idx" ON "faqs" USING btree ("_status");
  CREATE INDEX "faqs_rels_order_idx" ON "faqs_rels" USING btree ("order");
  CREATE INDEX "faqs_rels_parent_idx" ON "faqs_rels" USING btree ("parent_id");
  CREATE INDEX "faqs_rels_path_idx" ON "faqs_rels" USING btree ("path");
  CREATE INDEX "faqs_rels_services_id_idx" ON "faqs_rels" USING btree ("services_id");
  CREATE INDEX "_faqs_v_parent_idx" ON "_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_version_version__status_idx" ON "_faqs_v" USING btree ("version__status");
  CREATE INDEX "_faqs_v_created_at_idx" ON "_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "_faqs_v" USING btree ("updated_at");
  CREATE INDEX "_faqs_v_latest_idx" ON "_faqs_v" USING btree ("latest");
  CREATE INDEX "_faqs_v_autosave_idx" ON "_faqs_v" USING btree ("autosave");
  CREATE INDEX "_faqs_v_rels_order_idx" ON "_faqs_v_rels" USING btree ("order");
  CREATE INDEX "_faqs_v_rels_parent_idx" ON "_faqs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_rels_path_idx" ON "_faqs_v_rels" USING btree ("path");
  CREATE INDEX "_faqs_v_rels_services_id_idx" ON "_faqs_v_rels" USING btree ("services_id");
  CREATE INDEX "enquiries_ip_hash_idx" ON "enquiries" USING btree ("ip_hash");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_shared_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("shared_sections_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_navigation_order_idx" ON "site_settings_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_navigation_parent_id_idx" ON "site_settings_navigation" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_navigation_order_idx" ON "site_settings_footer_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_footer_navigation_parent_id_idx" ON "site_settings_footer_navigation" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE INDEX "_site_settings_v_version_socials_order_idx" ON "_site_settings_v_version_socials" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_socials_parent_id_idx" ON "_site_settings_v_version_socials" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_navigation_order_idx" ON "_site_settings_v_version_navigation" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_navigation_parent_id_idx" ON "_site_settings_v_version_navigation" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_navigation_order_idx" ON "_site_settings_v_version_footer_navigation" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_footer_navigation_parent_id_idx" ON "_site_settings_v_version_footer_navigation" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_version_logo_idx" ON "_site_settings_v" USING btree ("version_logo_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX "_site_settings_v_autosave_idx" ON "_site_settings_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_proof" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_problems_items" CASCADE;
  DROP TABLE "pages_blocks_problems" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_projects" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_process" CASCADE;
  DROP TABLE "pages_blocks_pro_150499696b41_extra_images" CASCADE;
  DROP TABLE "pages_blocks_product_features" CASCADE;
  DROP TABLE "pages_blocks_product" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_posts" CASCADE;
  DROP TABLE "pages_blocks_contact_budget_options" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_faqs" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_rich_content" CASCADE;
  DROP TABLE "pages_blocks_split_content_items" CASCADE;
  DROP TABLE "pages_blocks_split_content" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_shared_section" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_proof" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_problems_items" CASCADE;
  DROP TABLE "_pages_v_blocks_problems" CASCADE;
  DROP TABLE "_pages_v_blocks_services" CASCADE;
  DROP TABLE "_pages_v_blocks_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process" CASCADE;
  DROP TABLE "__pages_v_blocks__ea3525432fe9_extra_images_v" CASCADE;
  DROP TABLE "_pages_v_blocks_product_features" CASCADE;
  DROP TABLE "_pages_v_blocks_product" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_budget_options" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_content" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content_items" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_shared_section" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "shared_sections_blocks_hero_proof" CASCADE;
  DROP TABLE "shared_sections_blocks_hero" CASCADE;
  DROP TABLE "shared_sections_blocks_stats_items" CASCADE;
  DROP TABLE "shared_sections_blocks_stats" CASCADE;
  DROP TABLE "shared_sections_blocks_problems_items" CASCADE;
  DROP TABLE "shared_sections_blocks_problems" CASCADE;
  DROP TABLE "shared_sections_blocks_services" CASCADE;
  DROP TABLE "shared_sections_blocks_projects" CASCADE;
  DROP TABLE "shared_sections_blocks_process_steps" CASCADE;
  DROP TABLE "shared_sections_blocks_process" CASCADE;
  DROP TABLE "shared_sections__98fa94584746_extra_images" CASCADE;
  DROP TABLE "shared_sections_blocks_product_features" CASCADE;
  DROP TABLE "shared_sections_blocks_product" CASCADE;
  DROP TABLE "shared_sections_blocks_testimonials" CASCADE;
  DROP TABLE "shared_sections_blocks_posts" CASCADE;
  DROP TABLE "shared_sections_blocks_contact_budget_options" CASCADE;
  DROP TABLE "shared_sections_blocks_contact" CASCADE;
  DROP TABLE "shared_sections_blocks_faqs" CASCADE;
  DROP TABLE "shared_sections_blocks_cta" CASCADE;
  DROP TABLE "shared_sections_blocks_rich_content" CASCADE;
  DROP TABLE "shared_sections_blocks_split_content_items" CASCADE;
  DROP TABLE "shared_sections_blocks_split_content" CASCADE;
  DROP TABLE "shared_sections_blocks_gallery_images" CASCADE;
  DROP TABLE "shared_sections_blocks_gallery" CASCADE;
  DROP TABLE "shared_sections" CASCADE;
  DROP TABLE "shared_sections_rels" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_hero_proof" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_hero" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_stats_items" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_stats" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_problems_items" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_problems" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_services" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_projects" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_process_steps" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_process" CASCADE;
  DROP TABLE "__shared_sections_beac5e433a6d_extra_images_v" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_product_features" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_product" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_testimonials" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_posts" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_contact_budget_options" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_contact" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_faqs" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_cta" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_rich_content" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_split_content_items" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_split_content" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_shared_sections_v_blocks_gallery" CASCADE;
  DROP TABLE "_shared_sections_v" CASCADE;
  DROP TABLE "_shared_sections_v_rels" CASCADE;
  DROP TABLE "services_tags" CASCADE;
  DROP TABLE "services_benefits" CASCADE;
  DROP TABLE "services_statistics" CASCADE;
  DROP TABLE "services_blocks_hero_proof" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_stats_items" CASCADE;
  DROP TABLE "services_blocks_stats" CASCADE;
  DROP TABLE "services_blocks_problems_items" CASCADE;
  DROP TABLE "services_blocks_problems" CASCADE;
  DROP TABLE "services_blocks_services" CASCADE;
  DROP TABLE "services_blocks_projects" CASCADE;
  DROP TABLE "services_blocks_process_steps" CASCADE;
  DROP TABLE "services_blocks_process" CASCADE;
  DROP TABLE "services_blocks__5a63a975b80a_extra_images" CASCADE;
  DROP TABLE "services_blocks_product_features" CASCADE;
  DROP TABLE "services_blocks_product" CASCADE;
  DROP TABLE "services_blocks_testimonials" CASCADE;
  DROP TABLE "services_blocks_posts" CASCADE;
  DROP TABLE "services_blocks_contact_budget_options" CASCADE;
  DROP TABLE "services_blocks_contact" CASCADE;
  DROP TABLE "services_blocks_faqs" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_rich_content" CASCADE;
  DROP TABLE "services_blocks_split_content_items" CASCADE;
  DROP TABLE "services_blocks_split_content" CASCADE;
  DROP TABLE "services_blocks_gallery_images" CASCADE;
  DROP TABLE "services_blocks_gallery" CASCADE;
  DROP TABLE "services_blocks_shared_section" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_version_tags" CASCADE;
  DROP TABLE "_services_v_version_benefits" CASCADE;
  DROP TABLE "_services_v_version_statistics" CASCADE;
  DROP TABLE "_services_v_blocks_hero_proof" CASCADE;
  DROP TABLE "_services_v_blocks_hero" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items" CASCADE;
  DROP TABLE "_services_v_blocks_stats" CASCADE;
  DROP TABLE "_services_v_blocks_problems_items" CASCADE;
  DROP TABLE "_services_v_blocks_problems" CASCADE;
  DROP TABLE "_services_v_blocks_services" CASCADE;
  DROP TABLE "_services_v_blocks_projects" CASCADE;
  DROP TABLE "_services_v_blocks_process_steps" CASCADE;
  DROP TABLE "_services_v_blocks_process" CASCADE;
  DROP TABLE "__services_v_bloc_1f49bb99e465_extra_images_v" CASCADE;
  DROP TABLE "_services_v_blocks_product_features" CASCADE;
  DROP TABLE "_services_v_blocks_product" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials" CASCADE;
  DROP TABLE "_services_v_blocks_posts" CASCADE;
  DROP TABLE "_services_v_blocks_contact_budget_options" CASCADE;
  DROP TABLE "_services_v_blocks_contact" CASCADE;
  DROP TABLE "_services_v_blocks_faqs" CASCADE;
  DROP TABLE "_services_v_blocks_cta" CASCADE;
  DROP TABLE "_services_v_blocks_rich_content" CASCADE;
  DROP TABLE "_services_v_blocks_split_content_items" CASCADE;
  DROP TABLE "_services_v_blocks_split_content" CASCADE;
  DROP TABLE "_services_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_services_v_blocks_gallery" CASCADE;
  DROP TABLE "_services_v_blocks_shared_section" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects_categories" CASCADE;
  DROP TABLE "projects_results" CASCADE;
  DROP TABLE "projects_blocks_hero_proof" CASCADE;
  DROP TABLE "projects_blocks_hero" CASCADE;
  DROP TABLE "projects_blocks_stats_items" CASCADE;
  DROP TABLE "projects_blocks_stats" CASCADE;
  DROP TABLE "projects_blocks_problems_items" CASCADE;
  DROP TABLE "projects_blocks_problems" CASCADE;
  DROP TABLE "projects_blocks_services" CASCADE;
  DROP TABLE "projects_blocks_projects" CASCADE;
  DROP TABLE "projects_blocks_process_steps" CASCADE;
  DROP TABLE "projects_blocks_process" CASCADE;
  DROP TABLE "projects_blocks__371b24084e14_extra_images" CASCADE;
  DROP TABLE "projects_blocks_product_features" CASCADE;
  DROP TABLE "projects_blocks_product" CASCADE;
  DROP TABLE "projects_blocks_testimonials" CASCADE;
  DROP TABLE "projects_blocks_posts" CASCADE;
  DROP TABLE "projects_blocks_contact_budget_options" CASCADE;
  DROP TABLE "projects_blocks_contact" CASCADE;
  DROP TABLE "projects_blocks_faqs" CASCADE;
  DROP TABLE "projects_blocks_cta" CASCADE;
  DROP TABLE "projects_blocks_rich_content" CASCADE;
  DROP TABLE "projects_blocks_split_content_items" CASCADE;
  DROP TABLE "projects_blocks_split_content" CASCADE;
  DROP TABLE "projects_blocks_gallery_images" CASCADE;
  DROP TABLE "projects_blocks_gallery" CASCADE;
  DROP TABLE "projects_blocks_shared_section" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_gallery" CASCADE;
  DROP TABLE "_projects_v_version_categories" CASCADE;
  DROP TABLE "_projects_v_version_results" CASCADE;
  DROP TABLE "_projects_v_blocks_hero_proof" CASCADE;
  DROP TABLE "_projects_v_blocks_hero" CASCADE;
  DROP TABLE "_projects_v_blocks_stats_items" CASCADE;
  DROP TABLE "_projects_v_blocks_stats" CASCADE;
  DROP TABLE "_projects_v_blocks_problems_items" CASCADE;
  DROP TABLE "_projects_v_blocks_problems" CASCADE;
  DROP TABLE "_projects_v_blocks_services" CASCADE;
  DROP TABLE "_projects_v_blocks_projects" CASCADE;
  DROP TABLE "_projects_v_blocks_process_steps" CASCADE;
  DROP TABLE "_projects_v_blocks_process" CASCADE;
  DROP TABLE "__projects_v_bloc_61ab51df60b2_extra_images_v" CASCADE;
  DROP TABLE "_projects_v_blocks_product_features" CASCADE;
  DROP TABLE "_projects_v_blocks_product" CASCADE;
  DROP TABLE "_projects_v_blocks_testimonials" CASCADE;
  DROP TABLE "_projects_v_blocks_posts" CASCADE;
  DROP TABLE "_projects_v_blocks_contact_budget_options" CASCADE;
  DROP TABLE "_projects_v_blocks_contact" CASCADE;
  DROP TABLE "_projects_v_blocks_faqs" CASCADE;
  DROP TABLE "_projects_v_blocks_cta" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_content" CASCADE;
  DROP TABLE "_projects_v_blocks_split_content_items" CASCADE;
  DROP TABLE "_projects_v_blocks_split_content" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_shared_section" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_rels" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "_testimonials_v_rels" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_rels" CASCADE;
  DROP TABLE "_faqs_v" CASCADE;
  DROP TABLE "_faqs_v_rels" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "site_settings_navigation" CASCADE;
  DROP TABLE "site_settings_footer_navigation" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "_site_settings_v_version_socials" CASCADE;
  DROP TABLE "_site_settings_v_version_navigation" CASCADE;
  DROP TABLE "_site_settings_v_version_footer_navigation" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_blocks_hero_theme";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_stats_theme";
  DROP TYPE "public"."enum_pages_blocks_problems_theme";
  DROP TYPE "public"."enum_pages_blocks_services_theme";
  DROP TYPE "public"."enum_pages_blocks_services_selection_mode";
  DROP TYPE "public"."enum_pages_blocks_projects_theme";
  DROP TYPE "public"."enum_pages_blocks_projects_selection_mode";
  DROP TYPE "public"."enum_pages_blocks_process_theme";
  DROP TYPE "public"."enum_pages_blocks_product_theme";
  DROP TYPE "public"."enum_pages_blocks_product_composition";
  DROP TYPE "public"."enum_pages_blocks_testimonials_theme";
  DROP TYPE "public"."enum_pages_blocks_testimonials_selection_mode";
  DROP TYPE "public"."enum_pages_blocks_posts_theme";
  DROP TYPE "public"."enum_pages_blocks_posts_selection_mode";
  DROP TYPE "public"."enum_pages_blocks_contact_theme";
  DROP TYPE "public"."enum_pages_blocks_faqs_theme";
  DROP TYPE "public"."enum_pages_blocks_faqs_selection_mode";
  DROP TYPE "public"."enum_pages_blocks_cta_theme";
  DROP TYPE "public"."enum_pages_blocks_rich_content_theme";
  DROP TYPE "public"."enum_pages_blocks_split_content_theme";
  DROP TYPE "public"."enum_pages_blocks_split_content_image_position";
  DROP TYPE "public"."enum_pages_blocks_gallery_theme";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_theme";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_stats_theme";
  DROP TYPE "public"."enum__pages_v_blocks_problems_theme";
  DROP TYPE "public"."enum__pages_v_blocks_services_theme";
  DROP TYPE "public"."enum__pages_v_blocks_services_selection_mode";
  DROP TYPE "public"."enum__pages_v_blocks_projects_theme";
  DROP TYPE "public"."enum__pages_v_blocks_projects_selection_mode";
  DROP TYPE "public"."enum__pages_v_blocks_process_theme";
  DROP TYPE "public"."enum__pages_v_blocks_product_theme";
  DROP TYPE "public"."enum__pages_v_blocks_product_composition";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_theme";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_selection_mode";
  DROP TYPE "public"."enum__pages_v_blocks_posts_theme";
  DROP TYPE "public"."enum__pages_v_blocks_posts_selection_mode";
  DROP TYPE "public"."enum__pages_v_blocks_contact_theme";
  DROP TYPE "public"."enum__pages_v_blocks_faqs_theme";
  DROP TYPE "public"."enum__pages_v_blocks_faqs_selection_mode";
  DROP TYPE "public"."enum__pages_v_blocks_cta_theme";
  DROP TYPE "public"."enum__pages_v_blocks_rich_content_theme";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_theme";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_theme";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_shared_sections_blocks_hero_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_hero_variant";
  DROP TYPE "public"."enum_shared_sections_blocks_stats_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_problems_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_services_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_services_selection_mode";
  DROP TYPE "public"."enum_shared_sections_blocks_projects_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_projects_selection_mode";
  DROP TYPE "public"."enum_shared_sections_blocks_process_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_product_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_product_composition";
  DROP TYPE "public"."enum_shared_sections_blocks_testimonials_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_testimonials_selection_mode";
  DROP TYPE "public"."enum_shared_sections_blocks_posts_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_posts_selection_mode";
  DROP TYPE "public"."enum_shared_sections_blocks_contact_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_faqs_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_faqs_selection_mode";
  DROP TYPE "public"."enum_shared_sections_blocks_cta_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_rich_content_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_split_content_theme";
  DROP TYPE "public"."enum_shared_sections_blocks_split_content_image_position";
  DROP TYPE "public"."enum_shared_sections_blocks_gallery_theme";
  DROP TYPE "public"."enum_shared_sections_status";
  DROP TYPE "public"."enum__shared_sections_v_blocks_hero_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_hero_variant";
  DROP TYPE "public"."enum__shared_sections_v_blocks_stats_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_problems_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_services_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_services_selection_mode";
  DROP TYPE "public"."enum__shared_sections_v_blocks_projects_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_projects_selection_mode";
  DROP TYPE "public"."enum__shared_sections_v_blocks_process_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_product_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_product_composition";
  DROP TYPE "public"."enum__shared_sections_v_blocks_testimonials_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_testimonials_selection_mode";
  DROP TYPE "public"."enum__shared_sections_v_blocks_posts_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_posts_selection_mode";
  DROP TYPE "public"."enum__shared_sections_v_blocks_contact_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_faqs_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_faqs_selection_mode";
  DROP TYPE "public"."enum__shared_sections_v_blocks_cta_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_rich_content_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_split_content_theme";
  DROP TYPE "public"."enum__shared_sections_v_blocks_split_content_image_position";
  DROP TYPE "public"."enum__shared_sections_v_blocks_gallery_theme";
  DROP TYPE "public"."enum__shared_sections_v_version_status";
  DROP TYPE "public"."enum_services_blocks_hero_theme";
  DROP TYPE "public"."enum_services_blocks_hero_variant";
  DROP TYPE "public"."enum_services_blocks_stats_theme";
  DROP TYPE "public"."enum_services_blocks_problems_theme";
  DROP TYPE "public"."enum_services_blocks_services_theme";
  DROP TYPE "public"."enum_services_blocks_services_selection_mode";
  DROP TYPE "public"."enum_services_blocks_projects_theme";
  DROP TYPE "public"."enum_services_blocks_projects_selection_mode";
  DROP TYPE "public"."enum_services_blocks_process_theme";
  DROP TYPE "public"."enum_services_blocks_product_theme";
  DROP TYPE "public"."enum_services_blocks_product_composition";
  DROP TYPE "public"."enum_services_blocks_testimonials_theme";
  DROP TYPE "public"."enum_services_blocks_testimonials_selection_mode";
  DROP TYPE "public"."enum_services_blocks_posts_theme";
  DROP TYPE "public"."enum_services_blocks_posts_selection_mode";
  DROP TYPE "public"."enum_services_blocks_contact_theme";
  DROP TYPE "public"."enum_services_blocks_faqs_theme";
  DROP TYPE "public"."enum_services_blocks_faqs_selection_mode";
  DROP TYPE "public"."enum_services_blocks_cta_theme";
  DROP TYPE "public"."enum_services_blocks_rich_content_theme";
  DROP TYPE "public"."enum_services_blocks_split_content_theme";
  DROP TYPE "public"."enum_services_blocks_split_content_image_position";
  DROP TYPE "public"."enum_services_blocks_gallery_theme";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_blocks_hero_theme";
  DROP TYPE "public"."enum__services_v_blocks_hero_variant";
  DROP TYPE "public"."enum__services_v_blocks_stats_theme";
  DROP TYPE "public"."enum__services_v_blocks_problems_theme";
  DROP TYPE "public"."enum__services_v_blocks_services_theme";
  DROP TYPE "public"."enum__services_v_blocks_services_selection_mode";
  DROP TYPE "public"."enum__services_v_blocks_projects_theme";
  DROP TYPE "public"."enum__services_v_blocks_projects_selection_mode";
  DROP TYPE "public"."enum__services_v_blocks_process_theme";
  DROP TYPE "public"."enum__services_v_blocks_product_theme";
  DROP TYPE "public"."enum__services_v_blocks_product_composition";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_theme";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_selection_mode";
  DROP TYPE "public"."enum__services_v_blocks_posts_theme";
  DROP TYPE "public"."enum__services_v_blocks_posts_selection_mode";
  DROP TYPE "public"."enum__services_v_blocks_contact_theme";
  DROP TYPE "public"."enum__services_v_blocks_faqs_theme";
  DROP TYPE "public"."enum__services_v_blocks_faqs_selection_mode";
  DROP TYPE "public"."enum__services_v_blocks_cta_theme";
  DROP TYPE "public"."enum__services_v_blocks_rich_content_theme";
  DROP TYPE "public"."enum__services_v_blocks_split_content_theme";
  DROP TYPE "public"."enum__services_v_blocks_split_content_image_position";
  DROP TYPE "public"."enum__services_v_blocks_gallery_theme";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_projects_blocks_hero_theme";
  DROP TYPE "public"."enum_projects_blocks_hero_variant";
  DROP TYPE "public"."enum_projects_blocks_stats_theme";
  DROP TYPE "public"."enum_projects_blocks_problems_theme";
  DROP TYPE "public"."enum_projects_blocks_services_theme";
  DROP TYPE "public"."enum_projects_blocks_services_selection_mode";
  DROP TYPE "public"."enum_projects_blocks_projects_theme";
  DROP TYPE "public"."enum_projects_blocks_projects_selection_mode";
  DROP TYPE "public"."enum_projects_blocks_process_theme";
  DROP TYPE "public"."enum_projects_blocks_product_theme";
  DROP TYPE "public"."enum_projects_blocks_product_composition";
  DROP TYPE "public"."enum_projects_blocks_testimonials_theme";
  DROP TYPE "public"."enum_projects_blocks_testimonials_selection_mode";
  DROP TYPE "public"."enum_projects_blocks_posts_theme";
  DROP TYPE "public"."enum_projects_blocks_posts_selection_mode";
  DROP TYPE "public"."enum_projects_blocks_contact_theme";
  DROP TYPE "public"."enum_projects_blocks_faqs_theme";
  DROP TYPE "public"."enum_projects_blocks_faqs_selection_mode";
  DROP TYPE "public"."enum_projects_blocks_cta_theme";
  DROP TYPE "public"."enum_projects_blocks_rich_content_theme";
  DROP TYPE "public"."enum_projects_blocks_split_content_theme";
  DROP TYPE "public"."enum_projects_blocks_split_content_image_position";
  DROP TYPE "public"."enum_projects_blocks_gallery_theme";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_blocks_hero_theme";
  DROP TYPE "public"."enum__projects_v_blocks_hero_variant";
  DROP TYPE "public"."enum__projects_v_blocks_stats_theme";
  DROP TYPE "public"."enum__projects_v_blocks_problems_theme";
  DROP TYPE "public"."enum__projects_v_blocks_services_theme";
  DROP TYPE "public"."enum__projects_v_blocks_services_selection_mode";
  DROP TYPE "public"."enum__projects_v_blocks_projects_theme";
  DROP TYPE "public"."enum__projects_v_blocks_projects_selection_mode";
  DROP TYPE "public"."enum__projects_v_blocks_process_theme";
  DROP TYPE "public"."enum__projects_v_blocks_product_theme";
  DROP TYPE "public"."enum__projects_v_blocks_product_composition";
  DROP TYPE "public"."enum__projects_v_blocks_testimonials_theme";
  DROP TYPE "public"."enum__projects_v_blocks_testimonials_selection_mode";
  DROP TYPE "public"."enum__projects_v_blocks_posts_theme";
  DROP TYPE "public"."enum__projects_v_blocks_posts_selection_mode";
  DROP TYPE "public"."enum__projects_v_blocks_contact_theme";
  DROP TYPE "public"."enum__projects_v_blocks_faqs_theme";
  DROP TYPE "public"."enum__projects_v_blocks_faqs_selection_mode";
  DROP TYPE "public"."enum__projects_v_blocks_cta_theme";
  DROP TYPE "public"."enum__projects_v_blocks_rich_content_theme";
  DROP TYPE "public"."enum__projects_v_blocks_split_content_theme";
  DROP TYPE "public"."enum__projects_v_blocks_split_content_image_position";
  DROP TYPE "public"."enum__projects_v_blocks_gallery_theme";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum__faqs_v_version_status";
  DROP TYPE "public"."enum_enquiries_status";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_status";`)
}
