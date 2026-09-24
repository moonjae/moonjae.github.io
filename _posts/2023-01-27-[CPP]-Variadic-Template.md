---
layout: post
title: "[CPP] Variadic Template"
description: "Variadic Template"
tags: [cpp]
---
# Variadic Template
- Variadic Templates are used when don't know how many templates are needed (can take 0 ~ n)
- We can do this by using parameter packs 

In functions (T... args is called function parameter pack)
```
template<typename... T>
void function(T... args) { }
```

In class/struct (T is called template parameter pack)
```
template<typename... T>
class SampleClass{};
```

# How to use them 
- For classes, parameter packs need to be the final parameter in the parameter list
- For functions, parameter packs can be placed earlier if everything can be deduced from the function arguments 

```
template<typename... Ts, typename U, typename=void>
void valid(U, Ts...);
```

Above is valid because we know the first argument will be U and the rest will be Ts 

```
void valid(Ts..., U);
```

Above is not valid because when parameter pack is placed in the front, Ts cannot be deduced. 

# Pack Expansion
- Pack Expansion can be done recursively 
- Which means we need to take care of base case 

```
auto calc() {
    return 0;
}

template<typename T1, typename... T2>
auto calc(T1 t1, T2... t2) {
    return t1 + calc(t2...);
}

calc(1,2,3);
```

1. 1,2,3 are passed into the second method since it has more than one arg.
2. t1 = 1 and t2 = 2,3 
3. then we need to unpack t2 into 2 and 3 
4. call(2,3) which makes t1 = 2 and t2 = 3
5. this continues until we no longer have any args 


# Sources
- parameter pack: https://en.cppreference.com/w/cpp/language/parameter_pack
- pack expansion: https://www.modernescpp.com/index.php/more-arbout-variadic-templates
- pack expansion: https://kevinushey.github.io/blog/2016/01/27/introduction-to-c++-variadic-templates/
- parameter pack placement: https://stackoverflow.com/questions/38629601/function-template-parameter-pack-not-at-the-end-of-the-parameter-list#comment64648723_38629697
