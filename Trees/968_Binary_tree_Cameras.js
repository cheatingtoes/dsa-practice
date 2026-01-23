// https://leetcode.com/problems/binary-tree-cameras/
// TIME COMPLEXITY: O(n) where n is the number of nodes in the tree
// SPACE COMPLEXITY: O(h) where h is the height of the tree for the recursion stack

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
var minCameraCover = function(root) {
    // question is asking given a binary tree, what is the minimum amount of cameras needed to ensure all nodes are monitored?
    // a node is monitored if a camera is placed on it or on a neighboring/adjacent node.
    // plan is to start from the bottom up - post order traversal. for every node that needs to be monitored, we place a camera on it's parent
    // how to keep track if a node needs to be illuminated? return some value perhaps? but we should be returning count of cameras.
    // how can we return the status of the node as well??

    if (!root) return 0;

    const dfs = (node) => {
        // can return numbers 1 -> camera placed, 0 -> monitored, -1 -> needs monitoring
        if (!node) return [0, 0];

        const left = dfs(node.left);
        const right = dfs(node.right);
        const cameraCount = left[1] + right[1];
        // cases if child needs monitoring place camera - return 1
        // if children has camera we're being monitored - return 0
        // if children are being monitored but no camera we need monitoring - return -1

        // this node needs a camera if any of it's children needs monitoring
        if (left[0] == -1 || right[0] === -1) {
            return [1, cameraCount + 1];
        } else if (left[0] === 1 || right[0] === 1) {
            // this node is being monitored if any of it's children have a camera
            return [0, cameraCount];
        } else {
            // else this node requires monitoring
            return [-1, cameraCount];
        }
    }
    const [status, cameraCount] = dfs(root);
    return status === -1 ? cameraCount + 1 : cameraCount;
}