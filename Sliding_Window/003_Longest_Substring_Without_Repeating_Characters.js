/*
  PROBLEM: LeetCode 3 - Longest Substring Without Repeating Characters
  PATTERN: Sliding Window (Dynamic) + Set
  TIME COMPLEXITY: O(N)
  SPACE COMPLEXITY: O(!)

  STRATEGY:
    1. Iterate through the length of the string with two pointers acting as a 
    sliding window.
    2. Create a set. Use this as a way to lookup if previous character exists in
    the substring.
    3. On each iteration, check to see if the character exists in the substring.
        a. If character exists, we increment the left pointer and delete each 
        character from the left pointer from the set until no duplicates exist.
        b. If character does not exist, we add it to the set and check if current
        substring is the longest.
    4. Increment right pointer on each interation.

  https://leetcode.com/problems/longest-substring-without-repeating-characters
*/

var lengthOfLongestSubstring = function(s) {
    const strSet = new Set(s[0]);
    let leftIndex = 0;
    let maxLen = s.length ? 1 : 0;
    for (let i = 1; i < s.length; i++) {
        // if new letter is present, move left index and remove from set until not present
        while (strSet.has(s[i])) {
            strSet.delete(s[leftIndex]);
            leftIndex++;
        }
        strSet.add(s[i])
        const str = i - leftIndex + 1
        if (str.length > maxLen) maxLen = str.length;
    }
    return maxLen;
};