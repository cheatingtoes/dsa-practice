// https://leetcode.com/problems/word-search
// TIME COMPLEXITY: O(N * 3^L) N = number of cells in board, L = length of word
// SPACE COMPLEXITY: O(L) for recursion stack

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    // the question is given a grid of characters, we need to find a word, where subsequent characters in the word are adjacent in the grid. characters cannot be used more than once. return true if the word exists in the grid.
    // questions can include - do i have to check for case? 
    // strategy - iterate through each character in the grid to find the first character in word. then do a DFS to find the subsequent characters in the word.
    // how to optimize? can perhaps store the value cells already stored to prevent multiple searches

    const rowLen = board.length;
    const colLen = board[0].length;
    
    // helper function to check adjacent tiles
    const checkCharacter = (row, col, wordIndex) => {
        if (row < 0 || row >= rowLen || col < 0 || col >= colLen) return false;
        const char = board[row][col];
        // base case 
        if (char !== word[wordIndex]) return false;
        if (wordIndex + 1 === word.length) return true;

        // set the current tile to null so we don't reuse it
        const temp = char;n 
        board[row][col] = null;
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        for (const [nr, nc] of directions) {
            if (checkCharacter(row + nr, col + nc, wordIndex + 1)) return true;
        }
        // set the tile back to original character
        board[row][col] = temp;
        return false;
    }

    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
            if(checkCharacter(i, j, 0)) return true;
        }
    }
    return false
};