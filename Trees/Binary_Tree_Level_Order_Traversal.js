// https://neetcode.io/problems/binary-tree-level-order-traversal/question
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
     * @return {number[][]}
     */
    levelOrder(root) {
        // given a binary tree, return each level of the tree as a sublist from left to right
        // questions - so given a binary tree we expect to return a 2d array of node values from each level of the tree
        // we can do dfs or bfs  as well for this

        if (!root) return [];

        const queue = [root];
        const bfsResult = [];

        while (queue.length > 0) {
            // get the len of current level and iterate over it
            const len = queue.length;
            bfsResult.push([]);
            for (let i = 0; i < len; i++) {
                const node = queue.pop();
                bfsResult[bfsResult.length - 1].push(node.val);
                if (node.left) queue.unshift(node.left);
                if (node.right) queue.unshift(node.right);
            }
        }

        return bfsResult



        const result = [];

        const dfs = (node, level) => {
            if (!node) return;
            // add to result at index if it exists, otherwise the level (array)
            if (!result[level]) result.push([node.val]);
            else result[level].push(node.val);
            // go left and add to array
            dfs(node.left, level + 1);
            dfs(node.right, level + 1);
        }

        dfs(root, 0);
        return result;

    }
}
