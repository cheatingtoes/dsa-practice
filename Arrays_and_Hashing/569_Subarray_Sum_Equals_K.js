// https://leetcode.com/problems/subarray-sum-equals-k/description/
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(n)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    // sliding window? - only works if we know expanding the window always increases the sum and shrinking always decreases but there are negative numbers
    const prefixMap = new Map();
    let sum = 0;
    let output = 0;
    prefixMap.set(0, 1);
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        // we are looking for k - sum? no sum - k.  sum is where we are now, k is the subarray we're looking for so sum - k is the prefix 
        if (prefixMap.has(sum - k)) output += prefixMap.get(sum - k);

        // add to prefixmap
        prefixMap.set(sum, (prefixMap.get(sum) || 0) + 1);
    }
    return output;
};