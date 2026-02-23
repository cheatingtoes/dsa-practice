// https://neetcode.io/problems/valid-tree/question
// TIME COMPLEXITY: O(v + e)
// SPACE COMPLEXITY: O(v + e)

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {boolean}
     */
    validTree(n, edges) {
        const adj = new Array(n).fill().map(() => []);

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const visited = new Set();
        const dfs = (node, parent) => {
            if (visited.has(node)) return false;
            visited.add(node);
            for (const neighbor of adj[node]) {
                // dfs on all neighbors
                if (neighbor == parent) continue;
                if (!dfs(neighbor, node)) return false;
            }
            return true;
        }

        return dfs(0, -1) && visited.size === n;
    }
}
