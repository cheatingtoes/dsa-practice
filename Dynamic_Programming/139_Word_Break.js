// https://leetcode.com/problems/word-break

var wordBreak = function(s, wordDict) {
    // slice off the front dfs ?
    // memo for already tried indexes that failed
    const memo = new Set();
    const canSlice = (index) => {
        if (index == s.length) return true;
        if (memo.has(index)) return false;
        for (const word of wordDict) {
            // if s starts with index
            if (s.startsWith(word, index)) {
                // recurse
                if (canSlice(index + word.length)) return true;
            }
        }
        memo.add(index)
        return false;
    }
    return canSlice(0)
}