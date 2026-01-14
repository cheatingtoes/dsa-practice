// https://leetcode.com/problems/counting-bits
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(n)

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    // i can almost understand this!!  :)
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        // Combined logic: shift right and add the value of the last bit
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;

    // first solution - brute force
    const result = []
    // loop through n + 1
    for (let i = 0; i < n + 1; i++) {
        // for each i, we count the bits representing 1
        let count = 0;
        let temp = i;
        while (temp > 0) {
            // count adds either 0 or 1, with the Bitwise AND operator
            count += (temp & 1)
            // shift right by 1 bit (which divides by 2)
            temp = temp >>> 1
        }
        result.push(count)
    }
    return result
};