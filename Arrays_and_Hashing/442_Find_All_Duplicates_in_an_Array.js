// https://leetcode.com/problems/find-all-duplicates-in-an-array/description/?
// TIME COMPLEXITY: O(n)
// SPACCE COMPLEXITY: O(1)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    // find duplicates in o(n) time and o(1) space
    // the only information we have is the index and the number.  since the numbers are from 1 - n
    // negatives, turn it into another value like an array
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        const num = Math.abs(nums[i]);
        // check if the index at num is "flipped"
        if (nums[num - 1] < 0) result.push(num);
        else nums[num - 1] = -nums[num - 1]
    }
    return result
};