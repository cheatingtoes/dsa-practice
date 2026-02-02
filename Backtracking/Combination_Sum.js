class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum(nums, target) {
        // given an array of distinct integers, and a target num, return a list of all unique combinations of nums
        // that sum up to the target
        const result = [];
        // strategy - since the numbers are unique, we don't have to worry about ... skipping over duplicate numbers
        const backtrack = (index, subarray, sum) => {
            if (sum > target || index >= nums.length) return;
            if (sum === target) return result.push([...subarray]);
            // three options are to pick current index, pick current index, then next index, and skip this index.
            // iterate over same index bc you can pick it unlimited number of times
            const num = nums[index];
            subarray.push(num)
            backtrack(index, subarray, sum + num);

            // iterate over the next index
            subarray.pop();
            backtrack(index + 1, subarray, sum);

        }

        backtrack(0, [], 0);
        return result;
    }





































    combinationSum2(nums, target) {
        // need to use dfs but need unique combinations
        const results = [];

        // keep track of index and subarray
        const dfs = (index, subArray, sum) => {
            if (sum > target) return;
            if (index >= nums.length) return;
            if (sum === target) {
                // need to push a copy of subArray!! not the reference!
                results.push([...subArray])
                return;
            }
            // recurse on the same index because we can reuse numbers
            const num = nums[index];
            subArray.push(num);
            dfs(index, subArray, sum + num);
            subArray.pop();
            dfs(index + 1, subArray, sum);
        }
        dfs(0, [], 0);
        return results;
    }
}
