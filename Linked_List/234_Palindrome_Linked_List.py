# https://leetcode.com/problems/palindrome-linked-list/

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        # STEP 1: find midway point of palindrome
        # STEP 2: Reverse the second half! so if second half is longer, fails sooner
        # STEP 2: iterate over the midway + start to compare values

        if not head:
            return True

        # STEP 1: find midway
        slow, fast = head, head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next

        # STEP 2: Reverse second half is better? yes bc second half will always be >=. if greater, last value is the middle which makes it a palindrome regardless
        curr = slow.next
        slow.next = None
        prev = None

        while curr:
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp

        left = head
        right = prev

        # STEP 3: loop through first and second halfs to compare
        while right:
            if left.val != right.val:
                return False
            left = left.next
            right = right.next
        
        return True