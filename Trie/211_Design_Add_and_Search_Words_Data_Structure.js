// https://leetcode.com/problems/design-add-and-search-words-data-structure
// TIME COMPLEXITY: O(n) for addWord and O(l^n) search with wildcard where l is the size of the alphabet and n is length of word
// SPACE COMPLEXITY: O(n)

// create a trie constructor
var TrieNode = function(val) {
    this.val = val;
    this.children = new Map();
    this.end = false;
}

// have a prototype method for adding the next letter
TrieNode.prototype.next = function(char, child) {
    this.children.set(char, child);
}

// prototype method to set end of word
TrieNode.prototype.isEnd = function() {
    this.end = true;
}

var WordDictionary = function() {
    this.dict = new TrieNode();
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let temp = this.dict;
    for (const char of word) {
        if (!temp.children.has(char)) {
            const node = new TrieNode(char);
            temp.next(char, node);
            temp = node;
        } else {
            temp = temp.children.get(char);
        }
    }
    temp.isEnd();
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    // how to handle wild card?? DFS for each wildcard
    // wildcard helper is responsible for going down every path and confirming the word
    let wildCounter = 0;
    const dfs = (node, wordIndex) => {
        // base case
        if (wordIndex == word.length) return node.end;

        const char = word[wordIndex];
        if (char == '.') {
            // loop through each dict value and run dfs on it
            for (const value of node.children.values()) {
                if (dfs(value, wordIndex + 1)) {
                    return true;
                }
            }
        } else if (node.children.has(char)) {
            // run dfs on the single node
            if (dfs(node.children.get(char), wordIndex + 1)) return true;
        }
        return false;
    }

    return dfs(this.dict, 0);
};

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */