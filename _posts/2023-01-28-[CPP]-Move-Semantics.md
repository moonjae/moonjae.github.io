---
layout: post
title: "[CPP] Move Semantics"
description: "Move Semantics"
tags: [cpp]
---


# Move Semantics 
### lvalue reference 
```
void test(int& a);
test(1);
int a = 2;
test(a);
```

First call to test is considered invalid because we are passing in a rvalue when lvalue is needed. 

```
void test(const int& a);
test(1);
```

However, if we switch the function signture to take in const lvalue ref instead it will work fine. It will just create a temporary variable and use it as the argument.

### Why Move Semantics is necessary
```
class String {
public:
    String() = default;
    String(const char * input_str) {
        cout << "Created" << endl;
        length = strlen(input_str);
        str = new char[length];
        memcpy(str, input_str, length);
    }
    
    String(const String& og){
        cout << "Copied" << endl;
        length = og.length;
        str = new char[length];
        memcpy(str, og.str, length);
    }
    
    ~String() {
        delete[] str;
    }
    
private:
    char * str;
    int length;
};


class Wrapper{
public:
    Wrapper(const String& input_str) : str(input_str) {}

private:
    String str;
};


int main() {
    Wrapper a("123");
}
```

The result will look something like "Created \n Copied". One problem with this is that the copying part can become very costly if the object we are tying to copy is large and this is where move sematics comes in. 

```
String(String&& og) {
    cout << "Moved" << endl;
    length = og.length;
    str = og.str;
    og.str = nullptr;
}
```

Let's overload the String constructor with a move construtor that takes in rvalue. Notice our previous constructor could take in both lvalue and rvalue and for this move constructor we will only take in rvalue and what it will do is basically shallow copying. Since it is a rvalue we know the input variable will not be reused so we can just do shallow copy and avoid memory allocation this way. 

```
Wrapper(String&& input_str) : str((String&&)input_str) {}
```

In the initializer list, we have to convert input_str into rvalue if not, the previously made String constructor will be called instead of the move constructor. Another way to do this is by using the std::move method.

```
Wrapper(String&& input_str) : str(move(input_str)) {}
```


# Sources
- move semantics: https://www.youtube.com/watch?v=ehMg6zvXuMY&list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb&index=89
- std::move: https://www.youtube.com/watch?v=OWNeCTd7yQE&list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb&index=90
