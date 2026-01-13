// https://leetcode.com/problems/subtree-of-another-tree
// TIME COMPLEXITY: O(m * n) where m is number of nodes in root, n is number of nodes in subroot
// SPACE COMPLEXITY: O(hm + hn) where hm is the height of the tree and hn is the height of the subroot tree

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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    if (!root || !subRoot) return false;
    // question asks provided two roots of binary trees, return true if one root is the subtree of the other 
    // some edge cases/questions i have is can one or either of the roots be null?
    // can the subtree exist in the middle of the tree or just at the edge/bottom? (how to word this?)
    // my plan is to scan through the root using BFS or DFS until we find a value equal to that of the subroot
    // then have a helper function to check for equality. how does that sound?
    
    // helper function to check if root == subroot
    const checkSubRoot = (currentRoot) => {
        // implement two stacks here one for currentRoot, and one for subRoot
        const rootStack = [currentRoot];
        const subRootStack = [subRoot];
        // pop from both stacks, check value, then push left + right from subroot and root if exists
        while (subRootStack.length) {
            // in this loop, we want to check for three conditions, if the values are equal, and if left and right exist & are equal
            const rootNode = rootStack.pop();
            const subRootNode = subRootStack.pop();

            // can write cleaner logic by checking if we should push them?
            if (rootNode.val !== subRootNode.val) return false;
            if (!!rootNode.left !== !!subRootNode.right) return false;

            if (rootNode.left) {
                rootStack.push(rootNode.left);
                subRootNode.push(subRootNode.left);
            }

            if (rootNode.right) {
                rootStack.push(rootNode.right);
                subRootStack.push(subRootNode.right);
            }


            // if (rootNode.val == subRootNode.val) {
            //     if (rootNode.left && subRootNode.left) {
            //         rootStack.push(rootNode.left);
            //         subRootStack.push(subRootNode.left);
            //     } else if ((!rootNode.left && subRootNode.left) || (rootNode.left && !subRootNode.left)) {
            //         return false;
            //     }
            //     if (rootNode.right && subRootNode.right) {
            //         rootStack.push(rootNode.right);
            //         subRootStack.push(subRootNode.right);
            //     } else if ((!rootNode.right && subRootNode.right) || (rootNode.right && !subRootNode.right)) {
            //         return false;
            //     }
            // } else {
            //     return false;
            // }
        }
        return true;
    }

    // iterate over stack
    const stack = [root];
    while (stack.length) {
        const node = stack.pop();
        // runSubroot on each node and push node.left and node.right into stack if exists 
        if (checkSubRoot(node)) return true;
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    return false;
};