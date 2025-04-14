export default class LinkedList {
  #nodes = [];
  constructor(...values) {
    this.#nodes.push(...values);
  }

  get length() {
    return this.#nodes.length;
  }

  append(char) {
    this.#nodes.push(char);
    return this;
  }

  insert(char, index) {
    if (index < 0 || index > this.#nodes.length) {
      throw new RangeError("Index out of bounds");
    }
    this.#nodes.splice(index, 0, char);

    return this;
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
    return this;
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

  toArray() {
    return [...this.#nodes];
  }
}
