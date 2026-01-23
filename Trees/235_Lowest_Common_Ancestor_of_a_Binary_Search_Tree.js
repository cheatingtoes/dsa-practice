// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
// TIME COMPLEXITY: O(h) where h is the height of the tree
// SPACE COMPLEXITY: O(1)

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    // traverse down the root node, when p and q split sides, return the root.val
    let node = root;
    while (node) {
        if (node.val > p.val && node.val > q.val) {
            node = node.left;
        } else if (node.val < p.val && node.val < q.val) {
            node = node.right;
        } else {
            return node;
        }
    }
};