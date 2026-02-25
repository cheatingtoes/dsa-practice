// https://leetcode.com/problems/maximize-distance-to-closest-person/description/
// TIME COMPLEXITY: O(n) where n is the length of the input array
// SPACE COMPLEXITY: O(1)

/**
 * @param {number[]} seats
 * @return {number}
 */
var maxDistToClosest = function(seats) {
    const n = seats.length
    let lastPerson = -1;
    let output = 0;
    for (let i = 0; i < n; i++) {
        if (seats[i] === 1) {
            // three loops approach saves us this check on each filled seat but is less readable? more verbose for sure
            if (lastPerson === -1) {
                output = i;
            } else {
                const dist = Math.floor((i - lastPerson) / 2);
                output = Math.max(output, dist);
            }
            lastPerson = i
        }
    }
    return Math.max(output, n - 1 - lastPerson);
}

var maxDistToClosestThreeLoop = function(seats) {
    // max dist to closest - need to find the max distance at each index to the next person

    const n = seats.length;             // 7

    let right = 0;
    let output = 0;

    // first for loop to find the first person.  
    // is it easier or harder to read this way??  do we want to do the same for last person as well?
    for (right; right < n; right++) {
        if (seats[right] === 1) {
            output = right - 0;
            break;
        }
    }

    let last = n - 1;

    for (last; last >= 0; last--) {
        if (seats[last] === 1) {
            output = Math.max(output, n - last - 1);
            break;
        }
    }

    let left = right;
                                        // last = 6, right = 0, left = 0
    // last should be the last seat with a person sitting on it
    for (right + 1; right <= last; right++) {
        if (seats[right] === 1) {
            const distance = Math.floor((right - left) / 2);
            output = Math.max(output, distance);
            left = right
        }
    }

    return output;
};