export default class LinkedList {
  constructor() {}
}

class Node {
  value;
  prev;
  next;

  constructor(val, prev = null, next = null) {
    this.#initNode(val, prev, next);
  }

  #initNode(val, prev, next) {
    this.setValue(val);
    this.setPrev(prev);
    this.setNext(next);
  }

  setValue(val) {
    if (typeof val !== "string" || val.length > 1) return;
    this.value = val;
  }

  setNext(node) {
    if (!(node instanceof Node) && node !== null) return;
    this.next = node;
  }

  setPrev(node) {
    if (!(node instanceof Node) && node !== null) return;
    this.prev = node;
  }
}

const prevNode = new Node("a");
const nextNode = new Node("c");
const node = new Node("b", prevNode, nextNode);

prevNode.setNext(node);
nextNode.setPrev(node);

console.log(prevNode);
console.log(node);
console.log(nextNode);
