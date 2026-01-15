// https://leetcode.com/problems/delete-operation-for-two-strings/
// TIME COMPLEXITY: O(m * n) where m and n are the lengths of word1 and word2
// SPACE COMPLEXITY: O(m * n) for the dp array

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    // the question is asking given two strings, return the minimum number of steps required to make word1 and word2 the same, where deleting a character from either word is a step
    // questions - is it always possible to to make word1 and word2 the same? are empty strings considered the same?
    // strategy - brute force is to loop through each string to find all chars that don't match and cut those first. then with the remaining strings... ??
    // new strategy - still need to find the longest common substring for both and the answer is word1.length + word2.length - LCS * 2

    // create 2d array to store largest common subsequence
    const dp = Array.from({ length: word1.length + 1}, () => Array(word2.length + 1).fill(0));

    // iterate through word1 and word2 to check chars
    for (let i = 1; i <= word1.length; i++) {
        const char1 = word1[i - 1];
        for (let j = 1; j <= word2.length; j++) {
            const char2 = word2[j - 1];
            // here we want to check if the chars match, if so we add 1 to the value before current values were checked
            // still a little confused by the diagonal checking but i can trust it. not sure if i will remember this under pressure in an interview. defintely won't be able to reason through it
            if (char1 == char2) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i -1][j], dp[i][j - 1]);
        }
    }
    // dp[word1.length][word2.length] represents the longest subsequence
    return word1.length + word2.length - dp[word1.length][word2.length] * 2;
};