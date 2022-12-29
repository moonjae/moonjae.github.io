---
layout: post
title: "[CS][CPP] Integer Representations"
description: "Integer representations"
tags: [cs, cpp]
---
# Integer numbers
![](https://www.bccfalna.com/ebooks/wp-content/uploads/ebooks/2014/12/Data-Type-Limits-in-C-1.png)

# Steps to represent negative integerrs
- convert decimal number into binary 
- flip all the bits(0 -> 1 and 1 -> 0)
- add one to the flipped bits 

# Why two's complement is used 
- When I first read about two's complement, I used to wonder why such scheme is really necessary since we can just use the first bit as a sign bit. For example when 2 can be represented as 0010, we can just flip the sign bit and represent -2 as 1010
- The approach above is intuitive but becomes problematic when need to do addition operations 
- For example, let's say we need to ad -1 and 2
- Using the intuitive approach, -1 -> 1001 and 2 -> 0010 and therefore, -1 + 2 = 1001 + 0010 = 1011 = -3 which is not correct
- Using two's complement, -1 -> 1111 and 2-> 0010 and therefore -1 + 2 = 1111 + 0010 = 10001 and we need to discard the carry -> 0001 = 1
- Also, when using the intuitive method, 0000 and 1000 both represent zero
- Also, the intuitive method is inconvenient when it comes to comparing numbers. -7 (0111) is smaller than -6 (0110) but, 0111 is actually larger than 0110 

# Why INT_MIN is -INT_MAX - 1
- INT_MAX is 0X7FFFFFFF and when we flip the bits, we get 0X80000000
- Then we need to add 1 to the above which makes it 0X80000001
- Since we need to add 1 in the end, we can never have 0X80000000 after step 2 and therefore we can use it as INT_MIN

# Sources
- https://docs.oracle.com/cd/E19253-01/817-6223/chp-typeopexpr-2/index.html
- https://stackoverflow.com/questions/1125304/why-prefer-twos-complement-over-sign-and-magnitude-for-signed-numbers
