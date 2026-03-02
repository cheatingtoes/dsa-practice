// https://leetcode.com/problems/shortest-path-to-get-all-keys/description/
// TIME COMPLEXITY: O(m * n * 2^k) where m is the number of rows, n is the number of columns, and k is the number of keys. This is because in the worst case, we may need to explore all cells in the grid for each possible combination of keys collected (which can be represented as a bitmask of size 2^k).
// SPACE COMPLEXITY: O(m * n * 2^k) for the queue and memoization set, which can store up to m*n*2^k elements in the worst case.

/**
 * @param {string[]} grid
 * @return {number}
 */
var shortestPathAllKeys = function(grid) {
    // another bfs where we want to keep track of the keys collected and steps to return.
    // memo the grid with the keys for each cell -> but keys have different values
    // right intuition with the 3d memo to store the keys
    const m = grid.length;
    const n = grid[0].length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    // memo stores whether or not the key exists at a given cell
    // hm should the bitmask be in the front or at the end?
    // const memo = Array.from({ length: 6 }, () => Array.from({ length: m }, () => new Array(n).fill(false)));

    // maybe we can just implement this with a hash and say that htis can be optimized with an array
    const memo = new Set();
    let totalKeys = 0;

    const queue = [];
    let queueIndex = 0;
    // find the starting point.
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '@') {
                queue.push([i, j, '', 0]);
                memo.add(`${i},${j},`);
            }
            if (grid[i][j] >= 'a' && grid[i][j] <= 'f') {
                totalKeys++;
            }
        }
    }

    // start the bfs
    while (queueIndex < queue.length) {
        const [i, j, keys, steps] = queue[queueIndex++];

        for (const [dr, dc] of directions) {
            const nr = i + dr;
            const nc = j + dc;

            // check if new cell is valid - in bounds, not a wall, not a lock without key, and does not already exist in memo
            if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
            const cell = grid[nr][nc];
            if (cell === '#') continue;
            if (cell >= 'A' && cell <= 'F' && !keys.includes(cell.toLowerCase())) continue;

            let nextKeys = keys;
            // check for key here? can also check for dupes but doesn't really matter except wasting space
            if (cell >= 'a' && cell <= 'f' && !keys.includes(cell)) {
                nextKeys = (keys + cell).split('').sort().join('');
            }
            // check if win
            if (nextKeys.length === totalKeys) return steps + 1;

            const state = `${nr},${nc},${nextKeys}`;
            if (memo.has(state)) continue;
            memo.add(state);
            
            queue.push([nr, nc, nextKeys, steps + 1]);
        }
    }

    return -1;
};
