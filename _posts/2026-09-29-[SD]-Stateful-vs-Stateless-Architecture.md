---
layout: post
title: "[SD] Stateful vs Stateless Architecture"
description: "Where a server keeps its state between requests, and when it should keep it in memory"
tags: [system-design]
---
# Stateless (the default)

The server holds nothing about a user between requests. Whatever it needs arrives with the request or lives somewhere shared.

Where the state goes

- **Signed token**: the client carries it (a JWT, a signed cookie)
- **Shared store**: Redis or a database
- **The request itself**: everything needed is in the body or params

Pros

- Any server can handle any request, so scaling is just adding servers

Cons

- Shared store: an extra lookup per request and a new thing that can fail
- Token: the same data is shipped on every request

# Stateful (the exception)

The server keeps user data in its own memory between requests.

When it is justified

- **Long-lived connections**: WebSockets for chat, live updates. The gateway must route each user to the server holding their connection
- **State that changes too fast to store**: game positions, HP, physics

# Example: game server

```
Players -> Primary game server
               |-> Hot replica
               |-> Event log
                     '-> Checkpoints
```

- **Hot replica**: near-current copy, promoted if the primary dies
- **Event log**: durable record of every state change
- **Checkpoint**: periodic snapshot, so recovery replays only the events after it

Recovery

1. Primary dies: promote the replica
2. Both die: load the latest checkpoint, replay newer events

Key idea: local memory for low latency, replication + logs + checkpoints for fault tolerance.
