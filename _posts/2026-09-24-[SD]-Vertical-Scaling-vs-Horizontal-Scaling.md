---
layout: post
title: "[SD] Vertical Scaling vs Horizontal Scaling"
description: "Notes from Grokking the System Design Interview"
tags: [system-design]
---
# Vertical scaling

Adding resources to one machine.

Pros

- No code changes
- No distributed problems

Cons

- Can get expensive
- Hard limit
- No redundancy

# Horizontal scaling

Adding more servers.

Pros

- No limit
- Redundancy
- Easy to scale

Cons

- Need to have a load balancer
- State becomes a problem
- Data must be copied or split
- Harder operations (deployments, monitoring, logging)
- Some work cannot be split

# Usual scaling path

1. One machine
2. Scale up
3. Scale the application tier out
   - Make the application servers stateless, put them behind a load balancer, keep sessions in a shared store
4. Shard the DB
   - Only when write load is too big
   - Cons: queries across shards become hard
