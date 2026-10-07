---
layout: post
title: "[SD] System Design Template: 2. NFR + Estimation"
description: "Step 2 after functional requirements: turn non-functional requirements into capacity estimates"
tags: [system-design]
---
# Step 2: NFR + estimation

After defining the **functional requirements**—what the system must do—identify its non-functional requirements (NFRs), such as scale, latency, availability, consistency, and geographic reach. Then turn those requirements into capacity estimates.

## Why estimate early?

Before choosing an architecture, translate the product requirements into a small set of capacity targets. These estimates help guide decisions about storage, caching, replication, and geographic deployment.

# 1. Scale

Ask for, or make explicit assumptions about:

- Daily active users (DAU)
- Relevant actions per user per day
- Read/write ratio

Let `actions/day = DAU × actions per user per day`. Split those actions by the read/write ratio to estimate daily reads and writes.

```text
average QPS ≈ requests/day ÷ 86,400
```

For quick mental math, `requests/day ÷ 100,000` is a close approximation. Apply it separately to reads and writes. This assumes actions roughly correspond to requests; account for extra service calls or fan-out when the design requires them.

# 2. Traffic shape

Ask about peak factor, burstiness, and hot spots or skew. If no traffic shape is given, assume a peak around `3×` average as a starting point.

```text
peak read QPS  = average read QPS × peak factor
peak write QPS = average write QPS × peak factor
```

The same peak factor may not fit every workload. A flash crowd, scheduled job, or a few very popular keys can create short bursts or hot spots beyond the average peak estimate.

# 3. Latency

Ask for the target latency and whether p95 or p99 matters. For normal interactive requests, a reasonable starting assumption is roughly **under 200 ms**. Tail latency targets matter when a slow request can hold up a user action or a larger request assembled from many services.

# 4. Availability

Ask what availability target the system needs. If unspecified, start with **99.9%** and clarify whether the target applies to the whole system or a particular user-facing operation.

The target can influence replication, failover, and whether the system needs to run across multiple availability zones (multi-AZ).

# 5. Consistency

Ask whether reads must see the latest write (strong consistency) or can lag (eventual consistency).

- Balances, payments, inventory, and uniqueness usually need stronger consistency.
- Feeds, likes, and analytics can often tolerate eventual consistency.

Choose based on what incorrect or stale results mean for the product.

# 6. Geography

Ask whether the system serves one region or users around the world, and whether it needs low latency worldwide. These answers inform CDN use, multi-region deployment, and the replication strategy.

# 7. Data size

Ask for record size, request and response payload sizes, and media size when relevant. If no values are given, useful starting assumptions are:

- Metadata record: about **1 KB**
- Image: about **1–5 MB**
- Video: estimate from the problem's requirements

```text
storage growth/day = writes/day × bytes per write
bandwidth          = QPS × payload size
```

Use consistent units and distinguish stored data from replicated copies, indexes, and backups when estimating total capacity. For large payloads, estimate reads and writes separately if their rates or payload sizes differ.

# What to carry forward

Most designs only need these headline estimates:

- Average read QPS
- Average write QPS
- Peak read QPS
- Peak write QPS
- Storage growth per day
- Bandwidth, when payloads are large

If the interviewer gives no numbers, state assumptions clearly. For a large consumer system, one possible starting point is:

> I'll assume 100M DAU, roughly 10 relevant actions per user per day, a 3× peak factor, and around 1 KB per metadata record.

Then split actions into reads and writes using an explicit ratio before deriving QPS and storage growth.
