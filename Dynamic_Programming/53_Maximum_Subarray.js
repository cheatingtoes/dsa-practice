// https://leetcode.com/problems/maximum-subarray/
// TIME COMPLEXITY: O(N) to iterate through nums
// SPACE COMPLEXITY: O(1) no extra space needed

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // iterate through the array, sum < 0 we want to start over at current element
    let sum = nums[0]
    let max = sum;

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        if (sum < 0) sum = num;
        else sum += num;
        max = Math.max(sum, max);
    }
    return max;
};