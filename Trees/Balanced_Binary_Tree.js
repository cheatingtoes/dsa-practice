// https://neetcode.io/problems/balanced-binary-tree/question
// TIME COMPLEXITY: O(n) where n is the number of nodes in the tree
// SPACE COMPLEXITY: O(h) where h is the height of the tree for the recursion stack

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
    isBalanced(root) {
        // question asks if a tree is balanced - 
        // we can do dfs to find the height of either the most shallow or the most deep, then compare 
        // or bfs and start counter when we reach a node with no children

        // base case returns...the height
        const dfs = (node) => {
            if (!node) return 0;

            const left = dfs(node.left);
            if (left === -1) return -1
            const right = dfs(node.right);
            if (right === -1) return -1

            if (Math.abs(left - right) > 1) return -1;
            return Math.max(left, right) + 1;
        }

        // some ternary
        return dfs(root) !== -1;
    }
}
