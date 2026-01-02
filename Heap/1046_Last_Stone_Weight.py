# https://leetcode.com/problems/last-stone-weight/

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        def negative(num):
            return num * -1

        neg_stones = [-s for s in stones]
        heapq.heapify(neg_stones)
        while (len(neg_stones) > 1):
            # smashed = heapq.heappop(neg_stones) - heapq.heappop(neg_stones)
            stone_1 = heapq.heappop(neg_stones)
            stone_2 = heapq.heappop(neg_stones)
            if stone_1 != stone_2:
                heapq.heappush(neg_stones, stone_1 - stone_2)

        return -neg_stones[0] if neg_stones else 0

