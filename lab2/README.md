# Linked List Data Structure Implementation

This project implements two versions of doubly linked lists: a linked list (`LinkedList.js`) and an array-based list (`ArrayLinkedList.js`) with basic operations such as append, insert, delete and others.

## Variant

**Variant Number**: 1  
**Formula**: `17 % 4 `  
**Variant Description**:

| Initial implementation | Second implementation               |
|------------------------|-------------------------------------|
| Doubly Linked List     | List Based on Built-in Arrays/Lists |

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/MINEZERI/mtrpz_labs.git
cd mtrpz_labs/lab2
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test 
```

## Failed CI Tests

- [Commit with one of the tests failed](https://github.com/MINEZERI/mtrpz_labs/commit/db5cb7edba43333f5416622bd010ca24712eb86c)
- [Another commit with failed tests](https://github.com/MINEZERI/mtrpz_labs/commit/2ac8a2cd627889da2ebbd291c4678789a674d144)
- [One more commit with tests failing](https://github.com/MINEZERI/mtrpz_labs/commit/8ea77ff4df2edd68c5815ae9b4af3d5cd2b56878)

---

# Conclusion

Unit tests turned out to be very helpful.

After switching from a LinkedList to an ArrayList-based implementation, the tests helped quickly catch any bugs in the new version with minimal effort — since the expected behavior was already well-defined in the existing tests.

Whenever there was a bug in the code, the tests failed instantly, clearly showing where the problem was.

Without tests, it would be difficult to navigate the code manually and easy to miss something.

Unit tests are definitely not a waste of time — they’re a great way to save time and nerves 😄
