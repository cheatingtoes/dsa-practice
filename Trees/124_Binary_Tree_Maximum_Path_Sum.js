// https://leetcode.com/problems/binary-tree-maximum-path-sum/
// TIME COMPLEXITY: O(n) where n is the number of nodes in the tree
// SPACE COMPLEXITY: O(h) where h is the height of the tree for the recursion stack

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
 * @return {number}
 */
var maxPathSum = function(root) {
    // the question asks us to find the path in a binary tree, with the maximum sum.
    // strategy - we will have to start at the leave node? (the children on the lowest level) and iterate up.
    // for every new level, we can caluclate the sum of itself w/ it's children
    // calculate max sum as you traverse up - post-order traversal
    let max = -Infinity;
    const dfs = (node) => {
        if (!node) return 0;

        // get the value for left and right children
        const left = Math.max(dfs(node.left), 0);
        const right = Math.max(dfs(node.right), 0);

        // check for max val here
        max = Math.max(max, left + right + node.val);
        
        return Math.max(left + node.val, right + node.val)
    }
    dfs(root);
    return max;
};