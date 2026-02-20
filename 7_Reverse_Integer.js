// https://leetcode.com/problems/reverse-integer/description/
// TIME COMPLEXITY - o(n) where n is the number of digitis in x
// SPACE COMPLEXITY - o(1)


/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let isNegative = x < 0;
    let num = Math.abs(x);
    let result = 0;

    while (num > 0) {
        const pop = num % 10;
        num = Math.floor(num / 10);
        result = (result * 10) + pop;
    }
    if (isNegative) result = -result;
    const LIMIT_HIGH = Math.pow(2, 31) - 1;
    const LIMIT_LOW = -Math.pow(2, 31);

    if (result > LIMIT_HIGH || result < LIMIT_LOW) {
        return 0;
    }
    return result
};