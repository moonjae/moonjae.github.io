---
layout: post
title: "[ALGO][DS] Eulerian Path/Cycle"
description: "Eulerian Path/Cycle"
tags: [algo, ds]
---
# Definition 
- Eulerian Path is a path in a graph where every edge is visited once 
- Eulerian Cycle is an Eulerian Path that starts and ends at the same node 

# How to know if Eulerian path/cycle exists 
1. graph must be fully connected 
2. E Cycle exsits when the degrees of all the vertices are even 
3. E Path exists when there are 2 or 0(cycle) odd degreed vertices 

# Template
``` 
procedure FindEulerPath(V)
  1. iterate through all the edges outgoing from vertex V;
       remove this edge from the graph,
       and call FindEulerPath from the second end of this edge;
  2. add vertex V to the answer.
```

# Source
- https://cp-algorithms.com/graph/euler_path.html
- https://www.youtube.com/watch?v=8MpoO2zA2l4&t=120s
