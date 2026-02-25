// https://leetcode.com/problems/subarray-sums-divisible-by-k/description/
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(n)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function(nums, k) {
    // prefix sum
    const prefixMap = new Map();
    let sum = 0;
    let output = 0;
    prefixMap.set(0, 1);
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        // do we have to handle negative sums?
        const mod = ((sum % k) + k) % k;
        if (prefixMap.has(mod)) output += prefixMap.get(mod);
        prefixMap.set(mod, (prefixMap.get(mod) || 0) + 1);
    }
    return output;
};