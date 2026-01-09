// https://leetcode.com/problems/serialize-and-deserialize-binary-tree
// TIME COMPLEXITY: O(N) to serialize and deserialize
// SPACE COMPLEXITY: O(N) to store the serialized data

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    // bfs to make array
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null)
        }
    }
    return JSON.stringify(result);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (!data ) return null;
    const nodes = JSON.parse(data);
    if (data.length == 0 || nodes[0] == null) return null;
    
    const root = new TreeNode(nodes[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < data.length) {
        const current = queue.shift();
        // attach left + right to current. current is already a TreeNode
        if (i < nodes.length) {
            if (nodes[i] !== null) {
                const left = new TreeNode(nodes[i]);
                current.left = left;
                queue.push(left);
            }
            i++;
        }
        if (i < nodes.length) {
            if (nodes[i] !== null) {
                const right = new TreeNode(nodes[i]);
                current.right = right;
                queue.push(right);
            }
            i++;
        }
    }
    return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */