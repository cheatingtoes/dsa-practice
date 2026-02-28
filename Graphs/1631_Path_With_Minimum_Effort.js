// leetcode.com/problems/path-with-minimum-effort/
// TIME COMPLEXITY: O(n * m * log(n * m)) where n is the number of rows and m is the number of columns in the heights matrix. This is because we are using a min-heap to store the tiles based on their effort, and in the worst case, we may need to push all tiles into the heap.
// SPACE COMPLEXITY: O(n * m) for the min-heap and the minEffort matrix, which both can store up to n*m elements in the worst case.

/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function(heights) {
    // dp to each grid? to keep track of min effort to each tile. what is the loop? a route is possible if... it hasn't been visited before (for dfs).  what about bfs? -> no definitive way to know if you're getting closer to your goal because you can go any way.
    const n = heights.length;
    const m = heights[0].length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    // initialize minHeap with starting tile with 0 effort
    // const minHeap = [[0, 0, 0]]
    const minHeap = new MinHeap();
    minHeap.push([0, 0, 0]);
    const minEffort = Array.from({ length: n }, () => new Array(m).fill(Infinity));
    minEffort[0][0] = 0;

    while (minHeap.size() > 0) {
        // if we're at destination tile return the effort
        const [prevEffort, i, j] = minHeap.pop();
        if (i === n - 1 && j === m - 1) return prevEffort;
        if (prevEffort > minEffort[i][j]) continue;
        // else we loop through directions add to minHeap and sort by the cost
        for (const [nr, nc] of directions) {
            const newRow = i + nr;
            const newCol = j + nc;
            if ( newRow >= 0 && newCol >= 0 && newRow < n && newCol < m) {
                const currentEffort = Math.max(prevEffort, Math.abs(heights[i][j] - heights[newRow][newCol]));
                if (currentEffort < minEffort[newRow][newCol]) {
                    minHeap.push([currentEffort, newRow, newCol])
                    minEffort[newRow][newCol] = currentEffort;
                }
            }
        }
    }
};