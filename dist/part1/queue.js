"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayQueue = exports.Queue = void 0;
class Queue {
    constructor() {
        this.q = [];
    }
    add(item) {
        this.q.push(item);
    }
    remove() {
        var _a;
        return (_a = this.q.shift()) !== null && _a !== void 0 ? _a : null;
    }
    isEmpty() {
        return this.q.length < 1;
    }
    reverse() {
        const holder = [];
        while (this.q.length) {
            holder.push(this.q.pop());
        }
        this.q = holder;
    }
    print() {
        console.log(this.q);
    }
}
exports.Queue = Queue;
class ArrayQueue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }
    enqueue(item) {
        this.items[this.rear++] = item;
        this.count++;
    }
    dequeue() {
        if (this.isEmpty())
            throw new Error('Illegal dequeue of empty items');
        this.count--;
        return this.items[this.front++];
    }
    peek() {
        if (this.isEmpty())
            throw new Error('Cannot Return a value in an Empty List');
        return this.items[this.front];
    }
    isEmpty() {
        return this.front > this.rear;
    }
    print() {
        console.log('items', this.items);
        console.log('front', this.front);
        console.log('rear', this.rear);
    }
}
exports.ArrayQueue = ArrayQueue;
//# sourceMappingURL=queue.js.map