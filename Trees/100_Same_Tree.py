# https://leetcode.com/problems/same-tree/

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        # base case 1 - if both don't exist, match!
        if not p and not q:
            return True

        # base case 2 - if one don't exist, not match!
        if not p or not q:
            return False

        # baes case 3 - if they are not equal, not match!
        if p.val != q.val:
            return False
        
        # return answer (both need to be true!)
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)