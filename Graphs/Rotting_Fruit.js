// https://neetcode.io/problems/rotting-oranges/question
// TIME COMPLEXITY: O(m * n) where m is the number of rows and n is the number of columns in the grid
// SPACE COMPLEXITY: O(m * n) for the queue in the worst case where all fruits are rotten

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    orangesRotting(grid) {
        // given a 2d grid, every minute, if a fresh fruit is next to a rotten fruit, vertically or horizontally, the fresh fruit also becomes rotten.
        // return the min number of minutes that must elapse until zero fresh fruits are remaining, or -1 if impossible

        // strategy, iterate over all rotten fruits -> and add to a queue -> bfs or dfs
        // bfs strategy -> each iteration look at adjacent tiles and check for fresh fruit
        // dfs strategy -> find the maximum it takes for each fresh fruit BUT fresh fruits can be rotten from different sources so need to get min

        const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];

        const m = grid.length;
        const n = grid[0].length;
        
        // add all rotten fruit coords to queue
        const queue = [];
        // don't need rotten count?
        let freshCount = 0;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === 2) {
                    queue.push([i, j]);
                } else if (grid[i][j] === 1) {
                    freshCount++;
                }
            }
        }

        let time = 0;
        // NEED TO CHECK FOR FRESH COUNT HERE TOO!!!! ahhhhhh :( so sad 
        while (queue.length > 0 && freshCount > 0) {
            time++;
            // go through all rotten fruits in queue and add adjacent fresh fruit to queue
            const len = queue.length;
            for (let i = 0; i < len; i++) {
                const [row, col] = queue.pop();
                for (const [dr, dc] of directions) {
                    const newRow = row + dr;
                    const newCol = col + dc;
                    // check for validity and if fresh fruit is adjacent. if so make it rotten, add to queue and decrement freshCount
                    if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && grid[newRow][newCol] === 1) {
                        grid[newRow][newCol] = 2;
                        queue.unshift([newRow, newCol]);
                        freshCount--;
                    }
                }
            }
        }

        return freshCount === 0 ? time : -1;
    }
}
