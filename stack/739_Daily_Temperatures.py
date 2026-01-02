# https://leetcode.com/problems/daily-temperatures/

class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        # use monotonic decreasing stack for temperatures. use monotonic for finding the next or previous element that is greater/smaller
        res = [0] * len(temperatures)
        stack = []
        
        # strategy: loop through temperatures,
        for i, t in enumerate(temperatures):
            # check if current temperature is greater than the top of stack, if so set value in res (difference in index)           
            while len(stack) and t > temperatures[stack[len(stack) - 1]]:
                # pop the last temp, get the index and set res
                index = stack.pop()
                res[index] = i - index

            stack.append(i)
        return res