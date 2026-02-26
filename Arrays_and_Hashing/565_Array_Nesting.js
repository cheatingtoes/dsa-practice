// https://leetcode.com/problems/array-nesting/
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayNesting = function(nums) {
    let maxLen = 0;

    for (let i = 0; i < nums.length; i++) {
        // loop has been visited
        if (nums[i] === -1) continue;

        let count = 0;
        let curr = i;

        // because this isa closed loop, it doesn't matter where we start
        while (nums[curr] !== -1) {
            let next = nums[curr];
            nums[curr] = -1;
            curr = next;
            count++;
        }

        maxLen = Math.max(maxLen, count);
    }

    return maxLen;
};

var arrayNestingFirst = function(nums) {
    // memo will store the set at index i
    const n = nums.length;
    const memo = new Array(n).fill(0);
    let output = 0;

    const dfs = (i, visited) => {
        if (memo[i] > 0) return memo[i];
        if (visited.has(i)) return 0;
        visited.add(i);
        const len = 1 + dfs(nums[i], visited);
        memo[i] = len;
        return len;
    }

    for (let i = 0; i < n; i++) {
        output = Math.max(output, dfs(i, new Set()))
    }

    return output;
};