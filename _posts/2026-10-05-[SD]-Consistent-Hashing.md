---
layout: post
title: "[SD] Consistent Hashing"
description: "How a hash ring assigns keys to servers while limiting remapping"
tags: [system-design]
---
# Hash ring

Hash keys and servers into the same circular space. A key belongs to the next server clockwise.

```
Position:  0────12────────────47────────────78──────────99 ↻
Server:        Saffron         Indigo         Teal
Key:               k1=18          k2=53                 k3=91

k1 → Indigo     k2 → Teal     k3 → Saffron (wraps past 99)
```

Each server owns the interval after the previous server up to its position. Indigo owns `(12, 47]`.

# Add or remove a server

Add a server at position 60:

```
Before:  ... 47 Indigo ───────────── 78 Teal ...
After:   ... 47 Indigo ── 60 Quartz ── 78 Teal ...
```

Only keys in `(47, 60]` move from Teal to Quartz. Removing a server moves its keys to the next server clockwise. All other keys stay put.

With `hash(key) % N`, adding a server changes `N` and remaps most keys. Consistent hashing limits movement to nearby intervals, which helps when scaling caches and sharded stores.

**Virtual nodes** give each physical server several positions on the ring, helping balance ownership.
