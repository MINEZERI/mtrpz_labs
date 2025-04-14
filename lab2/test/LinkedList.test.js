import LinkedList from "../src/ArrayLinkedList.js";

describe("Linked List", () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  test("length method", () => {
    const len1 = list.length;
    list.append("a").append("b");
    const len2 = list.length;

    expect(len1).toBe(0);
    expect(len2).toBe(2);
  });

  describe("append method", () => {
    test("adds items to the end", () => {
      list.append("a").append("b").append("c");
      expect(list.toArray()).toEqual(["a", "b", "c"]);
    });

    test("updates length correctly", () => {
      list.append("a").append("b");
      expect(list.length).toBe(2);
    });
  });

  describe("insert method", () => {
    test("throws on invalid index", () => {
      expect(() => list.insert("a", 2)).toThrow(RangeError);
    });

    test("inserts into empty list", () => {
      list.insert("a", 0);
      expect(list.toArray()).toEqual(["a"]);
    });

    test("inserts at end", () => {
      list.insert("a", 0).insert("b", 1);
      expect(list.toArray()).toEqual(["a", "b"]);
    });

    test("inserts at beginning of non-empty list", () => {
      list.insert("a", 0).insert("b", 1).insert("c", 0);
      expect(list.toArray()).toEqual(["c", "a", "b"]);
    });

    test("inserts in middle of list", () => {
      list.insert("a", 0).insert("b", 1).insert("c", 0).insert("d", 1);
      expect(list.toArray()).toEqual(["c", "d", "a", "b"]);
    });
  });

  describe("delete method", () => {
    test("deletes node", () => {
      list.append("a").append("b");
      const val = list.delete(0);

      expect(val).toBe("a");
      expect(list.toArray()).toEqual(["b"]);
    });

    test("throws on invalid index", () => {
      expect(() => list.delete(4)).toThrow(RangeError);
    });
  });

  describe("deleteAll method", () => {
    test("deletes all matching nodes", () => {
      list.append("a").append("b").append("a").append("c").append("a");
      list.deleteAll("a");
      expect(list.toArray()).not.toContain("a");
    });
  });

  describe("get method", () => {
    test("returns correct value at index", () => {
      list.append("a").append("b").append("c");
      expect(list.get(2)).toBe("c");
    });

    test("throws on invalid index", () => {
      expect(() => list.get(4)).toThrow(RangeError);
    });
  });

  describe("clone method", () => {
    test("creates a deep copy of the list", () => {
      const clonedList = list.append("a").append("b").clone();

      expect(clonedList).toStrictEqual(list);
      expect(clonedList.length).toBe(list.length);
    });

    test("cloned list is not the same list", () => {
      const clonedList = list.append("a").append("b").clone();

      expect(clonedList).not.toBe(list);
    });
  });

  describe("reverse method", () => {
    test("reverses the list correctly", () => {
      list.append("a").append("b").append("c").reverse();

      expect(list.toArray()).toEqual(["c", "b", "a"]);
    });

    test("reverse on empty list works correctly", () => {
      expect(list.reverse().toArray()).toEqual([]);
    });

    test("reverse on single element does not change list", () => {
      list.append("a").reverse();
      expect(list.toArray()).toEqual(["a"]);
    });
  });

  describe("findFirst method", () => {
    test("finds the node by char", () => {
      list.append("a").append("b").append("c");
      const index = list.findFirst("a");

      expect(index).toBe(0);
    });

    test("returns -1 if char is not in the list", () => {
      list.append("a");
      const index = list.findFirst("b");

      expect(index).toBe(-1);
    });

    test("found node is first", () => {
      list.append("a").append("b").append("a");
      const index = list.findFirst("a");
      list.delete(index);

      expect(list.toArray()).toEqual(["b", "a"]);
    });
  });

  describe("findLast method", () => {
    test("finds the node by char", () => {
      list.append("a").append("b").append("c");
      const index = list.findLast("a");

      expect(index).toBe(0);
    });

    test("returns -1 if char is not in the list", () => {
      list.append("a");
      const index = list.findLast("b");

      expect(index).toBe(-1);
    });

    test("found node is last", () => {
      list.append("a").append("b").append("a");
      const index = list.findLast("a");
      list.delete(index);

      expect(list.toArray()).toEqual(["a", "b"]);
    });
  });

  describe("clear method", () => {
    test("deletes all nodes", () => {
      list.append("a").append("b").append("c").append("d");
      expect(list.toArray()).toEqual(["a", "b", "c", "d"]);

      list.clear();
      expect(list.toArray()).toEqual([]);
    });

    test("length changes properly", () => {
      list.append("a");
      expect(list.length).toBe(1);

      list.clear();
      expect(list.length).toBe(0);
    });
  });

  describe("extend method", () => {
    test("appends all nodes from the 2nd list", () => {
      list.append("a");
      const secondList = new LinkedList("b", "c", "d");
      list.extend(secondList);

      expect(list.toArray()).toEqual(["a", "b", "c", "d"]);
    });

    test("changes in 2nd list does not affect 1st list", () => {
      list.append("a");
      const secondList = new LinkedList("b");
      list.extend(secondList);
      secondList.append("c");

      expect(list.toArray()).toEqual(["a", "b"]);
    });

    test("updates length properly", () => {
      list.append("a");
      expect(list.length).toBe(1);

      const secondList = new LinkedList("b", "c");
      list.extend(secondList);
      expect(list.length).toBe(3);
    });
  });
});
