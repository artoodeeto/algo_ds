class Node<T> {
  private _label: T;
  private _edges = new Array<Edge<T>>();
  
  constructor(label: T) {
    this._label = label;
  }
  
  addEdge(to: Node<T>, weight: number): void {
    this._edges.push(new Edge(this, to, weight))
  }
  
  get label(): T {
    return this._label
  }
  
  getEdges(): Array<Edge<T>> {
    return this._edges
  }
}

class Edge<G> {
  from: Node<G>;
  to: Node<G>;
  weight: number;
  
  constructor(from: Node<G>, to: Node<G>, weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
  
  toString(): string {
    return `${this.to.label}`
  }
}

export class WeightedGraph<E> {
  private nodes: Map<E, Node<E>> = new Map();
  
  addNode(label: E): void {
    if(this.nodes.has(label)) return;
    this.nodes.set(label,new Node(label));
  }
  
  addEdge(from: E, to: E, weight: number): void {
    const fromNode  = this.nodes.get(from);
    const toNode    = this.nodes.get(to);
    
    if(!fromNode || !toNode) return;
    
    fromNode.addEdge(toNode, weight);
    toNode.addEdge(fromNode, weight);
  }
  
  toString(): void {
    for(const node of this.nodes.values()) {
      const edges = node.getEdges();
      console.log(`${node.label} connected to ${edges.toString()}`)
    }
  }
  
}