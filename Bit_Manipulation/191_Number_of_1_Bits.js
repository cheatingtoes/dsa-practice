// https://leetcode.com/problems/number-of-1-bits
// TIME COMPLEXITY: O(1) since we are dealing with fixed 32 bits
// SPACE COMPLEXITY: O(1)

/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function(n) {
    let num = n;
    let count = 0
    while (num > 0) {
        if (num & 1) count++;
        num = num >>> 1
    }
    return count;
};