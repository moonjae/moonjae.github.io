---
layout: post
title: "[SD] Wide-Column Store"
description: "A distributed key-value store with structured data under each key"
tags: [system-design]
---
# What

A distributed NoSQL database where every row is grouped under a **partition key**, with named columns inside each partition.

```
Partition key
    │
    ▼
 user_123
    ├── name → "Jae"
    ├── age  → 29
    └── city → "NYC"
```

# How it scales

The partition key is hashed, and the hash picks the node that owns the row.

```
           hash(partition key)
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
      Node A    Node B    Node C
      user_1    user_7    user_3
      user_4    user_2    user_8
```

Writes to different keys land on different nodes, so they run in parallel. Adding nodes adds write capacity.

# When to use it

- High write throughput and horizontal scaling
- Query patterns known up front, since you model tables around the queries
- Events, logs, time series, feeds, messaging

Trade-offs

- No joins, no heavy relational queries
- Schema can still be fixed (Cassandra requires one)

Examples: Cassandra, HBase, Bigtable

# Wide-column vs key-value

```
Key-value:    key → one value or blob
Wide-column:  key → structured columns
```

Wide-column is key-value style distribution with more structure under each key.
