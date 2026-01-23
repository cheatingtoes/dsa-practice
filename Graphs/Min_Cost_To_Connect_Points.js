// http://neetcode.io/problems/min-cost-to-connect-points/question
// TIME COMPLEXITY: O(n^2) where n is the number of points
// SPACE COMPLEXITY: O(n) for the minDist and visited arrays

class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    minCostConnectPoints(points) {
        // Prim's algorithm - greedy algorithm used in graph theory to find the Minimum Spanning Tree of a weighted, undirected, and connected graph

        let n = points.length;
    
        // 1. Initialization
        // Track the minimum distance to reach each point from the spanning tree
        // Start with 0 for the first point which acts as a root, and the manhattan distance from the first point for all other points

        const minDist = Array.from({ length: n }, (el, i) => {
            const [startX, startY] = points[0];
            const [currX, currY] = points[i];
            return Math.abs(startY - currY) + Math.abs(startX - currX);
        });

        // Track which points are already in our MST (Minimum Spanning Tree) to avoid cycles.
        const visited = new Array(n).fill(false);
        
        // set these to zero because initial node is zero. should edgesUsed be set to 1? doesn't matter i suppose.
        let totalCost = 0;
        let edgesUsed = 0;

        // 2. Main Loop 
        // We need to connect n points, so we loop until all are connected.
        while (edgesUsed < n) {
            // STEP A: Pick the next node
            // Iterate through minDist to find the node that is:
            // 1. Not yet visited
            // 2. Has the smallest value in minDist
            let currNode = -1;
            let minVal = Infinity;
            // can we use a minheap here instead?? can we start i at 1? is that good practice?
            for (let i = 0; i < n; i++) {
                const currVal = minDist[i];
                if (currVal < minVal && !visited[i]) {
                    currNode = i;
                    minVal = currVal;
                }
            }

            // defensive programming ftw!
            if (currNode === -1) break;

            // STEP B: Mark and Add
            // Mark currNode as visited
            // Add its cost (minVal) to totalCost
            visited[currNode] = true;
            totalCost += minVal;
            edgesUsed++;

            const [currX, currY] = points[currNode];

            // STEP C: Update Neighbors
            // Look at all other points. If the distance from currNode to 
            // a neighbor is shorter than what's currently in minDist, update it.
            for (let nextNode = 0; nextNode < n; nextNode++) {
                // [Logic to calculate Manhattan distance and update minDist]
                if (!visited[nextNode]) {
                    const [x, y] = points[nextNode];
                    const distance = Math.abs(currX - x) + Math.abs(currY - y);
                    minDist[nextNode] = Math.min(minDist[nextNode], distance);
                }
            }
        }

        return totalCost;
    }
}