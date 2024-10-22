"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVLTree = void 0;
class Node {
    constructor(value) {
        this.leftNode = null;
        this.rightNode = null;
        this.height = 0;
        this.value = value;
    }
}
class AVLTree {
    constructor() {
        this.root = null;
    }
    insert(val) {
        this.root = this._insert(this.root, val);
        console.log('');
    }
    _insert(node, val) {
        const newNode = new Node(val);
        if (!node) {
            this.root = newNode;
            return new Node(val);
        }
        if (val < node.value) {
            node.leftNode = this._insert(node.leftNode, val);
        }
        if (val > node.value) {
            node.rightNode = this._insert(node.rightNode, val);
        }
        node.height = Math.max(this.height2(node.leftNode), this.height2(node.rightNode)) + 1;
        return this.balance(node);
    }
    balance(node) {
        if (this.isLeftHeavy(node)) {
            if (this.balanceFactor(node.leftNode) < 0) {
                node.leftNode = this.leftRotate(node.leftNode);
            }
            return this.rightRotate(node);
        }
        else if (this.isRightHeavy(node)) {
            if (this.balanceFactor(node.rightNode) > 0) {
                node.rightNode = this.rightRotate(node.rightNode);
            }
            return this.leftRotate(node);
        }
        return node;
    }
    leftRotate(node) {
        const temp = node.rightNode;
        node.rightNode = temp === null || temp === void 0 ? void 0 : temp.leftNode;
        temp.leftNode = node;
        node.height = this._height(node);
        temp.height = this._height(temp);
        return temp;
    }
    rightRotate(node) {
        const temp = node.leftNode;
        node.leftNode = temp === null || temp === void 0 ? void 0 : temp.rightNode;
        temp.rightNode = node;
        node.height = this._height(node);
        temp.height = this._height(temp);
        return temp;
    }
    isLeftHeavy(node) {
        return this.balanceFactor(node) > 1;
    }
    isRightHeavy(node) {
        return this.balanceFactor(node) < -1;
    }
    balanceFactor(node) {
        return !node ? 0 : this.height2(node.leftNode) - this.height2(node.rightNode);
    }
    height2(node) {
        return !node ? -1 : node.height;
    }
    get height() {
        return this._height(this.root);
    }
    _height(node) {
        if (!node)
            return -1;
        if (this.isLeaf(node))
            return 0;
        return 1 + Math.max(this._height(node.leftNode), this._height(node.rightNode));
    }
    isLeaf(node) {
        return !node.leftNode && !node.rightNode;
    }
    log() {
        this._log(this.root);
    }
    _log(node) {
        if (!node)
            return;
        console.log(`VALUE:${node.value}`);
        this._log(node.leftNode);
        this._log(node.rightNode);
    }
}
exports.AVLTree = AVLTree;
//# sourceMappingURL=AVLTree.js.map