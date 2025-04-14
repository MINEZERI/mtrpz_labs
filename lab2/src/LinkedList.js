export default class LinkedList {
  #headNode = null;
  #tailNode = null;
  #length = 0;

  constructor(...values) {
    values.forEach((val) => {
      this.append(val);
    });
  }

  *[Symbol.iterator]() {
    let node = this.#headNode;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }

  static isValidList(list) {
    return list instanceof LinkedList;
  }

  get length() {
    return this.#length;
  }

  #isValidInsertIndex(index) {
    return index >= 0 && index <= this.length;
  }

  #isValidAccessIndex(index) {
    return index >= 0 && index < this.length;
  }

  at(index) {
    const len = this.length;
    if (len === 0) return;
    let normalizedIndex = index < 0 ? index + len : index;
    if (!this.#isValidAccessIndex(normalizedIndex)) {
      throw new RangeError(`Index out of bounds: ${index}`);
    }

    let node;
    if (normalizedIndex < len / 2) {
      node = this.#headNode;
      for (let i = 0; i < normalizedIndex; i++) {
        node = node.next;
      }
    } else {
      node = this.#tailNode;
      for (let i = len - 1; i > normalizedIndex; i--) {
        node = node.prev;
      }
    }

    return node;
  }

  append(char) {
    if (!Node.isValidValue(char))
      throw TypeError("Value must be a single character string");

    const newNode = new Node(char);
    if (!this.#headNode) {
      this.#headNode = newNode;
      this.#tailNode = newNode;

      this.#length++;

      return this;
    }

    this.#tailNode.next = newNode;
    newNode.prev = this.#tailNode;
    this.#tailNode = newNode;

    this.#length++;

    return this;
  }

  insert(char, index) {
    if (!Node.isValidValue(char))
      throw new TypeError("Value must be a single character string");
    if (!this.#isValidInsertIndex(index))
      throw new RangeError(`Index out of bounds: ${index}`);

    const newNode = new Node(char);
    let prevNode = null;
    let nextNode = null;

    if (this.length === 0) {
      this.#headNode = newNode;
      this.#tailNode = newNode;

      this.#length++;
      return this;
    }

    if (index === 0) {
      nextNode = this.#headNode;
      this.#headNode = newNode;
    } else if (index === this.length) {
      prevNode = this.#tailNode;
      this.#tailNode = newNode;
    } else {
      nextNode = this.at(index);
      prevNode = nextNode.prev;
    }

    newNode.prev = prevNode;
    newNode.next = nextNode;

    if (prevNode) prevNode.next = newNode;
    if (nextNode) nextNode.prev = newNode;

    this.#length++;

    return this;
  }

  #deleteNode(node) {
    if (!Node.isValidNode(node)) return;

    if (node.prev) {
      node.prev.next = node.next; // a < b <> c && a > c
    } else {
      this.#headNode = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev; // a < b > c && a < c
    } else {
      this.#tailNode = node.prev;
    }

    // node.prev = null;
    // node.next = null;

    this.#length--;
  }

  delete(index) {
    if (!this.#isValidAccessIndex(index))
      throw new RangeError(`Index out of bounds: ${index}`);

    const node = this.at(index); // a <> b <> c  ==>  a <> c

    this.#deleteNode(node);

    return node.value;
  }

  deleteAll(char) {
    if (!Node.isValidValue(char))
      throw new TypeError("Value must be a single character string");

    let node = this.#headNode;
    while (node) {
      const next = node.next;
      if (node.value === char) this.#deleteNode(node);

      node = next;
    }
  }

  get(index) {
    if (!this.#isValidAccessIndex(index))
      throw new RangeError(`Index out of bounds: ${index}`);

    return this.at(index).value;
  }

  clone() {
    return new LinkedList(...this);
  }

  reverse() {
    let node = this.#headNode;

    while (node) {
      const next = node.next;

      node.next = node.prev;
      node.prev = next;

      if (!node.next) this.#tailNode = node;
      if (!node.prev) this.#headNode = node;

      node = next;
    }

    return this;
  }

  findFirst(char) {
    if (!Node.isValidValue(char))
      throw new TypeError("Value must be a single character string");

    let node = this.#headNode,
      i = 1; // starting from 1st node

    while (node) {
      if (node.value === char) return i;

      node = node.next;
      i++;
    }

    return -1;
  }

  findLast(char) {
    if (!Node.isValidValue(char))
      throw new TypeError("Value must be a single character string");

    let node = this.#tailNode,
      i = 1; // starting from 1st node

    while (node) {
      if (node.value === char) return i;

      node = node.prev;
      i++;
    }

    return -1;
  }

  clear() {
    let leftNode = this.#headNode,
      rightNode = this.#tailNode;
    this.#headNode = null;
    this.#tailNode = null;

    while (leftNode || rightNode) {
      const next = leftNode.next === rightNode ? null : leftNode.next;
      const prev = rightNode.prev === leftNode ? null : rightNode.prev;

      [rightNode, leftNode].forEach((node) => {
        node.next = null;
        node.prev = null;
      });

      leftNode = next;
      rightNode = prev;
    }

    this.#length = 0;

    return this;
  }

  extend(list) {
    if (!LinkedList.isValidList(list))
      throw new TypeError("Invalid argument: expected a non-empty linked list");

    let node = list.at(0);

    while (node) {
      this.append(node.value);
      node = node.next;
    }

    return this;
  }

  toArray() {
    return new Array(...this);
  }
}

export class Node {
  #value;
  #prev = null;
  #next = null;

  constructor(value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }

  static isValidNode(node) {
    return node instanceof Node || node === null;
  }

  static isValidValue(val) {
    return typeof val === "string" && val.length === 1;
  }

  set value(value) {
    if (!Node.isValidValue(value)) return;
    this.#value = value;
  }

  set next(node) {
    if (!Node.isValidNode(node)) return;
    this.#next = node;
  }

  set prev(node) {
    if (!Node.isValidNode(node)) return;
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
