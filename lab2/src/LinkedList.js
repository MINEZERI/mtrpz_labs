export default class LinkedList {
  #headNode = null;
  #tailNode = null;
  #length = 0;

  constructor() {}

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
    let normalizedIndex = index < 0 ? index + this.length : index;
    if (!this.#isValidAccessIndex(normalizedIndex))
      throw new RangeError(`index out of bounds: ${index}`);
    const len = this.length;

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
      return this.#length++;
    }

    this.#tailNode.next = newNode;
    newNode.prev = this.#tailNode;
    this.#tailNode = newNode;

    this.#length++;
  }

  insert(char, index) {
    if (!Node.isValidValue(char))
      throw new TypeError("Value must be a single character string");
    if (!this.#isValidInsertIndex(index))
      throw new RangeError(`index out of bounds: ${index}`);

    const newNode = new Node(char);

    if (index === 0) {
      if (this.#headNode) {
        newNode.next = this.#headNode;
        this.#headNode.prev = newNode;
      }

      this.#headNode = newNode;
      return this.#length++;
    }

    if (index === this.length) {
      this.#tailNode.next = newNode;
      newNode.prev = this.#tailNode;
      this.#tailNode = newNode;
      return this.#length++;
    }

    let node = this.at(index);
    newNode.prev = node.prev;
    newNode.next = node;
    node.prev.next = newNode;
    node.prev = newNode;

    this.#length++;
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
      throw new RangeError(`index out of bounds: ${index}`);

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
      throw new RangeError(`index out of bounds: ${index}`);

    let node = this.at(index);
    return node.value;
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
