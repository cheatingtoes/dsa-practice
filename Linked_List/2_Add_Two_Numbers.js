// https://leetcode.com/problems/add-two-numbers/
// TIME COMPLEXITY: O(max(m, n)) where m and n are the lengths of the two linked lists
// SPACE COMPLEXITY: O(max(m, n)) for the new linked list that is created to store the sum of the two numbers

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // given a linked list in reverse order, return the sum of the two numbers also reversed
    // since the list is reversed order we can carry the one's place over without going in reverse
    // since we start at the ones place we don't have to care about the places

    const dummy = new ListNode(null);
    let carry = 0;
    let current = dummy;

    // loop through both elements
    while (l1 || l2 || carry) {

        const l1Val = l1 ? l1.val : 0;
        const l2Val = l2 ? l2.val : 0;
        const sum = l1Val + l2Val + carry;
        let nodeVal = sum % 10;
        if (sum >= 10) carry = 1
        else carry = 0;

        const newNode = new ListNode(nodeVal);
        current.next = newNode;
        current = newNode;
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }
    return dummy.next;
};