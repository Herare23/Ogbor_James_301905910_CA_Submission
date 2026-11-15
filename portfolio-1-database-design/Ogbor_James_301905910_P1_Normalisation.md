# Fiber Repair Dispatch Tracker — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| work_order_id | dispatch records (list) |
| --- | --- |
| 101 | [301] |
| 102 | [302] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| dispatch.dispatch_id | dispatch.work_order_id | dispatch.technician_id | dispatch.outcome | work_order.work_order_id | work_order.site_code | technician.technician_id | technician.display_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | splice_repaired | 101 | SITE-A17 | 201 | Avery Chen |
| 302 | 102 | 202 | NULL | 102 | SITE-B24 | 202 | Morgan Lee |

Key: dispatch_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## dispatch_example

| dispatch.dispatch_id | dispatch.work_order_id | dispatch.technician_id | dispatch.outcome | work_order.work_order_id | work_order.site_code | technician.technician_id | technician.display_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | splice_repaired | 101 | SITE-A17 | 201 | Avery Chen |
| 302 | 102 | 202 | NULL | 102 | SITE-B24 | 202 | Morgan Lee |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## work_order

| work_order_id | opened_at | site_code | priority | status |
| --- | --- | --- | --- | --- |
| 101 | 2026-10-12T08:30:00+00:00 | SITE-A17 | 4 | in_progress |
| 102 | 2026-10-13T09:15:00+00:00 | SITE-B24 | 2 | open |

## technician

| technician_id | display_name | skill_code | active |
| --- | --- | --- | --- |
| 201 | Avery Chen | FIBER_SPLICE | true |
| 202 | Morgan Lee | LINE_TEST | true |

## dispatch

| dispatch_id | work_order_id | technician_id | assigned_at | completed_at | outcome |
| --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-10-12T09:00:00+00:00 | 2026-10-12T11:30:00+00:00 | splice_repaired |
| 302 | 102 | 202 | 2026-10-13T10:00:00+00:00 | NULL | NULL |

## Dependencies

- work_order: (work_order_id) → opened_at, site_code, priority, status
- technician: (technician_id) → display_name, skill_code, active
- dispatch: (dispatch_id) → work_order_id, technician_id, assigned_at, completed_at, outcome

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
