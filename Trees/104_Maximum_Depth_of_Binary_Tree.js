// https://leetcode.com/problems/maximum-depth-of-binary-tree/
// TIME COMPLEXITY: O(n) where n is the number of nodes in the tree
// SPACE COMPLEXITY: O(h) where h is the height of the tree for the recursion stack or O(w) for the width of the tree for BFS

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
var maxDepth = function(root) {
    if (!root) return 0;
    let max = 0;

    // pass in root and level, increment level as we recurse down each child
    const dfs = (root, level) => {
        // base case
        if (!root) return;
        max = Math.max(max, level)
        // go all the way left
        dfs(root.left, level + 1);
        // then go all the way right!
        dfs(root.right, level + 1)
    }

    // loop through levels using BFS, incrementing max at each level
    const bfs = () => {
        const queue = [root];
        while (queue.length) {
            max++;
            // iterate over the length of queue to determine the level;
            const queueLen = queue.length;
            for (let i = 0; i < queueLen; i++) {
                const node = queue.pop();
                if (node.left) queue.unshift(node.left);
                if (node.right) queue.unshift(node.right);
            }
        }
    }

    // dfs(root, 1)
    bfs();
    return max;
};