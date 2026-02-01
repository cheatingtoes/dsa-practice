// https://neetcode.io/problems/validate-binary-search-tree/question
// TIME COMPLEXITY: O(n) where n is the number of nodes in the tree
// SPACE COMPLEXITY: O(h) where h is the height of the tree due to recursion stack

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Solution {
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    isValidBST(root) {
        // given the root of a binary tree, check if it's a valid binary search tree

        // sub problems - valid binary search tree if left child is < node.val and right child is > node.val
        // each child has a min and max to keep track of

        const dfs = (node, min, max) => {
            // base case - return true if we reach the last node
            if (!node) return true;
            // check if node falls between min and max
            if (node.val <= min || node.val >= max) return false;
            // traverse down the tree if going left that means the value must be smaller, update max val
            return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
        }
        return dfs(root, -Infinity, Infinity)
    }
}
