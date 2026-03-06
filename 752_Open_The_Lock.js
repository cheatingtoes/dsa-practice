// https://leetcode.com/problems/open-the-lock/description/
// TIME COMPLEXITY: O(B^D * D) where B is the number of combinations, and D is the length of the sequence (4 for a 4-digit lock). This is because in the worst case, we may need to explore all possible combinations (B) for each digit in the sequence (D), and for each combination, we perform O(2D) work, (including the substring!) to generate the next combinations.
// SPACE COMPLEXITY: O(B^D) for the queue and visited set, which can store up to B^D elements in the worst case, where B is the number of combinations (10^4 for a 4-digit lock) and D is the length of the sequence (4 for a 4-digit lock).

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
    // minimum number tells me to use a BFS
    // state is the current combination each step has 8 possiblities 
    // we have store all combinations that are visited to prevent dupes -> add deadends to this 

    const visited = new Set(deadends);
    if (visited.has('0000') || !target) return -1;
    if (target === '0000') return 0;

    let queue = [['0000', 0]];
    visited.add('0000');

    // what's the best way to iterate over the sequence?
    while (queue.length > 0) {
        const newQueue = [];
        for (const [sequence, steps] of queue) {
            for (let i = 0; i < 4; i++) {
                for (const turn of [-1, 1]) {
                    const digit = parseInt(sequence[i]);
                    const newDigit = (digit + turn + 10) % 10;
                    const newSequence = sequence.substring(0, i) + newDigit + sequence.substring(i + 1);
                    if (visited.has(newSequence)) continue;
                    if (newSequence === target) return steps + 1;
                    newQueue.push([newSequence, steps + 1]) ;
                    visited.add(newSequence);
                }
            }
        }
        queue = newQueue;
    }
    return -1;
};