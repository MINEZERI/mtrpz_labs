import LinkedList from "../src/LinkedList.js";

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
});
