var Distance = require('./distance');
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
   * @param {Object} startNode
   * @return {Function} lowestCostFunction
   */
  _buildLowestCostFunction(startNode) {
    return (a, b) => {
      if(!a || !a.value) {
        return b;
      }

      if(!b || !b.value) {
        return a;
      }

      var aDist = Distance.getManhattanDistance(startNode.value, a.value);
      var bDist = Distance.getManhattanDistance(startNode.value, b.value);

      return aDist < bDist ? a : b;
    };
  }

  /**
   * @param {GraphNode} startNode
   * @param {GraphNode} endNode
   * @return {undefined}
   */
  find(startNode, endNode) {
    const openSet = [startNode];
    const closedSet = [];

    const notInClosed = n => !closedSet.find((x) => x == n.node) !== null;
    const notInOpenSet = n => !openSet.find((x) => x == n.node) !== null;
    const addToOpenSet = n => openSet.push(n.node);
    const getLowestCost = this._buildLowestCostFunction(startNode);

    // break if openSet is empty, no solution.
    while(openSet.length > 0) {
      let current = openSet.reduce(getLowestCost, null);

      if(!current) { 
        return null;
      }

      if(current === endNode){
        return current;
      }

      openSet.splice(openSet.indexOf(current), 1);
      closedSet.push(current);

      // loop through current neighbors, add to open set.
      current.neighbors
        .filter(notInClosed)
        .filter(notInOpenSet)
        .forEach(addToOpenSet);
    }

    return null;
  }
}

module.exports = AStarFinder;
