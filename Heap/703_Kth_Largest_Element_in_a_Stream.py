class KthLargest:

    def __init__(self, k: int, nums: List[int]):
        # init a min heap here with length of k. we use min heap because in a min heap, the lowest number has highest priority (the one that gets popped!)
        self.k = k
        self.min_heap = nums
        heapq.heapify(self.min_heap)

        while len(self.min_heap) > k:
            heapq.heappop(self.min_heap)

    def add(self, val: int) -> int:
        # push into heap and check if we need to remove lowest 
        heapq.heappush(self.min_heap, val)
        while len(self.min_heap) > self.k:
            heapq.heappop(self.min_heap)
        return self.min_heap[0]