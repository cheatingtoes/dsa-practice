// https://leetcode.com/problems/count-subarrays-with-cost-less-than-or-equal-to-k/description/
// TIME COMPLEXITY: O(n) where n is the length of the input array
// SPACE COMPLEXITY: O(n) for deque length

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function(nums, k) {
    // given an array of numbers and an integer k, return the number of subarrays of nums whose cost is less than or equal to k

    // every possible subarray is a recursive

    // the window expands 

    let result = 0;
    let left = 0;
    const minDeque = [];
    let minDequeIndex = 0;
    const maxDeque = [];
    let maxDequeIndex = 0;

    // for loop won't work here? while loop?
    for (let right = 0; right < nums.length; right++) {                                   // [1,3,2]        k = 4
        // check for validity of window
        // update min/max deque
        const curr = nums[right];
        while (minDeque.length > minDequeIndex && curr < nums[minDeque[minDeque.length - 1]]) {           // 2
            minDeque.pop();
        }
        minDeque.push(right);
        while (maxDeque.length > maxDequeIndex && curr > nums[maxDeque[maxDeque.length - 1]]) {             // 3, 2
            maxDeque.pop();
        }
        maxDeque.push(right);

        const getCost = () => {
            // can add safety check of queues have length
            const max = nums[maxDeque[maxDequeIndex]];
            const min = nums[minDeque[minDequeIndex]];
            const len = right - left + 1;
            return (max - min) * len
        }

        // check the validity of window
        while(getCost() > k) { // can add safety check if left passes right
            // remove left for min/max deque the recalculate cost
            if (minDeque[minDequeIndex] === left) minDequeIndex++;
            if (maxDeque[maxDequeIndex] === left) maxDequeIndex++;
            left++;
        }

        // add all subarrays ending with right to result
        result += right - left + 1;                                                         // 1 + 2 + 
    }
    return result;
};