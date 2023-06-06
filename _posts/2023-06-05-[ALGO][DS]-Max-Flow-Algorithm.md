---
layout: post
title: "[ALGO][DS] Max Flow Algorithm"
description: "Max Flow Algorithm / Ford-Fulkerson"
tags: [algo, ds]
---
# Definition 
The maximum flow problem involves determining the maximum amount of flow that can be sent from a source vertex to a sink vertex in a directed weighted graph, subject to capacity constraints on the edges.

# Ford-Fulkerson 
1. Start with initial flow as 0.
2. While there exists an augmenting path from the source to the sink:  
 - Find an augmenting path using any path-finding algorithm, such as breadth-first search or depth-first search.
 - Determine the amount of flow that can be sent along the augmenting path, which is the minimum residual capacity along the edges of the path.
 - Increase the flow along the augmenting path by the determined amount.
3. Return the maximum flow.

# Template
```cpp
vector<vector<int>> capacity;
vector<vector<int>> flow;
unordered_set<int> visited;

int dfs(int cur, int sink, int min_val) {
    if (cur == sink) return min_val;
    visited.insert(cur);
    for (int i = 0; i < flow.size(); ++i) {
        int left = capacity[cur][i] - flow[cur][i];
        if (!left) continue;
        if (visited.find(i) == visited.end()) continue;
        if (int sent = dfs(i, sink, min(min_val, left))) {
            flow[cur][i] += sent;
            flow[i][cur] -= sent;
            return sent;
        }
    }
    return 0;
}


int fordFulkerson(int s, int t) {
    int max_flow = 0;
    
    while (int sent = dfs(s, t, INT_MAX)) {
        max_flow += sent;
        visited.clear();
    }
    return max_flow;
}
```

# Source
- https://stackoverflow.com/questions/19453217/why-are-back-edges-required-in-the-ford-fulkerson-algorithm
- https://www.youtube.com/watch?v=LdOnanfc5TM
