# https://leetcode.com/problems/maximum-depth-of-binary-tree/

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # base case
        if not root:
            return 0
        # call function again incrementing by 1
        left = self.maxDepth(root.left) + 1
        right = self.maxDepth(root.right) + 1
        # return the max of the values
        return max(left, right)