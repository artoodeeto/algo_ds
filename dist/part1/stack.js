"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balancedExpression = exports.stringReverser = void 0;
function stringReverser(str) {
    const arr = [];
    str.split("").forEach((char) => {
        arr.push(char);
    });
    let newStr = '';
    while (arr.length) {
        newStr += arr.pop();
    }
    return newStr;
}
exports.stringReverser = stringReverser;
function balancedExpression(str) {
    if (str.length < 1)
        return true;
    const leftBra = ['{', '(', '<', '['];
    const rightBra = ['}', ')', '>', ']'];
    const leftBracketStacks = [];
    for (let char of str) {
        if (leftBra.includes(char)) {
            leftBracketStacks.push(char);
        }
        if (rightBra.includes(char)) {
            const leftBracket = leftBracketStacks.pop();
            const indexOfRightBracket = rightBra.indexOf(char);
            const leftBracketUsingIndex = leftBra[indexOfRightBracket];
            if (leftBracketUsingIndex !== leftBracket)
                return false;
        }
    }
    return leftBracketStacks.length > 0 ? false : true;
}
exports.balancedExpression = balancedExpression;
//# sourceMappingURL=stack.js.map