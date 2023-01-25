---
layout: post
title: "[CPP] Const in C++"
description: "Const in C++"
tags: [cpp]
---
# Const
### What does const mean 
- Const keywords basically suggests that the variables associated with that keyword are intended for read-only access
- This implies that const is different from immutability because immutability means that the variables can never be changed while const variables are intended for read access.
- ex) const int a = b Basically 'a' cannot be used to modify its value 'b'

Here we can see, variable 'a' which is declared as const, is actually modified
```
const int a = 3;
const int * b = &a;
*const_cast<int*>b = 4; 
```

A pointer-to-const can point to a non-const object. What the pointer-to-const tells us is that we can't use 'b' to modify the value of 'a'
```
int a = 3;
const int * b = &a;
*const_cast<int*>b = 4; 
```

Below is considered illegal because the compiler does not allow you to create a non-const-pointer pointing to a const object since 'a' cannot be dereferenced and pointed by a non-const-pointer
```
const int a = 3; 
int * b = &a; // illegal 
```

### pointer-to-const-object vs const-pointer-to-object 
- try to read from right to left 
- const int * a (pointer-to-const-object)
    - What the pointer is pointing to a read-only but it can be replaced to another pointer
- int * const a (const-pointer-to-object)
    - The value can be modified but the pointer cannot be replaced with another pointer

### Const inside class
```
class Test{
    public:
    int a;
    void helper() { cout << a; }
};

Test a = {1};
a.helper(); // legal

const Test b = {1};
b.helper(); // illegal because the helper function can modify the member variables 
```

therefore for cases above we need add const keywords to methods in order to represent that we do not intend to modify any member variables 
```
void helper() const { cout << a; }
```

however there can be situations where we do need to modify one or more variables in that case we can use mutable keyword to the member variable we wish to modify
```
mutable int a; 
```


# Sources
- Const: https://www.youtube.com/watch?v=4fJBrditnJU&list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb&index=33
- Mutable: https://www.youtube.com/watch?v=bP9z3H3cVMY&list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb&index=35&t=279s
- immutability and const: https://softwareengineering.stackexchange.com/questions/149555/difference-between-immutable-and-const
- https://stackoverflow.com/questions/13061450/pointer-to-const-can-point-to-non-const-object-language-design-or-technical-re
