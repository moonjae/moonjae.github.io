---
layout: post
title: "[LC] 4. Median of Two Sorted Arrays"
description: "https://leetcode.com/problems/median-of-two-sorted-arrays/description/"
tags: [binary-search]
---
# Problem Statement
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

# Intuition
- The problem explicitly states that we need to aim for logarithmic runtime so, it can guess that we need something like divide and conquer or binary search. 
- Another hint we can use for this is that when we are looking for median of any sort, we know that the number of elemennts that are smaller or equal to the median are equal to the number of elements that are eual to or larger than the median 
- Since we know that we need to incorporate binary search technique, we need to decide what we are looking for through that binary search. 

What we are looking for in the binary search 
- the number of elements that are smaller than the median in array1
- using the above, we can calculate how many numbers will be on the smaller side in array 2 

How do we update the range variables
- let's say that array1 = smaller: a | larger : b and array2 = smaller: c | larger : d
- because a is on the smaller side, it would not make sense if a is larger than d which needs to be on the larger side -> update r variable 
- because c is on the smaller side, it would not make sense if c is larger than b -> update l variable 


# Approach
Binary Search
1. make sure that nums1 is the shorter vector 
    - if nums1 is the longer vector, this will inevitably create lots of edge cases (the number of smaller variables for nums2 can go out of bound)
2. create two variables l and r and set them to 0 and size of nums1 respectively 
3. loop until l <= r
4. calculate mid and use that as the number of elements that will be on the smaller side in nums1
5. from 4. we can calculate how many numbers need to be on the smaller side for nums2
    - because half the numbers in m + n need to be on the smaller side, it would be (m + n) / 2 - the number calculated in step4
6. get the largest smaller values and the smallest larger values 
7. if it meets the condition, return answer and there can be two different cases 
    - when the number of elements is odd, we know that smaller side will have n elements and the larger side will have n + 1 elements and therfore, the median should come from the min of the smallest larger values 
    - when the number of elements is even, we need to add max largest smaller values and min smallest larger values and get the average
8. if not, update the search range

# Complexity
- Time complexity: O(log n)
- Space complexity: O(1)

# Code
```
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        if (n < m) return findMedianSortedArrays(nums2, nums1);
        int l = 0, r = m;
        while (l <= r) {
            int nums1_smaller = l + (r - l) / 2;
            int nums2_smaller = (m + n) / 2 - nums1_smaller;

            int nums1_largest_smaller = nums1_smaller ? nums1[nums1_smaller - 1] : INT_MIN;
            int nums2_largest_smaller = nums2_smaller ? nums2[nums2_smaller - 1] : INT_MIN;
            int nums1_smallest_larger = nums1_smaller != m ? nums1[nums1_smaller] : INT_MAX;
            int nums2_smallest_larger = nums2_smaller != n ? nums2[nums2_smaller] : INT_MAX;
            
            if (nums1_largest_smaller <= nums2_smallest_larger && nums1_smallest_larger >= nums2_largest_smaller) {
                if ((n + m) % 2) return min(nums1_smallest_larger, nums2_smallest_larger);
                else return (max(nums1_largest_smaller, nums2_largest_smaller) + min(nums1_smallest_larger, nums2_smallest_larger)) / 2.0;
            }
            else if (nums1_largest_smaller > nums2_smallest_larger) {
                r = nums1_smaller - 1;
            }
            else {
                l = nums1_smaller + 1;
            }
        }
        return -1;
    }
```
# Take Away
- when the problem related to median, remember that it is always about balancing how many numbers need to go to left and right side respectively
