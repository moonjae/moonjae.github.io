---
layout: post
title: "[CPP] How C++ works"
description: "How C++ works"
tags: [cpp]
---
# Compilation Steps 
1. compiling: files get compiled; cpp files get converted into object files 
2. linking: the object files get linked together and get converted into an executable 

# Compiler
Step1 is done by compiler 
- First we need to clarify that there is no such thing as a valid cpp file. Any file can be used as a cpp file if we tell the compiler to accept it as cpp file. But as default, the compiler knows that cpp extension represents cpp files
- When the compiler compiles a file, the preprocessor takes care of all the preprocessor statements first. The preprocessor statments can be identified by the '#' notations. 
    - for #include, the compiler basically copies the content within that file and pastes it to where it is written 
    - for #define, the compiler replaces all the alias to its original form 
- Then it checks whether all the statements are 'legal'; it checks whether any unknown functions are being called 
    - We can bypass this by declaring a function signature (forward declaring). 
- After it takes care of all the preprocessors, it converts the file into an object file which contains all the machine instructions 


# Linker
Step2 is done by linker 
- In order for the linker to work there has to be one entry point. It is usually main unless we specify otherwise. 
- Linker checks whether it is able to find all the necessary information such as function definitions
    - there can be an error when there is only function declaration without function body
    - duplicate function signatures can create linker errors 
    - also, there can be cases where some implementations are declared twice ex) when a includes b and c includes a and b, b is being included twice which is problematic. To prevent this problem, we need to use header guards which prevents same headerfile from being included more than once 
    - pragma once vs ifndef (https://stackoverflow.com/questions/1143936/pragma-once-vs-include-guards)
- When everything is fine, the object files get linked together and get converted into an executable

# Sources
- how cpp works: https://www.youtube.com/watch?v=SfGuIVzE_Os&list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb&index=6
- how compiler works: https://www.youtube.com/watch?v=3tIqpEmWMLI&list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb&index=6
- how linker works: https://www.youtube.com/watch?v=H4s55GgAg0I&list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb&index=7
- header files: https://www.youtube.com/watch?v=9RJTQmK0YPI&list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb&index=10
