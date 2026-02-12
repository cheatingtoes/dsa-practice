// https://leetcode.com/problems/maximum-capacity-within-budget/
// TIME COMPLEXITY: O(n log n) due to sorting and binary search operations
// SPACE COMPLEXITY: O(n) for the items array storing cost, capacity, and prefix max capacity information

/**
 * @param {number[]} costs
 * @param {number[]} capacity
 * @param {number} budget
 * @return {number}
 */
var maxCapacity = function(costs, capacity, budget) {
    // given two integer arrays of costs and capacity, you can select at most two distinct machines
    // such that the total cost of the machins is strictly less than the budget. return the maximum achievable total capacity of the selected machines

    // any negative values in these arrays/ budget?
    // is it sorted?

    // so i'm thinking that we can sort the costs array so we can determine which two numbers to pick that is strictly less than budget
    // otherwise we would have to check every possible combination of two different costs to determine that n^2 vs n + nlogn

    if (costs.length === 0) return 0

    const items = [];
    for (let i = 0; i < costs.length; i++) {
        if (costs[i] < budget) items.push({ cost: costs[i], capacity: capacity[i] });
    }

    items.sort((a, b) => a.cost - b.cost);

    const n = items.length;

    if (n === 0) return 0

    // now that the array is sorted [[3,2], [4,6], [5,4], [7,3]]. budget = 7
    // [[2, 4],[5, 5],[6,8]]  budget = 13
    // [ [ 1, 7 ], [ 3, 5 ], [ 7, 3 ] ]  budget = 13

    // greedy approach is not the way because the cost and capacity do not scale together.... can this be solved?
    // greedy approach works if we know what the maximum capacity is for each given cost -> prefix
    let prefixMaxCapacity = 0;
    for (let i = 0; i < n; i++) {
        prefixMaxCapacity = Math.max(items[i].capacity, prefixMaxCapacity);
        items[i].prefixMaxCapacity = prefixMaxCapacity;
    }

    let maxCapacity = items[n - 1].prefixMaxCapacity;
    for (let i = n - 1; i > 0; i--) {
        // two pointer to check for pairs!!
        if (items[i].cost + items[0].cost >= budget) continue;

        // binary search
        let left = 0;
        let right = i - 1;
        let currentMaxCapacity = 0;
        while (left <= right) {
            const mid = Math.floor((right + left) / 2);
            if (items[mid].cost + items[i].cost < budget) {
                currentMaxCapacity = items[i].capacity + items[mid].prefixMaxCapacity;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        maxCapacity = Math.max(currentMaxCapacity, maxCapacity);
    }

    return maxCapacity;
};