// https://leetcode.com/problems/same-tree
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    const dfs = (one, two) => {
        // base cases: if end of branch and if not equal
        if (!one && !two) return true;
        if (!one || !two || one.val !== two.val) return false;
        return (dfs(one.left, two.left) && dfs(one.right, two.right))
        
        // previous logic - bad because trying to check children! instead trust base case and pass children to the next recurse
        // if (one.val !== two.val) return false;
        // if (one.left && !two.left) return false;
        // ...
    }
    return dfs (p, q);
};