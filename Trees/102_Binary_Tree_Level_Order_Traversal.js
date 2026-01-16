// https://leetcode.com/problems/binary-tree-level-order-traversal/
// TIME COMPLEXITY: O(n) where n is the number of nodes in the tree
// SPACE COMPLEXITY: O(n) for the queue and result array

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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    // given a root node of a binary tree, return the level order traversal of it's nodes (from left to right, level by level).
    // this is a classic BFS so we need to implement a queue
    if (!root) return [];
    const queue = [root];
    const result = [];
    while (queue.length > 0) {
        // need to iterate over queue.length to create values level by level
        const level = [];
        const queueLen = queue.length;
        for (let i = 0; i < queueLen; i++) {
            const node = queue.pop();
            level.push(node.val);
            // unshift into queue from left to right
            if (node.left) queue.unshift(node.left);
            if (node.right) queue.unshift(node.right);
        }
        result.push(level);
    }
    return result;
};