// https://leetcode.com/problems/course-schedule/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    // create graph that stores all prerequisites for a given course
    const graph = new Map();
    for (const [course, pre] of prerequisites) {
        const existingArr = graph.get(course) || [];
        graph.set(course, [...existingArr, pre]);
    }
    // visited is memo
    const visited = new Set();
    // visiting to check for loop
    const visiting = new Set();
    // next up we want to do a dfs search for each course to see if it's possible to take the class
    const dfs = (c) => {
        // define base case
        if (visited.has(c)) return true;
        if (visiting.has(c)) return false;

        // loop through the prerequisites
        visiting.add(c);
        
        // not all classes have prerequisites
        for (const pre of graph.get(c) || []) {
            // recurse through pre
            if (!dfs(pre)) return false;
        }
        // clean up/backtrack
        visiting.delete(c);
        visited.add(c);
        return true;
    }

    for (const [course] of graph) {
        if (!dfs(course)) return false;
    }
    return true
};