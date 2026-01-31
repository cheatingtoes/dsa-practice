// https://neetcode.io/problems/remove-nth-node-from-end-of-list/question
// TIME COMPLEXITY: O(n) where n is the number of nodes in the linked list
// SPACE COMPLEXITY: O(1) since we are modifying the list in place

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {ListNode} head
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        // given the head of a linked list, return the nth node from the end of the list
        // how to find the nth node from the end?

        // [1,2,3,4] n = 2 -> delete 3
        let rabbit = head;
        let turtle = head;
        for (let i = 0; i < n; i++) {
            rabbit = rabbit.next;
        }

        // think of edge cases!!!
        if (!rabbit) return head.next;

        // rabbit is now at 3

        // we need to get to the node before the one we need to delete!
        while (rabbit && rabbit.next) {
            rabbit = rabbit.next;
            turtle = turtle.next;
        }

        // rabbit is now at 4, turtle is at 2, just what we want!
        turtle.next = turtle.next.next;

        return head;
    }
}
