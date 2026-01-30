// https://neetcode.io/problems/car-fleet/question
// TIME COMPLEXITY: O(n log n) where n is the number of cars due to sorting
// SPACE COMPLEXITY: O(n) for the position and speed array

class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        // given a target for all cars, and and two arrays representing the position the car is in and the speed it's going.
        // calculate how many fleets it takes for the cars to reach the destination.  cars cannot pass each other and instead
        // merge into a fleet

        // questions!! - are positions ordered?? can all cars reach the target?? can we expect valid target, position and speed values?

        // brute force - merge position and speed into a tuple array, sort by position then iterate and merge by time.

        // sub problems - iterate over the list. and calculate the time needed to reach the target
        // if the next iteration is faster or equal, merge to one ahead of it

        // result stores the time.

        const posAndSpeed = position.map((el, i) => [el, speed[i]]);

        posAndSpeed.sort((a, b) => b[0] - a[0]);

        const result = [(target - posAndSpeed[0][0]) / posAndSpeed[0][1]];

        for (let i = 1; i < position.length; i++) {
            const [ pos, spe] = posAndSpeed[i]
            const time = (target - pos) / spe;
            // check if we need to merge or not this can only go as fast as the latest so if merge, do nothing
            if (time > result[result.length - 1]) result.push(time);
        }
        return result.length;
    }
}
