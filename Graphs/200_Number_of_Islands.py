# https://leetcode.com/problems/number-of-islands

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # strategy - loop through every element in the grid. when you find an island, "sink" it by turning it all into water
        # by sinking the island, we can keep track of which island we've already visited.
        if not grid: return 0

        row = len(grid)
        col = len(grid[0])
        count = 0

        for r in range(row):
            for c in range(col):
                # check if 1
                if grid[r][c] == "1":
                    count += 1
                    self.sinkIsland(grid, r, c)
        
        return count

    def sinkIslandBFS(self, grid, r, c):
        # i don't understand why r,c needs to be in parenthesis
        q = deque([(r, c)])
        grid[r][c] = '0'

        directions = ([0, 1], [0, -1], [1, 0], [-1, 0])

        while q:
            # BFS is FIFO but doesn't really matter here
            row, col = q.popleft()
            # loop through directions
            for dr, dc in directions:
                nr, nc = row + dr, col + dc
            
            if (0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == "1"):
                grid[nr][nc] = "0"
                q.append((nr, nc))

    def sinkIsland(self, grid, r, c):
        # check up, down, left, right of r, c and turn to 0
        if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]) or grid[r][c] == "0":
            return
        
        grid[r][c] = "0"
        self.sinkIsland(grid, r + 1, c)
        self.sinkIsland(grid, r - 1, c)
        self.sinkIsland(grid, r , c + 1)
        self.sinkIsland(grid, r, c - 1)