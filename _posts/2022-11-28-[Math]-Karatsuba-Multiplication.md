---
layout: post
title: "[Math] Karatsuba Multiplication"
description: "Karatsuba algorithm is a fast integer multiplication algorithm using divide and conquer approach"
tags: [math, divide-and-conquer]
---
#  Algorithm Description
The naive approach for multiplication is slow and it takes about O(n^2) time. Karatsuba Multiplication is a more efficient algorithm that can be used for multiplication of numbers.


# Intuition
We need to figure out how many passengers need to pass through a given city. Once we have that we know how many liters we need to move those passengers to the next city.

# Approach
Divide and Conquer
Let's say we are give two numbers as inputs; 1234 and 5678
1. we need to divide those numbers into halves
	- 1234 can be divided into a: 12, b: 34
	- 5678 can be divided into c: 56, d: 78
2.  compute a * c
3.  compute b * d
4.  compute ad + bc
	- ad + bc = (a + b)(c + d) - ac - bd = ac + bc + ad + bd - ac - bd = ad + bc
	- therefore we need to compute (a + b) * (c + d) and then subtract ac and bd from it
5. return pow(10, b's length * 2) * ac + pow(10, b's length) * (ad + bc) + bd
6. continue until one of the number has single digit, in that case we can simply execute multiplication and then return it



# Complexity
- Time complexity: O(n^log2 3)
- need to use master theorem to calculate

# Code
```
string multiply(string & num1, string & num2) {
    if (num1.length() < num2.length()) swap(num1, num2);
    if (num2.length() == 1 && num2[0] == '0') return "0";
    int carry = 0;
    string result = "";
    for (int i = num1.length() - 1, bnum = num2[0] - '0'; i >= 0; --i) {
        int anum = num1[i] - '0';
        int calculated = anum * bnum + carry;
        carry = (calculated >= 10) ? calculated / 10 : 0;
        result = char('0' + (calculated % 10)) + result;
    }
    if (carry) result = char('0' + carry) + result;
    return result;
}
string add(string num1, string num2) {
    string result = "";
    if (num1.length() < num2.length()) swap(num1, num2);
    int carry = 0;
    for (int i = num1.length() - 1, j = num2.length() - 1; i >= 0 || j >= 0; --i, --j) {
        int a = num1[i] - '0';
        int b = j >= 0 ? num2[j] - '0': 0;
        int sum = a + b + carry;
        carry = (sum >= 10) ? sum / 10 : 0;
        result = char('0' + sum % 10) + result;
    }
    return carry ? "1" + result : result;
}
string subtract(string num1, string num2) {
    if (num1.length() == num2.length() && num1 < num2) swap(num1, num2);
    else if (num1.length() < num2.length()) swap(num1, num2);
    for (int i = num1.length() - 1, j = num2.length() - 1; j >= 0; --i, --j) {
        int a = num1[i] - '0';
        int b = num2[j] - '0';
        if (a < b) {
            int k = i - 1;
            while (num1[k] == '0') num1[k--] = '9';
            num1[k] = char(num1[k] - 1);
            a += 10;
        }
        int calc_result = a - b;
        num1[i] = char('0' + calc_result);
    }
    int zero_cnt = 0;
    for (int i = 0; i < num1.length() && num1[i] == '0'; ++i, ++zero_cnt) {}
    return num1.substr(zero_cnt, num1.length() - zero_cnt);
}
void raisePower(string & num, int n) {
    if (num[0] == '0') return;
    for (int i = 0; i < n; ++i) num.push_back('0');
}
string karatsubaMultiplication(string & num1, string & num2) {
    if (num1.length() == 1 || num2.length() == 1) return multiply(num1, num2);
    if (num1.length() < num2.length()) swap(num1, num2);
    int n = num1.length();
    int a_len = n / 2 + (n % 2 ? 1 : 0);
    int b_len = n - a_len;
    string a = num1.substr(0, a_len);
    string b = num1.substr(a_len, b_len);
    string c = num2.length() < a_len ? "0": num2.substr(0, num2.length() - b_len);
    string d = num2.length() <= b_len ? num2: num2.substr(num2.length() - b_len, b_len);

    string a_plus_b = add(a, b);
    string c_plus_d = add(c, d);
    string a_plus_b_times_c_plus_d = karatsubaMultiplication(a_plus_b, c_plus_d);
    string ac = karatsubaMultiplication(a, c);
    string bd = karatsubaMultiplication(b, d);
    string ad_plus_bc = subtract(subtract(a_plus_b_times_c_plus_d, ac), bd);
    raisePower(ac, b_len * 2);
    raisePower(ad_plus_bc, b_len);
    return add(add(ac, ad_plus_bc), bd);
}
```
