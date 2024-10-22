"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoSumDiff = exports.mostFrequent = exports.getFirstNonRepeatedCharacter = exports.MapHash = void 0;
const linked_list_1 = require("./linked_list");
class Entry {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
class MapHash {
    constructor(size) {
        this.size = size;
        this.bucket = new Array(size).fill(null);
    }
    put(key, val) {
        const ll = new linked_list_1.LinkedList();
        const entry = new Entry(key, val);
        const index = this.index(key);
        let bucket = this.bucket[index];
        if (bucket) {
            bucket.addLast(entry);
        }
        else {
            ll.addLast(entry);
            this.bucket[index] = ll;
        }
    }
    get(key) {
        const index = this.index(key);
        return this.bucket[index];
    }
    remove(key) {
        const index = this.index(key);
        this.bucket[index] = null;
    }
    print() {
        let i = 0;
        for (let bucket of this.bucket) {
            if (bucket) {
                console.log('+++++++++++++++');
                console.log(`bucket:${i}`, bucket);
            }
            i++;
        }
    }
    index(key) {
        return key % this.size;
    }
}
exports.MapHash = MapHash;
function getFirstNonRepeatedCharacter(str) {
    const hash = new Map();
    let firstNonRepeatingChar = '';
    for (let char of str) {
        if (hash.has(char)) {
            let val = hash.get(char);
            hash.set(char, ++val);
        }
        else {
            hash.set(char, 1);
        }
    }
    for (let char of str) {
        if (hash.get(char) === 1) {
            return char;
        }
    }
    return firstNonRepeatingChar;
}
exports.getFirstNonRepeatedCharacter = getFirstNonRepeatedCharacter;
function mostFrequent(array) {
    {
        const map = new Map();
        let repeated = 0;
        for (let num of array) {
            if (map.has(num)) {
                map.set(num, map.get(num) + 1);
            }
            else {
                map.set(num, 1);
            }
        }
        map.forEach((value, key) => {
            if (value > repeated) {
                repeated = key;
            }
        });
        return repeated;
    }
}
exports.mostFrequent = mostFrequent;
function twoSumDiff(arr, target) {
    const sumsNum = [];
    const compliments = new Map();
    for (let [index, num] of arr.entries()) {
        const diff = num - target;
        const sum = num + target;
        compliments.set(diff, index);
        compliments.set(sum, index);
    }
    for (let [index, num] of arr.entries()) {
        if (compliments.has(num)) {
            const i = compliments.get(num);
            sumsNum.push([index, i]);
        }
    }
    return sumsNum;
}
exports.twoSumDiff = twoSumDiff;
//# sourceMappingURL=hashtable.js.map