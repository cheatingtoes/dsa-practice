// https://leetcode.com/problems/minesweeper/description/
// TIME COMPLEXITY: O(m * n) where m is the number of rows and n is the number of columns in the board. This is because in the worst case, we may need to visit every cell in the board once.
// SPACE COMPLEXITY: O(m * n) for the queue used in the breadth-first search, which can store up to m*n elements in the worst case.

/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function(board, click) {
    // return new board state where if bomb -> return X
    // if E with adjacent bomb -> reveal the number of bombs
    // else change it and all adjacent unrevealed squeals to "B" for blank
    // so reveal all adjacent tiles that do not have a bomb adjacent to said tile.  and then the digit representing the number of adjacent mines.

    // steps
    // 1. if click is a bomb -> turn cell to x and return
    // 2. check adjacent for bomb. if true we can reveal the one cell.
    // 3. if no adjacent bomb we can add to some queue and recurse upon it checking until an adjacent one is found, when so, reveal that one cell and don't add to queue

    const [x, y] = click;
    const m = board.length;
    const n = board[0].length;

    if (board[x][y] === 'M') {
        board[x][y] = 'X';
        return board;
    }
    // check for bombs.  what about empty spaces?
    const bombCheck = (i, j) => {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];

        let bombCount = 0;
        let blankCoords = [];
        
        for (const [dr, dc] of directions) {
            const nr = dr + i;
            const nc = dc + j;
            if (nr < 0 || nc < 0 || nr >= m || nc >= n || board[nr][nc] === 'B') continue;
            if (board[nr][nc] === "M") bombCount++;
            if (board[nr][nc] === 'E') blankCoords.push([nr, nc]);
        }
        return { bombCount, blankCoords };
    }

    const queue = [[x, y]]
    board[x][y] = 'B';
    let queueIndex = 0;

    while (queueIndex < queue.length) {
        const [i, j] = queue[queueIndex];
        queueIndex++;

        const { bombCount, blankCoords } = bombCheck(i, j);
        if (bombCount > 0) board[i][j] = bombCount.toString();
        else {
            for (const [r, c] of blankCoords) {
                board[r][c] = 'B';
                queue.push([r, c]);
            }            
        }
    }
    return board;
};