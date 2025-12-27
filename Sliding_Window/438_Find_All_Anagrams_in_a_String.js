/*
  PROBLEM: LeetCode 438 - Find All Anagrams in a String
  PATTERN: Sliding Window (Fixed Size) + Hash Map
  TIME COMPLEXITY: O(N)
  SPACE COMPLEXITY: O(1)

  STRATEGY:
  1. create hash map of required characters + keep track of count
  2. iterate through string. check if character is in hash map
  3. if it's a required character (value in hash map > 0) decrement count;
  4. shrink window once it gets to length of p
  5. if shinking removes character in hash map, check if it's required. it's
  required if (value in hash map > 0) > 0;
  6. check for valid anagram if (count == 0)

  https://leetcode.com/problems/find-all-anagrams-in-a-string
*/

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    // fixed window? two pointer?
    const pMap = new Map();
    for (const char of p) {
        pMap.set(char, (pMap.get(char) || 0) + 1);
    }
    let count = p.length;
    let left = 0;
    const indexes = [];
    for (let right = 0; right < s.length; right++) {
        // handle current char
        const char = s[right];
        if (pMap.has(char)) {
            if (pMap.get(char) > 0) count--;
            pMap.set(char, pMap.get(char) - 1)
        }
        // check if window is valid
        if (right - left + 1 > p.length) {
            const leftChar = s[left];
            if (pMap.has(leftChar)) {
                pMap.set(leftChar, pMap.get(leftChar) + 1);
                if (pMap.get(leftChar) > 0) count++;
            }
            left++;
        }
        if (count == 0) indexes.push(left);
    }
    return indexes
};