const utils = require('../utils');
/**
 * QuadTree
 */
class QuadTree {
  /**
   * @param {Number} originX
   * @param {Number} originY
   * @param {Number} size
   * @return {Object} quadtree
   */
  constructor(size, pos = [-size/2, -size/2]) {
    this.maxPointsInNode = 4;
    this.pos = pos;
    this.size = size;
    this.root = new QuadTreeNode(this.pos, this.size, this);
  }

  /**
   * @return {undefined}
   */
  push(point) {
    this.root.push(point);
  }

  /**
   * findNode
   *
   * @param {} point
   * @return {undefined}
   */
  findNode(point) {
    return this.root.findNode(point);
  }
}

/**
 * QuadTreeNode
 */
class QuadTreeNode {
  /**
   * @param {Array} pos
   * @param {Number} size
   * @return {Object} quadtreenode
   */
  constructor(pos, size, tree) {
    this.size = size;
    this._data = [];
    this.children = [];
    this.tree = tree;
    this.pos = pos;

    this.box = [this.pos[0], this.pos[1], this.pos[0] + this.size, this.pos[1] + this.size];
  }

  /**
   * @return {Array}
   */
  get data() {
    if(this.children.length === 0) {
      return this._data;
    }
    return this.children
      .reduce((acc, c) => {
        return acc.concat(c.data);
      }, []);
  }

  /**
   * @param {Array} arr
   * @return {undefined}
   */
  set data(arr) {
    this._data = arr;
    if(this._data.length > this.tree.maxPointsInNode){
      this.subdivide();
    }
  }

  get tl(){
    return this.children[0];
  }
  get tr(){
    return this.children[1];
  }
  get bl(){
    return this.children[2];
  }
  get br(){
    return this.children[3];
  }

  /**
   * @param {Array} point
   * @return {undefined}
   */
  push(point) {
    if(this.children.length) {
      // TODO: push data into children
    } else {
      this.data.push(point);
    }

    if(this.data.length > this.tree.maxPointsInNode) {
      this.subdivide();
    }
  }

  /**
   * @return {undefined}
   */
  subdivide() {
    const half = this.size / 2;
    const tl = [this.pos[0], this.pos[1]];
    const tr = [this.pos[0] + half, this.pos[1]];
    const bl = [this.pos[0], this.pos[1] + half];
    const br = [this.pos[0] + half, this.pos[1] + half];

    this.children[0] = new QuadTreeNode(tl, half, this.tree);
    this.children[1] = new QuadTreeNode(tr, half, this.tree);
    this.children[2] = new QuadTreeNode(bl, half, this.tree);
    this.children[3] = new QuadTreeNode(br, half, this.tree);

    this.tl.data = this._data.filter(x => utils.pointIntersectsBox(x, this.tl.box));
    this.tr.data = this._data.filter(x => utils.pointIntersectsBox(x, this.tr.box));
    this.bl.data = this._data.filter(x => utils.pointIntersectsBox(x, this.bl.box));
    this.br.data = this._data.filter(x => utils.pointIntersectsBox(x, this.br.box));

    this._data.length = 0;
  }

  /**
   * @param {Array} point
   * @return {undefined}
   */
  findNode(point) {
    if(this._data.find(x => x[0] === point[0] && x[1] === point[1])) {
      return this;
    }

    return this.children
      .reduce((acc, c) => {
        return acc || c.findNode(point);
      }, undefined);
  }
}

module.exports = QuadTree;
