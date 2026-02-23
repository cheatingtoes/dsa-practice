// https://leetcode.com/problems/maximum-score-using-exactly-k-pairs/description/
// TIME COMPLEXITY: O(n * m * k) for nested loops
// SPACE COMPLEXITY: O(n * m) for the dp

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */

var maxScore = function(nums1, nums2, k) {
    const n = nums1.length;
    const m = nums2.length;

    // 2d array for previous iteration.  default to 0 because base case is picking 0 pairs.  max for picking no pairs is 0
    let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let p = 1; p <= k; p++) {
        // fill this to negative infinity because options are left, we should grab something
        const currDp = Array.from({ length: n + 1} , () => new Array(m + 1).fill(-Infinity));
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                // skip
                const skip1 = currDp[i - 1][j];
                const skip2 = currDp[i][j - 1];
                // take
                const take = (nums1[i - 1] * nums2[j - 1]) + dp[i - 1][j - 1];
                // set max
                currDp[i][j] = Math.max(skip1, skip2, take);
            }
        }
        dp = currDp;
    }
    return dp[n][m]
}

var maxScoreRecursion = function(nums1, nums2, k) {
    // given two array of numbers, and an integer k, find the max total score you can get, with k pairs of indices
    // where each subsequent value for the indices pair must be greater than the previous
    // this is dynamic programming because 1. we have a strict count/amount limit of k.
    // 2. there's a relative ordering that must be followed where each choice is interdependent of each other
    // 3. overlapping/nested subproblems aka memo - are the answers to each subproblem the same? then memo it

    // dp choices - we can skip nums1, skip nums2, or pick the pair

    const n = nums1.length;
    const m = nums2.length;
    // const memo = new Map();
    // k + 1 because k is 1 indexed not 0 index
    const memo = new Array(n).fill().map(() => new Array(m).fill().map(() => new Array(k + 1)));

    const solve = (i, j, pairs) => {
        // base case - return 0 if no pairs left because we are out!
        if (pairs === 0) return 0;
        // return -Infinity because we've reached the end.  this cannot possibly be the best answer
        if (i === n || j === m) return -Infinity;

        // const key = `${i},${j},${pairs}`;
        // memo how does this work?
        // if (memo.has(key)) return memo.get(key);

        if (memo[i][j][pairs]) return memo[i][j][pairs];

        // calculate the values of skipping and taking the current pair and get the max val
        let skipI = solve(i + 1, j, pairs);
        let skipJ = solve(i, j + 1, pairs);
        let take = (nums1[i] * nums2[j]) + solve(i + 1, j + 1, pairs - 1);

        const result = Math.max(skipI, skipJ, take);
        // memo.set(key, result);
        memo[i][j][pairs] = result;
        return result;
    }

    return solve(0, 0, k);
};