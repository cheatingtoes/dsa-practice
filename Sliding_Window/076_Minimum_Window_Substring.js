/*
  PROBLEM: LeetCode 76 - Minimum Window Substring
  PATTERN: Sliding Window (Dynamic) + Hash Map + Optimization
  TIME COMPLEXITY: O(N)
  SPACE COMPLEXITY: O(!)

  STRATEGY:
  1. Use a hash map to keep track of characters needed
  2. Expand window until all characters are found
  3. Once all characters are found, we increment left index until a character is missing
  
  NOTES:
  - we can just keep track of the index + len instead of slicing to save on time complexity
  
  https://leetcode.com/problems/find-all-anagrams-in-a-string
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if (t.length > s.length) return "";

    const tMap = new Map();
    for (const char of t) {
        tMap.set(char, (tMap.get(char) || 0) + 1);
    }

    let charsNeeded = t.length;
    let left = 0;
    
    // more performant than slice
    let minLen = Infinity;
    let minStart = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        // if char is relevant
        if (tMap.has(char)) {
            if (tMap.get(char) > 0) charsNeeded--;
            tMap.set(char, tMap.get(char) - 1);
        }
        // check if window is valid
        while (charsNeeded === 0) {
            // if valid, check against prev minLen
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            // shrink window
            const leftChar = s[left];
            if (tMap.has(leftChar)) {
                tMap.set(leftChar, tMap.get(leftChar) + 1);
                if (tMap.get(leftChar) > 0) charsNeeded++; 
            }
            left++;
        }
    }
    return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen)
}


// First Iteration
var minWindowFirst = function(s, t) {
    const tMap = new Map();
    // to if highestCount is 0, then all letters in t are in s
    for (const char of t) {
        const count = (tMap.get(char) || 0) + 1;
        tMap.set(char, count);
    }
    let totalCount = t.length;
    let minimumSubstring = '';
    // when do we move leftIndex? when highestCount = 0?, then most left Index until highestCount > 1;
    let leftIndex = 0;
    for (let i = 0; i < s.length; i++) {
        const char = s[i]
        const tCount = tMap.get(char)
        // update tMap
        if (tCount !== undefined) {
            // decrement totalCount if tCount > 0, means letter is needed in window
            if (tCount > 0) totalCount--; 
            tMap.set(char, tCount - 1)
        }
        // if totalCount == 0, this means all letters in t are in the window, we can increment leftIndex
        while (totalCount == 0) {
            const leftChar = s[leftIndex];
            const leftTCount = tMap.get(leftChar);
            if (leftTCount !== undefined) {
                const newLeftTCount = leftTCount + 1;
                tMap.set(leftChar, newLeftTCount);
                // the window no longer contains all letters in t
                if (newLeftTCount > 0) {
                    const newSubstring = s.slice(leftIndex, i + 1);
                    if (minimumSubstring.length === 0 || newSubstring.length < minimumSubstring.length) {
                        minimumSubstring = newSubstring;
                    }
                    totalCount++;
                }
            }
            leftIndex++;
            }
    }
    return minimumSubstring;
};