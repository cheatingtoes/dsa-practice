/*
    PROBLEM: LeetCode 125. Valid Palindrome
    PATTERN: Two Pointers (Converging)
    TIME COMPLEXITY: O(N)
    SPACE COMPLEXITY: O(1)
    
    STRATEGY:
        1. Start with two pointers at the beginning and end of the string.
        2. Move the pointers toward each other, comparing characters.

    https://leetcode.com/problems/valid-palindrome
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    const lowerCaseString = s.toLowerCase();
    let leftIndex = 0;
    let rightIndex = s.length - 1;
    while (leftIndex <= rightIndex) {
        const leftCode = lowerCaseString[leftIndex];
        const rightCode = lowerCaseString[rightIndex];
        const isLeftValid = /[a-z0-9]/.test(lowerCaseString[leftIndex]);
        const isRightValid = /[a-z0-9]/.test(lowerCaseString[rightIndex]);
        if (!isLeftValid) {
            leftIndex++;
        } else if (!isRightValid) {
            rightIndex--;
        } else if (leftCode !== rightCode) {
            return false;
        } else {
            leftIndex++;
            rightIndex--;
        }
    }
    return true;
};
