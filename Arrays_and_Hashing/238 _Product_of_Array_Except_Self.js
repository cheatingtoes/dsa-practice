/**
    PROBLEM: LeetCode 238. Product of Array Except Self
    PATTERN: Prefix and Postfix Products
    TIME COMPLEXITY: O(N)
    SPACE COMPLEXITY: O(1) (output array does not count as extra space)

    THE STRATEGY:
        1. Split the problem into two -
        - Product of all elements to the LEFT of index 'i'
        - Product of all elements to the RIGHT of index 'i'
        2. Solution is the product of each side for each index.

    NOTES:
        - Index 0 has no "left", and Index n-1 has no "right". We default these to 1.

    https://leetcode.com/problems/product-of-array-except-self/
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    const productArray = new Array(nums.length).fill(1);

    let rightProduct = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        productArray[i] = rightProduct;
        rightProduct *= nums[i];
    }
    let leftProduct = 1;
    for (let i = 0; i < nums.length; i++) {
        productArray[i] *= leftProduct;
        leftProduct *= nums[i];
    }
    return productArray;
};
