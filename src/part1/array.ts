


export class Ahrray<T> {

  private count: number = 0;

  private _items: T[];

  constructor(length: number) {
    this._items = Array.from({length});
  }

  insert(item: T): void {
    this._items[this.count++] = item;
  }


  removeAt(index: number) {

    if (index < 0 || index > this.count - 1) throw new Error('Given Index is out of range')

    for(let i = index; i < this.count; i++ ) {
      this._items[i] = this._items[i + 1]
    }
    this.count--;
    this._items.length--;
  }

  indexOf(item: T): number {
    return this.items.indexOf(item);
  }

  max(): T {
    if(this.count === 0) throw new Error("Can not find max value of empty array")

    let currLargest = this._items[0];

    this._items.forEach( (item) => {
      if(item > currLargest) currLargest = item;
    })
    return currLargest;
  }

  // Runtime: O(inputItems x items)
  // Space: O(n) where all of the items from both arrays intersect
  intersect(inputItems: Array<T>) {

    const intersectedItems: Array<T> = [];

    for(let i = 0; i < this.count; i++) {
      for(let j = 0; j < inputItems.length; j++) {
        if (this._items[i] === inputItems[j]) intersectedItems.push(inputItems[j])
      }
    }

    return intersectedItems;
  }

  insertAt(item: any, index: number): void   {
    const newElem: T[] = [];

    this._items.forEach( (elem, i) => {
      if(i === index) {
        newElem.push(item)
      }
      newElem.push(elem)
    });
    this._items = newElem;
  }



  get length(): number {
    return this.count;
  }

  get items(): T[] {
    return this._items;
  }

  
}
