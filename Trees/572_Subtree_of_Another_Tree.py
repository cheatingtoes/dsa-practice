# https://leetcode.com/problems/subtree-of-another-tree/

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        # Two questions in one!!
        # 1. find root of subtree root in root
        # 2. traverse through that point to see if it is a match

        # if we reach end of root and there is no match, return false
        if not root:
            return False
        
        # check if val is same can be simplified by calling if self.isSameTree(root subRoot): return True
        if root.val == subRoot.val:
            is_same = self.isSameTree(root, subRoot)
            if is_same:
                return True

        # check both sides again
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)

    def isSameTree(self, p, q):
        if not p and not q:
            return True
        elif not p or not q:
            return False
        elif p.val != q.val:
            return False
        
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
        # # base case 1 if values are same
        # if root.val != subRoot.val:
        #     return False

        # # base case 2
        # if not root and not subRoot:
        #     return True

        # # need to traverse down the tree
        # if root.val == subRoot.val:
        #     return self.isSubTree(root.left, subRoot.left) or self.isSubTree(root.right, subRoot.right)

        # return self.isSubTree(root.left, subRoot.left) or self.isSubTree(root.right, subRoot.right)