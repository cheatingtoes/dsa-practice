// https://neetcode.io/problems/largest-rectangle-in-histogram/question
// TIME COMPLEXITY: O(n) where n is the number of heights
// SPACE COMPLEXITY: O(n) for the stack in worst caseq

class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        // new strategy for O(n)
        // sub problems
        // 1. for each given index, find the max it can go to the left or right? by iterating to the right and looking back
        // we will eventually process the right side of any height.

        // we save as tuple, index it can be extended from and height
        // monotonic increasing stack!!!
        const stack = [[0, heights[0]]];
        let max = 0

        for (let i = 1; i < heights.length; i++) {
            // here we iterate through the heights array and check if previous value can be extended
            const height = heights[i];
            let extendIndex = i;

            // if current height is less than prevHeight, we process prevHeight because it can no longer extend!
            while (stack.length > 0 && height < stack[stack.length - 1][1]) {
                const [prevIndex, prevHeight] = stack.pop();
                extendIndex = prevIndex;
                max = Math.max(max, (i - prevIndex) * prevHeight);
            }

            stack.push([extendIndex, height]);
        }

        // here we've reached the end process rest of the stack
        while (stack.length > 0) {
            const [prevIndex, prevHeight] = stack.pop();
            max = Math.max(max, (heights.length - prevIndex) * prevHeight);
        }
        return max;
    }

    largestRectangleAreaBrute(heights) {
        // given an array of integer heights, return the area of the largest rectangle that can be formed among the bars of width 1.

        // rectangle = minimum of adjacent bars from left to right
        // brute force - calculate height for each subarray and return max O(n^2)
        let max = 0;
        for (let i = 0; i < heights.length; i++) {
            let minHeight = heights[i];
            for (let j = i; j < heights.length; j++) {
                minHeight = Math.min(minHeight, heights[j]);
                max = Math.max(max, minHeight * (j - i + 1));
            }
        }
        return max;
    }
}
