class Nude<E> {
  data: E;
  next: Nude<E> | null = null;

  constructor(data: E) {
    this.data = data;
  }
}

export class LinkedList<G> {
  private head: Nude<G> | null = null;
  private tail: Nude<G> | null = null;
  private _size: number = 0;


  addFirst(data: G): void {
    const newNode = new Nude(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this._size++;
  }

  addLast(data: G): void {
    const newNode = new Nude(data)

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this._size++;
  }

  removeFirst(): void {
    if (!this.head) throw new Error("Can not remove head if theres no head");

    // if(this.head === this.tail) {
    if (!this.head.next && this.head) { // special case where both head and tail are pointing to the same Node
      this.head = null;
      this.tail = null;
    } else {
      const secondNode = this.head.next;
      this.head.next = null;
      this.head = secondNode;
    }
    this._size--;
  }

  removeLast(): void {
    // console.log(`HEAD:${this.head?.data} --- TAIL:${this.tail?.data} ---- NODE:${this.tail === this.head}`)

    let node: Nude<G> | null = this.head;
    if (!this.tail || !node) throw new Error("Can not remove from an empty list");

    if (this.tail === this.head) { // special case where both head and tail are pointing to the same Node
      this.head = null;
      this.tail = null;
      this._size = 0;
      return;
    }

    let current = this.head;

    while (current) {
      if (current.next === this.tail) break;
      current = current.next;
    }
    this.tail = current;
    this.tail!.next = null;

    this._size--;
  }

  contains(data: G): boolean {
    // let node = this.head;

    // if(!node) throw new Error("Node is empty");

    // while(node) {
    //   if(node.data === data ) return true;

    //   node = node.next;
    // }

    // return false;

    return this.indexOf(data) !== -1;
  }

  indexOf(data: G): number {
    let node = this.head;

    if (!node) return -1

    let index = 0;

    while (node) {
      if (node.data === data) return index

      node = node.next;
      index++;
    }
    return -1;
  }

  removeNodeWithData(data: G): void {
    let current: Nude<G> | null | undefined = this.head;
    if (!current) return;

    if (current.data === data) {
      this.head = current.next;
      this.tail = this.head
      return;
    }

    while (current) {
      let next: Nude<G> | null = current.next

      if (next?.data === data) {
        current.next = next.next;
      }
      current = next
    }
  }

  // deleteDataNode(data: G) {
  //   console.log('12')
  //   if (!this.head || !this.tail) return;
  //   console.log('wa')

  //   let node: any = this.head;
  //   let prev = this.head;

  //   while(node.next) {
  //     if(node.next.data === data) {
  //       prev = node
  //     }
  //     node = node.next
  //   }

  //   console.log(prev, '--', data, '===', node.data)
  //   prev.next = node
  // }

  reverse() {
    // let temp = this.head;
    if (!this.head || !this.tail) throw new Error('Cannot reverse an empty list');

    // MY SHITTY SOLUTION
    // this.head = this.tail;
    // this.tail = temp;

    // let current = this.tail?.next;
    // this.tail!.next = null;
    // let newLink = this.tail;
    // let holder;

    // while(current) {
    //   holder = current;
    //   current = current.next

    //   holder!.next = null;
    //   holder!.next = newLink;
    //   newLink = holder;
    // }

    let prev = this.head;
    let curr = this.head?.next;

    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    this.tail = this.head;
    // @ts-ignore 
    this.tail.next = null;
    this.head = prev;
  }

  getKthFromTheEnd(num: number) {

    let firstPointer = this.head;
    let secPointer = this.head;
    let distance = num - 1;

    while (distance) {
      // @ts-ignore
      secPointer = secPointer?.next;
      distance--;
    }


    while (secPointer?.next) {
      // @ts-ignore
      firstPointer = firstPointer?.next;
      // @ts-ignore
      secPointer = secPointer.next;
    }


    return firstPointer?.data;
  }

  get size(): number {
    return this._size;
  }

  get data(): G | undefined {
    return this.head?.data
  }

  get next(): Nude<G> | null | undefined {
    return this.head?.next
  }

  print(): void {
    let node = this.head
    const arr = [];
    while (node) {
      arr.push(node.data)
      node = node.next;
    }
    console.log(`list: ${arr.join(' -> ')}`)
  }
}