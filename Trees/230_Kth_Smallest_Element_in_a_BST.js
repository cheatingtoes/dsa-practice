// https://leetcode.com/problems/kth-smallest-element-in-a-bst/
// TIME COMPLEXITY: O(h + k) where h is the height of the tree
// SPACE COMPLEXITY: O(h) for the recursion stack

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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    // to find the kth smallest, we have to do a DFS to get to the lowest point in the binary search tree and count our way up
    // any optimizations? i don't think so we'd have to search every node from the lowest up so all the way left then backtrack
    
    // index = 1 beecause k is 1 indexed;
    let count = 0;
    let result;

    // what do we need to keep track of here?
    const dfs = (node) => {
        if (!node || result) return;
        // we increment count when we backtrack??
        // go all the way left then right? but how do we return? set variable outside of recursion!
        // when do we increment count??

        // so we always want to go all the way left until we can't for every node...
        dfs(node.left);

        // this is when we increment count, when we backtrack to go right
        count++;
        if (count == k) {
            result = node.val;
            return;
        }

        // then go right
        dfs(node.right);
    };

    dfs(root)
    return result
};