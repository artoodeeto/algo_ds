"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
class StringUtils {
    static countVowels(str) {
        let vowelsCount = 0;
        const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
        for (let char of str.toLowerCase())
            if (vowels.has(char))
                vowelsCount++;
        return vowelsCount;
    }
    static reverseString(str) {
        return str.split('').reverse().join('');
    }
    static reverseWords(str) {
        return str.split(' ').reverse().join(' ');
    }
    static stringRotate(str1, str2) {
        if (str1.length !== str2.length)
            return false;
        for (let i = 1; i < str2.length; i++) {
            const newStr = `${str2.substring(i)}${str2.substring(0, i)}`;
            if (str1 === newStr)
                return true;
        }
        return false;
    }
    static removeDuplicateChars(str) {
        return Array.from(new Set(str.split(''))).join('');
    }
    static repeatedChars(str) {
        const mapChars = new Map();
        for (let char of str) {
            if (mapChars.has(char)) {
                let val = mapChars.get(char) + 1;
                mapChars.set(char, val);
            }
            else {
                mapChars.set(char, 1);
            }
        }
        let repeatedChar = '';
        let repeatedCharCount = 0;
        for (let [key, val] of mapChars.entries()) {
            if (val > repeatedCharCount) {
                repeatedCharCount = val;
                repeatedChar = key;
            }
        }
        return repeatedChar;
    }
    static capitalizeFirstLetterOfWord(str) {
        let concatStr = [];
        for (let word of str.trim().split(' ')) {
            if (word.trim().length === 0)
                continue;
            const [firstChar, ...rest] = word;
            concatStr.push(`${firstChar.toLocaleUpperCase()}${rest.join('')}`);
        }
        return concatStr.join(' ');
    }
    static isAnagram(str1, str2) {
        if (str1.length !== str2.length)
            return false;
        const str1Sorted = str1.split('').sort().join('');
        const str2Sorted = str2.split('').sort().join('');
        return str1Sorted === str2Sorted;
    }
    static isPalindrome(str) {
        const newStr = str;
        return str === newStr.split('').reverse().join('');
    }
}
exports.StringUtils = StringUtils;
//# sourceMappingURL=string.js.map