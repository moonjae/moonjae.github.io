---
layout: post
title: "[LC] 2488. Count Subarrays With Median K"
description: "https://leetcode.com/problems/count-subarrays-with-median-k/description/"
tags: [balance, prefix, hashmap]
---
# Problem Statement
You are given an array nums of size n consisting of distinct integers from 1 to n and a positive integer k.
Return the number of non-empty subarrays in nums that have a median equal to k.

Note:
The median of an array is the middle element after sorting the array in ascending order. If the array is of even length, the median is the left middle element.
For example, the median of [2,3,1,4] is 2, and the median of [8,4,3,5,1] is 4.
A subarray is a contiguous part of an array.


Example 1:
Input: nums = [3,2,1,4,5], k = 4
Output: 3
Explanation: The subarrays that have a median equal to 4 are: [4], [4,5] and [1,4,5].

# Intuition
There are two cases where k becomes median
-no of smaller numbers is equal to no of larger numbers (when size of the subarray is odd)
-no of larger numbers + 1 is equal to no of smaller numbers (when size of the subarray is even)

# Approach
Balance / Prefix / Hashmap
1. look where k is located in the given array
2. iterate towards the left starting from k and try to record the rolling balance
3. record the frequency of the balance in a hashmap
4. now, iterate from k towards the right side
5. record the rolling balance again this time
6. check if -rolling balance and -rolling balance + 1 exist in the hashmap, if they do, add both of them to the answer

# Complexity
- Time complexity: O(n)
- Space complexity: O(n)

# Code
* initial submission O(n^2)
```
int countSubarrays(vector<int>& nums, int k) {
        int k_index;
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            if (nums[i] == k) {
                k_index = i;
                break;
            }
        }
        vector<pair<int,int>> prefix_left(n, {0,0});
        vector<pair<int,int>> prefix_right(n, {0,0});
        for (int i = k_index - 1; i >= 0; --i) {
            prefix_left[i] = prefix_left[i + 1];
            if (nums[i] > k) {
                prefix_left[i].second++;
            }
            else {
                prefix_left[i].first++;
            }
        }
        for (int i = k_index + 1; i < n; ++i) {
            prefix_right[i] = prefix_right[i - 1];
            if (nums[i] > k) {
                prefix_right[i].second++;
            }
            else {
                prefix_right[i].first++;
            }
        }
        int cnt = 0;
        for (int l = k_index; l >= 0; --l) {
            for (int r = k_index; r < n; ++r) {
                int size = r - l + 1;
                int smaller = prefix_left[l].first + prefix_right[r].first;
                int larger = prefix_left[l].second + prefix_right[r].second;
                if (size % 2) {
                    if (smaller == larger) ++cnt;
                }
                else {
                    if (smaller + 1 == larger) ++cnt;
                }
            }
        }
        return cnt;
    }
```
* final submission O(n)
```
    int countSubarrays(vector<int>& nums, int k) {
        int k_index;
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            if (nums[i] == k) {
                k_index = i;
                break;
            }
        }
        unordered_map<int, int> cnt;
        int answer = 0;
        int cur = 0;
        for (int i = k_index; i >= 0; --i) {
            cur += (nums[i] == k) ? 0 : (nums[i] < k) ? -1 : 1;
            ++cnt[cur];
        }
        cur = 0;
        for (int i = k_index; i < n; ++i) {
            cur += (nums[i] == k) ? 0 : (nums[i] < k) ? -1 : 1;
            answer += cnt[-cur] + cnt[-cur + 1];
        }

        return answer;
    }
```
# Take Away
- when the problem related to + / - or left / right, consider using balance
