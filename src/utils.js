/**
 * Utils
 */
class Utils {
  /**
   * @static
   * @param {} point
   * @param {} box
   * @return {undefined}
   */
  static pointIntersectsBox(point, box) {
    return point[0] >= box[0] &&
      point[1] >= box[1] &&
      point[0] <= box[2] &&
      point[1] <= box[3];
  }
}

module.exports = Utils;
