class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.height = null;
    }
}

class BinarySearchTree {
    _counter = 0;
    constructor() {
        this.root = null;
    }

    depthFirst(node) {
        if (node) {
            console.log(node.data);
            this.depthFirst(node.left);
            this.depthFirst(node.right)
        }
    }

    insert(data) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
            this.root.parent = null;
            this.root.height = 1;
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    _insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
                newNode.parent = node;
                newNode.height = newNode.parent.height + 1;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
                newNode.parent = node;
                newNode.height = newNode.parent.height + 1;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    // Центрированный обход
    inOrderTraverse(node, callback) {
        if (node !== null) {
            this.inOrderTraverse(node.left, callback);
            callback(node);
            this.inOrderTraverse(node.right, callback);
        }
    }

    iterativeInOrderTraverse(node, callback) {
        const stack = [];
        let currentNode = node;
        while (stack.length !== 0 || currentNode !== null) {
            if (currentNode !== null) {
                stack.push(currentNode);
                currentNode = currentNode.left;
            } else {
                currentNode = stack.pop();
                callback(currentNode);
                currentNode = currentNode.right;
            }
        }
    }

    // Прямой обход
    preOrderTraverse(node, callback) {
        if (node != null) {
            callback(node.data);
            this.preOrderTraverse(node.left, callback);
            this.preOrderTraverse(node.right, callback);
        }
    }

    iterativePreOrderTraverse(node, callback) {
        if (node === null) {
            return;
        }
        let currentNode = node;
        const stack = [];
        stack.push(currentNode);
        while (stack.length !== 0) {
            currentNode = stack.pop();
            callback(currentNode);
            if (currentNode.right !== null) {
                stack.push(currentNode.right);
            }
            if (currentNode.left !== null) {
                stack.push(currentNode.left);
            }
        }
    }
   // Обратный обход
    postOrderTraverse(node, callback) {
        if (node != null) {
            this.postOrderTraverse(node.left, callback);
            this.postOrderTraverse(node.right, callback);
            callback(node.data);
        }
    }

    iterativePostOrderTraverse(node, callback) {
        const stack = [];
        let lastVisitedNode = null;
        let currentNode = node;
        while (stack.length !== 0 || currentNode !== null) {
            if (currentNode !== null) {
                stack.push(currentNode);
                currentNode = currentNode.left;
            } else {
                let peekNode = stack.slice(-1)[0];
                if (peekNode.right !== null && lastVisitedNode !== peekNode.right) {
                    currentNode = peekNode.right;
                } else {
                    callback(peekNode);
                    lastVisitedNode = stack.pop();
                }
            }
        }
    }

    // Обход в ширину
    levelOrderTraverse(root, callback) {
        const queue = [];
        queue.push(root);
        let currentNode;
        while (queue.length !== 0) {
            currentNode = queue.shift();
            callback(currentNode);
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }

            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }

        }
    }

    // К-ый наименьший элемент
    _getKthSmallestElement(root, k) {
        if (root === null) {
            return null;
        }
        let left = this._getKthSmallestElement(root.left, k);

        if (left !== null) {
            return left;
        }
        this._counter++;
        if (this._counter === k) {
            return root;
        }

        return this._getKthSmallestElement(root.right, k);
    }

    findKthSmallestElement(root, k) {
        const kthSmallestElement = this._getKthSmallestElement(root, k);
        this._counter = 0;
        return kthSmallestElement;
    }

    balancingBinarySearchTree() {
    }

    toString() {
        return JSON.stringify(this.root);
    }

    static createBinarySearchTree(arr) {
        const bst = new BinarySearchTree();
        arr.forEach(el => {
            bst.insert(el);
        });
        return bst;
    }
}

const arrayToBST = [1, 4, -10, 3, 9, 2, 12, 0, 34, 5, 6, -1];
const bst = BinarySearchTree.createBinarySearchTree(arrayToBST);
console.log('TREE = ', bst);
console.log('KthSmallestElement', bst.findKthSmallestElement(bst.root, 9));

