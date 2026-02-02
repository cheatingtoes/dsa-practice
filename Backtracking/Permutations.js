// https://neetcode.io/problems/permutations/question
// TIME COMPLEXITY: O(n * n!) where n is the number of elements in the input array
// SPACE COMPLEXITY: O(n) for the recursion stack

class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        // return all pumutations of an array of unique numbers

        // permuatations means we need to start with all values
        // what kind of loop?

        const result = [];
        // keep track of used numbers
        const numsSet = new Set();

        const backtrack = (currPermutation) => {
            if (currPermutation.length === nums.length) {
                result.push([...currPermutation]);
                return;
            }


            // loop through nums to pick the starting number?
            for (let i = 0; i < nums.length; i++) {
                // we run backtrack on each iteration to pick a new start
                // do we have a base case in here?
                
                // we loop through all numbers everytime and filter for numbers not in numsset......
                // instead of logic figuring out which to pick, we go through all and filter instead!
                const num = nums[i];
                if (numsSet.has(num)) continue;
                numsSet.add(num);
                currPermutation.push(num);
                backtrack(currPermutation);

                numsSet.delete(num);
                currPermutation.pop();
            }

        }
        backtrack([]);
        return result;
    }
}
