# https://leetcode.com/problems/path-sum/

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        # use recursion because of DFS. 
        # base case
        if not root:
            return False
        # check for validity
        if not root.left and not root.right and root.val == targetSum:
            return True

        # recurse step
        new_target = targetSum - root.val

        return self.hasPathSum(root.left, new_target) or self.hasPathSum(root.right, new_target)