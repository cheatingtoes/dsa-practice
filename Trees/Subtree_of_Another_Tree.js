// https://neetcode.io/problems/subtree-of-another-tree/question
// TIME COMPLEXITY: O(m * n) where m is the number of nodes in root and n is the number of nodes in subRoot in the worst case
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
     * @param {TreeNode} subRoot
     * @return {boolean}
     */
    isSubtree(root, subRoot) {
        // the question asks us given two binary trees, determine if one is a subroot of the other
        // where a subroot is a node in the tree with the same descendants

        // strategy - dfs or bfs until we find subroot's root value in tree. then we can check if all descendants are the same
        // will have to check all nodes for false

        // subproblems
        // 1. find the same value node between root and subroot to initiate the subroot scan.
        // 2. but have to continually search for for the same value node between root and subroot while initiating the subroot scan
        // because we can find the subroot further down. need a helper function

        const subRootCheck = (node, subNode) => {
            // base case is if at the end both are null = true. if only one is null return false
            if (!node && !subNode) return true;
            if (!node || !subNode || node.val !== subNode.val) return false;

            return subRootCheck(node.left, subNode.left) && subRootCheck(node.right, subNode.right);
        }

        // dfs is only responsible for finding the same val in root and subroot to begin subRootCheck
        const dfs = (node) => {
            // base case is if at the end of both descendants is null return true
            if (!node) return false;

            // if the node vals = subroot val... hmmm when to use subroot vs new search?
            if (node.val === subRoot.val) {
                if (subRootCheck(node, subRoot)) return true;
            }
            return dfs(node.left) || dfs(node.right);

        }
        return dfs(root);
    }
}
