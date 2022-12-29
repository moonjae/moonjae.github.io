---
layout: post
title: "[CS][CPP] Integer Representations"
description: "Integer representations"
tags: [cs, cpp]
---
# Integer numbers
| Type Name | 32–bit Size(bytes)  | 64-bit Size(bytes)  |
|---|---|---|
| short | 2  | 2 |
| int | 4 | 4 |
| long | 4 | 8 |
| long long  | 8 | 8 |

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

# Sources
- https://docs.oracle.com/cd/E19253-01/817-6223/chp-typeopexpr-2/index.html
- https://stackoverflow.com/questions/1125304/why-prefer-twos-complement-over-sign-and-magnitude-for-signed-numbers
