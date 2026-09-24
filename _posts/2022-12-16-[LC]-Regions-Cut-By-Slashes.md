---
layout: post
title: "[LC] 959. Regions Cut By Slashes"
description: "https://leetcode.com/problems/regions-cut-by-slashes/description/"
tags: [union-find, dfs, bfs]
---
# Problem Statement
An n x n grid is composed of 1 x 1 squares where each 1 x 1 square consists of a '/', '\', or blank space ' '. These characters divide the square into contiguous regions.
Given the grid grid represented as a string array, return the number of regions.
Note that backslash characters are escaped, so a '\' is represented as '\\'.

Example 1:
![](https://assets.leetcode.com/uploads/2018/12/15/1.png)
Input: grid = [" /","/ "]
Output: 2


# Intuition
- This problem can basically be understood as a disjoint set problem. The objective is to find how many disjoin sets there are. 
- The next problem we face is, how are we going to find all the disjoin sets. There are two possible ways to do this. 
1. Union Find 
- we should try to divide the squares into 4parts each 
![](https://i.loli.net/2018/12/20/5c1b3cfd6c7b9.jpg)
- basically whenever we see '/', 0 and 1 can be joined and 2 and 3 can be joined 
- when wee see '\', 0 and 2 can be joined and 1 and 3 can be joined 
- when it is empty, all 4 parts can be joined togther 
- we also need to see if parts in the current square can be joined with parts from surrounding squares 

2. DFS or BFS (finding number of islands)
- in order to convert this into 'finding number of islands' problem, we can upscale the grid into [n * 3][n * 3] grid and then try to represent the crossing lines in the middle 
![](https://assets.leetcode.com/users/votrubac/image_1544935075.png)


# Approach
Union find approach 
1. iterate through each grid 
2. check if grid is '/' -> (0,1) and (2,3) need to be joiend 
3. check if grid is '\' -> (0, 2) and (1,3) need to be joined 
4. also we need to join parts of the cur grid with parts from the surring squares 
    - We don't have to check for all 4 parts. Since we are iterating from left to right and top to bottom, we only need to join 0 with top's 3 and 1 with left's 2 

# Code

Union Find approach

```
    vector<int> boss_list;
    int cnt;
    int get_boss(int sub) {
        if (boss_list[sub] == sub) return sub;
        return boss_list[sub] = get_boss(boss_list[sub]);
    }
    void join(int a, int b) {
        int a_boss = get_boss(a);
        int b_boss = get_boss(b);
        if (a_boss == b_boss) return;
        --cnt;
        boss_list[a_boss] = b_boss;
    }
    int regionsBySlashes(vector<string>& grid) {
        int n = grid.size();
        cnt = n * n * 4;
        for (int i = 0; i < cnt; ++i) boss_list.push_back(i);
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                int index = (i * n + j) * 4;
                int a = index;
                int b = index + 1;
                int c = index + 2;
                int d = index + 3;
                if (grid[i][j] == '/') {
                    join(a, b);
                    join(c, d);
                }
                else if (grid[i][j] == '\\') {
                    join(a, d);
                    join(b, c);
                }
                else {
                    join(a, b);
                    join(b, c);
                    join(c, d);
                }
                
                // left
                if (j != 0) {
                    int left = (i * n + j - 1) * 4 + 2;
                    join(left, a);
                }
                // top
                if (i != 0) {
                    int top = ((i - 1) * n + j) * 4 + 3;
                    join(top, b);
                }
            }
        }
        
        return cnt;
    }
```

DFS approach

```
int dfs(vector<vector<int>> &g, int i, int j) {
    if (min(i, j) < 0 || max(i, j) >= g.size() || g[i][j] != 0)
        return 0;
    g[i][j] = 1;
    return 1 + dfs(g, i - 1, j) + dfs(g, i + 1, j) + dfs(g, i, j - 1) + dfs(g, i, j + 1);
}
int regionsBySlashes(vector<string>& grid) {
    int n = grid.size(), regions = 0;
    vector<vector<int>> g(n * 3, vector<int>(n * 3, 0));
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            if (grid[i][j] == '/') 
                g[i * 3][j * 3 + 2] = g[i * 3 + 1][j * 3 + 1] = g[i * 3 + 2][j * 3] = 1;
            else if (grid[i][j] == '\\') 
                g[i * 3][j * 3] = g[i * 3 + 1][j * 3 + 1] = g[i * 3 + 2][j * 3 + 2] = 1;
    for (int i = 0; i < n * 3; ++i)
        for (int j = 0; j < n * 3; ++j)
            regions += dfs(g, i, j) ? 1 : 0;    
    return regions;
}
```

# Take Away 
- First, always think about what kind of problem I need to solve. All the questions are worded differently but, a lot of them can be converted into easier problems. 
