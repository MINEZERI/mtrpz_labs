import { Node } from "../src/LinkedList.js";

describe("Node", () => {
  let prevNode, node, nextNode;

  beforeEach(() => {
    prevNode = new Node("a");
    nextNode = new Node("c");
    node = new Node("b", prevNode, nextNode);
  });

  test("has correct value", () => {
    expect(node.value).toBe("b");
  });

  test("has correct next and prev nodes", () => {
    expect(node.prev.value).toBe("a");
    expect(node.next.value).toBe("c");
  });

  test("rejects wrong value", () => {
    const badNode = new Node("too long");
    node.value = [];
    expect(badNode.value).toBeUndefined();
    expect(node.value).toBe("b");
  });

  test("rejects wrong next and prev nodes", () => {
    const badNode = new Node("x", 123, undefined);
    node.next = [];
    node.prev = {};
    expect(badNode.prev).toBeNull();
    expect(badNode.next).toBeNull();
    expect(node.next.value).toBe("c");
    expect(node.prev.value).toBe("a");
  });

  test("serializes to JSON correctly", () => {
    const nodeJSON = JSON.stringify(node);
    const parsedNode = JSON.parse(nodeJSON);

    expect(parsedNode).toStrictEqual({
      value: "b",
      prev: "a",
      next: "c",
    });
  });
});
