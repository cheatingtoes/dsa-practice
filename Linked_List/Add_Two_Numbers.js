// https://neetcode.io/problems/add-two-numbers/question
// TIME COMPLEXITY: O(max(m, n)) where m and n are the lengths of the two linked lists
// SPACE COMPLEXITY: O(max(m, n)) for the new linked list created

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
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    addTwoNumbers(l1, l2) {
        // let's create a new linked list. much simplier single loop to handle both lists
        const dummy = new ListNode();
        let curr = dummy;
        let carry = 0;

        // work needs to be done if l1, l2, or carry exists
        while (l1 || l2 || carry) {
            let sum = 0;
            if (l1) {
                sum += l1.val;
                l1 = l1.next;
            } 
            if (l2) {
                sum += l2.val;
                l2 = l2.next;
            }
            sum += carry;
            
            // create new node and add it to curr
            const newNode = new ListNode(sum % 10)
            curr.next = newNode;
            curr = curr.next;
            carry = sum >= 10 ? 1 : 0;
        }

        return dummy.next;
    }



    addTwoNumbers(l1, l2) {
        // the question asks given two non empty linked lists where each node in the list represents a single digit in a number, where the number
        // is in reverse order. return the sum of the two numbers, as a linked list also in reverse order

        // question - are the two lists of the same length?
       
        // sub problems/strategy

        // ensure that l1 and l2 are in the same position
        // attempt to create in place
        // very messy this way!! need to keep track of l1 length, l2 length. one loop for both, one for remaining l1 and one for remaining l2.

        let carry = 0;
        let head = l1;

        const addSum = () => {
            const sum = l1.val + l2.val + carry;
            l1.val = sum % 10;
            carry = sum >= 10 ? 1 : 0;
        }

        while (l1 && l1.next && l2 && l2.next) {
            // add to l1
           addSum();
            l1 = l1.next;
            l2 = l2.next;
        }

        addSum();
        // add trailing l1 - only need to add carry
        while (l1.next && carry > 0) {
            l1 = l1.next;
            const sum = l1.val + carry;
            l1.val = sum % 10;
            carry = sum >= 10 ? 1 : 0;
        }


        // need to append rest of l2 if exists
        while (l2 && l2.next) {
            l2 = l2.next;
            const sum = l2.val + carry;
            l2.val = sum % 10;
            carry = sum >= 10 ? 1 : 0;
            l1.next = l2;
            l1 = l1.next;
        }
        // need to fix the last node!
        if (carry === 1) {
            l1.next = new ListNode(1);
        } 

        return head;
        
    }
}
