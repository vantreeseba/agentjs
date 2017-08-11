var assert = require('chai').assert;
var Distance = require('../../src/pathfinding/distance');

const test = {
  'Distance': {
    'getManhattanDistance': {
      'should return the manhattan distance': () => {
        var a = {x:0, y:0}
        var b = {x:1, y:1}

        var dist = Distance.getManhattanDistance(a,b);
        assert.equal(dist, 2);
      }
    },
  }
};

module.exports = test;
