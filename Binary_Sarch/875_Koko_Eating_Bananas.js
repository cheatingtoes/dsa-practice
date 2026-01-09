/*
  PROBLEM: LeetCode 875 - Koko Eating Bananas
  PATTERN: Binary Search (Modified with "Shaving")
  TIME COMPLEXITY: O(N * log(M)) n = number of piles, m = size of largest pile
  SPACE COMPLEXITY: O(1)

  STRATEGY
  1. Identify the search space. the rate must be between 1, and the largest pile size
  2. Feasibility Check with helper function
  3. Use a binary search with the search spazce range as the min-max. 

  NOTES
  - Binary search applies when the output range/search space is sorted/monotonic. The relationship
  between eating speed and hours needed is a monotonic relationship.
  - binary search can be used whenever a problem involves optimization
  relationship check (is monotonic) -> need to "guess and check" k -> brute force (try k =1, k=2...) vs optimization (binary search)
  
  https://leetcode.com/problems/koko-eating-bananas/
*/

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    // helper fn to calculate hours needed to eat all given k (rate)
    const getHoursNeeded = (rate) => {
        let totalHours = 0;
        for (const bananas of piles) {
            totalHours += Math.ceil(bananas / rate)
        }
        return totalHours;
    };

    // find largest pile in piles to calculate max time
    let largestPile = 0;
    for (const bananas of piles) {
        if (bananas > largestPile) largestPile = bananas;
    }

    let min = 1;
    let max = largestPile;
    let result = largestPile;

    while (min <= max) {
        const mid = Math.floor((max + min) / 2); // Math.floor((max - min) / 2) + min is safer!
        const hours = getHoursNeeded(mid);
        // if calculated hours is < the h, koko is eating too quickly and we need to slow rate down!
        // slower rate = less input = lower k
        if (hours <= h) {
            // we don't do an equality check like with other binary questions multiple k values can
            // satisfy the given h. but we want the lowest k.
            result = mid
            max = mid - 1;
        } else {
            min = mid + 1
        }
    }
    return result;
};