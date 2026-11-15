// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("dispatch_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("dispatch_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "assignment_created",
                    "assignment_completed"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "dispatch"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "dispatch_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("dispatch_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "assignment_created",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "dispatch",
            "key": {
                "dispatch_id": 301
            },
            "snapshot": {
                "dispatch_id": 301,
                "work_order_id": 101,
                "technician_id": 201,
                "assigned_at": "2026-10-12T09:00:00Z",
                "completed_at": "2026-10-12T11:30:00Z",
                "outcome": "splice_repaired"
            }
        },
        "embedded": {
            "work_order": [
                {
                    "key": {
                        "work_order_id": 101
                    },
                    "snapshot": {
                        "work_order_id": 101,
                        "opened_at": "2026-10-12T08:30:00Z",
                        "site_code": "SITE-A17",
                        "priority": 4,
                        "status": "in_progress"
                    },
                    "via": [
                        "dispatch.work_order_id → work_order"
                    ]
                }
            ],
            "technician": [
                {
                    "key": {
                        "technician_id": 201
                    },
                    "snapshot": {
                        "technician_id": 201,
                        "display_name": "Avery Chen",
                        "skill_code": "FIBER_SPLICE",
                        "active": true
                    },
                    "via": [
                        "dispatch.technician_id → technician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "assignment_completed",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "dispatch",
            "key": {
                "dispatch_id": 301
            },
            "snapshot": {
                "dispatch_id": 301,
                "work_order_id": 101,
                "technician_id": 201,
                "assigned_at": "2026-10-12T09:00:00Z",
                "completed_at": "2026-10-12T11:30:00Z",
                "outcome": "splice_repaired"
            }
        },
        "embedded": {
            "work_order": [
                {
                    "key": {
                        "work_order_id": 101
                    },
                    "snapshot": {
                        "work_order_id": 101,
                        "opened_at": "2026-10-12T08:30:00Z",
                        "site_code": "SITE-A17",
                        "priority": 4,
                        "status": "in_progress"
                    },
                    "via": [
                        "dispatch.work_order_id → work_order"
                    ]
                }
            ],
            "technician": [
                {
                    "key": {
                        "technician_id": 201
                    },
                    "snapshot": {
                        "technician_id": 201,
                        "display_name": "Avery Chen",
                        "skill_code": "FIBER_SPLICE",
                        "active": true
                    },
                    "via": [
                        "dispatch.technician_id → technician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "dispatch",
                    "key": {
                        "dispatch_id": 301
                    },
                    "field": "outcome",
                    "value": "splice_repaired"
                }
            ],
            "examples": {
                "event_payload": "illustrative event_payload",
                "note": "illustrative note"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "assignment_created",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "dispatch",
            "key": {
                "dispatch_id": 302
            },
            "snapshot": {
                "dispatch_id": 302,
                "work_order_id": 102,
                "technician_id": 202,
                "assigned_at": "2026-10-13T10:00:00Z",
                "completed_at": null,
                "outcome": null
            }
        },
        "embedded": {
            "work_order": [
                {
                    "key": {
                        "work_order_id": 102
                    },
                    "snapshot": {
                        "work_order_id": 102,
                        "opened_at": "2026-10-13T09:15:00Z",
                        "site_code": "SITE-B24",
                        "priority": 2,
                        "status": "open"
                    },
                    "via": [
                        "dispatch.work_order_id → work_order"
                    ]
                }
            ],
            "technician": [
                {
                    "key": {
                        "technician_id": 202
                    },
                    "snapshot": {
                        "technician_id": 202,
                        "display_name": "Morgan Lee",
                        "skill_code": "LINE_TEST",
                        "active": true
                    },
                    "via": [
                        "dispatch.technician_id → technician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "assignment_completed",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "dispatch",
            "key": {
                "dispatch_id": 302
            },
            "snapshot": {
                "dispatch_id": 302,
                "work_order_id": 102,
                "technician_id": 202,
                "assigned_at": "2026-10-13T10:00:00Z",
                "completed_at": null,
                "outcome": null
            }
        },
        "embedded": {
            "work_order": [
                {
                    "key": {
                        "work_order_id": 102
                    },
                    "snapshot": {
                        "work_order_id": 102,
                        "opened_at": "2026-10-13T09:15:00Z",
                        "site_code": "SITE-B24",
                        "priority": 2,
                        "status": "open"
                    },
                    "via": [
                        "dispatch.work_order_id → work_order"
                    ]
                }
            ],
            "technician": [
                {
                    "key": {
                        "technician_id": 202
                    },
                    "snapshot": {
                        "technician_id": 202,
                        "display_name": "Morgan Lee",
                        "skill_code": "LINE_TEST",
                        "active": true
                    },
                    "via": [
                        "dispatch.technician_id → technician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "dispatch",
                    "key": {
                        "dispatch_id": 302
                    },
                    "field": "outcome",
                    "value": null
                }
            ],
            "examples": {
                "event_payload": "illustrative event_payload",
                "note": "illustrative note"
            }
        }
    }
]));
  await db.getCollection("dispatch_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("dispatch_events").find({"eventType":"assignment_created"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("dispatch_events").find({"source.key.dispatch_id":301}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("dispatch_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("dispatch_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("dispatch_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "assignment_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "dispatch",
        "key": {
            "dispatch_id": 301
        },
        "snapshot": {
            "dispatch_id": 301,
            "work_order_id": 101,
            "technician_id": 201,
            "assigned_at": "2026-10-12T09:00:00Z",
            "completed_at": "2026-10-12T11:30:00Z",
            "outcome": "splice_repaired"
        }
    },
    "embedded": {
        "work_order": [
            {
                "key": {
                    "work_order_id": 101
                },
                "snapshot": {
                    "work_order_id": 101,
                    "opened_at": "2026-10-12T08:30:00Z",
                    "site_code": "SITE-A17",
                    "priority": 4,
                    "status": "in_progress"
                },
                "via": [
                    "dispatch.work_order_id → work_order"
                ]
            }
        ],
        "technician": [
            {
                "key": {
                    "technician_id": 201
                },
                "snapshot": {
                    "technician_id": 201,
                    "display_name": "Avery Chen",
                    "skill_code": "FIBER_SPLICE",
                    "active": true
                },
                "via": [
                    "dispatch.technician_id → technician"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("dispatch_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "assignment_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "dispatch",
        "key": {
            "dispatch_id": 301
        },
        "snapshot": {
            "dispatch_id": 301,
            "work_order_id": 101,
            "technician_id": 201,
            "assigned_at": "2026-10-12T09:00:00Z",
            "completed_at": "2026-10-12T11:30:00Z",
            "outcome": "splice_repaired"
        }
    },
    "embedded": {
        "work_order": [
            {
                "key": {
                    "work_order_id": 101
                },
                "snapshot": {
                    "work_order_id": 101,
                    "opened_at": "2026-10-12T08:30:00Z",
                    "site_code": "SITE-A17",
                    "priority": 4,
                    "status": "in_progress"
                },
                "via": [
                    "dispatch.work_order_id → work_order"
                ]
            }
        ],
        "technician": [
            {
                "key": {
                    "technician_id": 201
                },
                "snapshot": {
                    "technician_id": 201,
                    "display_name": "Avery Chen",
                    "skill_code": "FIBER_SPLICE",
                    "active": true
                },
                "via": [
                    "dispatch.technician_id → technician"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("dispatch_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
