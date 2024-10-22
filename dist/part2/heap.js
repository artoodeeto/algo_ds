"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heap = void 0;
class Heap {
    constructor() {
        this.container = [];
    }
    insert(val) {
        let length = this.container.length;
        if (length === 0) {
            this.container.push(val);
            return;
        }
        let parent = this.parentIndex(length);
        if (this.container[parent] >= val) {
            this.container.push(val);
            return;
        }
        for (let i = parent; i >= 0; i = Math.floor((i - 1) / 2)) {
            if (this.container[i] <= val) {
                this.swap(i, length, val);
                length = i;
            }
        }
    }
    remove() {
        const element = this.container.shift();
        const elementToBePushed = this.container.pop();
        if (elementToBePushed)
            this.bubbleDown(elementToBePushed);
        return element;
    }
    bubbleDown(val) {
        const len = this.container.unshift(val);
        let currentIndex = 0;
        for (let i = this.indexToMove(currentIndex); i <= len; i = this.indexToMove(i)) {
            if (this.container[i] > val) {
                this.swap(i, currentIndex, val);
                currentIndex = i;
            }
            else {
                return;
            }
        }
    }
    swap(toIndex, fromIndex, val) {
        const temp = this.container[toIndex];
        this.container[toIndex] = val;
        this.container[fromIndex] = temp;
    }
    parentIndex(index) {
        return Math.floor((index - 1) / 2);
        ;
    }
    leftIndex(index) {
        return (index * 2) + 1;
    }
    rightIndex(index) {
        return (index * 2) + 2;
    }
    indexToMove(index) {
        const leftIndex = this.leftIndex(index);
        const rightIndex = this.rightIndex(index);
        return this.container[leftIndex] > this.container[rightIndex] ? leftIndex : rightIndex;
    }
    log() {
        console.log(`Items:${this.container.join('-')}`);
    }
}
exports.Heap = Heap;
//# sourceMappingURL=heap.js.map