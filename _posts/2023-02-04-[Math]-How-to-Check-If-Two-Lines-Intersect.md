---
layout: post
title: "[Math] How to check if two lines intersect"
description: "How to check if two lines intersect"
tags: [math]
---
# How to check if two line segments intersect 
Let's say we are given two line segments (p1, q1) and (p2, q2). 
In order for there to be an intersection, it has to meet the following conditions.

![](https://media.geeksforgeeks.org/wp-content/uploads/linesegments1.png)
### General Case
-(p1,q1,p2) and (p1,q1,q2) have different orientations and
-(p2,q2,p1) and (p2,q2,q1) have different orientations 

### Special Case 
-all 4 orientations are collinear and 
-p2 or q2 can be found in the first line segment (p1, q1)

### Orientation 
![](https://media.geeksforgeeks.org/wp-content/uploads/linesegments.png)
Let's say there is line (a,b). If c falls above that line, the orientation will be counterclockwise and if below, we have a clockwise orientation. This is under an assumption that a.x < b.x  

1. calculate slope of line (a,b)
2. the line can be represented in y = slope * x + where line meets the y intercept  
    - calculate where line meets the y intercept; = b.y - slope * b.x
    - from now on we will call the above T
3. plug in c in to the equation above 
4. calculate c.x * slope + T and see if it is larger than c.y 
5. if it is larger than c.y -> clockwise
6. if it is smaller than c.y -> counterclockwise
7. else collinear 

# Sources
- https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
