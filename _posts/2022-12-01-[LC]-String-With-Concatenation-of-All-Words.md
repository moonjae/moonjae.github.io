---
layout: post
title: "[LC] 30. Substring with Concatenation of All Words"
description: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/description/"
tags: [sliding-window]
---
# Problem Statement
You are given a string s and an array of strings words. All the strings of words are of the same length.
A concatenated substring in s is a substring that contains all the strings of any permutation of words concatenated.

For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated substring because it is not the concatenation of any permutation of words.
Return the starting indices of all the concatenated substrings in s. You can return the answer in any order.

Example 1:
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]
Explanation: Since words.length == 2 and words[i].length == 3, the concatenated substring has to be of length 6.
The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.
The output order does not matter. Returning [9,0] is fine too.

# Intuition
Naive Approach
- A valid substring can start at any index so we need to iterate through s to account for all the possibilities for each start index 
- index i can be a start of a substring but it can also be a part of other substrings that started before i so we need ot account for these 
- This approach is very inefficient and we are not making use of the fact that the length of each word is equal to each other 

Efficient Approach  
- Since we know the word length is fixed we can basically check if every word with length n
- for example when s is 1234, when word length is 3, we should just ignore 12, 23, 34 

# Approach
Slding Window
0. create a hashmap and store frequencies of each word in words 
1. iterate through 0 ~ wordlen - 1
    - 0 ~ wordlen - 1 will be used as the start index for each potential substring
2. use sliding window technique 
3. get the first wordlen chars and see if it exist in the hashmap
4. if the word does not exist, we need to reset the substring 
5. if it does exist and cnt is set to 0, increment 0 until cnt is back to 1 
6. decreate the cnt for this word 
7. if all the words have been visited we know that this substring is a valid substring 
    - increment left so that we can check if this again can create another valid substring in the next iteration

# Complexity
- when length of s is n, length of each word is a, length of words is b
- Time complexity: O(b + n * a)

# Code

```
    void check(string & s, int start, unordered_map<string, int> & cnt1, vector<int> & answer, int word_len, int size) {
        int l = start;
        int left = size;
        unordered_map<string, int> cnt = cnt1;
        unordered_map<int, string> cache; 
        for (int r = start; r < s.length(); r += word_len) {
            string str = s.substr(r, word_len);
            if (cnt.find(str) == cnt.end()) {
                l = r + word_len;
                left = size;
                cnt = cnt1;
            }
            else {
                while (cnt[str] == 0) {
                    cnt[cache[l]]++;
                    l += word_len;
                    ++left;
                }
                cache[r] = str;
                --cnt[str];
                --left;
                if (!left) {
                    answer.push_back(l);
                    cnt[cache[l]]++;
                    l += word_len;
                    ++left;
                }
            }
        }
    }
    vector<int> findSubstring(string s, vector<string>& words) {
        int word_len = words[0].length();
        if (s.length() < word_len) return {};
        unordered_map<string, int> cnt;
        vector<int> answer;
        for (string & word: words) {
            ++cnt[word];
        }
        
        for (int i = 0; i < word_len; ++i) {
            check(s, i, cnt, answer, word_len, words.size());
        }

        return answer;
    }
```
