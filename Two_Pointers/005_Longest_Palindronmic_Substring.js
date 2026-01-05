// https://leetcode.com/problems/longest-palindromic-substring

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (!s || s.length == 0) return '';
    // finding longest substring in a given string
    // brute force - check every possible substring (O(n^2)) to see if it's a palindrome (O(n))
    // optimized - instead of having to first get every possible substring in the string, we can optimize this by iterating over the string and assume that the current character is the center of the palindrome and have two pointers iterate outward. iterate through the string (O(n)), check from the center outward if it's a palindrome (O(n))

    // store index of start and end 
    let start = 0;
    let end = 0; 
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        // check if is plaindome for odd
        // returns -1, 1 -> 0, 2
        const [oddLeft, oddRight] = isPalindrome(i, i);
        // returns 0, 1 -> 1, 2 or 0, 3 if valid
        const [evenLeft, evenRight] = isPalindrome(i, i+1);
        const oddLen = oddRight - oddLeft - 1;
        const evenLen = evenRight - evenLeft - 1;
        if (oddLen > maxLen) {
            // odd will always run in the loop once, will overshoot the left
            start = oddLeft + 1
            // even though we overshoot the left, right is okay because the single char is he palindrome
            end = oddRight
            maxLen = oddLen
        }
        if (evenLen > maxLen) {
            // add one here because we're starting with 2 chars, if no palindrome exist we need to close the gap to 0
            start = evenLeft + 1;
            end = evenRight;
            maxLen = evenLen
        }
    }   
    return s.substring(start, end)
    // function that checks is palindrome. it will take two arguments, to start the palindrome check
    function isPalindrome(left, right) {
        // check if in bounds and if palindrome exists
        while (left >= 0 && right < s.length && s[left] == s[right]) {
            left--;
            right++;
        }
        // return left, right or len which is the numbers strictly in between left and right -> right - left - 1
        return [left ,right]
    }
};