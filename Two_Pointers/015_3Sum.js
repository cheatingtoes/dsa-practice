/*
    PROBLEM: LeetCode 15. 3Sum
    PATTERN: Sorting + Two Pointers
    TIME COMPLEXITY: O(N^2)
    SPACE COMPLEXITY: O(1) (not counting output array)
  
    THE STRATEGY:
        1. Sort the array.
            - Necessary for using two pinters and skipping duplicates.
        2. Iterate through the array, treating each number as an "anchor".
        3. For each anchor, use two pointers to find remmaining two numbers that sum to zero.

    NOTES:
        - We can check for duplicates easily because the array is sorted. When a duplicate is found,
          we can just skip it.
        - when a 3sum is found, we can move both pointers.

    https://leetcode.com/problems/3sum/
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const sortedNums = nums.sort((a, b) => b - a);
    const resultArray = [];

    for (let i = 0; i < sortedNums.length - 2; i++) {
        if (sortedNums[i] === sortedNums[i - 1]) continue;
        let leftIndex = i + 1;
        let rightIndex = sortedNums.length - 1;

        while (leftIndex < rightIndex) {
            const sum =
                sortedNums[i] + sortedNums[leftIndex] + sortedNums[rightIndex];
            // if sum = 0 we want to add it to the array and move both counters
            if (sum == 0) {
                resultArray.push([
                    sortedNums[i],
                    sortedNums[leftIndex],
                    sortedNums[rightIndex],
                ]);
                leftIndex++;
                rightIndex--;
                while (
                    leftIndex < rightIndex &&
                    sortedNums[leftIndex] === sortedNums[leftIndex - 1]
                ) {
                    leftIndex++;
                }
                while (
                    leftIndex < rightIndex &&
                    sortedNums[rightIndex] === sortedNums[rightIndex + 1]
                ) {
                    rightIndex--;
                }
            } else if (sum > 0) {
                leftIndex++;
            } else {
                rightIndex--;
            }
        }
    }
    return resultArray;
};
