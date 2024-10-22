"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class Nude {
    constructor(data) {
        this.next = null;
        this.data = data;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }
    addFirst(data) {
        const newNode = new Nude(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this._size++;
    }
    addLast(data) {
        const newNode = new Nude(data);
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this._size++;
    }
    removeFirst() {
        if (!this.head)
            throw new Error("Can not remove head if theres no head");
        if (!this.head.next && this.head) {
            this.head = null;
            this.tail = null;
        }
        else {
            const secondNode = this.head.next;
            this.head.next = null;
            this.head = secondNode;
        }
        this._size--;
    }
    removeLast() {
        let node = this.head;
        if (!this.tail || !node)
            throw new Error("Can not remove from an empty list");
        if (this.tail === this.head) {
            this.head = null;
            this.tail = null;
            this._size = 0;
            return;
        }
        let current = this.head;
        while (current) {
            if (current.next === this.tail)
                break;
            current = current.next;
        }
        this.tail = current;
        this.tail.next = null;
        this._size--;
    }
    contains(data) {
        return this.indexOf(data) !== -1;
    }
    indexOf(data) {
        let node = this.head;
        if (!node)
            return -1;
        let index = 0;
        while (node) {
            if (node.data === data)
                return index;
            node = node.next;
            index++;
        }
        return -1;
    }
    removeNodeWithData(data) {
        let current = this.head;
        if (!current)
            return;
        if (current.data === data) {
            this.head = current.next;
            this.tail = this.head;
            return;
        }
        while (current) {
            let next = current.next;
            if ((next === null || next === void 0 ? void 0 : next.data) === data) {
                current.next = next.next;
            }
            current = next;
        }
    }
    reverse() {
        var _a;
        if (!this.head || !this.tail)
            throw new Error('Cannot reverse an empty list');
        let prev = this.head;
        let curr = (_a = this.head) === null || _a === void 0 ? void 0 : _a.next;
        while (curr) {
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.tail = this.head;
        this.tail.next = null;
        this.head = prev;
    }
    getKthFromTheEnd(num) {
        let firstPointer = this.head;
        let secPointer = this.head;
        let distance = num - 1;
        while (distance) {
            secPointer = secPointer === null || secPointer === void 0 ? void 0 : secPointer.next;
            distance--;
        }
        while (secPointer === null || secPointer === void 0 ? void 0 : secPointer.next) {
            firstPointer = firstPointer === null || firstPointer === void 0 ? void 0 : firstPointer.next;
            secPointer = secPointer.next;
        }
        return firstPointer === null || firstPointer === void 0 ? void 0 : firstPointer.data;
    }
    get size() {
        return this._size;
    }
    get data() {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.data;
    }
    get next() {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.next;
    }
    print() {
        let node = this.head;
        const arr = [];
        while (node) {
            arr.push(node.data);
            node = node.next;
        }
        console.log(`list: ${arr.join(' -> ')}`);
    }
}
exports.LinkedList = LinkedList;
//# sourceMappingURL=linked_list.js.map