"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BST = void 0;
class Node {
    constructor(value) {
        this.leftNode = null;
        this.rightNode = null;
        this.value = value;
    }
}
class BST {
    constructor() {
        this.root = null;
    }
    insert(val) {
        const node = new Node(val);
        if (!this.root) {
            this.root = node;
            return;
        }
        let current = this.root;
        while (current) {
            if (val < current.value) {
                if (!current.leftNode) {
                    current.leftNode = node;
                    break;
                }
                current = current.leftNode;
            }
            if (val > current.value) {
                if (!current.rightNode) {
                    current.rightNode = node;
                    break;
                }
                current = current.rightNode;
            }
        }
    }
    find(val) {
        let current = this.root;
        while (current) {
            if (val <= current.value) {
                if (val === current.value)
                    return current;
                if (!current.leftNode)
                    break;
                current = current.leftNode;
            }
            if (val >= current.value) {
                if (val === current.value)
                    return current;
                if (!current.rightNode)
                    break;
                current = current.rightNode;
            }
        }
        return null;
    }
    depthFirstTraversalPreOrder() {
        this._depthFirstTraversalPreOrder(this.root);
    }
    _depthFirstTraversalPreOrder(node) {
        if (!node)
            return;
        console.log(`VALUE:${node.value}`);
        this._depthFirstTraversalPreOrder(node.leftNode);
        this._depthFirstTraversalPreOrder(node.rightNode);
    }
    depthFirstTraversalInOrder() {
        this._depthFirstTraversalInOrder(this.root);
    }
    _depthFirstTraversalInOrder(node) {
        if (!node)
            return;
        this._depthFirstTraversalInOrder(node.leftNode);
        console.log(`VALUE:${node.value}`);
        this._depthFirstTraversalInOrder(node.rightNode);
    }
    depthFirstTraversalPostOrder() {
        this._depthFirstTraversalPostOrder(this.root);
    }
    _depthFirstTraversalPostOrder(node) {
        if (!node)
            return;
        this._depthFirstTraversalPostOrder(node.leftNode);
        this._depthFirstTraversalPostOrder(node.rightNode);
        console.log(`VALUE:${node.value}`);
    }
    height() {
        return this._height(this.root);
    }
    _height(node) {
        if (!node)
            return -1;
        if (node.leftNode === null && node.rightNode === null)
            return 0;
        return 1 + Math.max(this._height(node.leftNode), this._height(node.rightNode));
    }
    minBST() {
        const root = this.root;
        if (!root)
            return 0;
        let current = root;
        let last = current;
        while (current) {
            last = current;
            current = current.leftNode;
        }
        return last.value;
    }
    minVal() {
        return this._minVal(this.root);
    }
    _minVal(node) {
        if (!node)
            return Number.MAX_SAFE_INTEGER;
        if (node.leftNode === null && node.rightNode === null)
            return node.value;
        const left = this._minVal(node.leftNode);
        const right = this._minVal(node.rightNode);
        return Math.min(node.value, Math.min(left, right));
    }
    isEqual() {
        return this._isEqual(this.root);
    }
    _isEqual(node) {
        if (!node)
            return false;
        if (node.leftNode && node.rightNode) {
            return this._isEqual(node.leftNode) && this._isEqual(node.rightNode);
        }
        else if (!this.isLeaf(node)) {
            return false;
        }
        return true;
    }
    isBST() {
        return this._isBST(this.root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }
    _isBST(node, min, max) {
        if (!node)
            return true;
        if (node.value < min || node.value > max)
            return false;
        return this._isBST(node.leftNode, min, node.value - 1) && this._isBST(node.rightNode, node.value + 1, max);
    }
    distanceAtKNode(distance) {
        const container = [];
        this._distanceAtKNode(this.root, distance, container);
        return container;
    }
    _distanceAtKNode(node, distance, container) {
        if (!node)
            return;
        if (distance <= 0) {
            container.push(node.value);
            return;
        }
        this._distanceAtKNode(node.leftNode, distance - 1, container);
        this._distanceAtKNode(node.rightNode, distance - 1, container);
    }
    levelOrderTraversal() {
        for (let i = 0; i <= this.height(); i++) {
            for (let val of this.distanceAtKNode(i)) {
                console.log(`Level Order Traversal${val}`);
            }
        }
    }
    isLeaf(node) {
        return !node.leftNode && !node.rightNode;
    }
    log() {
        if (this.root)
            this.print(this.root, 'The Root:');
    }
    testingIsBST() {
        var _a;
        const temp = (_a = this.root) === null || _a === void 0 ? void 0 : _a.leftNode;
        this.root.leftNode = this.root.rightNode;
        this.root.rightNode = temp;
    }
    print(node, str) {
        if (!node)
            return;
        if (node)
            console.log(`${str}: ${node.value}`);
        this.print(node.leftNode, 'LEFT NODE:');
        this.print(node.rightNode, 'RIGHT NODE:');
    }
}
exports.BST = BST;
//# sourceMappingURL=binarySearchTree.js.map