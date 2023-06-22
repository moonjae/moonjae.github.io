---
layout: post
title: "[CSES] Missing Coin Sum"
description: "https://cses.fi/problemset/task/2183/"
tags: [sorting]
---
# Problem Statement
You have n coins with positive integer values. What is the smallest sum you cannot create using a subset of the coins?

# Intuition
The naive approach would be trying out all the subets which is 2^n but, this would be too slow. 
Let's sort the numbers first. Let's say we have a variable x that tells us that 1 ~ x can be found and set it to 0 at first. 
1. sort
2. create a var x and set it to 0
3. iterate through the vector 
4. if there is a gap between x + 1 and v[i] that means x + 1 is the smallest missing subset 
5. else add v[i] to x 
- because x consists of numbers that are smaller than v[i], numbers between x + 1 ~ x + v[i] should be able to be formed by x + v[i] - some smaller number included in x 


# Code
```cpp
    ll n, t;
    cin >> n;
    vector<ll> nums;
    for (int i = 0; i < n; ++i) {
        cin >> t;
        nums.push_back(t); 
    }
    sort(nums.begin(), nums.end());
    ll cur = 0; 
    for (int i = 0; i < n; ++i) {
        if (cur + 1 < nums[i]) break;
        cur += nums[i];
    }
    cout << cur + 1; 
```
