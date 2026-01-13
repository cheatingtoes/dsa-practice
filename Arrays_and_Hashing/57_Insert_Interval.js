// https://leetcode.com/problems/insert-interval/
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(n)

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    if (intervals.length == 0) return [newInterval]
    const results = [];
    let [newStart, newEnd] = newInterval;
    for (let i = 0; i < intervals.length; i++) {
        const [start, end] = intervals[i];
        // we only need to check if newInterval intersects with interval!
        // if before, if after, else in the middle
        if (end < newStart) results.push([start, end]);
        // if start > newEnd, this means that new interval goes before;
        else if (start > newEnd) {
            results.push([newStart, newEnd]);
            results.push(...intervals.slice(i));
            return results;
        } else {
            // else merge into newIntervals so we can repeat the loop until we hit else if
            newStart = Math.min(newStart, start);
            newEnd = Math.max(newEnd, end);
        }
    }
    // if we never hit else if, newInterval belongs at the end
    results.push([newStart, newEnd]);
    return results
};