---
layout: post
title: "[ALGO][DS] Dijkstra vs Prims"
description: "Dijkstra vs Prims"
tags: [algo, ds]
---
# Similarities and Differences
Similarities
- They both use greedy approach
Differences 
- Dijkstra is used for shortedst path problem while Prims is used for MST
- They only differ in vertex relaxation method 


# Template
``` cpp
int dijkstra(int n, int src, int dst, unordered_map<int, vector<vector<int>>>& adj) {
    priority_queue<vector<int>> pq;
    vector<bool> visited(n, false);
    vector<int> cost(n, INT_MAX);
    cost[src] = 0;
    pq.push({src, 0});
    while (!pq.empty()) {
        vector<int> cur = pq.top();
        pq.pop();
        if (visited[cur[0]]) continue;
        visited[cur[0]] = true;
        
        // - cur[1] represents the min cost to reach cur[0]
        // - there cannot be a cost that is smaller than current cost
        // later in the loop
        // - you can technically check if c[0] == dst and return here
        for (vector<int>& neighbor: adj[cur[0]]) {
            if (cost[neighbor[0]] > cur[1] + neighbor[1]) {
                cost[neighbor[0]] = cur[1] + neighbor[1];
                pq.push({neighbor[0], cost[neighbor[0]]});
            }
        }
    }
    return cost[dst];
}

int prims(int n, unordered_map<int, vector<vector<int>>>& adj) {
    priority_queue<vector<int>> pq;
    vector<bool> visited(n, false);
    vector<int> cost(n, INT_MAX);

    cost[0] = 0;
    pq.push({0, 0});
    while (!pq.empty()) {
        vector<int> cur = pq.top();
        pq.pop();
        if (visited[cur[0]]) continue;
        visited[cur[0]] = true;
        for (vector<int>& nei: adj[cur[0]]) {
            if (cost[nei[0]] > nei[1]) {
                cost[nei[0]] = nei[1];
                pq.push({nei[0], cost[nei[0]]});
            }
        }
    }
    // iterate through cost vector and return
}
```
