// https://leetcode.com/problems/decode-ways/
// TIME COMPLEXITY: O(n) where n is the length of the string s
// SPACE COMPLEXITY: O(n) for the dp array

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    // question asks given a string of numbers, how many ways can the message be decoded in a valid manner where each number from 1-26 represents a letter?
    // this requires a linear 1d array because the current answer is dependent on the last one
    // what data do we need to remember in the memo? - how many ways it takes to get to the current index - similar to steps, but need to check validity

    if (!s.length || s[0] == '0') return 0;
    // should this be set to s.length or s.length + 1???
    const dp = Array(s.length + 1).fill(0);
    // dp 0 will always be valid? we set it here because we have to look back one? what is the base case here?
    dp[0] = 1;
    dp[1] = 1;
    
    // iterate through s, if number before w/ current number is a valid char, then we add +1 to the value at dp[i - 2];
    // also need to check current letter, if valid, add +1 to ???
    for (let i = 2; i <= s.length; i++) {
        const num = Number(s[i - 1]);
        const twoNum = Number(`${s[i - 2]}${s[i - 1]}`);

        if (twoNum >= 10 && twoNum <= 26) dp[i] += dp[i - 2];
        if (num > 0) dp[i] += dp[i - 1];
    }
    return dp[s.length]
}