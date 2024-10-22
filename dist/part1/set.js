"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFirstRepeatedCharacter = void 0;
function findFirstRepeatedCharacter(str) {
    const set = new Set();
    for (let char of str) {
        if (set.has(char))
            return char;
        set.add(char);
    }
    return '';
}
exports.findFirstRepeatedCharacter = findFirstRepeatedCharacter;
//# sourceMappingURL=set.js.map