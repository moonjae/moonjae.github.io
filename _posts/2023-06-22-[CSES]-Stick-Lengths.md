---
layout: post
title: "[CSES] Stick Lengths"
description: "https://cses.fi/problemset/task/1074"
tags: [sorting]
---
# Problem Statement
There are n sticks with some lengths. Your task is to modify the sticks so that each stick has the same length. You can either lengthen and shorten each stick. Both operations cost x where x is the difference between the new and original length.
What is the minimum total cost?

# Intuition
I need to choose a number that minimizes the sum of differences between that number and each stick. That number needs to be the median. Let's say the median is 5 and the sum of differences is A. If we move the base to 4, the sum of differences gets increased to A + abs(5- 4)


# Code
```cpp
    long long n,t ;
    vector<long long> v;
    cin >> n;
    for (int i = 0; i < n; ++i) {
        cin >> t;
        v.push_back(t);
    }
    // sort
    // get median
    sort(v.begin(), v.end());
    long long median = v[n / 2];
    long long sum = 0;
    for (int i = 0; i < n; ++i) {
        sum += abs(median - v[i]);
    }
    cout << sum;
```
