// https://neetcode.io/problems/parallel-courses/question
// TIME COMPLEXITY: O(V + E) where V is the number of courses and E is the number of relations
// SPACE COMPLEXITY: O(V + E) for the adjacency list and recursion stack

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} relations
     * @return {number}
     */
    minimumSemesters(n, relations) {
        // we need a list of leaf nodes and a dependency list

        // adj list is a pre:course list where taking this "unlocks" the list. opposite of a premap or reverse adj list
        // in degree is what premap count is 
        const adj = new Array(n + 1).fill().map(() => []);
        const inDegree = new Array(n + 1).fill(0);

        for (const [prev, course] of relations) {
            adj[prev].push(course);
            inDegree[course]++;
        }

        const queue = [];
        for (let i = 1; i <= n; i++) {
            // so if this is a leaf node aka this course has no prereqs then i can take this course this semester
            if (inDegree[i] === 0) queue.push(i)
        }
        let semesterCount = 0;
        let coursesTaken = 0;

        while (queue.length > 0) {
            semesterCount++;
            // we want to iterate over every leaf node to unlock the next set of leaf nodes
            const len = queue.length;
            for (let i = 0; i < len; i++) {
                coursesTaken++;
                // courses at the leaf node
                const current = queue.pop();

                for (const dependent of adj[current]) {
                    // we decrement the count here because the prereq has been taken
                    inDegree[dependent]--;
                    // if count is at zero, this is not a leaf node
                    if (inDegree[dependent] === 0) {
                        // doesn't matter if we push/shift here bc ordering doesn't matter
                        // WRONG it does matter!! if we push, we will pop it in the next iteration for the for loop, not the while loop!
                        // queue.push(dependent);
                        queue.unshift(dependent)
                    }
                }
                // with this, we want to... check adj list of the leaf course and...
            }
        }
        // how to detect a cycle? by checking if we took all courses. a course is taken if it has no dependencies
        if (coursesTaken === n) return semesterCount;
        return -1;
    }




    minimumSemestersDFS(n, relations) {
        // given an integer n indicating there are n course starting from 1 indexed, and an array relations where for [a, b]
        // you must take class a before class b. given you can take any number of courses in a given semester, given you have
        // already taken all the prereqs in the semester before, return how many semetesters it takes to take all courses or -1
        // if you cannot

        // strategy - topological sort with the twist of counting semesters
        // we only need to return the max semester count which is the class with the largest number of prereqs

        // here we want to create an adjacency list from the relations array where for each course, we list all direct prerequisites

        // [[1, 3], [2,3]]
        const preMap = new Map(); // { 3: [1, 2] }

        for (const [pre, course] of relations) {
            const prearray = preMap.get(course) || [];
            prearray.push(pre);
            preMap.set(course, prearray);
        }

        // create a set to track courses we have iterated over. if we see the same course twice in a recursion call, a cycle is detected
        const visitSet = new Set();
        const memo = new Map();
        // here we create a dfs function that will iterate over preMap and check if a given course can be taken given their prereqs
        // we will return 
        const dfs = (course) => {
            // base cases will be if visited and if in memo
            if (memo.has(course)) return memo.get(course);
            if (visitSet.has(course)) return -1;

            visitSet.add(course);

            const prereqs = preMap.get(course) || [];
            // course can have more than one path to do it. get the max depth of all prereqs
            let prereqDepth = 0;
            for (const prereq of prereqs) {
                const depth = dfs(prereq);
                if (depth === -1) return -1;
                prereqDepth = Math.max(prereqDepth, depth);
            }

            const totalDepth = prereqDepth + 1;
            memo.set(course, totalDepth);
            visitSet.delete(course);
            return totalDepth;
        }
        let max = 0;
        // run dfs on all keys in premap
        for (const [course] of preMap) { // { 3: [1, 2] }
            const semesterCount = dfs(course);
            if (semesterCount === -1) return -1;
            max = Math.max(semesterCount, max);
        }

        return max;
    }
}
