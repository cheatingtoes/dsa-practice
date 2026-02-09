// https://leetcode.com/problems/final-element-after-subarray-deletions/description/
// TIME COMPLEXITY: O(1) since we are only comparing the first and last elements of the array
// SPACE COMPLEXITY: O(1) since we are not using any additional data structures

/**
 * @param {number[]} nums
 * @return {number}
 */
var finalElement = function(nums) {
    // given an array of numbers and a game to return the highest/lowest value in the array... 
    // each turn alice removes a subarray in nums that maximizes the final value. bob tries to minimize the final value
    
    // subproblem - alice wants to remove the subarray containing the minimum value
    // bob wants to remove the subarray containing the highest value waht is the range?
    if (nums[0] > nums[nums.length - 1]) return nums[0];
    return nums[nums.length - 1] 
};