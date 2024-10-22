export class Queue<G> {

  private q: G[] = [];


  add(item: G): void {
    this.q.push(item);
  }

  remove(): G | null  {
    return this.q.shift() ?? null;
  }

  isEmpty(): boolean {
    return this.q.length < 1;
  }

  reverse(): void {
    const holder: G[] = [];

    while(this.q.length) {
      // @ts-ignore
      holder.push(this.q.pop());
    }

    this.q = holder;
  }

  print(): void {
    console.log(this.q)
  }

}

// implementation of Queue using array
/*  I could've use the native array 
    implementation but this
    for learning purposes only. */
export class ArrayQueue<G> {
  
  private items: Array<G> = [];
  private front: number = 0;
  private rear: number = 0;
  private count: number = 0;

  enqueue(item: G): void {
    this.items[this.rear++] = item;
    this.count++;
  }

  dequeue(): G {
    if (this.isEmpty()) throw new Error('Illegal dequeue of empty items')
    this.count--;
    return this.items[this.front++];
  }

  peek(): G {
    if (this.isEmpty()) throw new Error('Cannot Return a value in an Empty List')
    return this.items[this.front]
  }

  private isEmpty(): boolean {
    return this.front > this.rear;
  }

  print(): void {
    console.log('items', this.items);
    console.log('front', this.front);
    console.log('rear', this.rear);
  }
}