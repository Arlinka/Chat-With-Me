class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class List {
  constructor() {
    this.root = null;
    this.length = 0;
  }

  addNode(value, i) {
    let node = new Node(value);
    if (i == undefined) {
      if (this.length === 0) {
        this.root = node;
      } else {
        let current = this.root;
        while (current.next) {
          current = current.next;
        }
        current.next = new Node(value);
      }
      this.length++;
      return true;
    }

    if (i >= 0 && i <= this.length) {
      if (i === 0) {
        node.next = this.root;
        this.root = node;
      } else {
        let current = this.root;
        let prev = null;
        let index = 0;

        while (index < i) {
          prev = current;
          current = current.next;
          index++;
        }
        prev.next = node;
        node.next = current;
      }
      this.length++;
      return true;
    }
    return false;
  }

  removeNode(i) {
    if (i == undefined) {
      if (this.root === this.next) {
        this.root = null;
        this.next = null;
      }
      let current = this.root;
      while (current.next) {
        if (!current.next.next) {
          current.next = null;
        } else {
          current = current.next;
        }
      }
      this.next = current;
      return true;
    }

    if (i >= 0 && i <= this.length) {
      let current = this.root;
      if (i === 0) {
        this.root = current.next;
      } else {
        let prev = null;
        let index = 0;

        while (index < i) {
          prev = current;
          current = current.next;
          index++;
        }
        prev.next = current.next;
      }
      this.length--;
      return true;
    }
    return false;
  }

  print() {
    let current = this.root,
      currentNode = "Linked lists: ";
    while (current) {
      currentNode += `${current.value}, `;
      current = current.next;
    }
    currentNode = currentNode.slice(0, -2);
    return console.log(currentNode);
  }
}

// CHECK Methods:

let list = new List();
console.group("Add 10 to last position", list.addNode(10));
console.log("Add 20 to last position", list.addNode(20));
console.log("Add 30 to last position", list.addNode(30));
console.log("Add 50 to last position", list.addNode(50));
list.print();
console.log("Remove from last position", list.removeNode());
list.print();
console.log("Add 40 to last position", list.addNode(40));
list.print();
console.groupEnd();

console.group("Remove from position 0", list.removeNode(0));
list.print();
console.log("Remove from position 1", list.removeNode(1));
list.print();
console.log("Remove from position 10", list.removeNode(10));
list.print();
console.groupEnd();

console.group("Add 10 to position 0", list.addNode(10, 0));
list.print();
console.log("Add 30 to position 2", list.addNode(30, 2));
list.print();
console.log("Add 100 to position 100", list.addNode(100, 10));
list.print();
console.groupEnd();
