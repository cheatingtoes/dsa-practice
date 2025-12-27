/*
  PROBLEM: LeetCode 11 - Container With Most Water
  PATTERN: Two Pointers (Greedy)
  TIME COMPLEXITY: O(N)
  SPACE COMPLEXITY: O(1)

  STRATEGY:
    1. Iterate through the array with two pointers on opposite ends of the array
    During each iteration we calculate the area using the lower value of the two
    pointers/indexes as the height.
    2. During each iteration, move the lower value of the two indexes inward because 
    the lower value is the limiting factor in calculating the max area.
  
  NOTES:
    - If values are equal at both pointers, you can move any or both since the area at that
    specific max width has already been calculated. (even though i didn't implement moving
    both!)

  https://leetcode.com/problems/container-with-most-water
*/

var maxArea = function(height) {
    let maxArea = 0; 
    let leftIndex = 0;
    let rightIndex = height.length - 1;

    while (leftIndex < rightIndex) {
        const leftNum = height[leftIndex];
        const rightNum = height[rightIndex];

        const area = Math.min(leftNum, rightNum) * (rightIndex - leftIndex)
        if (area > maxArea) maxArea = area

        if (leftNum < rightNum) {
            leftIndex++;
        } else {
            rightIndex--;
        }
    }
    return maxArea;
};