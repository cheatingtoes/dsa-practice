// https://leetcode.com/problems/validate-binary-search-tree
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(h) h is height of tree due to recursion stack

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    // question is asking us to validate a binary search tree in order for the tree to be valid it there is a min and max value it must fall inbetween
    // where the if on the left side of a node, the min is ?? max is root node, and on the right side, the min is the root ndoe and the max is ??

    // need to pass min, max and node!
    // new max when going left, new min with going right
    const dfs = (min, max, node) => {
        if (node.val <= min || node.val >= max) return false;
        if (node.left) {
            if (!dfs(min, node.val, node.left)) return false;
        }
        if (node.right) {
            if (!dfs(node.val, max, node.right)) return false;
        }
        return true;
    }

    if (root.left) {
        if (!dfs(-Infinity, root.val, root.left)) return false;
    }
    if (root.right) {
        if (!dfs(root.val, Infinity, root.right)) return false;
    }
    return true;
};