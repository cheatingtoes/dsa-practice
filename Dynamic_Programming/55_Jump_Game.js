// https://leetcode.com/problems/jump-game/
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(1)

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    // can be greedy!!
    let maxReach = nums[0]
    for (let i = 1; i < nums.length; i++) {
        // we can reach the end
        if (maxReach >= nums.length - 1) return true;
        // we are out of bounds
        if (i > maxReach) return false;
        const curr = nums[i];
        maxReach = Math.max(maxReach, i + curr);
    }
    return true
}

var canJumpFirst = function(nums) {
    // start at first index, look ahead nums[index] and get the max jump value from that
    // iterate
    if (nums.length == 1) return true;

    let i = 0;
    while (i < nums.length) {
        const jump = nums[i];
        if (jump === 0) return false;
        let max = 0;
        let newIndex;
        for (let j = i + 1; j <= jump + i; j++) {
            if (j === nums.length - 1) return true;
            // find next max jump from current jump
            const currentJump = nums[j] + j
            if (currentJump > max) {
                max = currentJump;
                newIndex = j;
            }
        }
        i = newIndex;
    }
    return false;
};