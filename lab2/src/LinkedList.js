export default class LinkedList {
  constructor() {}
}

export class Node {
  #value;
  #prev = null;
  #next = null;

  constructor(val, prev = null, next = null) {
    this.#initNode(val, prev, next);
  }

  #initNode(val, prev, next) {
    this.value = val;
    this.prev = prev;
    this.next = next;
  }

  set value(val) {
    if (typeof val !== "string" || val.length > 1) return;
    this.#value = val;
  }

  set next(node) {
    if (!(node instanceof Node) && node !== null) return;
    this.#next = node;
  }

  set prev(node) {
    if (!(node instanceof Node) && node !== null) return;
    this.#prev = node;
  }

  get value() {
    return this.#value;
  }

  get next() {
    return this.#next;
  }

  get prev() {
    return this.#prev;
  }

  toJSON() {
    return {
      value: this.value,
      prev: this.prev ? this.prev.value : null,
      next: this.next ? this.next.value : null,
    };
  }
}

// const prevNode = new Node("a");
// const nextNode = new Node("c");
// const node = new Node("b", prevNode, nextNode);
//
// prevNode.next = node;
// nextNode.prev = node;
//
// console.log(prevNode.value, prevNode.next, prevNode.prev);
// console.log(node.value, node.next, node.prev);
// console.log(nextNode.value, nextNode.next, nextNode.prev);
//
// const badNode = new Node("x", undefined, undefined);
// console.log(badNode.value, badNode.next, badNode.prev);
//
// console.log(JSON.stringify(node));
// console.log(JSON.parse(JSON.stringify(node)));
