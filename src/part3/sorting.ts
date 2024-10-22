export class Sorting {

  bubbleSort(arr: Array<number>): number[] {
    
    for(let i = 0; i < arr.length; i++) {
      for(let j = i+1; j < arr.length; j++) {
        if(arr[i] > arr[j]) this.swapper(arr, i, j)
        
      }
    }
  
    return arr;
  }
  
  selectionSort(arr: number[]): number[] {
    
    for(let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for(let j = i+1; j < arr.length; j++) {
        if(arr[minIndex] > arr[j]) minIndex = j
      }
      
      this.swapper(arr, i, minIndex)
    }
    
    return arr;
  }
  
  insertionSort(arr: number[]): number[] {
    for(let i = 1; i < arr.length; i++ ) {
      if(arr[i-1] >= arr[i]) {
        for(let j = i; j > 0; j--) {
          if(arr[j-1] < arr[j]) continue
          const temp = arr[j];
          arr[j] = arr[j-1];
          arr[j-1] = temp;
        }
      }
    }
    
    return arr;
  }
  
  mergeSort(arr: number[]): number[] {
    
    if(arr.length < 2) {
      return arr
    }
  
    const mid = Math.floor(arr.length / 2);
    
    const leftArray: number[] = [];
    for(let i = 0; i < mid; i++) {
      leftArray.push(arr[i])
    }
    
    const rightArray: number[] = [];
    for(let i = mid; i < arr.length; i++) {
      rightArray.push(arr[i])
      // rightArray[i - mid] = arr[i]
    }
    
    this.mergeSort(leftArray);
    this.mergeSort(rightArray);
    
    // console.log(`${leftArray}`, '---', `${rightArray}`)
  
    return this.merger(leftArray, rightArray, arr);
  }
  
  merger(leftArray: number[], rightArray: number[], result: number[]): number[] {
    let i=0; 
    let j=0; 
    let k=0;
    
    while(i < leftArray.length && j < rightArray.length) {
      if (leftArray[i] <= rightArray[j]) {
        result[k++] = leftArray[i++];
      } else {
        result[k++] = rightArray[j++];
      }
    }
    
    while(i < leftArray.length) {
      result[k++] = leftArray[i++];
    }
    
    while(j < rightArray.length) {
      result[k++] = leftArray[j++];
    }
    return result;
  }
  
  quickSort(arr: number[]): number[] {
    return this._quickSort(arr, 0, arr.length - 1)
  }
  
  private _quickSort(arr: number[], start: number, end: number): number[] {
    if(start >= end) return arr;
    
    let boundary = this.partition(arr, start, end);
    this._quickSort(arr, start, boundary - 1);
    this._quickSort(arr, boundary + 1, end);
    return arr;
  }
  
  
  private partition(arr: number[], start: number, end: number): number {
    let boundary = start - 1;
    let pivot = end;
    
    for(let i = start; i <= end; i++) {
      if(arr[i] <= arr[pivot]) 
        this.swapper(arr, i, ++boundary);
    }
    return boundary;
  }
  
  countSort(arr: number[]): number[] {
    const maxVal = Math.max(...arr);
    const counts =  Array(maxVal + 1).fill(0);
    
    for(let i = 0; i < arr.length; i++) {
      const val = arr[i];
      counts[val] = counts[val] + 1;
    }
    
    let x = 0;
    for(let i = 0; i < counts.length; i++) {
      for(let j = 0; j < counts[i]; j++) 
        arr[x++] = i
    }
    
    return arr;
  }
  
  bucketSort(arr: number[]): number[] {
    const numOfBuckets = Math.floor(arr.length / 2);
    const buckets: Array<Array<number>>  = Array.from({length: numOfBuckets}, _e => [])
    
    for(let num of arr) {
      const bucketNum = Math.floor(num / numOfBuckets);
      buckets[bucketNum].push(num)
    }
    
    let k = 0;
    for(let bucket of buckets) {
      const sortedItemsInBucket = bucket.sort();
      for(let i = 0; i < sortedItemsInBucket.length; i++) {
        arr[k++] = sortedItemsInBucket[i]
      }
    }
    
    return arr;
  }
  
  
  
  private swapper(arr: number[], index1: number, index2: number): void {
    const temp = arr[index1];
          arr[index1] = arr[index2];
          arr[index2] = temp; 
  }
  
  
}