export class Heap<G> {

  private container: Array<G> = [];
  
  insert(val: G): void {
    let length = this.container.length;
    
    if(length === 0 ) {
      this.container.push(val);
      return;
    }
    
    let parent = this.parentIndex(length);
    
    if(this.container[parent] >=val ) {
      this.container.push(val);
      return;
    }
    
    for(let i = parent; i >= 0; i = Math.floor((i - 1)/2)) {
      if(this.container[i] <= val ) {
        this.swap(i,length, val)
        length = i;
      }
    }    
  }
  
  remove(): G | undefined{
    const element = this.container.shift();
    const elementToBePushed = this.container.pop();
    
    if(elementToBePushed) this.bubbleDown(elementToBePushed)
    
    return element;
  }
    
  private bubbleDown(val: G): void {
    const len = this.container.unshift(val);
    
    let currentIndex = 0;
    
    for(let i = this.indexToMove(currentIndex); i <= len; i = this.indexToMove(i)) {
        
      if(this.container[i] > val) {
        this.swap(i,currentIndex, val)
        currentIndex = i;
      } else {
        return;
      }
    }
  }
  
  private swap(toIndex: number, fromIndex: number, val: G): void {
    const temp = this.container[toIndex];
        this.container[toIndex] = val;
        this.container[fromIndex] = temp;
  }
  
  private parentIndex(index: number): number {
    return Math.floor((index - 1)/2);;
  }
  
  private leftIndex(index: number): number {
    return (index * 2) + 1;
  }
  
  private rightIndex(index: number): number {
    return (index * 2) + 2;
  }
  
  private indexToMove(index: number): number {
    const leftIndex = this.leftIndex(index)
    const rightIndex = this.rightIndex(index)
    
    return this.container[leftIndex] > this.container[rightIndex] ? leftIndex : rightIndex;
  }
  
  // private bubbleUp(parent: number): Array<G> {
  

  // }
  
  
  
  log(): void {
    console.log(`Items:${this.container.join('-')}`)
  }

}