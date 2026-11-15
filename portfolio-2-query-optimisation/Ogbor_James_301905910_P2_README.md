# Fiber Repair Dispatch Tracker — SQL queries

## 1. Show related dispatch, work_order, technician records (up to 20).

```sql
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
```

| dispatch_dispatch_id | dispatch_assigned_at | work_order_work_order_id | work_order_opened_at | technician_technician_id | technician_display_name |
| --- | --- | --- | --- | --- | --- |
| 301 | 2026-10-12T09:00:00+00:00 | 101 | 2026-10-12T08:30:00+00:00 | 201 | Avery Chen |
| 302 | 2026-10-13T10:00:00+00:00 | 102 | 2026-10-13T09:15:00+00:00 | 202 | Morgan Lee |

## 2. Find work_order records where status matches "in_progress" (up to 20).

```sql
SELECT * FROM portfolio."work_order"
WHERE "status" IS NOT DISTINCT FROM 'in_progress'
ORDER BY "work_order_id"
LIMIT 20;
```

| work_order_id | opened_at | site_code | priority | status |
| --- | --- | --- | --- | --- |
| 101 | 2026-10-12T08:30:00+00:00 | SITE-A17 | 4 | in_progress |

## 3. Count dispatch records for each work_order_id (up to 20 groups).

```sql
SELECT "work_order_id", count(*) AS record_count
FROM portfolio."dispatch"
GROUP BY "work_order_id"
ORDER BY record_count DESC, "work_order_id" NULLS LAST
LIMIT 20;
```

| work_order_id | record_count |
| --- | --- |
| 101 | 1 |
| 102 | 1 |

## 4. Find work_order records where status matches "in_progress" (up to 20).

```sql
SELECT * FROM portfolio."work_order"
WHERE "status" IS NOT DISTINCT FROM 'in_progress'
ORDER BY "work_order_id"
LIMIT 20;
```

| work_order_id | opened_at | site_code | priority | status |
| --- | --- | --- | --- | --- |
| 101 | 2026-10-12T08:30:00+00:00 | SITE-A17 | 4 | in_progress |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.104 | 1.104, 1.095, 1.125 | Sort → Seq Scan | 131 |
| After index | 0.216 | 0.278, 0.216, 0.197 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 1.104 ms to 0.216 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.08..1.082 rows=20 loops=1)
  Seq Scan on work_order (actual time=0.017..1.045 rows=20 loops=1)
Planning Time: 0.41 ms
Execution Time: 1.104 ms
```

### Before index, run 2

```text
Sort (actual time=1.071..1.073 rows=20 loops=1)
  Seq Scan on work_order (actual time=0.016..1.032 rows=20 loops=1)
Planning Time: 0.383 ms
Execution Time: 1.095 ms
```

### Before index, run 3

```text
Sort (actual time=1.1..1.102 rows=20 loops=1)
  Seq Scan on work_order (actual time=0.016..1.065 rows=20 loops=1)
Planning Time: 0.406 ms
Execution Time: 1.125 ms
```

### After index, run 1

```text
Sort (actual time=0.184..0.187 rows=20 loops=1)
  Bitmap Heap Scan on work_order (actual time=0.038..0.134 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.019..0.02 rows=20 loops=1)
Planning Time: 2.972 ms
Execution Time: 0.278 ms
```

### After index, run 2

```text
Sort (actual time=0.164..0.165 rows=20 loops=1)
  Bitmap Heap Scan on work_order (actual time=0.029..0.128 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.015..0.015 rows=20 loops=1)
Planning Time: 0.574 ms
Execution Time: 0.216 ms
```

### After index, run 3

```text
Sort (actual time=0.144..0.146 rows=20 loops=1)
  Bitmap Heap Scan on work_order (actual time=0.03..0.107 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.016..0.016 rows=20 loops=1)
Planning Time: 0.588 ms
Execution Time: 0.197 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Ogbor_James_301905910_P2_Queries.sql, then Ogbor_James_301905910_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Ogbor_James_301905910_P2_QueryResults.png) · [Index comparison](screenshots/Ogbor_James_301905910_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

