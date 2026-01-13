// https://leetcode.com/problems/coin-change
// TIME COMPLEXITY: O(n * m) n = amount, m = number of coins
// SPACE COMPLEXITY: O(n)

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    // coin change asks given some denomination of coins, return the count of the least amount of coins needed to sum up to the amount.
    // questions - can coins represent a negative denomination? can amount be negative? can coins contain no coins at all?
    // strategy - sort coins by highest amount and use DFS with the catch that you can reuse the same coin.  WRONG because it's possible to get the suboptimal amount of coins starting with the largest!

    // create a memo from 1 to amount and iterate through that. count how many coins are needed for each index. then?? 
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            // logic is we need to if coin is valid
            if (coin <= i) { 
               dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
}