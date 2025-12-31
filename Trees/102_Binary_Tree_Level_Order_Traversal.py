# https://leetcode.com/problems/binary-tree-level-order-traversal/

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # BFS problem how to solve?? -> use a FIFO -> 
        if not root: return []

        result = []
        # initialze a queue with root
        q = deque([root])

        # push pairs into result, then add left/right values back into the queue
        while q:
            level_results = []
            # process nodes in current level. push all children of nodes in current level into queue
            for i in range(len(q)):
                node = q.popleft()
                level_results.append(node.val)

                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            
            result.append(level_results)

        return result