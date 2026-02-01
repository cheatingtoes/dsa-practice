// https://neetcode.io/problems/binary-tree-right-side-view/question
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
     * @return {number[]}
     */
    rightSideView(root) {
        // given the root of a binary tree, return only the values of the nodes to the right of the tree from top to bottom.
        // hm seems a little too easy, starting from the root node only look for node.right and add that to a result array?

        // stop and think for a second!!!! slow down!!! visible from the right side so we need to check levels 
        // we want to always go right and return the level that it stops at then go left
        // only add from left if... we haven't been to that level yet.
        const result = []
        const dfs = (node, level) => {
            if (!node) return;
            if (result[level] === undefined) result.push(node.val);
            // go right
            dfs(node.right, level + 1);
            dfs(node.left, level + 1);
        }
        dfs(root, 0);
        return result;
    }
}
