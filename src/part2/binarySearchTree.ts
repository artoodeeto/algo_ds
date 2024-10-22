class Node<E> {
  
  value;
  leftNode: Node<E> | null = null;
  rightNode: Node<E> | null = null;

  constructor(value: E) {
    this.value = value
  }
}

export class BST<G> {

  private root: Node<G> | null = null;


  insert(val: G): void {
    const node = new Node(val);

    if(!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;

    while(current) {

      if(val < current.value ) {
        if(!current.leftNode) {
          current.leftNode = node;
          break;
        }
        current = current.leftNode;
      }
      if(val > current.value ){
        if(!current.rightNode) {
          current.rightNode = node;
          break;
        }
        current = current.rightNode;
      }
    }
    
    // console.log('NODE:', current);
  }

  find(val: G): Node<G> | null {
    let current = this.root;

    while(current) {

      if(val <= current.value ) {
        if(val === current.value) return current
        if(!current.leftNode) break;
        current = current.leftNode;
      }
      if(val >= current.value ){
        if(val === current.value) return current;
        if(!current.rightNode) break
        current = current.rightNode;
      }
    }

    return null
  }

  /**
   * PRE ORDER TRAVERSAL
   */
  depthFirstTraversalPreOrder(): void {
    this._depthFirstTraversalPreOrder(this.root)
  }

  private _depthFirstTraversalPreOrder(node: Node<G> | null): void {
    if(!node) return;

    console.log(`VALUE:${node.value}`)
    this._depthFirstTraversalPreOrder(node.leftNode)
    this._depthFirstTraversalPreOrder(node.rightNode)
  }

  /**
   * IN ORDER TRAVERSAL
   */
  depthFirstTraversalInOrder(): void {
    this._depthFirstTraversalInOrder(this.root)
  }

  private _depthFirstTraversalInOrder(node: Node<G> | null): void {
    if(!node) return;

    this._depthFirstTraversalInOrder(node.leftNode)
    console.log(`VALUE:${node.value}`)
    this._depthFirstTraversalInOrder(node.rightNode)
  }

  /**
   * POST ORDER TRAVERSAL
   */
  depthFirstTraversalPostOrder(): void {
    this._depthFirstTraversalPostOrder(this.root)
  }

  private _depthFirstTraversalPostOrder(node: Node<G> | null): void {
    if(!node) return;

    this._depthFirstTraversalPostOrder(node.leftNode)
    this._depthFirstTraversalPostOrder(node.rightNode)
    console.log(`VALUE:${node.value}`)
  }

  height(): number {
    return this._height(this.root);
  }

  private _height(node: Node<G> | null): number {
    // just guard for checking if node is empty because typescript will throw tantrums if not checked
    if(!node) return -1
    // if you only check for an empty node like above and return 0,
    // then the return value would additional 1 because left node or right node
    // the only condition for a 0 to return is both left and right node are empty
    if(node.leftNode === null && node.rightNode === null) return 0 
    return 1 + Math.max(this._height(node.leftNode), this._height(node.rightNode))
  }

  minBST(): number {
    const root = this.root
    if(!root) return 0;

    let current: Node<G> | null = root;
    let last = current;

    while(current) {
      last = current;
      current = current.leftNode;
    }
    // @ts-ignore
    return last.value;
  }

  /**
   * Minimum value with BINARY TREE NOT BST
   * @returns 
   */
  minVal(): number {
    return this._minVal(this.root);
  }

  private _minVal(node: Node<G> | null): number {
    if(!node) return Number.MAX_SAFE_INTEGER;
    
    // @ts-ignore
    if(node.leftNode === null && node.rightNode === null) return node.value

    const left = this._minVal(node.leftNode);
    const right = this._minVal(node.rightNode);
    // @ts-ignore
    return Math.min(node.value, Math.min(left, right))
    // return Math.min(this._minVal(node.leftNode), this._minVal(node.rightNode));
  }

  /**
   * check if all sides have the same depth
   * @returns 
   */
  isEqual(): boolean { 
    return this._isEqual(this.root)
  }

  private _isEqual(node: Node<G> | null): boolean {
    if(!node) return false
    if(node.leftNode && node.rightNode){
      return this._isEqual(node.leftNode) && this._isEqual(node.rightNode)
    } else if (!this.isLeaf(node)) {
      return false;
    }
    return true;
  }

  /**
   * check if its a binary search tree or binary tree
   */
  isBST(): boolean {
    return this._isBST(this.root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
  }

  private _isBST(node: Node<G> | null, min: number, max: number): boolean {
    if(!node) return true;

    // @ts-ignore type checking error
    if(node.value < min || node.value > max) return false;
    // @ts-ignore
    return  this._isBST(node.leftNode, min, node.value - 1) && this._isBST(node.rightNode, node.value + 1, max)

  }

  distanceAtKNode(distance: number): Array<G>{
    const container: Array<G> = [];
    this._distanceAtKNode(this.root, distance, container);
    return container;
  }

  private _distanceAtKNode(node: Node<G> | null, distance: number, container: Array<G>): void {

    if(!node) return
    
    if(distance <= 0 ) {
      // console.log(`NODE DISTANCE:${node.value}`);
      container.push(node.value)
      return
    }
    this._distanceAtKNode(node.leftNode, distance - 1, container)
    this._distanceAtKNode(node.rightNode, distance - 1, container)

  }

  levelOrderTraversal() {
    for(let i=0; i <= this.height(); i++) {
      for(let val of this.distanceAtKNode(i)) {
        console.log(`Level Order Traversal${val}`)
      }
    }
  }

  private isLeaf(node: Node<G> ): boolean {
    return !node.leftNode && !node.rightNode;
  }

  log(): void {
    if(this.root) this.print(this.root, 'The Root:')
  }

  testingIsBST() {
    const temp = this.root?.leftNode;
    // @ts-ignore
    this.root.leftNode = this.root.rightNode;
    // @ts-ignore
    this.root.rightNode = temp
  }

  private print(node: Node<G>, str: string): void {


    if(!node) return;

    if(node) console.log(`${str}: ${node.value}`);
    // @ts-ignore
    this.print(node.leftNode, 'LEFT NODE:')
    // @ts-ignore
    this.print(node.rightNode, 'RIGHT NODE:')
    // console.log('------------------------');
    // console.log('ROOT', this.root);
  }

  
}