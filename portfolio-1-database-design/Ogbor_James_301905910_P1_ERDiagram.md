# Fiber Repair Dispatch Tracker — ER diagram

```mermaid
erDiagram
    direction LR
    work_order {
        bigint work_order_id PK
        timestamptz opened_at
        text site_code
        integer priority
        text status
    }
    technician {
        bigint technician_id PK
        text display_name
        text skill_code
        boolean active
    }
    dispatch {
        bigint dispatch_id PK
        bigint work_order_id FK
        bigint technician_id FK
        timestamptz assigned_at
        timestamptz completed_at "Optional"
        text outcome "Optional"
    }
    work_order ||--o{ dispatch : "work_order_id"
    technician ||--o{ dispatch : "technician_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Ogbor_James_301905910_ERDiagram.png)
