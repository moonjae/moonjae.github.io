---
layout: post
title: "[CS][DS] Fenwick Tree"
description: "Fenwick Tree or Binary Indexed Tree"
tags: [cs, ds]
---
# When is Fenwick tree used 
- Fenwick tree is used when we need to look for range sums for cases where elements keep getting updated 
- If elements do get updated we can probably use something like prefix sum array which is more efficient 
- Fenwick tree is often compared to segment tree but, I would prefer Fenwick because it is a lot simpler to implement and is the same in terms of efficiency 

# Implementation 
- Fenwick tree is similar prefix sum array in that tree[i] represents aggregate sum of multiple indices
- However while for prefix sum array, prefix[i] is sum of array 0 ~ i, this is not the case for Fenwick tree
- Think of it as a *partial sum array*
- Basically if A can turn into B after keep adding 1 to its last bit that is 1, they fall into same group 

So now the question is how do we know which indices tree[i] need to contain?
- Every indices can be represented in binary form ex) 2 -> 10 
- We can use bitwise operation to isolate the last bit that is 1 
- Then we can add that to the index and keep repeating it until we go out of bound 
- Now, all the indices that we have visited fall into a same group 
- If we have n numbers in the tree then, we can represent all the indices in logn bits, which our operations will take at most logn time
- Notice that we need to isolate at least 1 bit. If we use 0-indexed array and try to calculate for index 0, then it wouldn't work. That is why we need to use 1-indexed array for this. 

![](https://he-s3.s3.amazonaws.com/media/uploads/68f2369.jpg)


# Code Snippet 
```
vector<int> tree(n + 1);
void update(int index, int val) {
    ++index;
    while (index <= n) {
        tree[index] += val;
        index += index & (-index);
    }
}
int get_sum(int index) {
    ++index;
    int sum = 0;
    while (index > 0) {
        sum += tree[index];
        index -= index & (-index);
    }
    return sum;
}
```

# Complecity
- space complexity: O(n)
- time complexity: O(logn)

# Sources
- https://www.hackerearth.com/practice/notes/binary-indexed-tree-or-fenwick-tree/
