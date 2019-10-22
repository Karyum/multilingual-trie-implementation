const defaultNode = {
    key: null,
    children: [],
    parent: null,
    end: false,
    language: null
}

// we start with the TrieNode
function TrieNode(key, language) {
    // the "key" value will be the character in sequence
    this.key = key;

    // keep language in the node
    this.language = language;

    // we keep a reference to parent
    this.parent = null;

    // we have hash of children
    this.children = {};

    // check to see if the node is at the end
    this.end = false;
}

// iterates through the parents to get the word.
TrieNode.prototype.getWord = function () {
    let output = '';
    let node = this;

    // only the root node has a parent of null
    while (node !== null) {
        output = (node.key || '') + output;
        node = node.parent;
    }

    return output;
};

// -----------------------------------------

// we implement Trie with just a simple root with null value.
function Trie() {
    this.root = new TrieNode(null);
}

Trie.prototype.insert = function (word, language) {
    let node = this.root.children[language]; // we start at the root

    // in case that language does not exist, create the language node
    if (!node) {
        node = new TrieNode('', language)

        // and then attach the language node to the root's children
        this.root.children[language] = node
    }

    // for every character in the word
    word.split('').forEach((character, i) => {
        if (!node.children[character]) {
            // if it doesn't exist, we then create it.
            node.children[character] = new TrieNode(character, node.language);

            // we also assign the parent to the child node.
            node.children[character].parent = node;
        }

        // proceed to the next depth in the trie.
        node = node.children[character];

        // finally, we check to see if it's the last word.
        if (i == word.length - 1) {
            // if it is, we set the end flag to true.
            node.end = true;
        }
    })
};

Trie.prototype.contains = function (word, language) {
    let node = this.root.children[language] || defaultNode;

    // for every character in the word
    word.split('').forEach(character => {
        // check to see if character node exists in children.
        if (node.children[character]) {
            // if it exists, proceed to the next depth of the trie.
            node = node.children[character];
        } else {
            // doesn't exist, return false since it's not a valid word.
            return false;
        }
    })

    // we finished going through all the words, but is it a whole word?
    return node.end;
};

// returns every word with given prefix
Trie.prototype.find = function (prefix, language, limit) {
    let node = this.root.children[language] || defaultNode;
    let output = [];

    // for every character in the prefix
    prefix.split('').forEach(character => {
        // make sure prefix actually has words
        if (node.children[character]) {
            node = node.children[character];
        } else {
            // there's none. just return it.
            return output;
        }
    })

    // recursively find all words in the node
    findAllWords(node, output, limit);

    // the output would change in the findAllWords function
    return output;
};

function findAllWords(node, arr, limit = 10) {

    // if reached limit then stop the function 
    if (arr.length === limit) {
        return;
    }

    // base case, if node is at a word, push to output
    if (node.end) {
        arr.unshift(node.getWord());
    }

    // iterate through each children, call recursive findAllWords
    for (let child in node.children) {
        findAllWords(node.children[child], arr, limit);
    }
}

module.exports = new Trie()

// -----------------------------------------

// trie.insert() adds characters into the children of nodes
// trie.contains() see if a word exists in the trie
// trie.find() autocompletes a prefix that it received