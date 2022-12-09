---
layout: post
title: "[Math] Catalan Numbers"
description: "Catalan Numbers / Couting Problem"
tags: [math]
---
# Definition
Catalan numbers are defined as a mathematical sequence that consists of positive integers, which can be used to find the number of possibilities of various combinations. 

The first few Catalan numbers for n = 0, 1, 2, 3, … are : 1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, …  

# Formula 
Cn 
= (2n)!/((n + 1)!n!) 
= binomialCoefficient(2n, n) / (n + 1)
= Cn-1 * 2(2n + 1) / (n + 2)

# Code
binomialCoefficient(2n, n) / (n + 1)
```
unsigned long int binomialCoeff(unsigned int n,
                                unsigned int k)
{
    unsigned long int res = 1;
 
    // Since C(n, k) = C(n, n-k)
    if (k > n - k)
        k = n - k;
 
    // Calculate value of [n*(n-1)*---*(n-k+1)] /
    // [k*(k-1)*---*1]
    for (int i = 0; i < k; ++i) {
        res *= (n - i);
        res /= (i + 1);
    }
 
    return res;
}
 
// A Binomial coefficient based function to find nth catalan
// number in O(n) time
unsigned long int catalan(unsigned int n)
{
    // Calculate value of 2nCn
    unsigned long int c = binomialCoeff(2 * n, n);
 
    // return 2nCn/(n+1)
    return c / (n + 1);
}
```

Cn-1 * 2(2n + 1) / (n + 2)
```
int getNthCatalan(int n) {
    int C = 1;
    for (int i = 0; i < n; ++i) {
        C = C * 2 * (2 * i + 1) / (i + 2);
    }
    return C;
}
```

