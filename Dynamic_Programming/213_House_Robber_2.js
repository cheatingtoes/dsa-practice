// https://leetcode.com/problems/house-robber-ii
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // house robber 1 but array loops in a circle which means if we rob the first house we can't take the last house
    // so the strategy is to loop through the array twice, once at index 0 and once at index 1
    if (nums.length == 1) return nums[0];
    if (nums.length == 2) return Math.max(nums[0], nums[1]);

    // helper function to iterate through nums
    const getMax = (startIndex) => {
        // for each house, we want to check if we take it or leave it. take it if i + i-2 > i-1
        let first = nums[startIndex];
        let second = Math.max(first, nums[startIndex + 1]);

        const lastIndex = startIndex == 0 ? nums.length - 1 : nums.length;
        for (let i = 2 + startIndex; i < lastIndex; i++) {
            const max = Math.max(second, first + nums[i]);
            first = second;
            second = max;
        }
        return second;
    }

    return Math.max(getMax(0), getMax(1));
};