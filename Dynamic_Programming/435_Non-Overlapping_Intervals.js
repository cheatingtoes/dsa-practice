// https://leetcode.com/problems/non-overlapping-intervals
// TIME COMPLEXITY: O(N log N) to sort intervals
// SPACE COMPLEXITY: O(1) or O(N) depending on sorting implementation

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    // sort by start interval and iterate over the intervals
    // check for overlap, keep the shorter end interval.
    if (intervals.length == 0) return 0;
    const sort = intervals.sort((a, b) => a[0] - b[0]);

    let count = 0;
    let prevEnd;
    for (const [start, end] of intervals) {
        if (prevEnd == undefined) prevEnd = end;
        else if (start < prevEnd) {
            // overlap found!
            count++;
            prevEnd = Math.min(prevEnd, end)
        } else {
            prevEnd = end;
        }
    }
    return count;
};