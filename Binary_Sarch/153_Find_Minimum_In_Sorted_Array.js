/*
  PROBLEM: LeetCode 153 - Find Minimum in Rotated Sorted Array
  PATTERN: Binary Search (Minimize Search Space)
  TIME COMPLEXITY: O(LOG N)
  SPACE COMPLEXITY: O(1)
  
  STRATEGY
  1. Since numbers are sorted asc, we look to the right to determine which side of the rotation we are on.
  2. Compare mid against right. If mid > right, then we we're on a cliff and the drop is to the right
  3. If mid < right, then we are on the low side and the minimum is to the left or mid.

  NOTES
  - we use (left < right) in the while loop because we're trying to find the last element.
  - we look to the right because it's guaranteed to tell us something about the array. looking to the left, it
  is uncertain whether the min is to the left or to the right.
  
  https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
*/

var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        // Step 1: Compare Mid vs Right to determine orientation
        if (nums[mid] > nums[right]) {
            // if mid is > right, the array has to reset (drop) to get there
            left = mid + 1;
        } else {
            // otherwise the array is sorted on the right side (incrementing)
            // so the answer has to be on the left side
            right = mid;
        }
    }
    // When left == right, we have found the minimum
    return nums[left];
};