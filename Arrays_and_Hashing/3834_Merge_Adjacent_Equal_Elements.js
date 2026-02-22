// https://leetcode.com/problems/merge-adjacent-equal-elements/
// TIME COMPLEXITY: O(n) where n is the length of the input array
// SPACE COMPLEXITY: O(n)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var mergeAdjacent = function(nums) {
    // given an array of nums, apply the following merge operation until no more operations can be made
    // if any tow adjacent numbers are equal, merge them and set to the sum of the two elements

    // what's the best appraoch to creating this new array? push values? into an array?
    
    const stack = [];
    // continuously loop and merge? that's a lot of loopse -> setr to null then fileter?
    // keep result as a stack, check the top element if equal. if so pop, and check again

    for (const num of nums) {
        let currNum = num;

        while (stack.length > 0 && currNum === stack[stack.length - 1]) {
            currNum += stack.pop();
        }

        stack.push(currNum);
    }

    return stack;

};