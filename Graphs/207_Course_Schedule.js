// https://leetcode.com/problems/course-schedule/
// TIME COMPLEXITY: O(V + E) where V is the number of courses and E is the number of prerequisites
// SPACE COMPLEXITY: O(V + E) for the adjacency list and recursion stack

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
// iterative/bfs approach 
var canFinish = function(numCourses, prerequisites) {
    const adj = new Array(numCourses).fill().map(() => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, pre] of prerequisites) {
        // adj list is solve this to unlock this list
        adj[pre].push(course);
        // indegree is a count of are blockers for course, so we iterate the count here for course
        inDegree[course]++;
    }

    // create a queue that starts with courses/nodes with no prerequisites 
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let coursesTaken = 0;

    // we are only looking to see if all classes can be taken.
    while (queue.length > 0) {
        // since current course has no prereqs, solving current unblocks adj[course]
        const current = queue.pop();
        coursesTaken++;

        // loop through all courses that current unblocks
        for (const prereq of adj[current]) {
            inDegree[prereq]--;
            // if the course that current unblocks has a in degree count of 0, that means that it is a leaf
            if (inDegree[prereq] === 0) {
                // and we can add it to the queue to process
                queue.unshift(prereq);
            }
        }
    }

    // return if we took all courses!
    return numCourses === coursesTaken;
}


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