// https://neetcode.io/problems/count-good-nodes-in-binary-tree/question
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
     * @return {number}
     */
    goodNodes(root) {
        // given the root node of a binary tree, could all "good" nodes
        // a node is good if the path from itself to the root contains no nodes with a value grater than itself?

        let count = 0;
        const dfs = (node, min) => {
            if (!node) return;
            // if current value not less than min increment counter
            if (node.val >= min) count++;
            // go down left and right and update min counter
            dfs(node.left, Math.max(node.val, min));
            dfs(node.right, Math.max(node.val, min));
        }
        dfs(root, root.val);
        return count
    }
}
