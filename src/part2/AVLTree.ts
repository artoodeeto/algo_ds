class Node<T> {
  
  value;
  leftNode: Node<T> | null = null;
  rightNode: Node<T> | null = null;
  height: number = 0;

  constructor(value: T) {
    this.value = value
  }
}

export class AVLTree<G> {
  private root: Node<G> | null = null;

  insert(val: G): void {
    // this._insert(this.root, val);
    this.root = this._insert(this.root, val)
    console.log('');
  }

  private _insert(node: Node<G> | null, val: G): Node<G> {
    
    const newNode = new Node(val)

    if(!node) {
      this.root = newNode;
      // return;
      return new Node(val)
    }


    if(val < node.value) {
      // if(!node.leftNode) node.leftNode = newNode;
      // this._insert(node.leftNode, val);
      node.leftNode = this._insert(node.leftNode, val);
    }
    if(val > node.value ) {
      // if(!node.rightNode) node.rightNode = newNode;
      // this._insert(node.rightNode, val)
      node.rightNode = this._insert(node.rightNode, val)
    }

    // node.height = Math.max(this._height(node.leftNode), this._height(node.rightNode)) + 1;
    // away of getting the height of each node.
    node.height = Math.max(this.height2(node.leftNode), this.height2(node.rightNode)) + 1;
    
    return this.balance(node)
  }
  
  private balance(node: Node<G>): Node<G> {
    
    // balance factor. we are trying to see of nodes are balance
    // balanceFactor = height(L) - height(R)
    // > 1 = left heavy
    // < -1 = right heavy

    if(this.isLeftHeavy(node)) {
      // console.log(`LEFT HEAVY: ${node.value}`)
      if(this.balanceFactor(node.leftNode) < 0) {
        // left rotate on node.leftNode
        // console.log(`LEFT ROTATE:--- ${node.leftNode?.value}`)
        // @ts-ignore
        node.leftNode = this.leftRotate(node.leftNode)
      }
      // do a right rate on current node
      // console.log(`RIGHT ROTATE: ${node.value}`);
      return this.rightRotate(node)
      
    } else if(this.isRightHeavy(node)) {
      // console.log(`RIGHT HEAVY: ${node.value}`)
      if(this.balanceFactor(node.rightNode) > 0) {
        // right rotate on node.rightNode
        // console.log(`RIGHT ROTATE:--- ${node.rightNode?.value}`)
        // @ts-ignore
        node.rightNode =  this.rightRotate(node.rightNode)
      }
      // do a left rotate on current node
      // console.log(`LEFT ROTATE: ${node.value}`);
      return this.leftRotate(node)
    }
    
    return node
  }
  
  private leftRotate(node: Node<G>): Node<G> {
    const temp = node.rightNode;
    // @ts-ignore
    node.rightNode = temp?.leftNode
    // @ts-ignore
    temp.leftNode = node
    // this.root = temp;
    node.height = this._height(node)
    // @ts-ignore
    temp.height = this._height(temp);
    //  @ts-ignore
    return temp;
  }
  
  private rightRotate(node: Node<G>): Node<G> {
    const temp = node.leftNode;
    // @ts-ignore
    node.leftNode = temp?.rightNode
    // @ts-ignore
    temp.rightNode = node
    // this.root = temp;
    node.height = this._height(node)
    // @ts-ignore
    temp.height = this._height(temp);
    //  @ts-ignore
    return temp;
  }

  private isLeftHeavy(node: Node<G> | null): boolean {
    return this.balanceFactor(node) > 1;
  }

  private isRightHeavy(node: Node<G> | null): boolean {
    return this.balanceFactor(node) < -1;
  }

  private balanceFactor(node: Node<G> | null): number {
    return !node ? 0 : this.height2(node.leftNode) - this.height2(node.rightNode);
  }

  private height2(node: Node<G> | null): number {
    return !node ? -1 : node.height;
  }

  get height(): number {
    return this._height(this.root);
  }

  private _height(node: Node<G> | null): number {
    if(!node) return -1;

    if(this.isLeaf(node)) return 0;

    return 1 + Math.max(this._height(node.leftNode), this._height(node.rightNode))
  }

  private isLeaf(node: Node<G>): boolean {
    return !node.leftNode && !node.rightNode;
  }

  log() {
    this._log(this.root)
  }

  private _log(node: Node<G> | null): void {

    if(!node) return 

    console.log(`VALUE:${node.value}`)

    this._log(node.leftNode)
    this._log(node.rightNode)
  }



}