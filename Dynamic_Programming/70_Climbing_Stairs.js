// https://leetcode.com/problems/climbing-stairs
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(1) optmized.  O(n) first solution

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // pattern? steps-distinctWays 1-1, 2-2, 3-3, 4-5, 5-8
    // to get to 6 steps what do we do? 1-2 denomination (coins?) and look at memo?

    // outer loop = index, count from 1 to n
    // inner loop = [1, 2]
    // so 6 =  5indes + 1 step + 4index + 2 step = 5index + 4 index = 13??
    
    // OPTIMIZED O(1) SPACE SOLUTION
    if (n < 3) return n;
    let prev = 1;
    let curr = 2;

    for (let i = 3; i <= n; i++) {
        const temp = curr;
        curr = curr + prev;
        prev = temp;
    }
    return curr;

    // ORIGINAL SOLUTION
    const dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i -2];
    }
    return dp[n];
};