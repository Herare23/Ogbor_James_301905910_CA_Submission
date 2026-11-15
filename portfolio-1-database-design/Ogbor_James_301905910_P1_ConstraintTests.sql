-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. reject work order primary key. Expected: pk_work_order, SQLSTATE 23505.
INSERT INTO portfolio."work_order" ("work_order_id", "opened_at", "site_code", "priority", "status")
VALUES (101, '2026-10-14T08:00:00Z', 'SITE-C31', 3, 'open');

-- 2. reject technician primary key. Expected: pk_technician, SQLSTATE 23505.
INSERT INTO portfolio."technician" ("technician_id", "display_name", "skill_code", "active")
VALUES (201, 'Taylor Park', 'FIBER_SPLICE', TRUE);

-- 3. reject dispatch primary key. Expected: pk_dispatch, SQLSTATE 23505.
INSERT INTO portfolio."dispatch" ("dispatch_id", "work_order_id", "technician_id", "assigned_at", "completed_at", "outcome")
VALUES (301, 101, 202, '2026-10-14T08:00:00Z', '2026-10-14T09:00:00Z', 'inspection_complete');

-- 4. reject dispatch work order foreign key. Expected: fk_dispatch_0, SQLSTATE 23503.
INSERT INTO portfolio."dispatch" ("dispatch_id", "work_order_id", "technician_id", "assigned_at", "completed_at", "outcome")
VALUES (401, 9001, 201, '2026-10-14T08:00:00Z', NULL, NULL);

-- 5. reject dispatch technician foreign key. Expected: fk_dispatch_1, SQLSTATE 23503.
INSERT INTO portfolio."dispatch" ("dispatch_id", "work_order_id", "technician_id", "assigned_at", "completed_at", "outcome")
VALUES (402, 101, 9002, '2026-10-14T08:00:00Z', NULL, NULL);

-- 6. reject work order not null. Expected: site_code, SQLSTATE 23502.
INSERT INTO portfolio."work_order" ("work_order_id", "opened_at", "site_code", "priority", "status")
VALUES (403, '2026-10-14T08:00:00Z', NULL, 3, 'open');

-- 7. reject priority range. Expected: priority_range, SQLSTATE 23514.
INSERT INTO portfolio."work_order" ("work_order_id", "opened_at", "site_code", "priority", "status")
VALUES (404, '2026-10-14T08:00:00Z', 'SITE-C32', 0, 'open');

-- 8. reject work order status. Expected: valid_work_order_status, SQLSTATE 23514.
INSERT INTO portfolio."work_order" ("work_order_id", "opened_at", "site_code", "priority", "status")
VALUES (405, '2026-10-14T08:00:00Z', 'SITE-C33', 3, 'pending');

-- 9. reject completion before assignment. Expected: completion_after_assignment, SQLSTATE 23514.
INSERT INTO portfolio."dispatch" ("dispatch_id", "work_order_id", "technician_id", "assigned_at", "completed_at", "outcome")
VALUES (406, 101, 202, '2026-10-14T10:00:00Z', '2026-10-14T09:00:00Z', 'inspection_complete');

-- 10. reject second active dispatch. Expected: one_active_dispatch_per_work_order, SQLSTATE 23505.
INSERT INTO portfolio."dispatch" ("dispatch_id", "work_order_id", "technician_id", "assigned_at", "completed_at", "outcome")
VALUES (407, 102, 201, '2026-10-14T08:00:00Z', NULL, NULL);
