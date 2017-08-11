/**
 * Distance
 */
class Distance {
  /**
   * getManhattanDistance
   *
   * @static
   * @param  {Object} a 
   * @param  {Object} b 
   * @return {Number} distance
   */
  static getManhattanDistance(a,b){
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
}

module.exports = Distance;
