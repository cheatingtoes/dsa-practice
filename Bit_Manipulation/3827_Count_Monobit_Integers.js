// https://leetcode.com/problems/count-monobit-integers/description/
// TIME COMPLEXITY: O(log n) where n is the input number since we convert each number to binary
// SPACE COMPLEXITY: O(1) for the binary representation of each number

/**
 * @param {number} n
 * @return {number}
 */
var countMonobit = function(n) {
    // since monobits can only consist of 1s, except for 0 itself, we only need to count 1, 11, 111...etc
    if (n < 0) return 0;
    if (n === 0) return 1;

    let count = 1;
    let currentMonobit = 0;

    while (currentMonobit <= n) {
        currentMonobit = (currentMonobit * 2) + 1;
        if (currentMonobit <= n) count++
    }

    return count;


    // for (let i = 0; i <= n; i++) {
    //     const numInBinary = i.toString(2);
    //     if (numInBinary.length === 1) count++;
    //     for (let j = 1; j < numInBinary.length; j++) {
    //         if (numInBinary[j] !== numInBinary[j - 1]) break;
    //         if (j === numInBinary.length - 1) count++
    //     }
    // }
    // return count;
};