/*
  PROBLEM: LeetCode 424 - Longest Repeating Character Replacement
  PATTERN: Sliding Window (Non-Shrinking / Sliding Frame) + Hash Map
  TIME COMPLEXITY: O(N)
  SPACE COMPLEXITY: O(1)

  STRATEGY:
    1. Setup a sliding window & hashmap to store character + it's count.
    2. On each iteration, add the character to the hash and calculate if the 
    current character is the most frequent character in substring.
    3. Check if the current window/substring is valid - 
    ((rightIndex - leftIndex + 1) - maxf frequency > k).
        a. If not valid, we increment the left index and decrement it's count from the hash
    4. return the maximum length of the window - (string.length - left index)

  NOTES:
    - We only care about the length of the longest substring. we don't bother shrinking the
    window because that means it cannot be the longest substring.
    - the length of the window can only increase when max frequency increments. a new max
    frequency can only be found when the hash count of a letter surpasses the current max.
    - the max frequency of any character is the restraint/limiting factor.

    https://leetcode.com/problems/longest-repeating-character-replacement
*/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    // longest means max non shrinking window
    // with a twist if k + most frequent char
    const chars = new Map();
    let maxCount = 0;
    let maxWindow = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        // check current char
        const char = s[right];
        chars.set(char, (chars.get(char) || 0) + 1);
        if (chars.get(char) >= maxCount) {
            maxCount = chars.get(char);
        }
        // shrink window if not valid
        if (1 + right - left > maxCount + k) {
            const leftChar = s[left];
            chars.set(leftChar, chars.get(leftChar) - 1);
            left++;
        }
        if (1 + right - left > maxWindow) maxWindow = 1 + right - left;
    }
    return maxWindow
};

var characterReplacementSecond = function(s, k) {
    const letterHash = {};
    let leftIndex = 0;
    let maxFrequency = 0;

    for (let i = 0; i < s.length; i++) {
        // step 1: add letter to hash
        letterHash[s[i]] =  (letterHash[s[i]] || 0) + 1;
        // step 2: check if it's the longest
        maxFrequency = Math.max(letterHash[s[i]], maxFrequency);
        // step 3: check if result window is valid
        if ((i - leftIndex + 1) - maxFrequency > k) {
            letterHash[s[leftIndex]]--;
            leftIndex++;
        }
    }
    return s.length - leftIndex;
};

// first iteration 
var characterReplacementFirst = function(s, k) {
    if (!s.length) return 0;
    if (s.length < k) return s.length;

    const letterHash = { [s[0]]: 1 };
    let leftIndex = 0;
    let longestLen = 1;
 
    for (let i = 1; i < s.length; i++) {
        // the new longest length will only happen on the next letter, when we add it to the hashMap so we can check it then.
        letterHash[s[i]] = letterHash[s[i]] ? letterHash[s[i]] + 1 : 0;
        if (letterHash[s[i]] > longestLen) longestLen = letterHash[s[i]];

        // check if window.length > longestLen + k
        while (i - leftIndex > longestLen + k) {
            // move left index
            letterHash[s[leftIndex]] = letterHash[s[leftIndex]] - 1;
            if (letterHash[s[leftIndex]] > longestLen) longestLen = letterHash[s[leftIndex]];
            leftIndex++;
        }
    }
    return longestLen;
};