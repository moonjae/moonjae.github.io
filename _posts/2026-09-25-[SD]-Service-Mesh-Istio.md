---
layout: post
title: "[SD] Service Mesh / Istio"
description: "What a service mesh is, how Istio does it, and why you'd want one"
tags: [system-design]
---
# What

Infrastructure for managing service-to-service calls.

# How

Istio proxies intercept traffic. Your app still calls the normal service endpoint; the proxy sitting next to it handles the rest.

# Why

Centralized mTLS, metrics, traffic routing, timeouts, and retries, without each service implementing them.

# Where

- An ingress gateway handles incoming traffic from outside.
- The mesh manages calls between services inside.

# Request flow

```text
Client
  ↓
Load balancer
  ↓
API gateway / ingress
  ↓
Kubernetes API Service → API pod [Envoy ↔ API app]
                                      │ calls "auth"
                                      ↓
                            same API pod's Envoy
                                      ↓
Kubernetes Auth Service → Auth pod [Envoy → Auth app]
```
