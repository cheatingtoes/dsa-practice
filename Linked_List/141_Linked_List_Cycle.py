# PROBLEM: LeetCode 141 - LInked List Cycle
# PATTERN: Linked List
# TIME COMPLEXITY: O(N)
# SPACE COMPLEXITY: O(1)

# STRATEGY:
# 1. Tortoise and the hare solution, create two linked lists iterate by one and two
# 2. if they eventually meet, there is a loop

# https://leetcode.com/problems/linked-list-cycle

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head:
            return False
        
        slow = head
        fast = head

        # check fast.next because we move fast 2 steps
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            
            if slow is fast:
                return True

        return False