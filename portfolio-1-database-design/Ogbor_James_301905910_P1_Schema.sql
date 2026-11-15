-- Fiber Repair Dispatch Tracker: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."work_order" (
  "work_order_id" bigint NOT NULL,
  "opened_at" timestamptz NOT NULL,
  "site_code" text NOT NULL,
  "priority" bigint NOT NULL,
  "status" text NOT NULL,
  CONSTRAINT "pk_work_order" PRIMARY KEY ("work_order_id")
);
CREATE TABLE portfolio."technician" (
  "technician_id" bigint NOT NULL,
  "display_name" text NOT NULL,
  "skill_code" text NOT NULL,
  "active" boolean NOT NULL,
  CONSTRAINT "pk_technician" PRIMARY KEY ("technician_id")
);
CREATE TABLE portfolio."dispatch" (
  "dispatch_id" bigint NOT NULL,
  "work_order_id" bigint NOT NULL,
  "technician_id" bigint NOT NULL,
  "assigned_at" timestamptz NOT NULL,
  "completed_at" timestamptz,
  "outcome" text,
  CONSTRAINT "pk_dispatch" PRIMARY KEY ("dispatch_id")
);
ALTER TABLE portfolio."dispatch" ADD CONSTRAINT "fk_dispatch_0" FOREIGN KEY ("work_order_id") REFERENCES portfolio."work_order" ("work_order_id");
ALTER TABLE portfolio."dispatch" ADD CONSTRAINT "fk_dispatch_1" FOREIGN KEY ("technician_id") REFERENCES portfolio."technician" ("technician_id");
ALTER TABLE portfolio."work_order" ADD CONSTRAINT "priority_range" CHECK (("priority" >= 1) AND ("priority" <= 5));
ALTER TABLE portfolio."work_order" ADD CONSTRAINT "valid_work_order_status" CHECK (("status" = 'open') OR ("status" = 'in_progress') OR ("status" = 'closed'));
ALTER TABLE portfolio."dispatch" ADD CONSTRAINT "completion_after_assignment" CHECK (("completed_at" IS NULL) OR ("completed_at" > "assigned_at"));
CREATE UNIQUE INDEX "one_active_dispatch_per_work_order" ON portfolio."dispatch" ("work_order_id") WHERE ("completed_at" IS NULL);
COMMIT;
