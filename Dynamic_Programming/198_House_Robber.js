// https://leetcode.com/problems/house-robber
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(1) optimized. O(n) first solution

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // most money with constraints - can't rob adjacent houses
    // create a memo starting from first house to see the maximum amount that can be robbed
    // logic is for loop is to either choose to rob this house + the one before the previous one or rob the previous one - either nums[i] + dp[i - 2] or dp[i - 1]

    // optimized solution - O(1) space - we only need to remember the previous and before previous
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];
    if (nums.length == 2) return Math.max(nums[0], nums[1]);

    let first = nums[0];
    let second = Math.max(first, nums[1]);
    for (let i = 2; i < nums.length; i++) {
        const max = Math.max(nums[i] + first, second);
        first = second;
        second = max;
    }
    return second;

    // first attempt
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];
    if (nums.length == 2) return Math.max(nums[0], nums[1]);
    const dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
    }
    return dp[nums.length - 1]
};