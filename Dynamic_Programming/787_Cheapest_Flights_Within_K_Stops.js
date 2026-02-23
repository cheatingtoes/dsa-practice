// https://leetcode.com/problems/cheapest-flights-within-k-stops/
// TIME COMPLEXITY: O(k * n) where k is the number of stops and n is the number of cities
// SPACE COMPLEXITY: O(k * n) for the dp array

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    // need to keep track of... the flight count, price, city
    
    // default to infinity for cost -> set lowest
    const dp = Array.from({ length: k + 2 }, () => new Array(n).fill(Infinity));
    dp[0][src] = 0;

    // set adj list - start iterating from src
    const adj = new Map();

    for (const [from, to, price] of flights) {
        if (!adj.has(from)) adj.set(from, []);
        const arr = adj.get(from);
        arr.push([to, price]);
    }

    // loop through k, then loop through all cities
    for (let i = 1; i <= k + 1; i++) {
        // copy over previous values
        dp[i] = [...dp[i - 1]];
        // loop through all cities
        for (let j = 0; j < n; j++) {
            // steps - check if city is reachable
            const prevPrice = dp[i - 1][j]
            if (prevPrice === Infinity) continue;
1            // loop through adj list for this city? do we want to carry over any values?
            if (!adj.has(j)) continue;
            for (const [to, price] of adj.get(j)) {
                dp[i][to] = Math.min(prevPrice + price, dp[i][to])
            }
        }
    }

    return dp[k + 1][dst] === Infinity ? -1 : dp[k + 1][dst];
};