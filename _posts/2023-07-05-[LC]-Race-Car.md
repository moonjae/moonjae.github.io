---
layout: post
title: "[LC] 818. Race Car"
description: "https://leetcode.com/problems/race-car"
tags: [dp]
---
# Problem Statement
Your car starts at position 0 and speed +1 on an infinite number line. Your car can go into negative positions. Your car drives automatically according to a sequence of instructions 'A' (accelerate) and 'R' (reverse):

When you get an instruction 'A', your car does the following:
position += speed
speed *= 2
When you get an instruction 'R', your car does the following:
If your speed is positive then speed = -1
otherwise speed = 1
Your position stays the same.
For example, after commands "AAR", your car goes to positions 0 --> 1 --> 3 --> 3, and your speed goes to 1 --> 2 --> 4 --> -1.

Given a target position target, return the length of the shortest sequence of instructions to get there.


# Intuition
Solution 1. Dijkstra
1. We basically need to find the shortest path from 0 to target 
2. Every iteration we can acclerate to the right side upto x amount of times 
3. Every iteration we can acclerate to the left side upto x amount of times 

Solution 2. DP
1. We have two choices 
- move past target and go backwards 
- move and stop right before target
2. For the first choice, we basically need to accelerate log(n) + 1 times and then move backwards so we need one R 
3. For the second choice, we needt o accelerate log(n) times
- in order to avoid extra steps, we need to interleave pos steps and neg steps as much as possible
- therefore we need to see if stepping backwards 0 ~ log(n) - 1 times can create an optimal result 


# Code
Solution 1
```cpp
struct Node {
    int pos, cost, direct;
};

bool operator<(const Node& a, const Node& b) {
    return a.cost > b.cost; 
}

int racecar(int target) {
        priority_queue<Node> pq;
        vector<unordered_map<int, int>> cost(2);
        pq.push({0, 0, 1});
        cost[0][0] = 0;
        int n = log2(target) + 1; 
        int barrier = (1 << n);
    
        while (!pq.empty()) {
            Node node = pq.top();
            pq.pop();
            if (node.pos == target) {
                return node.cost - 1;
            }
            if (cost[node.direct][node.pos] != node.cost) continue;
            
            // move to right
            for (int i = 1; i <= n; ++i) {
                int new_pos = node.pos + (1 << i) - 1;
                if (new_pos > barrier) break;
                
                int new_cost = node.cost + i + 1;
                int new_direct = node.direct + 1;
                if (!node.direct) {
                    new_cost++; 
                    new_direct++; 
                }
                new_direct %= 2; 
                if (cost[new_direct].count(new_pos) == 0 || cost[new_direct][new_pos] > new_cost) {
                    cost[new_direct][new_pos] = new_cost;
                    pq.push({new_pos, new_cost, new_direct});
                }
            }

            
            // move to left 
            for (int i = 1; i <= n; ++i) {
                int new_pos = node.pos - (1 << i) + 1;
                if (new_pos < -barrier) break;
                
                int new_cost = node.cost + i + 1;
                int new_direct = node.direct + 1;
                if (node.direct) {
                    new_cost++; 
                    new_direct++; 
                }
                new_direct %= 2; 
                if (cost[new_direct].count(new_pos) == 0 || cost[new_direct][new_pos] > new_cost) {
                    cost[new_direct][new_pos] = new_cost;
                    pq.push({new_pos, new_cost, new_direct});
                }
            }
        }
        return -1; 
    }
```

Solution 2 
```cpp
    unordered_map<int, int> cache; 
    int racecar(int target) {
        if (!target) return -1;
        if (cache.count(target)) return cache[target]; 
        int n = log2(target) + 1; 
        int min_value = racecar((1 << n) - 1 - target) + n + 1;
        
        for (int i = 0; i < n - 1; ++i) {
            min_value = min(min_value,  racecar(target - (1 << (n - 1)) + (1 << i)) + n + i + 1);
        }
        
        return cache[target] = min_value;
    }
```
