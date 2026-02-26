// https://leetcode.com/problems/fruit-into-baskets/description/
// TIME COMPLEXITY: O(n)
// SPACE COMPLEXITY: O(n)

/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
    // we need to keep track of the numbers in the window and it's count
    // when we hit a third number we need to shrink

    const fruitMap = new Map();
    let left = 0;
    let fruitsCount = 0;
    let maxFruits = 0;
    for (let right = 0; right < fruits.length; right++) {
        // steps - increment fruitmap and check if fruit breaks 2 unique fruits condition
        // if so we shrink window
        // check if current window is max

        const f = fruits[right];
        const count = fruitMap.has(f) ? fruitMap.get(f) : 0;
        if (count === 0) fruitsCount++;
        fruitMap.set(f, count + 1);
        // we don't actually ahve to shrink the window here bc.. we're looking for the max window shrinking does nothing BUT we still have to increment left and handle the delete if fruitcount > 2
        while (fruitsCount > 2) {
            // shrink window
            const leftFruit = fruits[left];
            const newCount = fruitMap.get(leftFruit) - 1;
            fruitMap.set(leftFruit, newCount)
            if (newCount === 0) fruitsCount--;
            left++;
        }
        maxFruits = Math.max(maxFruits, right - left + 1);
    }
    return maxFruits;
};