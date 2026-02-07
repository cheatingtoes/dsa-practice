// https://leetcode.com/problems/minimum-height-trees/description/
// TIME COMPLEXITY: O(n) where n is the number of nodes in the tree
// SPACE COMPLEXITY: O(n) for the adjacency list and queue

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function(n, edges) {
    // given a tree of n nodes and an array of edges, return all possible rooted trees with a minimum height.
    // looking for a topological sort with...where depending on the one you pick unlocks the most so the least number of levels -> bfs with layers
    // can do dfs with the minimum depth

    // no cycles, are edges valid? can n be zero?, can a node point to itself? 

    // undirected means they are neighbors of each other

    const adj = new Array(n).fill().map(() => new Set());

    for (const [a, b] of edges) {
        adj[a].add(b);
        adj[b].add(a);
    }
    
    // after creating the list...for the minimum height, it's the node at the very center of the tree
    // bc for a tree of maximum height h, we want the middle to get the shorter == bend it in half
    // think you fool!

    let leaves = [];
    for (let i = 0; i < n; i++) {
        if (adj[i].size === 1) leaves.push(i);
    }

    let remainingNodes = n;
    while (remainingNodes > 2) {
        // remove the leave nodes? decrement
        remainingNodes -= leaves.length;
        const nextLeaves = [];
        for (const leaf of leaves) {
            // get the only neighbor of leaf
            const neighbor = adj[leaf].values().next().value;
            adj[neighbor].delete(leaf);
            if (adj[neighbor].size === 1) nextLeaves.push(neighbor);
        }
        leaves = nextLeaves;
    }
    return leaves;
};