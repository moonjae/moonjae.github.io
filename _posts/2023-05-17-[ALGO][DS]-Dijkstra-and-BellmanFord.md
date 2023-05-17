---
layout: post
title: "[ALGO][DS] Dijkstra and Bellman-Ford"
description: "Dijkstra and Bellman-ford"
tags: [algo, ds]
---
# Similarities and Differences
Similarities
- They are both used to find a solution shortest path from a single source problem
- They both use "edge relaxation"; an operation to find lower cost to reach vertex

Differences
- D - greedy B - DP
- D - works only on pos values B - work on neg values too
- B is able to detect negative cycle

# Template
``` cpp
int dijkstra(int n, int src, int dst, unordered_map<int, vector<vector<int>>>& adj) {
    priority_queue<vector<int>> pq;
    vector<bool> visited(n, false);
    vector<int> cost(n, INT_MAX);
    visited[src] = true;
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

void bellmanFord(int V, int src, vector<vector<int>>& edges) {
    vector<int> cost(V, INT_MAX);
    cost[src] = 0;

    for (int i = 0; i < V - 1; ++i) {
        for (vector<int>& edge: edges) {
            int source = edge[0];
            int destination = edge[1];
            if (cost[source] == INT_MAX) continue;
            // to check to see what happens after each iteration of i
            // we need to create a temporary vector if not it will not strictly
            // show you values after ith iteration; could show i+ th iteration
            int new_cost = edge[2] + cost[source];
            if (cost[destination] > new_cost) {
                cost[destination] = new_cost;
            }
        }
    }
    // you can do an extra loop here to check for negative cycle
}
```
