// https://leetcode.com/problems/longest-common-subsequence/
// TIME COMPLEXITY: O(m * n) where m and n are the lengths of text1 and text2
// SPACE COMPLEXITY: O(m * n) for the dp array

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    // so the question is asking is given two strings, find the longest common substring between the two and return the length.
    // brute force method is to iterate over each char in the shorter text to see if the longer contains the char -> check if substring
    // are there any optimizations?
    // i misunderstood the question, it's the longest subsequence, NOT the longest substring!

    
    const len1 = text1.length;
    const len2 = text2.length; 
    // we want to create a 2d array where we store the longest common subsequence at that time!
    const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

    for (let i = 1; i <= len1; i++) {
        const char1 = text1[i - 1];
        for (let j = 1; j <= len2; j++) {
            const char2 = text2[j - 1];
            // if characters match, we increment +1 from before the current chars were being checked
            if (char1 == char2) dp[i][j] = dp[i - 1][j - 1] + 1;
            // otherwise we can carry over the max value from the previous iteration
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[len1][len2];
};