/**
    PROBLEM: LeetCode 42. Trapping Rain Water
    PATTERN: Two Pointers (Converging)
    TIME COMPLEXITY: O(N)
    SPACE COMPLEXITY: O(1)

    STRATEGY:
        1. Use two pointers starting at the edges of the array.
        2. Keep track of the maximum heights seen so far from both ends.
        3. Move the pointer with the smaller height inward.
            - This ensures we are always bounded by the taller wall. The limiting factor for water
            trapped at any point is the shorter wall.
        4. Calculate trapped water at each step, from the side of the pointer being moved.
        In this case, it is the pointer with the smaller height.
        5. Repeat until the two pointers meet.

    NOTES:
        - If the current wall is taller than the max seen so far, it holds no water.
        Instead, it *becomes* the new max.

    https://leetcode.com/problems/trapping-rain-water/
*/

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    // two pointer solution
    let leftIndex = 0;
    let rightIndex = height.length - 1;
    let waterLevel = 0;
    let leftHighest = 0;
    let rightHighest = 0;

    while (leftIndex !== rightIndex) {
        const leftHeight = height[leftIndex];
        const rightHeight = height[rightIndex];
        // process the smaller height because the larger height will act as a wall
        if (leftHeight < rightHeight) {
            // if new height is NOT larger than max then water can be filled here.
            if (leftHeight <= leftHighest) {
                waterLevel += leftHighest - leftHeight;
            } else {
                // if new height IS larger than max, update max
                leftHighest = leftHeight;
            }
            leftIndex++;
        } else {
            if (rightHeight <= rightHighest) {
                waterLevel += rightHighest - rightHeight;
            } else {
                rightHighest = rightHeight;
            }
            rightIndex--;
        }
    }
    return waterLevel;
};
