// https://leetcode.com/problems/longest-increasing-subsequence
// TIME COMPLEXITY: O(N log N) for binary search for each num in nums
// SPACE COMPLEXITY: O(N) to store tails array

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const tails = [];
    // strategy is to find the value that nums can replace using binary search
    // replace or append 
    for (const num of nums) {
        let left = 0;
        let right = tails.length;
        while (left < right) {
            // we are looking for the number in tails that is just greater than mid to replace
            const mid = Math.floor((right + left) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        // append vs replace
        if (left === tails.length) tails.push(num);
        else tails[left] = num;
    }
    return tails.length
};