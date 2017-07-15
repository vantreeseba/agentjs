var assert = require('chai').assert;
var Graph = require('../../src/ds/graph');
var AStart = require('../../src/pathfinding/astar');

let astar;
const test = {
  'AStar': {
    'beforeEach': () => {
      graph = new Graph();
    },
    'constructor' : {
      'should construct a new graph' : () => {
        assert.isOk(graph);
      }
    },
    'addNode':{
      'should add a node to the graph': () => {
        const n1 = graph.addNode(1);

        assert.isOk(n1);
        assert.equal(graph.nodes.length, 1);
      }
    },
    'addEdge': {
      'should add an edge from n1 to n2, but not n2 to n1 when non mutual' : () => {
        const n1 = graph.addNode(1);
        const n2 = graph.addNode(2);

        graph.addEdge(n1, n2);

        assert.isOk(n1);
        assert.isOk(n2);
        assert.equal(n1.neighbors.length, 1);
        assert.equal(n2.neighbors.length, 0);
      },
      'should add an edge from n1 to n2, and n2 to n1 when mutual' : () => {
        const n1 = graph.addNode(1);
        const n2 = graph.addNode(2);

        graph.addEdge(n1, n2, 0, true);

        assert.isOk(n1);
        assert.isOk(n2);
        assert.equal(n1.neighbors.length, 1);
        assert.equal(n2.neighbors.length, 1);
      }
    }
  }
};

module.exports = test;
