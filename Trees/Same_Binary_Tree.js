// https://neetcode.io/problems/same-tree/question
// TIME COMPLEXITY: O(n) where n is the number of nodes in the trees
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
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {boolean}
     */
    isSameTree(p, q) {
        // the question asks us given two binary trees, return true if they are equivalent. they are equal if they share the same nodes and same values.
        // clarifying questions - ?? will the nodes be null? are there only numbers as values?

        const queue = [[p, q]];
        const stack = [[p, q]];

        while (queue.length > 0) {
            const [node1, node2] = queue.pop();
            if (!node1 && !node2) continue;
            if ((!node1 && node2) || (node1 && !node2) || node1.val !== node2.val) return false;
            if (node1 && node2) {
                queue.unshift([node1.left, node2.left])
                queue.unshift([node1.right, node2.right])
            }
        }
        // stack strategy is the same logic. since we're just comparing values FIFO and FILO doesn't matter
        while (stack.length > 0) {
            const [node1, node2] = stack.pop();
            if (!node1 && !node2) continue;
            if ((!node1 && node2) || (node1 && !node2) || node1.val !== node2.val) return false;
            if (node1 && node2) {
                queue.unshift([node1.left, node2.left])
                queue.unshift([node1.right, node2.right])
            }
        }

        return true;



        // can use dfs or bfs let's practice both! and recursion yay!
        const dfs = (node1, node2) => {
            // strategy - check if the values are the same and if they both exist
            // base case
            if (!node1 && !node2) return true;
            if ((!node1 && node2) || (node1 && !node2) || node1.val !== node2.val) return false;
            return dfs(node1.left, node2.left) && dfs(node1.right, node2.right);
        }

        return dfs(p, q);
    }
}
