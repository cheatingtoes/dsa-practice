// https://leetcode.com/problems/clone-graph

/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    if (!node) return node;
    const nodeHash = new Map();
    // create initial clone node??

    const dfs = (n) => {
        // base case - if node exists return clone
        if (nodeHash.has(n)) {
            return nodeHash.get(n);
        }
        const copy = new Node(n.val);
        // set the node itself as the key, and the copy as the value to return at the end.
        nodeHash.set(n, copy);
        // loop through node neighbors, create clone of both neigbors
        for (const neighbor of n.neighbors) {
            copy.neighbors.push(dfs(neighbor))
        }
        return copy;
    }

    return dfs(node)
};