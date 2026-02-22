// https://leetcode.com/problems/count-dominant-indices/
// TIME COMPLEXITY: O(n) where n is the length of the input array
// SPACE COMPLEXITY: O(n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndices = function(nums) {
    // given an array if numbers, return the number of indices that are dminant
    // a number is dominant if... it's value is greater than the average of all values after it

    // strategy - need to calculate the average sum of of values from nums iterating from the end

    const n = nums.length;
    const averages = new Array(n);
    let currSum = 0;
    for (let i = n - 1; i >= 0; i--) {                  // [5,4,3]
        currSum += nums[i];
        averages[i] = currSum / (n - i);                // i = 2
    }

    let result = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > averages[i + 1]) result++;
    }

    return result;
};