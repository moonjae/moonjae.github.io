---
layout: post
title: "[SD] Latency vs Throughput"
description: "Notes from Grokking the System Design Interview"
tags: [system-design]
---
# Definitions

- Latency = network time + waiting time + processing time
- Throughput = how many requests can be processed at a given time
- Concurrency = how many requests can be processed at the same time
  - Concurrency = Latency * Throughput

# Example

- A service must handle 2000 reqs per sec → throughput
- Each request takes 0.05 sec → latency
- Concurrency: it takes 1 sec to process 2000 reqs. Since each request takes 0.05 sec, the total amount of time to process 2000 would be 0.05 * 2000 = 200 sec if there were no concurrency. But because they can be processed in 1 sec, the concurrency is 200.

# Where the tradeoff comes from

Let's say you need to increase throughput via batching, for example. When you use batching, the latency of an individual request worsens, since each request needs to wait until the rest of the batch arrives before everything can get processed at once.

# How to improve latency

- Move data closer to users, e.g. CDN
- Cache
- Fewer network trips
- Keep utilization moderate
- Improve DB queries
- Remove unnecessary jobs while the user is waiting

# How to improve throughput

- More servers
- Increase concurrency
- Batching
- Queue (allows multiple workers to work at the same time)
- Sharding (spreads data access across multiple DBs)
- Cache (cache improves latency, and it frees up resources for more requests)

# Choosing what to optimize

- Is the user waiting for the response? (yes → latency, no → throughput)
- Is the system overloaded? (add more capacity; if not, both latency and throughput will suffer)
