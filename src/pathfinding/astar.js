/**
 * AStarFinder
 */
class AStarFinder {
  /**
   * @param {Graph} graph
   * @return {undefined}
   */
  constructor(graph) {
    this.graph = graph;
  }

  /**
   * @param  {GraphNode}  a
   * @param  {GraphNode}  b
   * @return {Number} cost
   */
  _getLowestCost(a, b) {
    return a > b;
  }

  /**
   * @param {GraphNode} startNode
   * @param {GraphNode} endNode
   * @return {undefined}
   */
  find(startNode, endNode) {
    const openSet = [];
    const closedSet = [];
    const notInClosed = n => !closedSet.contains(n);
    const addToOpenSet = n => openSet.push(n);

    // break if openSet is empty, no solution.
    while(openSet.length > 0) {
      let current = openSet.reduce(this._getLowestCost, null);

      if(current === endNode){
        console.log('done');
      }

      // openSet.remove(current);
      closedSet.push(current);

      // loop through current neighbors, add to open set.
      current.neighbors
        .filter(notInClosed)
        .forEach(addToOpenSet);
    }
  }
}
