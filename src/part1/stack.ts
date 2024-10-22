// A wrapper around array or linked list

export function stringReverser(str: string): string {
  const arr: Array<string> = []

  str.split("").forEach((char) => {
    arr.push(char);
  })

  let newStr = '';
  while (arr.length) {
    newStr += arr.pop();
  }

  return newStr;
  //  or
  // return str.split('').reverse().join('');
}

export function balancedExpression(str: String): boolean {
  if (str.length < 1) return true;
  const leftBra = ['{', '(', '<', '['];
  const rightBra = ['}', ')', '>', ']'];
  const leftBracketStacks = [];

  for (let char of str) {
    if (leftBra.includes(char)) {
      leftBracketStacks.push(char)
    }
    if (rightBra.includes(char)) {
      const leftBracket = leftBracketStacks.pop();
      const indexOfRightBracket = rightBra.indexOf(char)
      const leftBracketUsingIndex = leftBra[indexOfRightBracket];
      if (leftBracketUsingIndex !== leftBracket) return false;
    }

  }

  return leftBracketStacks.length > 0 ? false : true;
}