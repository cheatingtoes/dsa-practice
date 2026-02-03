// https://leetcode.com/problems/find-eventual-safe-states/description/
// TIME COMPLEXITY: O(V + E) where V is the number of vertices and E is the number of edges
// SPACE COMPLEXITY: O(V) for the recursion stack and result array

/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {
    // given a dag of n nodes from 0 to n - 1 represented by a 2d int array where graph[i] is an int array of nodes adjacent to node i
    // a node is a terminal node if there are no outgoing edges and a safe one if every possible path starting from that node
    // leads to a terminal node
    // return an array of all safe nodes sorted in ascending order

    // strategy - basically a topological sort where we don't want cycles

    const result = [];

    const visiting = new Set();
    // since graph is basically an adjacency list for the given node at i, we can use that to
    // check for safe nodes
    
    const dfs = (node) => {
        if (visiting.has(node)) return false;
        // how do we add to result in ascending order?
        if (graph[node].length === 0) return true;
        visiting.add(node);
        
        for (const pre of graph[node]) {
            if (!dfs(pre)) return false;
        }
        visiting.delete(node);
        graph[node] = [];

        return true;
    }
    for (let i = 0; i < graph.length; i++) {
        if (dfs(i)) result.push(i);
    }

    return result;

};