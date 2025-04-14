export default class LinkedList {
  #nodes;
  constructor() {
    this.#nodes = [];
  }

  get length() {
    return this.#nodes.length;
  }

  append(char) {
    this.#nodes.push(char);
  }

  insert(char, index) {
    if (index < 0 || index > this.#nodes.length) {
      throw new RangeError("Index out of bounds");
    }
    this.#nodes.splice(index, 0, char);
  }

  delete(index) {
    if (index < 0 || index >= this.#nodes.length) {
      throw new RangeError("Index out of bounds");
    }
    return this.#nodes.splice(index, 1)[0];
  }

  deleteAll(char) {
    this.#nodes = this.#nodes.filter((node) => node !== char);
  }

  get(index) {
    if (index < 0 || index >= this.#nodes.length) {
      throw new RangeError("Index out of bounds");
    }
    return this.#nodes[index];
  }

  clone() {
    const newList = new LinkedList();
    newList.#nodes = [...this.#nodes];
    return newList;
  }

  reverse() {
    this.#nodes.reverse();
  }

  findFirst(char) {
    return this.#nodes.indexOf(char);
  }

  findLast(char) {
    return this.#nodes.lastIndexOf(char);
  }

  clear() {
    this.#nodes = [];
  }

  extend(list) {
    this.#nodes.push(...list.#nodes);
  }
}
