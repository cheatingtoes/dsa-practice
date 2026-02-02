// https://neetcode.io/problems/combination-sum-ii/question
// TIME COMPLEXITY: O(2^n) in the worst case where n is the number of candidates
// SPACE COMPLEXITY: O(n) for the recursion stack

class Solution {
    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(candidates, target) {
        // given an array of integers which contains duplicates, return a list of all unique combinations of numbers that sum to target;
        // numbers can be used at most once
        // to prevent duplicates, we must know the numbers we've gone through already
        candidates.sort((a, b) => a - b);
        const result = [];
        const backtrack = (index, subarray, sum) => {
            // base case
            // need to remember the ordering of these base cases!!!!!!!!
            if (target === sum) {
                result.push([...subarray]);
                return;
            }
            if (index >= candidates.length || sum > target) return;

            // to prevent duplicates, we want to...move the index to skip duplicate numbers
            // when do we move the index?
            const num = candidates[index];
            subarray.push(num);
            backtrack(index + 1, subarray, sum + num);

            // we want to skip here
            let dupes = 1;
            while (num === candidates[index + dupes]) {
                dupes++;
            }
            subarray.pop();
            backtrack(index + dupes, subarray, sum);
        }
        

        const backtrack2 = (index, subarray, sum) => {
            if (sum === target) {
                // this costs O(n) to spread the array!
                result.push([...subarray]);
                return;
            }

            // loop through the candidates!
            for (let i = index; i < candidates.length; i++) {
                // base case to skip dupes?
                // do we look forward or look back?
                const num = candidates[i];
                // skip if previous number is equal
                if (i > index && num === candidates[i - 1]) continue;
                // break from loop if greater than target
                if (sum + num > target) break;
                subarray.push(num);
                // this is this skip, starts a new subarray at index
                backtrack2(i + 1, subarray, sum + num);
                subarray.pop();
            }
        } 


        backtrack2(0, [], 0);
        return result;
    }

    combinationSum2First(candidates, target) {
        const results = [];
        candidates.sort((a, b) => a - b);
        // no duplicates!

        const dfs = (index, subArray, sum) => {
            if (sum === target) {
                results.push([...subArray]);
                return;
            }

            for (let i = index; i < candidates.length; i++) {
                // if not the starting index and 
                if (i > index && candidates[i] === candidates[i - 1]) continue;

                if (sum + candidates[i] > target) break;

                subArray.push(candidates[i]);
                dfs(i + 1, subArray, sum + candidates[i]);
                subArray.pop();
            }
        }



        const dfsFirst = (index, subArray, sum) => {
            if (sum === target) {
                results.push([...subArray]);
                return;
            };
            if (index >= candidates.length || sum > target) return;

            subArray.push(candidates[index])
            dfs(index + 1, subArray, sum + candidates[index]);
            // if we decide to exclude the current candidate, we can skip all duplicates here
            let dupes = 0;
            while (candidates[index + dupes + 1] === candidates[index]) {
                dupes++;
            }
            subArray.pop();
            dfs(index + 1 + dupes, subArray, sum);
        }

        dfs(0, [], 0);
        return results;
    }
}
