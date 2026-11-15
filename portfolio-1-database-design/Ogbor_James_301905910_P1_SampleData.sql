-- Fictional sample records for Fiber Repair Dispatch Tracker.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."work_order" ("work_order_id", "opened_at", "site_code", "priority", "status") VALUES (101, '2026-10-12T08:30:00Z', 'SITE-A17', 4, 'in_progress');
INSERT INTO portfolio."work_order" ("work_order_id", "opened_at", "site_code", "priority", "status") VALUES (102, '2026-10-13T09:15:00Z', 'SITE-B24', 2, 'open');
INSERT INTO portfolio."technician" ("technician_id", "display_name", "skill_code", "active") VALUES (201, 'Avery Chen', 'FIBER_SPLICE', TRUE);
INSERT INTO portfolio."technician" ("technician_id", "display_name", "skill_code", "active") VALUES (202, 'Morgan Lee', 'LINE_TEST', TRUE);
INSERT INTO portfolio."dispatch" ("dispatch_id", "work_order_id", "technician_id", "assigned_at", "completed_at", "outcome") VALUES (301, 101, 201, '2026-10-12T09:00:00Z', '2026-10-12T11:30:00Z', 'splice_repaired');
INSERT INTO portfolio."dispatch" ("dispatch_id", "work_order_id", "technician_id", "assigned_at", "completed_at", "outcome") VALUES (302, 102, 202, '2026-10-13T10:00:00Z', NULL, NULL);
COMMIT;
