# 数据结构

## 数据结构有哪些
- 数组（数组是一种线性数据结构。它用一组连续的内存空间，来存储一组具有相同类型的数据。）
- 链表（链表是以节点的方式来存储，是链式存储，每个节点包含data域，next域：指向下一个节点，链表的各个节点不一定是连续存储。首节点+尾结点+头节点+头指针+尾指针）
  - 单链表
  - 循环链表
  - 双向链表
- 栈（它是一种运算受限的线性表。限定仅在表尾进行插入和删除操作的线性表。这一端被称为栈顶，相对地，把另一端称为栈底。向一个栈插入新元素又称作进栈、入栈或压栈，）
- 队列（队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。）
- 散列表（散列表应用数组支持按照下标随机访问的特性，根据关键码值(Key value)对数据直接进行访问。通过把关键码值key映射到表中一个位置来访问记录，以加快查速度。这个映射函数叫做散列函数，存放记录的数组叫做散列表）
- 二叉树
- 堆
- 图
- Trie树
## 实现一个队列
```
class Queue {
  constructor() {
    this.queue = []
  }
  enQueue(item) {
    this.queue.push(item)
  }
  deQueue() {
    return this.queue.shift()
  }
  getHeader() {
    return this.queue[0]
  }
  getLength() {
    return this.queue.length
  }
  isEmpty() {
    return this.getLength() === 0
  }
}
```

## 实现一个栈
```
class Stack {
  constructor() {
    this.stack = []
  }
  addStack(item) {
    this.stack.push(item)
  }
  deleteStack() {
    this.stack.pop()
  }
  getLength() {
    return this.stack.length
  }
  isEmpty() {
    return this.getLength() === 0
  }
  getTop() {
    return this.stack[this.getLength() - 1]
  }
}
```

## 实现一个链表
```
class Node {
  constructor(v, next) {
    this.value = v
    this.next = next
  }
}
class LinkList {
  constructor() {
    // 链表长度
    this.size = 0
    // 虚拟头部
    this.dummyNode = new Node(null, null)
  }
  find(header, index, currentIndex) {
    if (index === currentIndex) return header
    return this.find(header.next, index, currentIndex + 1)
  }
  addNode(v, index) {
    this.checkIndex(index)
    // 当往链表末尾插入时，prev.next 为空
    // 其他情况时，因为要插入节点，所以插入的节点
    // 的 next 应该是 prev.next
    // 然后设置 prev.next 为插入的节点
    let prev = this.find(this.dummyNode, index, 0)
    prev.next = new Node(v, prev.next)
    this.size++
    return prev.next
  }
  insertNode(v, index) {
    return this.addNode(v, index)
  }
  addToFirst(v) {
    return this.addNode(v, 0)
  }
  addToLast(v) {
    return this.addNode(v, this.size)
  }
  removeNode(index, isLast) {
    this.checkIndex(index)
    index = isLast ? index - 1 : index
    let prev = this.find(this.dummyNode, index, 0)
    let node = prev.next
    prev.next = node.next
    node.next = null
    this.size--
    return node
  }
  removeFirstNode() {
    return this.removeNode(0)
  }
  removeLastNode() {
    return this.removeNode(this.size, true)
  }
  checkIndex(index) {
    if (index < 0 || index > this.size) throw Error('Index error')
  }
  getNode(index) {
    this.checkIndex(index)
    if (this.isEmpty()) return
    return this.find(this.dummyNode, index, 0).next
  }
  isEmpty() {
    return this.size === 0
  }
  getSize() {
    return this.size
  }
}
```