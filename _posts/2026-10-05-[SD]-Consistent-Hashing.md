---
layout: post
title: "[SD] Consistent Hashing"
description: "How a hash ring assigns keys to servers while limiting remapping"
tags: [system-design]
---
# The problem

With `server = hash(key) % N`, adding one server changes `N`. Most keys then point to a different server, even though only one machine was added.

Consistent hashing reduces that reshuffling by hashing both servers and keys into the same circular space.

# Finding a server

Imagine hash positions from 0 to 99, where 99 wraps back to 0. A key belongs to the first server encountered moving forward around the ring.

```
Position:  0────12────────────47────────────78──────────99 ↻
Server:        Saffron         Indigo         Teal
Key:               k1=18          k2=53                 k3=91

k1 → Indigo     k2 → Teal     k3 → Saffron (wraps past 99)
```

In sorted order, each server owns the interval after the previous server up to its own position. For example, Indigo owns `(12, 47]`.

# When membership changes

Add a server at position 60:

```
Before:  ... 47 Indigo ───────────── 78 Teal ...
After:   ... 47 Indigo ── 60 Quartz ── 78 Teal ...
```

Only keys in `(47, 60]` move, from Teal to Quartz. Keys elsewhere keep their owner. Removing a server has the reverse effect for its interval: those keys move to the next server around the ring.

This is useful for distributed caches and sharded stores, where moving a large amount of data during scaling is expensive.

# Keeping ownership balanced

A server placed at one position may get a much larger interval than another. Production systems often give each physical server many positions on the ring, called **virtual nodes**. Keys are spread across those positions, which tends to balance load and lets a replacement server take over portions from several machines.

The ring limits how much ownership changes; it does not guarantee perfectly even traffic or data size. Hot keys can still overload one server, and virtual nodes need sensible placement and capacity weighting.

# Remember

Hash keys and servers into one circular space, then assign each key to the next server clockwise. Adding or removing a server affects only the nearby interval of keys.
