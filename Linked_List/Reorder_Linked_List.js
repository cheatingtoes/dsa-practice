// https://neetcode.io/problems/reorder-list/question
// TIME COMPLEXITY: O(n) where n is the number of nodes in the linked list
// SPACE COMPLEXITY: O(1) since we are reordering in place

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
     * @return {void}
     */
    reorderList(head) {
        // given the head of a linked list, reorder the list starting from the head, tail, head + 1, tail - 1...etc in a zig zag pattern

        // sub problem how to solve in o(n)?? how do we find the tail?? hmm...

        let rabbit = head;
        let turtle = head;

        // since rabbit does a double jump, need to check current and next value
        while (rabbit && rabbit.next) {
            rabbit = rabbit.next.next;
            turtle = turtle.next;
        }

        // need to reverse the second half!! hmm how to do that?
        // 1. reverse node one at a time
        let reverse = null;
        // do we need to move turtle to the next?? is turtle in the end of the first half? or the beginning of the second half??
        let second = turtle.next;
        turtle.next = null;

        while (second) {
            // save pointer to the next node
            const temp = second.next;
            // point second.next to reverse
            second.next = reverse;
            // move reverse up to the next node - second in this case
            reverse = second;
            // move second up to the next node
            second = temp;
        }

        // zip them up!
        let firstHalf = head;
        let secondHalf = reverse;
        while (firstHalf && secondHalf) {
            // we need to point firsthalf.next to... secondhalf
            const temp1 = firstHalf.next;
            firstHalf.next = secondHalf;

            // we need to... point secondhalf.next to firsthalf.next?
            const temp2 = secondHalf.next;
            secondHalf.next = temp1;

            firstHalf = temp1;
            secondHalf = temp2;
        }
        return head;
    }
}
