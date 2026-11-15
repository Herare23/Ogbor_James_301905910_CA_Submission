-- Show related dispatch, work_order, technician records (up to 20).
SELECT t0."dispatch_id" AS "dispatch_dispatch_id",
       t0."assigned_at" AS "dispatch_assigned_at",
       t1."work_order_id" AS "work_order_work_order_id",
       t1."opened_at" AS "work_order_opened_at",
       t2."technician_id" AS "technician_technician_id",
       t2."display_name" AS "technician_display_name"
FROM portfolio."dispatch" t0
JOIN portfolio."work_order" t1 ON t0."work_order_id" = t1."work_order_id"
JOIN portfolio."technician" t2 ON t0."technician_id" = t2."technician_id"
ORDER BY t0."dispatch_id", t1."work_order_id", t2."technician_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."dispatch_id" AS "dispatch_dispatch_id",
       t0."assigned_at" AS "dispatch_assigned_at",
       t1."work_order_id" AS "work_order_work_order_id",
       t1."opened_at" AS "work_order_opened_at",
       t2."technician_id" AS "technician_technician_id",
       t2."display_name" AS "technician_display_name"
FROM portfolio."dispatch" t0
JOIN portfolio."work_order" t1 ON t0."work_order_id" = t1."work_order_id"
JOIN portfolio."technician" t2 ON t0."technician_id" = t2."technician_id"
ORDER BY t0."dispatch_id", t1."work_order_id", t2."technician_id"
LIMIT 20;

-- Find work_order records where status matches "in_progress" (up to 20).
SELECT * FROM portfolio."work_order"
WHERE "status" IS NOT DISTINCT FROM 'in_progress'
ORDER BY "work_order_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."work_order"
WHERE "status" IS NOT DISTINCT FROM 'in_progress'
ORDER BY "work_order_id"
LIMIT 20;

-- Count dispatch records for each work_order_id (up to 20 groups).
SELECT "work_order_id", count(*) AS record_count
FROM portfolio."dispatch"
GROUP BY "work_order_id"
ORDER BY record_count DESC, "work_order_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "work_order_id", count(*) AS record_count
FROM portfolio."dispatch"
GROUP BY "work_order_id"
ORDER BY record_count DESC, "work_order_id" NULLS LAST
LIMIT 20;

-- Find work_order records where status matches "in_progress" (up to 20).
SELECT * FROM portfolio."work_order"
WHERE "status" IS NOT DISTINCT FROM 'in_progress'
ORDER BY "work_order_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."work_order"
WHERE "status" IS NOT DISTINCT FROM 'in_progress'
ORDER BY "work_order_id"
LIMIT 20;
