// https://neetcode.io/problems/surrounded-regions/question
// TIME COMPLEXITY: O(m * n) where m is the number of rows and n is the number of columns in the board
// SPACE COMPLEXITY: O(m * n) for the recursion stack in the worst case where all 'O's are connected to the border

class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solve(board) {
        // given a board of x's and o's.  if a group of o's is is surrounded by x's on all four sides, change them to x's in place.

        // questions - do i have to check for board validation?
        // what other clarifying questions should i ask?
        
        // strategy - for each given o we can check the four directions until out of bounds to see if it is surrounded by x
        // we can sweep o's that are not part of it as well?
        // what is the approach here?
        // instead of looking for o's to convert - ones surrounded by x's, we can do the inverse and look for o's that are safe.
        // o's are safe if they are connected to the border!
        
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const m = board.length;
        const n = board[0].length;

        // responsible for turning O's to #
        const dfs = (row, col) => {
            for (const [nr, nc] of directions) {
                const newRow = row + nr;
                const newCol = col + nc;

                if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && board[newRow][newCol] === "O") {
                    // we sink it here to prevent repeats
                    board[newRow][newCol] = '#';
                    dfs(newRow, newCol);
                }
            }
        }

        // loop through the border and run dfs
        for (let i = 0; i < m; i++) {
            if (board[i][0] === 'O') {
                board[i][0] = '#';
                dfs(i, 0);
            }
            if (board[i][n - 1] === 'O') {
                board[i][n - 1] = '#';
                dfs(i, n - 1);
            }
        }
        for (let j = 0; j < n; j++) {
            if (board[0][j] === 'O') {
                board[0][j] = '#';
                dfs(0, j);
            }
            if (board[m - 1][j] === 'O') {
                board[m - 1][j] = '#';
                dfs(m - 1, j);
            }
        }
        // iterate over tiles and convert # to X and O's to X's
        for (let k = 0; k < m; k++) {
            for (let l = 0; l < n; l++) {
                if (board[k][l] === 'O') board[k][l] = 'X'
                if (board[k][l] === '#') board[k][l] = 'O';
            }
        }
    }
}
