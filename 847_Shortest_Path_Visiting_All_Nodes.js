// https://leetcode.com/problems/shortest-path-visiting-all-nodes/description/
// TIME COMPLEXITY: O(n * 2^n) where n is the number of nodes in the graph. This is because in the worst case, we may need to explore all possible combinations of visited nodes (which can be represented as a bitmask of size 2^n) for each node in the graph.
// SPACE COMPLEXITY: O(n * 2^n) for the queue and memoization array, which can store up to n*2^n elements in the worst case.

/**
 * @param {number[][]} graph
 * @return {number}
 */
var shortestPathLength = function(graph) {
    // clkarifying questions - do we know that all nodes are reachable?
    // graph is the adj list undirectional
    // shortest path = BFS where 
    if (graph.length === 1) return 0;

    const n = graph.length;
    const allBitmask = (1 << n) - 1;

    // memo will store the bitmask to prevent dupe work
    const memo = Array.from({ length: n }, () => new Set())
    let queue = [];

    for (let i = 0; i < n; i++) {
        const bitMask = 1 << i
        queue.push([i, bitMask, 0]);              // [node, bitmask, steps]
        memo[i].add(bitMask);
    }

    while (queue.length) {
        const newQueue = [];

        for (const [node, bitmask, steps] of queue) {
            // we want to do all the work before adding to the queue - filter, check win, ?? nothing else
            for (const neighbor of graph[node]) {
                // steps 1. update bitmask 2. check if all visited 3. check if in memo to skip 4. push to newQueue

                // so now we're at neighbor... and we're pushing neighbor to the bit mask
                const nextBitmask = bitmask | (1 << neighbor);
                if (nextBitmask === allBitmask) return steps + 1;
                if (memo[neighbor].has(nextBitmask)) continue;
                newQueue.push([neighbor, nextBitmask, steps + 1]);
                memo[neighbor].add(nextBitmask);
            }
        }
        queue = newQueue;
    }
};