// https://leetcode.com/problems/palindromic-substrings/

/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    // same logic as the other one except this one is just for count!
    let count = 0;
    const isPalindrome = (left, right) => {
        while (left >= 0 && right < s.length && s[left] == s[right]) {
            count++;
            left--;
            right++;        
        }
    }
    for (let i = 0; i < s.length; i++) {
        isPalindrome(i, i);
        isPalindrome(i, i+1);
    }
    return count;
};