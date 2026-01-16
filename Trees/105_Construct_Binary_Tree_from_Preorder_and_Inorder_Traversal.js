// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
// TIME COMPLEXITY: O(n) where n is the number of nodes in the tree BUT O(n^2) due to indexOf and slice in each recursion
// SPACE COMPLEXITY: O(n) for the recursion stack and slices BUT O(n^2) due to slices in each recursion

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    // steps - 1. first node in preorder is the root. find that value in inorder to find the split for left + right nodes
    // 2. using the inorder split, we build the tree on the left side of the root. if left side exist, the next value in preorder is the left child.
    // 2a. find that value in inorder...etc recurse
    // 3. using the initial inorder split, we can build the tree on the right side with values to the right of the first root node split
    // 4. repeat from step 2 for he right side?

    // so preorder tells us what the root/parent is and inorder tell us the left/right side!

    if (!preorder.length || !inorder.length) return null
    const rootVal = preorder[0]
    const root = new TreeNode(rootVal)

    const indexOfRoot = inorder.indexOf(rootVal);
    // everything to the right of this index is to hte right side of both pre and inorder
    // everything to the left of this is to the left of the index;

    root.left = buildTree(
        preorder.slice(1, indexOfRoot + 1),
        inorder.slice(0, indexOfRoot),
    );

    root.right = buildTree(
        preorder.slice(indexOfRoot + 1),
        inorder.slice(indexOfRoot + 1),
    )


    return root;
};