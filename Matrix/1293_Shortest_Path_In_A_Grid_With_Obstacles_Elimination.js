// leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/
// TIME COMPLEXITY: O(m * n * k) where m is the number of rows, n is the number of columns, and k is the maximum number of obstacles that can be eliminated. This is because in the worst case, we may need to explore all cells in the grid for each possible value of remainingK from 0 to k.
// SPACE COMPLEXITY: O(m * n * k) for the queue and memoization array, which can store up to m*n*k elements in the worst case.

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var shortestPath = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    // memo to store the highest remaining_k value for a given wave
    const memo = Array.from({ length: m }, () => new Array(n).fill(-1));
    const queue = [[0, 0, k, 0]];
    let queueIndex = 0;

    while (queueIndex < queue.length) {
        const [i, j, remainingK, steps] = queue[queueIndex];
        queueIndex++;
        // skip if we've reached this cell before weith a higher remainingK count
        if (i === m - 1 && j === n - 1) return steps; 

        // explore all directions from here
        for (const [nr, nc] of directions) {
            const newRow = nr + i;
            const newCol = nc + j;
            if (newRow >= 0 && newCol >= 0 && newRow < m && newCol < n) {
                // const newK = remainingK - grid[newRow][newCol];
                // if (newK >= 0 && newK > memo[newRow][newCol]) {
                //     memo[newRow][newCol] = newK;
                //     queue.push([newRow, newCol, newK, steps + 1])
                // }

                // if obstacle exists and we have no more eliminations or if memo has a higher remainingK count
                if (memo[newRow][newCol] >= remainingK) continue;
                if (grid[newRow][newCol] === 1) {
                    if (remainingK === 0) continue;
                    else {
                        queue.push([newRow, newCol, remainingK - 1, steps + 1]);
                        memo[newRow][newCol] = remainingK - 1;
                    }
                } else {
                    queue.push([newRow, newCol, remainingK, steps + 1]);
                    memo[newRow][newCol] = remainingK;
                }

            }
        }
    }
    // unreachable
    return -1;

};