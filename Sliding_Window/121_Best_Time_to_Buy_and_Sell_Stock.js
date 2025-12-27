/*
  PROBLEM: LeetCode 121 - Best Time to Buy and Sell Stock
  PATTERN: Sliding Window (Variable / Greedy)
  TIME COMPLEXITY: O(N)
  SPACE COMPLEXITY: O(1)
  
  STRATEGY:
    1. Have two pointers to create a sliding window, where the left pointer acts as
    the buy day and the right as the sell date
    2. On each iteration, calculate the profit where profit = prices[left] - prices[right]
    3. Increment right pointer on each iteration, left pointer gets incremented when
    prices[i] is less than prices[leftPointer], as a new lowest price has been found.

  https://leetcode.com/problems/best-time-to-buy-and-sell-stock
*/

var maxProfit = function(prices) {
    let leftIndex = 0;
    let maxProfit = 0;
    for (let i = 1; i < prices.length; i++) {
        const profit = prices[i] - prices[leftIndex]
        if (profit > maxProfit) {
            maxProfit = profit;
            maxProfitIndex = i;
        }
        if (prices[i] < prices[leftIndex]) leftIndex = i;
    }
    return maxProfit
};