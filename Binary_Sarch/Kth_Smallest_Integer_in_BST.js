// https://neetcode.io/problems/kth-smallest-element-in-a-bst/question
// TIME COMPLEXITY: O(h + k) where h is the height of the tree
// SPACE COMPLEXITY: O(h) for the recursion stack

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
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        // given a binary search tree, return the kth smallest values of the tree

        // strategy - dfs while calculating the smallest val which is possible by going all the way left? and returning +1?
        let result;
        let index = 0;
        const dfs = (node) => {
            if (!node || result !== undefined) return 0;

            dfs(node.left);
            index++;
            if (index == k ) return result = node.val;
            dfs(node.right);
        }
        dfs(root, 1);
        return result
    }
}
