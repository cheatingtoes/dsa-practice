// https://leetcode.com/problems/remove-nth-node-from-end-of-list/?envType=problem-list-v2&envId=oizxjoit
// O(N) time
// O(1) space

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // create dummy head in case node we need to delete is head
    const dummy = new ListNode(0);
    dummy.next = head;

    slow = dummy;
    fast = dummy;
    // n + 1 because we need the node before deletion
    for (let i = 0; i < n + 1; i++) {
        fast = fast.next;
    }

    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return dummy.next

    // iterate over the list to get the length count
    // iterate over the list to find length - n and and cut out n
};