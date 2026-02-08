// https://leetcode.com/problems/count-subarrays-with-cost-less-than-or-equal-to-k/description/
// TIME COMPLEXITY: O(n) where n is the length of the input array due to the two-pointer approach
// SPACE COMPLEXITY: O(n) in the worst case for the deques storing indices of max and min elements

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function(nums, k) {
    // given an integer array, return the number of subarrays of nums whose cost is less than or euqal to k/
    // cost is calculated as... (max of numbers in subarray) - min(number in subarray) * (r - 1 + 1);

    // strategy - need to get every subarray and do a calculation - is there any way to memo? is it worth memoing?

    // states -> as the subarray gets bigger cost increases. when cost > k we need to shrink the subarray to make it valid
    
    let count = 0;
    let left = 0;
    // max deque / min deque
    let maxIndices = [];
    let minIndices = [];
    // how to formulate every subarray? nested for loop??
    for (let right = 0; right < nums.length; right++) {
        // step 1. add to max/min index
        // step 2. check validity of window
        // step 3. check validity of min/max index & add subarray count

        // step 1. remove all invalid elemetns from minIndices and maxIndices
        while (maxIndices.length && nums[right] >= nums[maxIndices[maxIndices.length - 1]]) maxIndices.pop();
        maxIndices.push(right);

        while (minIndices.length && nums[right] <= nums[minIndices[minIndices.length - 1]]) minIndices.pop();
        minIndices.push(right);

        // step 2: check validity of window - shrink of not and pop from min/max
        // let cost = (nums[maxIndices[0]] - nums[minIndices[0]]) * (right - left + 1);

        const getCost = () => {
            if (maxIndices.length === 0 || minIndices.length === 0) return 0;
            return (nums[maxIndices[0]] - nums[minIndices[0]]) * (right - left + 1);
        }

        // how to ensure that maxIndices exists so we don't error?                                                              
        // what if k is a negative? then while loop will never run the loop is checking for... validity? what if validity doesn't exist?
        while (getCost() > k && left <= right) {
            left++;
            if (maxIndices[0] < left) maxIndices.shift();
            if (minIndices[0] < left) minIndices.shift();
        }

        // step 2. we need to check if cost is > k. if so, shrink the window and verify minIndices and maxIndices is still valid
        // while (left <= right) {
        //     //calculate cost
        //     //if cost is valid get outa here!
        //     if ((nums[maxIndices[0]] - nums[minIndices[0]]) * (right - left + 1) <= k) break;
        // }

        // add to count the number of indices within the wondow. the logic is that each subarray is one that starts at left and ends at right...
        // is valid. when right iterates, the end of the subarray is different = whole new subarray!
        if (left <= right) count += right - left + 1;
    }

    return count;
};