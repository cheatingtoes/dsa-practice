// https://neetcode.io/problems/find-the-duplicate-number/question
// TIME COMPLEXITY: O(n) where n is the number of elements in the array
// SPACE COMPLEXITY: O(1) since we are modifying the input array in place

class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        // question asks given of unique nums except for one number which has duplicate(s)
        // find the duplicate number in O(1) space without modifying the array

        // sub problems
        // 1. how to find duplicate without keep track of prevously viewed numbers?? and without sorting the array?
        // we have access to the nums array, numbers array, and index. index can't be changed, and array can't be changed. that leaves the numbers 
        // 2. what can numbers do?? they can turn negative!!
         
        for (let i = 0; i < nums.length; i++) {
            const num = Math.abs(nums[i]);
            // if the index at num is already negative, we've already visited it before!
            if (nums[num] < 0) return num;
            // otherwise set the number to negative
            nums[num] *= -1; 
        }
    }
}
// post morten - learn the constraints, think about the problem and solution you got this!!