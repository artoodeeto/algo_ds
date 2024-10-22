"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = void 0;
class AlphabetContainer {
    constructor() {
        this.child = new Map();
        this.value = '';
        this.isEndOfWord = false;
    }
    hasChild(char) {
        return this.child.has(char);
    }
    getChild(char) {
        return this.child.get(char);
    }
    setChild(char) {
        const newNode = new AlphabetContainer();
        newNode.value = char;
        this.child.set(char, newNode);
    }
    getChildren() {
        return this.child.values();
    }
    hasChildren() {
        return this.getChildren().next().value !== undefined;
    }
    removeChild(char) {
        this.child.delete(char);
    }
}
class Trie {
    constructor() {
        this.root = new AlphabetContainer();
    }
    insert(word) {
        let theRoot = this.root;
        this._insert(word.toLowerCase(), theRoot);
    }
    _insert(word, root) {
        if (word.length <= 0) {
            root.isEndOfWord = true;
            return;
        }
        const char = word.slice(0, 1);
        if (root.hasChild(char)) {
            this._insert(word.slice(1, word.length), root.getChild(char));
        }
        else {
            root.setChild(char);
            this._insert(word.slice(1, word.length), root.getChild(char));
        }
    }
    contains(word) {
        if (word.length === 0)
            return false;
        return this._contains(word.toLowerCase(), this.root);
    }
    _contains(word, root) {
        if (word.length <= 0)
            return root.isEndOfWord;
        const char = word.slice(0, 1);
        if (root.hasChild(char)) {
            return this._contains(word.slice(1, word.length), root.getChild(char));
        }
        return false;
    }
    remove(word) {
        if (word.length === 0)
            return;
        this._remove(word, this.root);
    }
    _remove(word, root) {
        if (word.length <= 0) {
            root.isEndOfWord = false;
            return;
        }
        const char = word.slice(0, 1);
        const sliceWord = word.slice(1, word.length);
        const child = root.getChild(char);
        if (!child)
            return;
        this._remove(sliceWord, child);
        if (!child.hasChildren() && !child.isEndOfWord)
            root.removeChild(char);
        return;
    }
    traversal() {
        this._traversal(this.root);
    }
    _traversal(root) {
        for (const child of root.getChildren()) {
            this._traversal(child);
        }
        console.log(root.value);
    }
    listOfWords(word) {
        const words = [];
        const lastCharNode = this.findLastNode(word);
        if (!lastCharNode)
            return words;
        return this._listOfWords(word, words, lastCharNode);
    }
    _listOfWords(word, words, root) {
        if (!root)
            return words;
        if (root.isEndOfWord)
            words.push(word);
        for (const child of root.getChildren())
            this._listOfWords(word.concat(child.value), words, child);
        return words;
    }
    findLastNode(word) {
        if (!word)
            return null;
        let current = this.root;
        for (const char of word) {
            const child = current.getChild(char);
            if (!child)
                return null;
            current = child;
        }
        return current;
    }
}
exports.Trie = Trie;
//# sourceMappingURL=trie.js.map