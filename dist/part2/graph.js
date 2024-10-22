"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
const linked_list_1 = require("../part1/linked_list");
class Node {
    constructor(data) {
        this.data = null;
        this.data = data;
    }
}
class Graph {
    constructor() {
        this.nodeContainer = new Map();
        this.edgeContainer = new Map();
    }
    addNode(label) {
        if (this.nodeContainer.has(label))
            return;
        const node = new Node(label);
        this.nodeContainer.set(label, node);
        this.edgeContainer.set(node, new linked_list_1.LinkedList());
    }
    removeNode(label) {
        const node = this.nodeContainer.get(label);
        if (!node)
            return;
        this.nodeContainer.delete(label);
        this.edgeContainer.forEach((list, _) => {
            list.removeNodeWithData(node);
        });
        this.edgeContainer.delete(node);
    }
    addEdge(from, to) {
        const nodeFrom = this.nodeContainer.get(from);
        const nodeTo = this.nodeContainer.get(to);
        if (!nodeFrom || !nodeTo)
            return;
        const nodeFromList = this.edgeContainer.get(nodeFrom);
        const containsFromNode = nodeFromList === null || nodeFromList === void 0 ? void 0 : nodeFromList.contains(nodeTo);
        if (!containsFromNode)
            nodeFromList === null || nodeFromList === void 0 ? void 0 : nodeFromList.addLast(nodeTo);
    }
    removeEdge(from, to) {
        const nodeFrom = this.nodeContainer.get(from);
        const nodeTo = this.nodeContainer.get(to);
        if (!nodeFrom || !nodeTo)
            return;
        const nodeFromList = this.edgeContainer.get(nodeFrom);
        const containsFromNode = nodeFromList === null || nodeFromList === void 0 ? void 0 : nodeFromList.contains(nodeTo);
        if (containsFromNode)
            nodeFromList === null || nodeFromList === void 0 ? void 0 : nodeFromList.removeNodeWithData(nodeTo);
    }
    print() {
        this.nodeContainer.forEach((node, label) => {
            var _a;
            let current = this.edgeContainer.get(node);
            let edges = [];
            while (current) {
                edges.push((_a = current.data) === null || _a === void 0 ? void 0 : _a.data);
                current = current.next;
            }
            console.log(`${label} is connected to ${edges}`);
            edges = [];
        });
    }
    depthFirstSearch() {
        const node = this.nodeContainer.values();
        node.next().value;
        node.next().value;
        const visitedNodes = new Set();
        this._depthFirstSearch(node.next().value, visitedNodes);
    }
    _depthFirstSearch(node, visitedNodes) {
        if (!node)
            return;
        if (visitedNodes.has(node))
            return;
        console.log(`DFS: ${node.data}`);
        visitedNodes.add(node);
        let list = this.edgeContainer.get(node);
        while (list) {
            const data = list.data;
            if (!data)
                return;
            this._depthFirstSearch(data, visitedNodes);
            list = list.next;
        }
    }
    breadthFirstSearch(label) {
        const queue = [];
        const visitedNodes = new Set();
        let node = this.nodeContainer.get(label);
        if (!node || !(node === null || node === void 0 ? void 0 : node.data))
            return;
        queue.push(node);
        while (queue.length !== 0) {
            const data = queue.shift();
            if (!data)
                return;
            console.log(`BFS: ${data.data}`);
            let list = this.edgeContainer.get(data);
            while (list) {
                if (!list.data || visitedNodes.has(list.data)) {
                    if (!list.next)
                        break;
                    list = list === null || list === void 0 ? void 0 : list.next;
                }
                if (!(list === null || list === void 0 ? void 0 : list.data))
                    break;
                visitedNodes.add(list.data);
                queue.push(list.data);
                list = list === null || list === void 0 ? void 0 : list.next;
            }
        }
    }
    _breadthFirstSearch() {
    }
}
exports.Graph = Graph;
//# sourceMappingURL=graph.js.map