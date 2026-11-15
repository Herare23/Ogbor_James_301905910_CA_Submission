# Fiber Repair Dispatch Tracker — database design

My case study records work_order, technician, dispatch.

## Users

- Dispatch coordinators assigning repair work
- Operations analysts reviewing repair workload

## Main operations

- Create and update repair work orders
- Assign a technician to a work order
- Record assignment completion and outcome

## Entities

| Entity | Information stored |
| --- | --- |
| work_order | A synthetic request to repair a fiber service issue. |
| technician | A synthetic technician eligible for repair assignments. |
| dispatch | An assignment of one technician to one work order, including its timing and outcome. |

## work_order

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| work_order_id | BIGINT | PK | Yes |
| opened_at | TIMESTAMPTZ |  | Yes |
| site_code | TEXT |  | Yes |
| priority | INTEGER |  | Yes |
| status | TEXT |  | Yes |


## technician

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| technician_id | BIGINT | PK | Yes |
| display_name | TEXT |  | Yes |
| skill_code | TEXT |  | Yes |
| active | BOOLEAN |  | Yes |


## dispatch

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| dispatch_id | BIGINT | PK | Yes |
| work_order_id | BIGINT | FK | Yes |
| technician_id | BIGINT | FK | Yes |
| assigned_at | TIMESTAMPTZ |  | Yes |
| completed_at | TIMESTAMPTZ |  | No |
| outcome | TEXT |  | No |
- work_order_id → work_order.work_order_id
- technician_id → technician.technician_id

## Relationships and business rules

- Work-order priority must be an integer from 1 through 5.
- Work-order status must be one of open, in_progress, or closed.
- Every dispatch must reference an existing work order.
- Every dispatch must reference an existing technician.
- If a completion timestamp is present, it must be no earlier than the assignment timestamp.
- At most one dispatch per work order may have a null completed_at timestamp.

## Assumptions

- All records and identifiers are synthetic.
- A work order may have only one unfinished dispatch assignment at a time.
- A completed dispatch is identified by a non-null completed_at timestamp.
- Each dispatch references exactly one work order and one technician.
- Priority values range from 1 (lowest) through 5 (highest).

