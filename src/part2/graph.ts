import { LinkedList } from "../part1/linked_list";

class Node<G> {
  data: G | null = null;
  
  constructor(data: G) {
    this.data = data;
  }
}

export class Graph<T> {
  
  private nodeContainer: Map<T, Node<T>> = new Map();
  private edgeContainer: Map<Node<T>, LinkedList<Node<T>>> = new Map();
  
  addNode(label: T): void {
    if(this.nodeContainer.has(label)) return;
    const node = new Node(label)
    
    this.nodeContainer.set(label, node);
    this.edgeContainer.set(node, new LinkedList<Node<T>>())
  }
  
  removeNode(label: T): void {
    const node = this.nodeContainer.get(label);    

    if(!node) return;
    
    this.nodeContainer.delete(label);
    
    this.edgeContainer.forEach( (list, _) => {
      list.removeNodeWithData(node)  
    })
    
    this.edgeContainer.delete(node)
  }
  
  addEdge(from: T, to: T): void {
    
    const nodeFrom = this.nodeContainer.get(from);
    const nodeTo = this.nodeContainer.get(to);
    
    if(!nodeFrom || !nodeTo) return;
    
    const nodeFromList = this.edgeContainer.get(nodeFrom);    
    const containsFromNode = nodeFromList?.contains(nodeTo);
    
    if(!containsFromNode)
      nodeFromList?.addLast(nodeTo)
    
  }
  
  removeEdge(from: T, to: T): void {
  
    const nodeFrom = this.nodeContainer.get(from);
    const nodeTo = this.nodeContainer.get(to);
    
    if(!nodeFrom || !nodeTo) return;
    
    const nodeFromList = this.edgeContainer.get(nodeFrom);    
    const containsFromNode = nodeFromList?.contains(nodeTo);
  
    if(containsFromNode)
      nodeFromList?.removeNodeWithData(nodeTo)
  }
  
  print(): void {
  
    this.nodeContainer.forEach( (node, label) => {
      // console.log(`${label}: ${this.edgeContainer.get(node)?)}`)
      let  current: any = this.edgeContainer.get(node)
      let edges = []
      while(current) {
        edges.push(current.data?.data)
        current = current.next
      }
      console.log(`${label} is connected to ${edges}`);
      edges = []
    })
  }
  
  depthFirstSearch(): void {
    const node = this.nodeContainer.values();
    node.next().value
    node.next().value
    const visitedNodes = new Set<Node<T>>()
    this._depthFirstSearch(node.next().value, visitedNodes);
  }
  
  private _depthFirstSearch(node: Node<T>, visitedNodes: Set<Node<T>>): void {
    if(!node) return;
    if(visitedNodes.has(node)) return
    
    console.log(`DFS: ${node.data}`)
    visitedNodes.add(node)
      
    let list = this.edgeContainer.get(node);
    
    
    while(list) {
      const data: Node<T> | undefined = list.data
      if(!data) return;
      this._depthFirstSearch(data, visitedNodes)
      // @ts-ignore
      list = list.next;
    }
  }
  
  breadthFirstSearch(label: T): void {
    const queue: Array<Node<T>> = [];
    const visitedNodes: Set<Node<T>> = new Set();
    let node: Node<T> | undefined = this.nodeContainer.get(label);
    
    if(!node || !node?.data) return;
    
    queue.push(node);
    
    while(queue.length !== 0) {
      const data = queue.shift();
      
      if(!data) return;
      
      console.log(`BFS: ${data.data}`)
      
      let list = this.edgeContainer.get(data);
      
      while(list) {
        // @ts-ignore
        // console.log('asdf',visitedNodes.has(list?.data), list?.data)
        if(!list.data || visitedNodes.has(list.data)) {
          if(!list.next) break
          // @ts-ignore
          list = list?.next;
        }
        
        if(!list?.data) break;
        
        visitedNodes.add(list.data);
        queue.push(list.data)
        
  
        // @ts-ignore
        list = list?.next;
        
      }
    
    }
    
    
  }
  
  private _breadthFirstSearch(): void {
    
    
  
  }
  
  
}