// https://leetcode.com/problems/unique-paths
// TIME COMPLEXITY: O(m * n)
// SPACE COMPLEXITY: O(n) optmimized.  O(m * n) first solution

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 
var uniquePaths = function(m, n) {
    // this question is asking us to calculate every possible unique path from two points on a grid, the top left to the bottom right. the path can only go down or right.
    // clarifying questions - can m or n be 0 or negative?
    // the potential strategy could be to do a DFS where we always go right until we can't, then go down. then backtrack, go down once, all the way right, etc.
    // hint - think about the relationship between cells. a cell can only be reached above it or to the left. if you konw the value above and the value to the left, how do you calculate the unique paths to reach the current cell?
    // add up the values above and to the left to reach the current cell. can use memo to remember the values!!
    // dynamic programming - solving a complex problem by breaking it down into simpler sub problems and storing the results!!

    // OPTIMIZED SOLUTION
    // we can further optimize the space complexity because we we actually only need the row above to calculate!!
    const row = Array(n).fill(1);
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
            row[j] = (row[j - 1] || 0) + row[j] 

        }
    }
    return row[n - 1];
    
    // FIRST SOLUTION
    // create a grid, defaulting values to 0
    const grid = Array.from({ length: m}, () => Array(n).fill(0));
    // loop through each element in grid and calculate the values, we can do a simple nested loop here because it's going top down, left to right, which is the only way the robot can move.
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                // top and left rows will always be 1
                if (i == 0 || j == 0) grid[i][j] = 1;
                else grid[i][j] = grid[i - 1][j] + grid[i][j - 1];
            }
        }
    }

    return grid[grid.length - 1][grid[0].length - 1]
};