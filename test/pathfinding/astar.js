var assert = require('chai').assert;
var Graph = require('../../src/ds/graph');
var AStarFinder = require('../../src/pathfinding/astarfinder');

let astar;
let graph;
const test = {
  'AStarFinder': {
    'beforeEach': () => {
      graph = new Graph();
      astar = new AStarFinder(graph);
    },
    'constructor' : {
      'should construct a astar finder' : () => {
        assert.isOk(astar);
      }
    },
    '_buildLowestCostFunction':{
      'should return a function': () => {
        var func = astar._buildLowestCostFunction();

        assert.isOk(func);
        assert.equal(typeof func, 'function');
      },
      'returned function should calculate lowest cost': () => {
        var startNode = {value: {x:0, y:0}};
        var func = astar._buildLowestCostFunction(startNode);

        var node1 = {value:{x:1, y:1}};
        var node2 = {value:{x:100, y:1}};

        var closest = func(node1, node2);

        assert.equal(closest, node1);
      },
      'returned function should return b when a is null': () => {
        var startNode = {value: {x:0, y:0}};
        var func = astar._buildLowestCostFunction(startNode);

        var node1 = null;
        var node2 = {value:{x:100, y:1}};

        var closest = func(node1, node2);

        assert.equal(closest, node2);
      },
      'returned function should return a when b is null': () => {
        var startNode = {value: {x:0, y:0}};
        var func = astar._buildLowestCostFunction(startNode);

        var node1 = {value: {x:1, y:1}};
        var node2 = null;

        var closest = func(node1, node2);

        assert.equal(closest, node1);
      }
    },
    'find' : {
      'should return null when no path exists' : () => {
        var node = astar.find(null, null);

        assert.equal(null, node);
      },
      'should return start when start is only node' : () => {
        var start = graph.push({x:0, y:0});
        var node = astar.find(start, start);

        assert.equal(start, node);
      },
      'should return end when end is only other node' : () => {
        var start = graph.push({x:0, y:0});
        var end = graph.push({x:1, y:1});
        graph.addEdge(start, end);

        var node = astar.find(start, end);

        assert.equal(end, node);
      },
      'should return return shortest path' : () => {
        var start = graph.push({x:0, y:0});
        var n1 = graph.push({x:5, y:5});
        var n2 = graph.push({x:100, y:100});
        var end = graph.push({x:10, y:10});

        graph.addEdge(start, n1);
        graph.addEdge(start, n2);
        graph.addEdge(n1, end);
        graph.addEdge(n2, end);

        var node = astar.find(start, end);

        assert.equal(end, node);
      }

    },
  }
};

module.exports = test;
