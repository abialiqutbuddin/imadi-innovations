import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_email_settings_security" AS ENUM('starttls', 'tls');
  CREATE TABLE "email_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"host" varchar,
  	"port" numeric DEFAULT 587,
  	"security" "enum_email_settings_security" DEFAULT 'starttls',
  	"username" varchar,
  	"smtp_password" varchar,
  	"from_address" varchar DEFAULT 'info@imadi-innovations.com',
  	"from_name" varchar DEFAULT 'Imadi Innovations',
  	"notify_enquiries" boolean DEFAULT true,
  	"notification_email" varchar DEFAULT 'abialigadi@gmail.com',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "email_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "email_settings" CASCADE;
  DROP TYPE "public"."enum_email_settings_security";`)
}
