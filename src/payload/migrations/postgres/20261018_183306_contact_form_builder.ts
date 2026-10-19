import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_con_d91be606cc20_forms_type" AS ENUM('text', 'email', 'tel', 'url', 'number', 'textarea', 'select', 'datetime', 'checkbox');
  CREATE TYPE "public"."enum_pages_blocks_con_d91be606cc20_forms_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum_pages_blocks_con_d91be606cc20_forms_options_source" AS ENUM('custom', 'services');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_mode" AS ENUM('legacy', 'custom');
  CREATE TYPE "public"."enum___pages_v_blocks__b863fc9f4283_forms_v_type" AS ENUM('text', 'email', 'tel', 'url', 'number', 'textarea', 'select', 'datetime', 'checkbox');
  CREATE TYPE "public"."enum___pages_v_blocks__b863fc9f4283_forms_v_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum___pages_v_blocks__b863fc9f4283_forms_v_options_source" AS ENUM('custom', 'services');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_mode" AS ENUM('legacy', 'custom');
  CREATE TYPE "public"."enum_shared_sections__88aeee182186_forms_type" AS ENUM('text', 'email', 'tel', 'url', 'number', 'textarea', 'select', 'datetime', 'checkbox');
  CREATE TYPE "public"."enum_shared_sections__88aeee182186_forms_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum_shared_sections__88aeee182186_forms_options_source" AS ENUM('custom', 'services');
  CREATE TYPE "public"."enum_shared_sections_blocks_contact_form_mode" AS ENUM('legacy', 'custom');
  CREATE TYPE "public"."enum___shared_sections_0b9489055248_forms_v_type" AS ENUM('text', 'email', 'tel', 'url', 'number', 'textarea', 'select', 'datetime', 'checkbox');
  CREATE TYPE "public"."enum___shared_sections_0b9489055248_forms_v_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum___shared_sections_0b9489055248_forms_v_options_source" AS ENUM('custom', 'services');
  CREATE TYPE "public"."enum__shared_sections_v_blocks_contact_form_mode" AS ENUM('legacy', 'custom');
  CREATE TYPE "public"."enum_services_blocks__b5cf1b6677a5_forms_type" AS ENUM('text', 'email', 'tel', 'url', 'number', 'textarea', 'select', 'datetime', 'checkbox');
  CREATE TYPE "public"."enum_services_blocks__b5cf1b6677a5_forms_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum_services_blocks__b5cf1b6677a5_forms_options_source" AS ENUM('custom', 'services');
  CREATE TYPE "public"."enum_services_blocks_contact_form_mode" AS ENUM('legacy', 'custom');
  CREATE TYPE "public"."enum___services_v_bloc_2fd344713ce4_forms_v_type" AS ENUM('text', 'email', 'tel', 'url', 'number', 'textarea', 'select', 'datetime', 'checkbox');
  CREATE TYPE "public"."enum___services_v_bloc_2fd344713ce4_forms_v_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum___services_v_bloc_2fd344713ce4_forms_v_options_source" AS ENUM('custom', 'services');
  CREATE TYPE "public"."enum__services_v_blocks_contact_form_mode" AS ENUM('legacy', 'custom');
  CREATE TYPE "public"."enum_projects_blocks__26475d8b69cc_forms_type" AS ENUM('text', 'email', 'tel', 'url', 'number', 'textarea', 'select', 'datetime', 'checkbox');
  CREATE TYPE "public"."enum_projects_blocks__26475d8b69cc_forms_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum_projects_blocks__26475d8b69cc_forms_options_source" AS ENUM('custom', 'services');
  CREATE TYPE "public"."enum_projects_blocks_contact_form_mode" AS ENUM('legacy', 'custom');
  CREATE TYPE "public"."enum___projects_v_bloc_e08e4076c4b9_forms_v_type" AS ENUM('text', 'email', 'tel', 'url', 'number', 'textarea', 'select', 'datetime', 'checkbox');
  CREATE TYPE "public"."enum___projects_v_bloc_e08e4076c4b9_forms_v_width" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum___projects_v_bloc_e08e4076c4b9_forms_v_options_source" AS ENUM('custom', 'services');
  CREATE TYPE "public"."enum__projects_v_blocks_contact_form_mode" AS ENUM('legacy', 'custom');
  CREATE TABLE "pages_blocks_con_827c69924fc9_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_con_d91be606cc20_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_pages_blocks_con_d91be606cc20_forms_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"help_text" varchar,
  	"required" boolean DEFAULT false,
  	"enabled" boolean DEFAULT true,
  	"width" "enum_pages_blocks_con_d91be606cc20_forms_width" DEFAULT 'half',
  	"validation_message" varchar,
  	"options_source" "enum_pages_blocks_con_d91be606cc20_forms_options_source" DEFAULT 'custom',
  	"min_length" numeric,
  	"max_length" numeric,
  	"min" numeric,
  	"max" numeric
  );
  
  CREATE TABLE "___pages_v_blocks_255ebf0518c9_choices_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_blocks__b863fc9f4283_forms_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum___pages_v_blocks__b863fc9f4283_forms_v_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"help_text" varchar,
  	"required" boolean DEFAULT false,
  	"enabled" boolean DEFAULT true,
  	"width" "enum___pages_v_blocks__b863fc9f4283_forms_v_width" DEFAULT 'half',
  	"validation_message" varchar,
  	"options_source" "enum___pages_v_blocks__b863fc9f4283_forms_v_options_source" DEFAULT 'custom',
  	"min_length" numeric,
  	"max_length" numeric,
  	"min" numeric,
  	"max" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "shared_sections__5ec288ea5412_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "shared_sections__88aeee182186_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_shared_sections__88aeee182186_forms_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"help_text" varchar,
  	"required" boolean DEFAULT false,
  	"enabled" boolean DEFAULT true,
  	"width" "enum_shared_sections__88aeee182186_forms_width" DEFAULT 'half',
  	"validation_message" varchar,
  	"options_source" "enum_shared_sections__88aeee182186_forms_options_source" DEFAULT 'custom',
  	"min_length" numeric,
  	"max_length" numeric,
  	"min" numeric,
  	"max" numeric
  );
  
  CREATE TABLE "___shared_section_5f1de675207a_choices_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__shared_sections_0b9489055248_forms_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum___shared_sections_0b9489055248_forms_v_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"help_text" varchar,
  	"required" boolean DEFAULT false,
  	"enabled" boolean DEFAULT true,
  	"width" "enum___shared_sections_0b9489055248_forms_v_width" DEFAULT 'half',
  	"validation_message" varchar,
  	"options_source" "enum___shared_sections_0b9489055248_forms_v_options_source" DEFAULT 'custom',
  	"min_length" numeric,
  	"max_length" numeric,
  	"min" numeric,
  	"max" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "services_blocks__87558219af81_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "services_blocks__b5cf1b6677a5_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_services_blocks__b5cf1b6677a5_forms_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"help_text" varchar,
  	"required" boolean DEFAULT false,
  	"enabled" boolean DEFAULT true,
  	"width" "enum_services_blocks__b5cf1b6677a5_forms_width" DEFAULT 'half',
  	"validation_message" varchar,
  	"options_source" "enum_services_blocks__b5cf1b6677a5_forms_options_source" DEFAULT 'custom',
  	"min_length" numeric,
  	"max_length" numeric,
  	"min" numeric,
  	"max" numeric
  );
  
  CREATE TABLE "___services_v_blo_8e870347a06d_choices_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_bloc_2fd344713ce4_forms_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum___services_v_bloc_2fd344713ce4_forms_v_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"help_text" varchar,
  	"required" boolean DEFAULT false,
  	"enabled" boolean DEFAULT true,
  	"width" "enum___services_v_bloc_2fd344713ce4_forms_v_width" DEFAULT 'half',
  	"validation_message" varchar,
  	"options_source" "enum___services_v_bloc_2fd344713ce4_forms_v_options_source" DEFAULT 'custom',
  	"min_length" numeric,
  	"max_length" numeric,
  	"min" numeric,
  	"max" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "projects_blocks__5058a6fc57c3_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "projects_blocks__26475d8b69cc_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_projects_blocks__26475d8b69cc_forms_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"help_text" varchar,
  	"required" boolean DEFAULT false,
  	"enabled" boolean DEFAULT true,
  	"width" "enum_projects_blocks__26475d8b69cc_forms_width" DEFAULT 'half',
  	"validation_message" varchar,
  	"options_source" "enum_projects_blocks__26475d8b69cc_forms_options_source" DEFAULT 'custom',
  	"min_length" numeric,
  	"max_length" numeric,
  	"min" numeric,
  	"max" numeric
  );
  
  CREATE TABLE "___projects_v_blo_87f3548bbc09_choices_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__projects_v_bloc_e08e4076c4b9_forms_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum___projects_v_bloc_e08e4076c4b9_forms_v_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"help_text" varchar,
  	"required" boolean DEFAULT false,
  	"enabled" boolean DEFAULT true,
  	"width" "enum___projects_v_bloc_e08e4076c4b9_forms_v_width" DEFAULT 'half',
  	"validation_message" varchar,
  	"options_source" "enum___projects_v_bloc_e08e4076c4b9_forms_v_options_source" DEFAULT 'custom',
  	"min_length" numeric,
  	"max_length" numeric,
  	"min" numeric,
  	"max" numeric,
  	"_uuid" varchar
  );
  
  ALTER TABLE "enquiries" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "enquiries" ALTER COLUMN "email" DROP NOT NULL;
  ALTER TABLE "enquiries" ALTER COLUMN "message" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_mode" "enum_pages_blocks_contact_form_mode" DEFAULT 'legacy';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "validation_summary_message" varchar DEFAULT 'Please check the highlighted fields.';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_dialog_title" varchar DEFAULT 'Choose date and time';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_previous_month" varchar DEFAULT 'Previous month';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_next_month" varchar DEFAULT 'Next month';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_calendar_help" varchar DEFAULT 'Use arrow keys to move by day or week, Home or End for the week, Page Up or Down for the month. Hold Shift with Page Up or Down to change year. Press Enter to select a day, then choose a time and apply.';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_time_label" varchar DEFAULT 'Time (24-hour)';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_hour_label" varchar DEFAULT 'Hour, 00 to 23';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_minute_label" varchar DEFAULT 'Minute, 00 to 59';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_clear_label" varchar DEFAULT 'Clear';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_cancel_label" varchar DEFAULT 'Cancel';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_apply_label" varchar DEFAULT 'Apply';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_close_label" varchar DEFAULT 'Close date picker';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "date_picker_labels_invalid_time" varchar DEFAULT 'Enter an hour from 00–23 and minutes from 00–59.';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "preview_message" varchar DEFAULT 'Publish this form before accepting enquiries.';
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "unavailable_message" varchar DEFAULT 'This form is not accepting enquiries right now. Please contact us by email.';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_mode" "enum__pages_v_blocks_contact_form_mode" DEFAULT 'legacy';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "validation_summary_message" varchar DEFAULT 'Please check the highlighted fields.';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_dialog_title" varchar DEFAULT 'Choose date and time';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_previous_month" varchar DEFAULT 'Previous month';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_next_month" varchar DEFAULT 'Next month';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_calendar_help" varchar DEFAULT 'Use arrow keys to move by day or week, Home or End for the week, Page Up or Down for the month. Hold Shift with Page Up or Down to change year. Press Enter to select a day, then choose a time and apply.';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_time_label" varchar DEFAULT 'Time (24-hour)';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_hour_label" varchar DEFAULT 'Hour, 00 to 23';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_minute_label" varchar DEFAULT 'Minute, 00 to 59';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_clear_label" varchar DEFAULT 'Clear';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_cancel_label" varchar DEFAULT 'Cancel';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_apply_label" varchar DEFAULT 'Apply';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_close_label" varchar DEFAULT 'Close date picker';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "date_picker_labels_invalid_time" varchar DEFAULT 'Enter an hour from 00–23 and minutes from 00–59.';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "preview_message" varchar DEFAULT 'Publish this form before accepting enquiries.';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "unavailable_message" varchar DEFAULT 'This form is not accepting enquiries right now. Please contact us by email.';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "form_mode" "enum_shared_sections_blocks_contact_form_mode" DEFAULT 'legacy';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "validation_summary_message" varchar DEFAULT 'Please check the highlighted fields.';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_dialog_title" varchar DEFAULT 'Choose date and time';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_previous_month" varchar DEFAULT 'Previous month';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_next_month" varchar DEFAULT 'Next month';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_calendar_help" varchar DEFAULT 'Use arrow keys to move by day or week, Home or End for the week, Page Up or Down for the month. Hold Shift with Page Up or Down to change year. Press Enter to select a day, then choose a time and apply.';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_time_label" varchar DEFAULT 'Time (24-hour)';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_hour_label" varchar DEFAULT 'Hour, 00 to 23';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_minute_label" varchar DEFAULT 'Minute, 00 to 59';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_clear_label" varchar DEFAULT 'Clear';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_cancel_label" varchar DEFAULT 'Cancel';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_apply_label" varchar DEFAULT 'Apply';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_close_label" varchar DEFAULT 'Close date picker';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "date_picker_labels_invalid_time" varchar DEFAULT 'Enter an hour from 00–23 and minutes from 00–59.';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "preview_message" varchar DEFAULT 'Publish this form before accepting enquiries.';
  ALTER TABLE "shared_sections_blocks_contact" ADD COLUMN "unavailable_message" varchar DEFAULT 'This form is not accepting enquiries right now. Please contact us by email.';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "form_mode" "enum__shared_sections_v_blocks_contact_form_mode" DEFAULT 'legacy';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "validation_summary_message" varchar DEFAULT 'Please check the highlighted fields.';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_dialog_title" varchar DEFAULT 'Choose date and time';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_previous_month" varchar DEFAULT 'Previous month';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_next_month" varchar DEFAULT 'Next month';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_calendar_help" varchar DEFAULT 'Use arrow keys to move by day or week, Home or End for the week, Page Up or Down for the month. Hold Shift with Page Up or Down to change year. Press Enter to select a day, then choose a time and apply.';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_time_label" varchar DEFAULT 'Time (24-hour)';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_hour_label" varchar DEFAULT 'Hour, 00 to 23';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_minute_label" varchar DEFAULT 'Minute, 00 to 59';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_clear_label" varchar DEFAULT 'Clear';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_cancel_label" varchar DEFAULT 'Cancel';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_apply_label" varchar DEFAULT 'Apply';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_close_label" varchar DEFAULT 'Close date picker';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "date_picker_labels_invalid_time" varchar DEFAULT 'Enter an hour from 00–23 and minutes from 00–59.';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "preview_message" varchar DEFAULT 'Publish this form before accepting enquiries.';
  ALTER TABLE "_shared_sections_v_blocks_contact" ADD COLUMN "unavailable_message" varchar DEFAULT 'This form is not accepting enquiries right now. Please contact us by email.';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "form_mode" "enum_services_blocks_contact_form_mode" DEFAULT 'legacy';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "validation_summary_message" varchar DEFAULT 'Please check the highlighted fields.';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_dialog_title" varchar DEFAULT 'Choose date and time';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_previous_month" varchar DEFAULT 'Previous month';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_next_month" varchar DEFAULT 'Next month';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_calendar_help" varchar DEFAULT 'Use arrow keys to move by day or week, Home or End for the week, Page Up or Down for the month. Hold Shift with Page Up or Down to change year. Press Enter to select a day, then choose a time and apply.';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_time_label" varchar DEFAULT 'Time (24-hour)';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_hour_label" varchar DEFAULT 'Hour, 00 to 23';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_minute_label" varchar DEFAULT 'Minute, 00 to 59';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_clear_label" varchar DEFAULT 'Clear';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_cancel_label" varchar DEFAULT 'Cancel';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_apply_label" varchar DEFAULT 'Apply';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_close_label" varchar DEFAULT 'Close date picker';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "date_picker_labels_invalid_time" varchar DEFAULT 'Enter an hour from 00–23 and minutes from 00–59.';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "preview_message" varchar DEFAULT 'Publish this form before accepting enquiries.';
  ALTER TABLE "services_blocks_contact" ADD COLUMN "unavailable_message" varchar DEFAULT 'This form is not accepting enquiries right now. Please contact us by email.';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "form_mode" "enum__services_v_blocks_contact_form_mode" DEFAULT 'legacy';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "validation_summary_message" varchar DEFAULT 'Please check the highlighted fields.';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_dialog_title" varchar DEFAULT 'Choose date and time';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_previous_month" varchar DEFAULT 'Previous month';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_next_month" varchar DEFAULT 'Next month';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_calendar_help" varchar DEFAULT 'Use arrow keys to move by day or week, Home or End for the week, Page Up or Down for the month. Hold Shift with Page Up or Down to change year. Press Enter to select a day, then choose a time and apply.';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_time_label" varchar DEFAULT 'Time (24-hour)';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_hour_label" varchar DEFAULT 'Hour, 00 to 23';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_minute_label" varchar DEFAULT 'Minute, 00 to 59';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_clear_label" varchar DEFAULT 'Clear';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_cancel_label" varchar DEFAULT 'Cancel';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_apply_label" varchar DEFAULT 'Apply';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_close_label" varchar DEFAULT 'Close date picker';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "date_picker_labels_invalid_time" varchar DEFAULT 'Enter an hour from 00–23 and minutes from 00–59.';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "preview_message" varchar DEFAULT 'Publish this form before accepting enquiries.';
  ALTER TABLE "_services_v_blocks_contact" ADD COLUMN "unavailable_message" varchar DEFAULT 'This form is not accepting enquiries right now. Please contact us by email.';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "form_mode" "enum_projects_blocks_contact_form_mode" DEFAULT 'legacy';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "validation_summary_message" varchar DEFAULT 'Please check the highlighted fields.';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_dialog_title" varchar DEFAULT 'Choose date and time';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_previous_month" varchar DEFAULT 'Previous month';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_next_month" varchar DEFAULT 'Next month';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_calendar_help" varchar DEFAULT 'Use arrow keys to move by day or week, Home or End for the week, Page Up or Down for the month. Hold Shift with Page Up or Down to change year. Press Enter to select a day, then choose a time and apply.';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_time_label" varchar DEFAULT 'Time (24-hour)';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_hour_label" varchar DEFAULT 'Hour, 00 to 23';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_minute_label" varchar DEFAULT 'Minute, 00 to 59';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_clear_label" varchar DEFAULT 'Clear';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_cancel_label" varchar DEFAULT 'Cancel';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_apply_label" varchar DEFAULT 'Apply';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_close_label" varchar DEFAULT 'Close date picker';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "date_picker_labels_invalid_time" varchar DEFAULT 'Enter an hour from 00–23 and minutes from 00–59.';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "preview_message" varchar DEFAULT 'Publish this form before accepting enquiries.';
  ALTER TABLE "projects_blocks_contact" ADD COLUMN "unavailable_message" varchar DEFAULT 'This form is not accepting enquiries right now. Please contact us by email.';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "form_mode" "enum__projects_v_blocks_contact_form_mode" DEFAULT 'legacy';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "validation_summary_message" varchar DEFAULT 'Please check the highlighted fields.';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_dialog_title" varchar DEFAULT 'Choose date and time';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_previous_month" varchar DEFAULT 'Previous month';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_next_month" varchar DEFAULT 'Next month';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_calendar_help" varchar DEFAULT 'Use arrow keys to move by day or week, Home or End for the week, Page Up or Down for the month. Hold Shift with Page Up or Down to change year. Press Enter to select a day, then choose a time and apply.';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_time_label" varchar DEFAULT 'Time (24-hour)';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_hour_label" varchar DEFAULT 'Hour, 00 to 23';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_minute_label" varchar DEFAULT 'Minute, 00 to 59';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_clear_label" varchar DEFAULT 'Clear';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_cancel_label" varchar DEFAULT 'Cancel';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_apply_label" varchar DEFAULT 'Apply';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_close_label" varchar DEFAULT 'Close date picker';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "date_picker_labels_invalid_time" varchar DEFAULT 'Enter an hour from 00–23 and minutes from 00–59.';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "preview_message" varchar DEFAULT 'Publish this form before accepting enquiries.';
  ALTER TABLE "_projects_v_blocks_contact" ADD COLUMN "unavailable_message" varchar DEFAULT 'This form is not accepting enquiries right now. Please contact us by email.';
  ALTER TABLE "enquiries" ADD COLUMN "form_identity" jsonb;
  ALTER TABLE "enquiries" ADD COLUMN "field_values" jsonb;
  ALTER TABLE "pages_blocks_con_827c69924fc9_choices" ADD CONSTRAINT "pages_blocks_con_827c69924fc9_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_con_d91be606cc20_forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_con_d91be606cc20_forms" ADD CONSTRAINT "pages_blocks_con_d91be606cc20_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "___pages_v_blocks_255ebf0518c9_choices_v" ADD CONSTRAINT "___pages_v_blocks_255ebf0518c9_choices_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_blocks__b863fc9f4283_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_blocks__b863fc9f4283_forms_v" ADD CONSTRAINT "__pages_v_blocks__b863fc9f4283_forms_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections__5ec288ea5412_choices" ADD CONSTRAINT "shared_sections__5ec288ea5412_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections__88aeee182186_forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shared_sections__88aeee182186_forms" ADD CONSTRAINT "shared_sections__88aeee182186_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_sections_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "___shared_section_5f1de675207a_choices_v" ADD CONSTRAINT "___shared_section_5f1de675207a_choices_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__shared_sections_0b9489055248_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__shared_sections_0b9489055248_forms_v" ADD CONSTRAINT "__shared_sections_0b9489055248_forms_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shared_sections_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks__87558219af81_choices" ADD CONSTRAINT "services_blocks__87558219af81_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks__b5cf1b6677a5_forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks__b5cf1b6677a5_forms" ADD CONSTRAINT "services_blocks__b5cf1b6677a5_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "___services_v_blo_8e870347a06d_choices_v" ADD CONSTRAINT "___services_v_blo_8e870347a06d_choices_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_bloc_2fd344713ce4_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_bloc_2fd344713ce4_forms_v" ADD CONSTRAINT "__services_v_bloc_2fd344713ce4_forms_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks__5058a6fc57c3_choices" ADD CONSTRAINT "projects_blocks__5058a6fc57c3_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks__26475d8b69cc_forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks__26475d8b69cc_forms" ADD CONSTRAINT "projects_blocks__26475d8b69cc_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "___projects_v_blo_87f3548bbc09_choices_v" ADD CONSTRAINT "___projects_v_blo_87f3548bbc09_choices_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__projects_v_bloc_e08e4076c4b9_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__projects_v_bloc_e08e4076c4b9_forms_v" ADD CONSTRAINT "__projects_v_bloc_e08e4076c4b9_forms_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_con_827c69924fc9_choices_order_idx" ON "pages_blocks_con_827c69924fc9_choices" USING btree ("_order");
  CREATE INDEX "pages_blocks_con_827c69924fc9_choices_parent_id_idx" ON "pages_blocks_con_827c69924fc9_choices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_con_d91be606cc20_forms_order_idx" ON "pages_blocks_con_d91be606cc20_forms" USING btree ("_order");
  CREATE INDEX "pages_blocks_con_d91be606cc20_forms_parent_id_idx" ON "pages_blocks_con_d91be606cc20_forms" USING btree ("_parent_id");
  CREATE INDEX "___pages_v_blocks_255ebf0518c9_choices_v_order_idx" ON "___pages_v_blocks_255ebf0518c9_choices_v" USING btree ("_order");
  CREATE INDEX "___pages_v_blocks_255ebf0518c9_choices_v_parent_id_idx" ON "___pages_v_blocks_255ebf0518c9_choices_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_blocks__b863fc9f4283_forms_v_order_idx" ON "__pages_v_blocks__b863fc9f4283_forms_v" USING btree ("_order");
  CREATE INDEX "__pages_v_blocks__b863fc9f4283_forms_v_parent_id_idx" ON "__pages_v_blocks__b863fc9f4283_forms_v" USING btree ("_parent_id");
  CREATE INDEX "shared_sections__5ec288ea5412_choices_order_idx" ON "shared_sections__5ec288ea5412_choices" USING btree ("_order");
  CREATE INDEX "shared_sections__5ec288ea5412_choices_parent_id_idx" ON "shared_sections__5ec288ea5412_choices" USING btree ("_parent_id");
  CREATE INDEX "shared_sections__88aeee182186_forms_order_idx" ON "shared_sections__88aeee182186_forms" USING btree ("_order");
  CREATE INDEX "shared_sections__88aeee182186_forms_parent_id_idx" ON "shared_sections__88aeee182186_forms" USING btree ("_parent_id");
  CREATE INDEX "___shared_section_5f1de675207a_choices_v_order_idx" ON "___shared_section_5f1de675207a_choices_v" USING btree ("_order");
  CREATE INDEX "___shared_section_5f1de675207a_choices_v_parent_id_idx" ON "___shared_section_5f1de675207a_choices_v" USING btree ("_parent_id");
  CREATE INDEX "__shared_sections_0b9489055248_forms_v_order_idx" ON "__shared_sections_0b9489055248_forms_v" USING btree ("_order");
  CREATE INDEX "__shared_sections_0b9489055248_forms_v_parent_id_idx" ON "__shared_sections_0b9489055248_forms_v" USING btree ("_parent_id");
  CREATE INDEX "services_blocks__87558219af81_choices_order_idx" ON "services_blocks__87558219af81_choices" USING btree ("_order");
  CREATE INDEX "services_blocks__87558219af81_choices_parent_id_idx" ON "services_blocks__87558219af81_choices" USING btree ("_parent_id");
  CREATE INDEX "services_blocks__b5cf1b6677a5_forms_order_idx" ON "services_blocks__b5cf1b6677a5_forms" USING btree ("_order");
  CREATE INDEX "services_blocks__b5cf1b6677a5_forms_parent_id_idx" ON "services_blocks__b5cf1b6677a5_forms" USING btree ("_parent_id");
  CREATE INDEX "___services_v_blo_8e870347a06d_choices_v_order_idx" ON "___services_v_blo_8e870347a06d_choices_v" USING btree ("_order");
  CREATE INDEX "___services_v_blo_8e870347a06d_choices_v_parent_id_idx" ON "___services_v_blo_8e870347a06d_choices_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_bloc_2fd344713ce4_forms_v_order_idx" ON "__services_v_bloc_2fd344713ce4_forms_v" USING btree ("_order");
  CREATE INDEX "__services_v_bloc_2fd344713ce4_forms_v_parent_id_idx" ON "__services_v_bloc_2fd344713ce4_forms_v" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks__5058a6fc57c3_choices_order_idx" ON "projects_blocks__5058a6fc57c3_choices" USING btree ("_order");
  CREATE INDEX "projects_blocks__5058a6fc57c3_choices_parent_id_idx" ON "projects_blocks__5058a6fc57c3_choices" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks__26475d8b69cc_forms_order_idx" ON "projects_blocks__26475d8b69cc_forms" USING btree ("_order");
  CREATE INDEX "projects_blocks__26475d8b69cc_forms_parent_id_idx" ON "projects_blocks__26475d8b69cc_forms" USING btree ("_parent_id");
  CREATE INDEX "___projects_v_blo_87f3548bbc09_choices_v_order_idx" ON "___projects_v_blo_87f3548bbc09_choices_v" USING btree ("_order");
  CREATE INDEX "___projects_v_blo_87f3548bbc09_choices_v_parent_id_idx" ON "___projects_v_blo_87f3548bbc09_choices_v" USING btree ("_parent_id");
  CREATE INDEX "__projects_v_bloc_e08e4076c4b9_forms_v_order_idx" ON "__projects_v_bloc_e08e4076c4b9_forms_v" USING btree ("_order");
  CREATE INDEX "__projects_v_bloc_e08e4076c4b9_forms_v_parent_id_idx" ON "__projects_v_bloc_e08e4076c4b9_forms_v" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_con_827c69924fc9_choices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_con_d91be606cc20_forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "___pages_v_blocks_255ebf0518c9_choices_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__pages_v_blocks__b863fc9f4283_forms_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shared_sections__5ec288ea5412_choices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shared_sections__88aeee182186_forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "___shared_section_5f1de675207a_choices_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__shared_sections_0b9489055248_forms_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks__87558219af81_choices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks__b5cf1b6677a5_forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "___services_v_blo_8e870347a06d_choices_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__services_v_bloc_2fd344713ce4_forms_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks__5058a6fc57c3_choices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks__26475d8b69cc_forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "___projects_v_blo_87f3548bbc09_choices_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "__projects_v_bloc_e08e4076c4b9_forms_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_con_827c69924fc9_choices" CASCADE;
  DROP TABLE "pages_blocks_con_d91be606cc20_forms" CASCADE;
  DROP TABLE "___pages_v_blocks_255ebf0518c9_choices_v" CASCADE;
  DROP TABLE "__pages_v_blocks__b863fc9f4283_forms_v" CASCADE;
  DROP TABLE "shared_sections__5ec288ea5412_choices" CASCADE;
  DROP TABLE "shared_sections__88aeee182186_forms" CASCADE;
  DROP TABLE "___shared_section_5f1de675207a_choices_v" CASCADE;
  DROP TABLE "__shared_sections_0b9489055248_forms_v" CASCADE;
  DROP TABLE "services_blocks__87558219af81_choices" CASCADE;
  DROP TABLE "services_blocks__b5cf1b6677a5_forms" CASCADE;
  DROP TABLE "___services_v_blo_8e870347a06d_choices_v" CASCADE;
  DROP TABLE "__services_v_bloc_2fd344713ce4_forms_v" CASCADE;
  DROP TABLE "projects_blocks__5058a6fc57c3_choices" CASCADE;
  DROP TABLE "projects_blocks__26475d8b69cc_forms" CASCADE;
  DROP TABLE "___projects_v_blo_87f3548bbc09_choices_v" CASCADE;
  DROP TABLE "__projects_v_bloc_e08e4076c4b9_forms_v" CASCADE;
  ALTER TABLE "enquiries" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "enquiries" ALTER COLUMN "email" SET NOT NULL;
  ALTER TABLE "enquiries" ALTER COLUMN "message" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_mode";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "validation_summary_message";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_dialog_title";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_previous_month";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_next_month";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_calendar_help";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_time_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_hour_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_minute_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_clear_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_cancel_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_apply_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_close_label";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "date_picker_labels_invalid_time";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "preview_message";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "unavailable_message";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_mode";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "validation_summary_message";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_dialog_title";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_previous_month";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_next_month";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_calendar_help";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_time_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_hour_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_minute_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_clear_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_cancel_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_apply_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_close_label";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "date_picker_labels_invalid_time";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "preview_message";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "unavailable_message";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "form_mode";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "validation_summary_message";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_dialog_title";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_previous_month";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_next_month";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_calendar_help";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_time_label";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_hour_label";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_minute_label";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_clear_label";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_cancel_label";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_apply_label";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_close_label";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "date_picker_labels_invalid_time";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "preview_message";
  ALTER TABLE "shared_sections_blocks_contact" DROP COLUMN "unavailable_message";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "form_mode";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "validation_summary_message";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_dialog_title";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_previous_month";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_next_month";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_calendar_help";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_time_label";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_hour_label";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_minute_label";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_clear_label";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_cancel_label";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_apply_label";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_close_label";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "date_picker_labels_invalid_time";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "preview_message";
  ALTER TABLE "_shared_sections_v_blocks_contact" DROP COLUMN "unavailable_message";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "form_mode";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "validation_summary_message";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_dialog_title";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_previous_month";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_next_month";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_calendar_help";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_time_label";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_hour_label";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_minute_label";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_clear_label";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_cancel_label";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_apply_label";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_close_label";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "date_picker_labels_invalid_time";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "preview_message";
  ALTER TABLE "services_blocks_contact" DROP COLUMN "unavailable_message";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "form_mode";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "validation_summary_message";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_dialog_title";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_previous_month";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_next_month";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_calendar_help";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_time_label";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_hour_label";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_minute_label";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_clear_label";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_cancel_label";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_apply_label";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_close_label";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "date_picker_labels_invalid_time";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "preview_message";
  ALTER TABLE "_services_v_blocks_contact" DROP COLUMN "unavailable_message";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "form_mode";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "validation_summary_message";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_dialog_title";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_previous_month";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_next_month";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_calendar_help";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_time_label";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_hour_label";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_minute_label";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_clear_label";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_cancel_label";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_apply_label";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_close_label";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "date_picker_labels_invalid_time";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "preview_message";
  ALTER TABLE "projects_blocks_contact" DROP COLUMN "unavailable_message";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "form_mode";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "validation_summary_message";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_dialog_title";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_previous_month";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_next_month";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_calendar_help";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_time_label";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_hour_label";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_minute_label";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_clear_label";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_cancel_label";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_apply_label";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_close_label";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "date_picker_labels_invalid_time";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "preview_message";
  ALTER TABLE "_projects_v_blocks_contact" DROP COLUMN "unavailable_message";
  ALTER TABLE "enquiries" DROP COLUMN "form_identity";
  ALTER TABLE "enquiries" DROP COLUMN "field_values";
  DROP TYPE "public"."enum_pages_blocks_con_d91be606cc20_forms_type";
  DROP TYPE "public"."enum_pages_blocks_con_d91be606cc20_forms_width";
  DROP TYPE "public"."enum_pages_blocks_con_d91be606cc20_forms_options_source";
  DROP TYPE "public"."enum_pages_blocks_contact_form_mode";
  DROP TYPE "public"."enum___pages_v_blocks__b863fc9f4283_forms_v_type";
  DROP TYPE "public"."enum___pages_v_blocks__b863fc9f4283_forms_v_width";
  DROP TYPE "public"."enum___pages_v_blocks__b863fc9f4283_forms_v_options_source";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_mode";
  DROP TYPE "public"."enum_shared_sections__88aeee182186_forms_type";
  DROP TYPE "public"."enum_shared_sections__88aeee182186_forms_width";
  DROP TYPE "public"."enum_shared_sections__88aeee182186_forms_options_source";
  DROP TYPE "public"."enum_shared_sections_blocks_contact_form_mode";
  DROP TYPE "public"."enum___shared_sections_0b9489055248_forms_v_type";
  DROP TYPE "public"."enum___shared_sections_0b9489055248_forms_v_width";
  DROP TYPE "public"."enum___shared_sections_0b9489055248_forms_v_options_source";
  DROP TYPE "public"."enum__shared_sections_v_blocks_contact_form_mode";
  DROP TYPE "public"."enum_services_blocks__b5cf1b6677a5_forms_type";
  DROP TYPE "public"."enum_services_blocks__b5cf1b6677a5_forms_width";
  DROP TYPE "public"."enum_services_blocks__b5cf1b6677a5_forms_options_source";
  DROP TYPE "public"."enum_services_blocks_contact_form_mode";
  DROP TYPE "public"."enum___services_v_bloc_2fd344713ce4_forms_v_type";
  DROP TYPE "public"."enum___services_v_bloc_2fd344713ce4_forms_v_width";
  DROP TYPE "public"."enum___services_v_bloc_2fd344713ce4_forms_v_options_source";
  DROP TYPE "public"."enum__services_v_blocks_contact_form_mode";
  DROP TYPE "public"."enum_projects_blocks__26475d8b69cc_forms_type";
  DROP TYPE "public"."enum_projects_blocks__26475d8b69cc_forms_width";
  DROP TYPE "public"."enum_projects_blocks__26475d8b69cc_forms_options_source";
  DROP TYPE "public"."enum_projects_blocks_contact_form_mode";
  DROP TYPE "public"."enum___projects_v_bloc_e08e4076c4b9_forms_v_type";
  DROP TYPE "public"."enum___projects_v_bloc_e08e4076c4b9_forms_v_width";
  DROP TYPE "public"."enum___projects_v_bloc_e08e4076c4b9_forms_v_options_source";
  DROP TYPE "public"."enum__projects_v_blocks_contact_form_mode";`)
}
