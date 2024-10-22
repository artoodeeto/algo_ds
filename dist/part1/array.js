"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ahrray = void 0;
class Ahrray {
    constructor(length) {
        this.count = 0;
        this._items = Array.from({ length });
    }
    insert(item) {
        this._items[this.count++] = item;
    }
    removeAt(index) {
        if (index < 0 || index > this.count - 1)
            throw new Error('Given Index is out of range');
        for (let i = index; i < this.count; i++) {
            this._items[i] = this._items[i + 1];
        }
        this.count--;
        this._items.length--;
    }
    indexOf(item) {
        return this.items.indexOf(item);
    }
    max() {
        if (this.count === 0)
            throw new Error("Can not find max value of empty array");
        let currLargest = this._items[0];
        this._items.forEach((item) => {
            if (item > currLargest)
                currLargest = item;
        });
        return currLargest;
    }
    intersect(inputItems) {
        const intersectedItems = [];
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < inputItems.length; j++) {
                if (this._items[i] === inputItems[j])
                    intersectedItems.push(inputItems[j]);
            }
        }
        return intersectedItems;
    }
    insertAt(item, index) {
        const newElem = [];
        this._items.forEach((elem, i) => {
            if (i === index) {
                newElem.push(item);
            }
            newElem.push(elem);
        });
        this._items = newElem;
    }
    get length() {
        return this.count;
    }
    get items() {
        return this._items;
    }
}
exports.Ahrray = Ahrray;
//# sourceMappingURL=array.js.map