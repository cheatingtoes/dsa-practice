// https://leetcode.com/problems/merge-intervals
// TIME COMPLEXITY: O(n log n) due to sorting
// SPACE COMPLEXITY: O(n) for results array

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const results = [];
    // for each interval, check with previous to see if merge
    for (const [start, end] of intervals) {
        const previous = results[results.length - 1] || [];
        if (previous[1] >= start) previous[1] = Math.max(previous[1], end);
        else results.push([start, end]);
    }
    return results;
};