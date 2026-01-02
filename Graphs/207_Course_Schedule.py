# https://leetcode.com/problems/course-schedule

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # 1. Build the Graph
        graph = { i: [] for i in range(numCourses)}
        for course, pre in prerequisites:
            graph[course].append(pre)
            
        visited = set()  # Safe courses (Green)
        visiting = set() # Courses in current path (Yellow)

        def dfs(course):
            # 1. CYCLE DETECTED: We found a node currently in our path!
            if course in visiting:
                return False
            
            # 2. ALREADY CHECKED: We know this node is safe from a previous run.
            if course in visited:
                return True
            
            # 3. MARK VISITING (Drop Breadcrumb)
            visiting.add(course)
            
            # 4. VISIT NEIGHBORS (Follow the path)
            for pre in graph[course]:
                if not dfs(pre): # If any neighbor detects a cycle...
                    return False # ...we are all doomed.
            
            # 5. BACKTRACK (Pick up Breadcrumb)
            visiting.remove(course)
            
            # 6. MARK SAFE (Green)
            visited.add(course)
            
            return True

        # Check every single course (in case of disconnected islands)
        for i in range(numCourses):
            if not dfs(i):
                return False
        
        return True