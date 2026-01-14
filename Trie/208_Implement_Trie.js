// https://leetcode.com/problems/implement-trie-prefix-tree
// TIME COMPLEXITY: O(n) for insert, search, startsWith where n is length of word
// SPACE COMPLEXITY: O(n)

var TrieNode = function(val) {
    this.val = val
    this.children = new Map()
    this.end = false
}

TrieNode.prototype.next = function(char, childNode) {
    this.children.set(char, childNode)
}

TrieNode.prototype.isEnd = function() {
    this.end = true;
}

var Trie = function() {
    this.root = new TrieNode()
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    // start at this.root and check if next letter exists
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
        const char = word[i]
        // if node exists, move to next 
        if (node.children.has(char)) node = node.children.get(char);
        else {
            // create a new trienode for the character
            const newNode = new TrieNode(char);
            node.next(char, newNode);
            node = newNode;
        }
    }
    node.isEnd();
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let node = this.root
    for (let i = 0; i < word.length; i++) {
        const char = word[i]
        if (node.children.has(char)) node = node.children.get(char);
        else return false;
    }
    return node.end;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let node = this.root
    for (let i = 0; i < prefix.length; i++) {
        const char = prefix[i]
        if (node.children.has(char)) node = node.children.get(char);
        else return false;
    }
    return true;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */