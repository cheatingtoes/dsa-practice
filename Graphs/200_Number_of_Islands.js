// https://leetcode.com/problems/number-of-islands/

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    // will need to loop through the grid, when an island is found, sink it
    const row = grid.length;
    const col = grid[0].length;
    let counter = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] == '1') {
                sink(grid, i, j)
                counter++;
            }
        }
    }
    return counter;
};

function sink(grid, i, j) {
    grid[i][j] = '0';
    const queue = [[i, j]];
    // we want to check surrounding tiles in grid
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (queue.length) {
        const [row, col] = queue.shift();
        for (const [dr, dc] of directions) {
            const nr = row + dr;
            const nc = col + dc; 
            // check if new row and new col is valid in grid
            if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == '1') {
                grid[nr][nc] = '0';
                queue.push([nr, nc]);
            }
        }
    }
}