// https://leetcode.com/problems/zigzag-conversion/
// TIME COMPLEXITY: O(n) where n is the length of the string, since we iterate through the string once and then concatenate the results
// SPACE COMPLEXITY: O(n) for the result array storing the characters in zigzag order

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1) return s;
    const result = new Array(numRows).fill().map(() => []);
    // so we need to keep track of...index of the string, and the index in results
    // if we're counting up or counting down...
    let resultIndex = 0;
    let isIncrementing = true;
    
    for (let i = 0; i < s.length; i++) {
        if (resultIndex === 0) isIncrementing = true;
        if (resultIndex === numRows - 1) isIncrementing = false;

        result[resultIndex].push(s[i]);

        if (isIncrementing) resultIndex++;
        else resultIndex--;
    }

    return result.reduce((acc, el) => acc + el.join(''), '');

};