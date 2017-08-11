const assert = require('chai').assert;
const QuadTree = require('../../src/ds/quadtree');

let quadtree;
const test = {
  'quadtree': {
    'beforeEach': () => {
      quadtree = new QuadTree(64);
    },
    'constructor' : {
      'should construct a new quadtree' : () => {
        assert.isOk(quadtree);
        assert.equal(quadtree.pos[0], -32);
        assert.equal(quadtree.pos[1], -32);
        assert.equal(quadtree.size, 64);
      }
    },
    'push':{
      'should add a point to the quadtree': () => {
        quadtree.push([16, 16]);
        assert.equal(quadtree.root.data.length, 1);
      }
    },
    'subdivide' : {
      'should split the quadtree when more than max points are in node' : () => {
        quadtree.push([-1, -1]);
        quadtree.push([-2, -2]);
        quadtree.push([3, 3]);
        quadtree.push([4, 4]);
        quadtree.push([24, 24]);

        const childCount = quadtree.root.children.length;
        assert.equal(childCount, 4);
        assert.isOk(quadtree.root.tl);
        assert.isOk(quadtree.root.tr);
        assert.isOk(quadtree.root.bl);
        assert.isOk(quadtree.root.br);
      }
    },
    'findNode':{
      'should return root when only 1 point is in quadtree': () => {
        quadtree.push([16, 16]);

        assert.equal(quadtree.root.data.length, 1);
        assert.equal(quadtree.findNode([16, 16]), quadtree.root);
      },
      'should return roots child when 5 points are in quadtree': () => {
        quadtree.push([1, 1]);
        quadtree.push([2, 1]);
        quadtree.push([3, 1]);
        quadtree.push([4, 1]);
        quadtree.push([32, 1]);

        assert.equal(quadtree.findNode([32, 1]), quadtree.root.br.tr);
      }
    },

  }
};

module.exports = test;
