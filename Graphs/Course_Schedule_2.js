// https://neetcode.io/problems/course-schedule-ii/question
// TIME COMPLEXITY: O(V + E) where V is the number of courses and E is the number of prerequisites
// SPACE COMPLEXITY: O(V + E) for the adjacency list and recursion stack

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    // given an array of prerequisites return the ordering of courses you should take to finish all courses

    // create premap with all courses
    const preMap = new Map();
    for (let i = 0; i < numCourses; i++) {
        preMap.set(i, []);
    }

    for (const [course, pre] of prerequisites) {
        const prereq = preMap.get(course);
        prereq.push(pre);
        preMap.set(course, prereq);
    }

    const result = new Set();
    const visitSet = new Set();

    const dfs = (course) => {
        if (visitSet.has(course)) return false;
        if (!preMap.has(course) || preMap.get(course).length === 0) {
            // push to result?
            result.add(course);
            return true;
        }
        visitSet.add(course);
        for (const pre of preMap.get(course)) {
            if (!dfs(pre)) return false;
        }
        visitSet.delete(course);
        preMap.set(course, []);
        result.add(course);
        return true;
    }

    for (const [course] of preMap) {
        if (!dfs(course)) return [];
    }
    return [...result];
};