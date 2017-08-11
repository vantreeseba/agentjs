var assert = require('chai').assert;
var Utils = require('../src/utils');

const test = {
  'Utils': {
    'pointIntersectsBox': {
      'should return true when point within box': () => {
        var point = [1, 1];
        var box = [0, 0, 64, 64];
        var within = Utils.pointIntersectsBox(point, box);
        assert.equal(within, true);
      },
      'should return false when point within box': () => {
        var point = [-10, -10];
        var box = [0, 0, 64, 64];
        var within = Utils.pointIntersectsBox(point, box);
        assert.equal(within, false);
      }
    },
  }
};

module.exports = test;
