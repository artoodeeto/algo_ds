import { LinkedList } from "./linked_list";

class Entry {
  key: number;
  value: string; 

  constructor(key: number, value: string) {
    this.key = key;
    this.value = value;
  }
}

export class MapHash {

    private bucket: Array<LinkedList<Entry> | null>;
    private size: number;
    
    constructor(size: number) {
      this.size = size;
      this.bucket = new Array(size).fill(null);
    }

    put(key: number, val: string): void {
      const ll = new LinkedList<Entry>();
      const entry = new Entry(key, val)
      const index = this.index(key);
      let bucket = this.bucket[index];

      if(bucket) {
        bucket.addLast(entry)
      } else {
        ll.addLast(entry)
        this.bucket[index] = ll;
      }
    }

    get(key: number):LinkedList<Entry> | null {
      const index = this.index(key);
      return this.bucket[index];
    }

    remove(key: number): void {
      const index = this.index(key);
      this.bucket[index] = null;
    }

    print(): void {
      let i = 0;
      for(let bucket of this.bucket) {
        if(bucket) {
          console.log('+++++++++++++++')
          console.log(`bucket:${i}`, bucket)
        } 
        i++
      }
    }

    private index(key: number): number {
      return key % this.size;
    }

}




export function getFirstNonRepeatedCharacter(str: string): string {
  const hash = new Map<string, number>();

  let firstNonRepeatingChar = ''

  for(let char of str) {
    
    if(hash.has(char)) {
      let val = hash.get(char);
      // @ts-ignore
      hash.set(char, ++val)
    } else {
      hash.set(char, 1)
    }
  }

  // for (let [k,v] of hash.entries()) {
  //   if(v === 1) {
  //     firstNonRepeatingChar = k;
  //     break;
  //   }
  // }

  for(let char of str) {
    if(hash.get(char) === 1) {
      return char
    }
  }

  return firstNonRepeatingChar;

}

export function mostFrequent(array: Array<number>): number {{
  const map = new Map<number, number>();
  let repeated = 0;

  for(let num of array) {
    if(map.has(num)) {
      // @ts-ignore
      map.set(num, map.get(num) + 1)
    } else {
      map.set(num, 1)
    }
  }

  map.forEach( (value, key) => {
    if(value > repeated) {
      repeated = key;
    }
  })

  return repeated;
}}

// export function countPairsWithDiff(arr: Array<number>, key: number): number {
  

//   return 0;
// }

export function twoSumDiff(arr: Array<number>, target: number): Array<Array<number>> {
  const sumsNum: Array<Array<number>> = [];
  const compliments = new Map<number, number>();
  
  for(let [index, num] of arr.entries()) {
    const diff = num - target;
    const sum = num + target;
    compliments.set(diff, index)
    compliments.set(sum, index)
  }
  
  
  
  for(let [index, num] of arr.entries()) {
    if(compliments.has(num)) {
      const i = compliments.get(num);
      // compliments.delete(num)
      // @ts-ignore
      sumsNum.push([index, i])
    }
  }
  
  
return sumsNum;
}