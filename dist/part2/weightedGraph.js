"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightedGraph = void 0;
class Node {
    constructor(label) {
        this._edges = new Array();
        this._label = label;
    }
    addEdge(to, weight) {
        this._edges.push(new Edge(this, to, weight));
    }
    get label() {
        return this._label;
    }
    getEdges() {
        return this._edges;
    }
}
class Edge {
    constructor(from, to, weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
    toString() {
        return `${this.to.label}`;
    }
}
class WeightedGraph {
    constructor() {
        this.nodes = new Map();
    }
    addNode(label) {
        if (this.nodes.has(label))
            return;
        this.nodes.set(label, new Node(label));
    }
    addEdge(from, to, weight) {
        const fromNode = this.nodes.get(from);
        const toNode = this.nodes.get(to);
        if (!fromNode || !toNode)
            return;
        fromNode.addEdge(toNode, weight);
        toNode.addEdge(fromNode, weight);
    }
    toString() {
        for (const node of this.nodes.values()) {
            const edges = node.getEdges();
            console.log(`${node.label} connected to ${edges.toString()}`);
        }
    }
}
exports.WeightedGraph = WeightedGraph;
//# sourceMappingURL=weightedGraph.js.map