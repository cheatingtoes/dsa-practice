// https://leetcode.com/problems/basic-calculator/
// TIME COMPLEXITY: O(n) where n is the length of the string
// SPACE COMPLEXITY: O(n) for the stack in the worst case with nested parentheses

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    // given a string representing a valid arithmetic expression, implement a baisc calculator to evaluate and return the evaluation!!
    // operations include +, -, (, ), and ' '

    // questions - ...validity is confirmed...
    // can we just strip all parens? do they matter? i don't think so if we're just adding and subtracting will matter if... -(1+1)

    // strategy with parens.... maybe we can continually iterate over an array?
    // we need to keep track of the operators parens and - are tricky as they represent different things


    // need to keep track of...
    // sign
    // current numbers
    // result
    // parens

    let sign = 1;
    let result = 0;
    let int = 0;
    const stack = [] // for parens and any operator really...except for negative unary

    for (let i = 0; i < s.length; i++) {
        // hardest part is... how to handle parens -> need to push it into the stack. i suppose we would've reset int at that point
        const t = s[i];
        if (t === ' ') continue;
        else if (t === '-') {
            result += int * sign;
            int = 0;
            sign = -1;
        }
        else if (t === '+') {
            result += int * sign;
            int = 0;
            sign = 1;
        }
        else if (t === '(') {
            // if it's an open paren, we want to keep track of the previous result and the sign
            stack.push(result, sign);
            result = 0;
            sign = 1;
        }
        else if (t === ')') {
            // we need to pop out the open paren, sign, and result.
            result += (int * sign);
            int = 0;

            const prevSign = stack.pop();
            const prevResult = stack.pop();
            result = prevResult + (prevSign * result);
            // result += (prevResult + (sign * Number(int))) * prevSign;
            // sign = 1;
        } else int = int * 10 + (t - '0');
    }
    return result + (int * sign)
};