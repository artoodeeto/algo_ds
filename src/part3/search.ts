export class Search {

  linear(arr: number[], target: number): boolean {
  //   return arr.includes(target);
    
    for(const num of arr) {
      if(num === target) return true
    }
  
    return false
  }
  
  /**
   * Only works if array is sorted
   * @param arr 
   * @param target 
   * @returns 
   */
  binaryIterative(arr: number[], target: number): boolean{
    
    let start = 0;
    let end = arr.length - 1 ;
    while(start <= end) {    
      let mid = Math.floor((start + end) / 2);
      if(arr[mid] === target) return true;
      if(arr[mid] > target) end = mid - 1
      if(arr[mid] < target) start = mid + 1
    }
    return false;
  }
  
  /**
   * Only works if array is sorted
   * @param arr 
   * @param target 
   * @returns 
   */
  binaryRecursive(arr: number[], target: number): boolean {
    return this._binaryRecursive(arr, target, 0, arr.length - 1);
  }
  
  private _binaryRecursive(arr: number[], target: number, start: number, end: number): boolean {
  
    if(end < start) return false;
    
    const mid = Math.floor((start + end) / 2);
    
    if(arr[mid] === target) return true;
    if(arr[mid] > target) return this._binaryRecursive(arr, target, start, mid - 1)
    if(arr[mid] < target) return this._binaryRecursive(arr, target, mid + 1, end)

    return false
  }
  
  ternaryRecursive(arr: number[], target: number): boolean {
    return this._ternaryRecursive(arr, target, 0, arr.length - 1);
  }
  
  private _ternaryRecursive(arr: number[], target: number, start: number, end: number): boolean {
  
    if(start > end) return false;
  
    const partitionSize = Math.floor((end - start) / 3);
    const mid1 = start + partitionSize;
    const mid2 = end - partitionSize;
    
    if(target === arr[mid1] || target === arr[mid2]) return true;
        
    if(target < arr[mid1]) return this._ternaryRecursive(arr, target, start, mid1 - 1);
    
    if(target > arr[mid2]) return this._ternaryRecursive(arr, target, mid2 + 1, end);
    
    if(target > arr[mid1] && target < arr[mid2]) return this._ternaryRecursive(arr, target, mid1 + 1, mid2 - 1);
    
    return false;
  }
  
  jump(arr: number[], target: number): boolean {
    let blockSize = Math.floor(Math.sqrt(arr.length));
    let start = 0;
    let next = blockSize;
    
    while(start < arr.length && arr[next - 1] < target) {
      start = next;
      next += blockSize;
      if(next > arr.length) next = arr.length;
    }
    
    for(let i = start; i < next; i++) {
      if(arr[i] === target) return true;
    }
    
    return false;
  }

}