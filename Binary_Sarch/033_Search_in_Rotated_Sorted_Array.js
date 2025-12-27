/*
  PROBLEM: LeetCode 33 - Search in Rotated Sorted Array
  PATTERN: Binary Search (Modified)
  TIME COMPLEXITY: O(LOG N)
  SPACE COMPLEXITY: O(1)

  STRATEGY
  1. Due to the array being rotated at one point, we split the array in half and search for sorted side.
  2. If sorted side, we check if target is in that half, search that half. Otherwise search other half
  
  NOTES
  - Quite a few edge cases/things to watch out for. Need to be careful with how to round (Math.floor vs Math.round)
    and checking the bounds of the array (e.g. edges of the array, equality check < vs <=)

  https://leetcode.com/problems/search-in-rotated-sorted-array/
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + Math.floor((right - left) / 2));
        const midN = nums[mid];
        if (midN === target) return mid;
        const leftN = nums[left];
        const rightN = nums[right];
        // check which side is sorted and apply logic there
        if (leftN <= midN) {
            if (leftN <= target && target < midN) right = mid - 1;
            else left = mid + 1;
        } else {
            if (target <= rightN && midN < target) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1
}

// does not work!!!
var searchFirst = function(nums, target) {
    // nums is sorted but split in one place
    // split in half and check which side is sorted. see if target exists in sorted side
    let left = 0;
    let right = nums.length;
    while (left < right) {
        // !! math.round will do different operations depending on the number 1.2 vs 1.6, down vs up
        // !! we want the behavior to be consistent.
        // !! need to add the fllor to the mid everytime -> floor is the left index
        const mid = Math.round((right - left) / 2)
        const midN = nums[mid];
        if (midN == target) return mid;
        const leftN = nums[left];
        const rightN = nums[right];
        // check which side is sorted, which i not
        if (leftN < midN) {
            // if target is between leftN and middle
            if (leftN < target && target < midN) {
                // !! since we already checked mid, move right to mid + 1
                right = mid;
            } else {
                // !! since we already checked mid, move left to mid - 1
                left = mid;
            }
        } else {
            // right side is sorted, check if target is within right
            if (rightN > target && target > midN) {
                left = mid;
            } else {
                right = mid;
            }
        }
    }
    return -1;
};