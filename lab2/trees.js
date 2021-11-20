class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    static getHeight(root) {
        if (root === null) {
            return 0;
        }
        return Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
    }
}

class BinarySearchTree {
    _counter = 0;

    constructor() {
        this.root = null;
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

    balance() {
        if (!this.isBalanced(this.root)) {
            const nodes = []

            this.inOrderTraverse(this.root, (node) => {
                nodes.push(node)
            })

            this.root = this.buildBalancedTree(nodes, 1, nodes.length)
        }
    }

    buildBalancedTree(nodes, start, end) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const sep = this.findKthSmallestElement(this.root, mid);
        sep.left = this.buildBalancedTree(nodes, start, mid - 1);
        sep.right = this.buildBalancedTree(nodes, mid + 1, end);

        return sep;
    }

    isBalanced(root) {
        if (root === null) {
            return true;
        }

        const leftHeight = Node.getHeight(root.left);
        const rightHeight = Node.getHeight(root.right);

        return Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right);
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
let traverse = [];
bst.inOrderTraverse(bst.root, (el) => {
    traverse.push(el.data);
});
console.log('inorder', traverse)
traverse = [];
bst.preOrderTraverse(bst.root, (data) => {
    traverse.push(data);
})
console.log('preorder', traverse)
traverse = [];
bst.postOrderTraverse(bst.root, (data) => {
    traverse.push(data);
})
console.log('postorder', traverse);


bst.balance();
console.log('balance', bst);
