// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
// TIME COMPLEXITY: O(log n) where n is the number of elements in the array
// SPACE COMPLEXITY: O(1)

class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMin(nums) {
        // given an array of sorted numbers that have been rotated n times, find the minimum number in the array
        // strategy - can use binary search for this problem
        // sub problems - need to figure out which half is sorted to find the min
        // if last element is small than the middle, not sorted else must be sorted

        let left = 0;
        let right = nums.length - 1;
        // < or <= ??
        // strictly less than because...we are looking for the lowest value, not a specific value! right = mid will potentially cause an infinite loop
        while (left < right) {
             const mid = Math.floor((left + right) / 2);
             if (nums[mid] < nums[right]) {
                // right side is sorted and is increasing so the lowest must be to the left or current value
                right = mid;
             } else {
                left = mid + 1;
             }
        }
        return nums[left]
    }
}
