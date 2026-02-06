// https://leetcode.com/problems/maximum-profit-in-job-scheduling/
// TIME COMPLEXITY: O(n log n) where n is the number of jobs due to sorting and binary search
// SPACE COMPLEXITY: O(n) for the dp array

/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function(startTime, endTime, profit) {
    const n = startTime.length;
    const jobs = [];
    for (let i = 0; i < n; i++) {
        jobs.push({ start: startTime[i], end: endTime[i], profit: profit[i] });
    }
    jobs.sort((a, b) => a.end - b.end);

    const dp = new Int32Array(n + 1);

    for (let i = 0; i < n; i++) {
        // iterate through the jobs list. once again we can either take or skip
        // if we take this one, we take this one + add the last job that we can possibly take from dp. otherwise if we skip we grab the last value in dp.
        // very similar to the steps problem

        // dp is 1 indexed here so dp[i] is grabbing the last value here
        const skip = dp[i];

        // if we take, we grab the value of jobs[i].profit + last available profit from dp or 0
        let left = 0;
        let right = i - 1;
        let prevProfit = 0;
        while (left <= right) {
            const mid = Math.floor((right - left) / 2) + left;
            // we are finding the...last job whos end date is before this start date...
            if (jobs[mid].end <= jobs[i].start) {
                // and we want to add.... the total profits from dp not just from this one job
                // prevProfit = jobs[mid].profit;
                prevProfit = dp[mid + 1];
                left = mid + 1;
            } else right = mid - 1;
        }

        const take = prevProfit + jobs[i].profit;

        // we use i + 1 here bc dp is 1 indexed
        dp[i + 1] = Math.max(take, skip);
    }
    return dp[n];
}


var jobSchedulingDFS = function(startTime, endTime, profit) {
    // given an array of startTime, endTime, and profit, where a job at index i starts and ends at startTime[i] and endtime[i] with a profit of profit[i]
    // return the maximum profit that can be made from the jobs
    // strategy -> question - are the jobs sorted by time? -> create a tuple [starttime, endtime, profit], sort by starttime
    // options are to either pick or skip the job and iterate to the next available job.  calculate max profit
    const jobs = [];
    for (let i = 0; i < startTime.length; i++) {
        jobs.push([startTime[i], endTime[i], profit[i]]);
    }

    // sort jobs by start time
    jobs.sort((a, b) => a[0] - b[0]);

    const memo = {};

    // strategy -  either pick this + next available or skip and pick the next one
    // return...profit?
    const dfs = (i) => {
        if (i === jobs.length) return 0; // base case end of array no profit to be made
        if (memo[i]) return memo[i];
         
        // skip this one
        let result = dfs(i + 1);

        // we can pick this one and the next one j, where j startTime is >= i endtime
        // binary search
        let left = i + 1;
        // we set right to jobs.length because there may not be a valid next job
        // in that case we recurse out of bounds and our base case returns 0.
        let right = jobs.length;

        while (left < right) {
            const mid = Math.floor((right - left) / 2) + left;
            // looking for the next start time that is.... <= current jobs' end
            if (jobs[mid][0] < jobs[i][1]) left = mid + 1;
            else right = mid;
        }

        // iterative approach
        // let j = i + 1;
        // while (j < jobs.length && jobs[j][0] < jobs[i][1]) j++;

        // we have to return something here...
        memo[i] = result = Math.max(result, jobs[i][2] + dfs(left));
        // or we can pick the next one.
        return result;
    }

    return dfs(0);
};