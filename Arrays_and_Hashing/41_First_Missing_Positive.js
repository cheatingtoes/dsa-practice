// https://leetcode.com/problems/first-missing-positive/
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    // because we are looking for the smallest positive integer, we can use the indexes of the nums array once again to determine the number we are looking for.  as we iterate through nums, if the number is between 1 and nums.length, we can put it in it's place in the array. we can then iterate through the nums array again and find the smallest number that is missing.

    for (let i = 0; i < nums; i++) {
        while (nums[i] !== i - 1 && nums[i] > 0 && nums[i] <= nums.length) {
            // swap the number!
            const temp = nums[i];
            nums[i] = nums[temp - 1];
            nums[temp - 1] = temp;
        }
    }

    for (let i = 0; i < nums; i++) {
        if (nums[i] !== i + 1) return i + 1;
    }

    return nums.length;
}