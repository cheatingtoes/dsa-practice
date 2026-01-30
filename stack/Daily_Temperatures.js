// https://neetcode.io/problems/daily-temperatures/question
// TIME COMPLEXITY: O(n) where n is the number of temperatures
// SPACE COMPLEXITY: O(n) for the result array and the stack in worst case

class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        // the question asks given an array of numbers (or temperatures), map the number of indices until the number goes up, or 0 if it never does.

        // sub problem - need to store the numbers we have iterated over and sort by lowest number and store it's index.

        // store [value, index]
        const minHeap = [[temperatures[0], 0]];
        const result = new Array(temperatures.length).fill(0);

        for (let i = 1; i < temperatures.length; i++) {
            // ACTUALLY don't even need to sort or use a min stack bc this is a MONOTONIC DEQUE 
            // sort heap here but if we implemented a min heap then we don't have to!
            // minHeap.sort((a, b) => b[0] - a[0]);
            const curr = temperatures[i];
            // check if current temperature is > minHeap. if so we can pop it and add to results
            while (minHeap.length > 0 && curr > minHeap[minHeap.length - 1][0]) {
                const [temp, index] = minHeap.pop();
                result[index] = i - index;
            }
            // push value into minHeap
            minHeap.push([curr, i]);
        }
        return result;
    }
}
