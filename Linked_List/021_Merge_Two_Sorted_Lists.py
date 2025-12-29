# PROBLEM: LeetCode 21 - Merge Two Sorted Lists
# PATTERN: Linked List
# TIME COMPLEXITY: O(N)
# SPACE COMPLEXITY: O(1)

# STRATEGY:
# 1. Create a dummy linked list, iterate over list1 and list2 comparing values
# 2. ?? win ??

# https://leetcode.com/problems/merge-two-sorted-lists

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # create new linked list to serve as anchor
        dummy = ListNode(0)
        # point current to dummy. is this a copy or by reference?
        current = dummy
        
        # while loop 
        while list1 and list2:
            # iterate over list1 and list2
            if list1.val < list2.val:
                current.next = list1
                list1 = list1.next
            else:
                current.next = list2
                list2 = list2.next

            current = current.next
        # attach the remaining list1 and list2
        # while list1:
        #     current.next = list1
        #     list1 = list1.next
        # while list2:
        #     current.next = list2
        #     list2 = list2.next

        # can just point current to the rest of the node!
        if list1:
            current.next = list1
        if list2:
            current.next = list2
        return dummy.next
