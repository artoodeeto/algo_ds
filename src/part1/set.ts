

export function findFirstRepeatedCharacter(str: string): string {
  const set = new Set<string>();

  for(let char of str) {
    if(set.has(char)) return char;

    set.add(char)
  }


  return ''
}