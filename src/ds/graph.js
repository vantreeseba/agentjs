/**
 * Graph
 */
class Graph {
  /**
   * @return {undefined}
   */
  constructor() {
    this.nodes = [];
  }

  /**
   * @param value
   * @return {GraphNode}
   */
  push(value) {
    var node = new GraphNode(value);
    this.nodes.push(node);
    return node;
  }

  /**
   * @param {GraphNode} n1
   * @param {GraphNode} n2
   * @param {boolean} mutual
   * @return {undefined}
   */
  addEdge(n1, n2, cost, mutual) {
    n1.addEdge({node: n2, cost});
    if(mutual) {
      n2.addEdge({node: n1, cost});
    }
  }
}

/**
 * GraphNode
 */
class GraphNode {
  /**
   * @param value
   * @return {undefined}
   */
  constructor(value) {
    this.value = value;
    this.neighbors = [];
  }

  /**
   * @param {GraphNode} other
   * @return {undefined}
   */
  addEdge(other) {
    this.neighbors.push(other);
  }
}

module.exports = Graph;
