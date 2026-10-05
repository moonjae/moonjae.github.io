---
layout: post
title: "[SD] Bloom Filter"
description: "A compact way to test whether an item may be in a large set"
tags: [system-design]
---
# What it tells you

A Bloom filter answers whether an item is **definitely absent** or **possibly present**. It stores bits rather than the items themselves, so it uses little memory.

```text
URL → Bloom filter
       ├─ definitely absent → crawl it
       └─ possibly present  → skip it or verify elsewhere
```

# How it works

The filter starts as an array of zero bits. To add an item, several hash functions choose bit positions and set them to `1`. To check an item, inspect those same positions:

- Any `0` means **definitely absent**.
- All `1`s means **possibly present**.

Different items can set the same bits, causing a false positive. An inserted item always has all its bits set, so the filter has no false negatives (unless it is changed or used incorrectly).

# Where it helps

Use it as a cheap first check when the set is too large to keep in memory: crawler URL deduplication, duplicate detection in a stream, or checking whether an ID may exist. A positive result can be checked against the source of truth when accuracy matters.

**Trade-off:** more inserted items make false positives more likely. A Bloom filter cannot list its items, and standard Bloom filters cannot remove individual items.
