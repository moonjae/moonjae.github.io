---
layout: post
title: "[CSES] Flight Discount"
description: "https://cses.fi/problemset/task/1195"
tags: [graph]
---
# Problem Statement
Your task is to find a minimum-price flight route from Syrjälä to Metsälä. You have one discount coupon, using which you can halve the price of any single flight during the route. However, you can only use the coupon once.


# Intuition
This is a shortest path problem so we can use Dijkstra. However, we need to figure out how to take account of the discount. There are two ways to solve this problem 

Solution 1.
1. get min cost from src to all the other nodes (v1)
2. get min cost from dst to all the other nodes (v2)
3. iterate through all the nodes (A)
- iterate through neighors (B)
- we need to see if applying discount on this (A - B) can create min cost 
- v1[A] + (AB) + v2[B]

Solution 2. 
1. Use a separate space to take store min cost when discount is applied

# Code
Solution 1
```cpp
typedef long long ll;
struct Node{
    ll node, val;
};
bool operator<(const Node& a, const Node& b){
    return a.val < b.val;
}

int n, m;
unordered_map<ll, vector<Node>> adj;
unordered_map<ll, vector<Node>> rev_adj;

vector<ll> dijkstra(unordered_map<ll, vector<Node>>& neighbors, int src) {
    vector<ll> v(n + 1, LLONG_MAX);
    priority_queue<Node> pq;
    pq.push({src, 0});
    v[src] = 0;
    
    while (!pq.empty()) {
        Node node = pq.top();
        pq.pop();
        if (v[node.node] != node.val) continue;
        for (Node& nei: adj[node.node]) {
            ll new_cost = node.val + nei.val;
            if (new_cost < v[nei.node]) {
                v[nei.node] = new_cost;
                pq.push({ nei.node, new_cost });
            }
        }
    }
    
    return v;
}
int main() {
    cin >> n >> m;
    ll t1, t2, t3;
    for (int i = 0; i < m; ++i) {
        cin >> t1 >> t2 >> t3;
        adj[t1].push_back({t2, t3});
        rev_adj[t2].push_back({t1, t3});
    }
    
    vector<ll> forward = dijkstra(adj, 1);
    vector<ll> reverse = dijkstra(rev_adj, n);
    ll min_cost = LLONG_MAX;
    for (int i = 1; i <= n; ++i) {
        for (Node& nei: adj[i]) {
            ll cand = forward[i] + reverse[nei.node] + nei.val / 2;
            if (min_cost > cand) min_cost = cand;
        }
    }
    
    cout << min_cost;
}

```

Solution 2 
```cpp
typedef long long ll;
struct Node{
    ll node, val;
    int type;
};
bool operator<(const Node& a, const Node& b){
    return a.val < b.val;
}

int n, m;
unordered_map<ll, vector<Node>> adj;

void dijkstra() {
    // 0 x included
    // 1 included
    vector<vector<ll>> v(2, vector<ll>(n + 1, LLONG_MAX));
    priority_queue<Node> pq;
    pq.push({1, 0, 0});
    v[0][1] = 0;
    
    while (!pq.empty()) {
        Node node = pq.top();
        pq.pop();
        if (v[node.type][node.node] != node.val) continue;
        for (Node& nei: adj[node.node]) {
            // if cur is x included, we can try to include this time
            if (node.type == 0) {
                ll cand = nei.val / 2 + node.val;
                if (cand < v[1][nei.node]) v[1][nei.node] = cand;
                pq.push({ nei.node, cand, 1 });
            }
            
            ll cand = nei.val + node.val;
            if (cand < v[node.type][nei.node]) {
                v[node.type][nei.node] = cand;
                pq.push({ nei.node, cand, node.type });
            }
        }
    }
    
    cout << v[1][n];
}
int main() {
    cin >> n >> m;
    ll t1, t2, t3;
    for (int i = 0; i < m; ++i) {
        cin >> t1 >> t2 >> t3;
        adj[t1].push_back({t2, t3});
    }
    dijkstra();
}
```
