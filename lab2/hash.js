// const HASH_CONST = Math.PI - Math.E
const HASH_CONST = Math.pow(Math.PI, -1) + Math.pow(Math.E, -1)
const KNUTH_CONST = 0.61803399

const getRandom = (max, min= 0) => Math.floor(Math.random() * (max - min + 1) + min);
const fillArray = (n, max) => {
    return [...new Array(n)].map(() => getRandom(max))
}

class ListNode {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class List {
    constructor() {
        this.head = null;
    }

    add(value) {
        if (this.head === null) {
            this.head = new ListNode(value);
        } else {
            let head = this.head;
            while (head.next !== null) {
                head = head.next;
            }

            head.next = new ListNode(value);
        }
    }
}

const getHash = (key, c, length) => {
    const x = c * key;
    const fractional = x - Math.trunc(x);

    return Math.trunc(length * fractional);
}

const getAnotherHash = (key) => {
    return 7 - (key % 7);
}
class BaseHashTable {
    hashTable;

    constructor() {
        this.hashTable = {};
    }

    get table() {
        return this.hashTable;
    }

    get length() {
        return Object.keys(this.hashTable).length;
    }

    setValue(key, value) {
        this.hashTable[key] = value;
    }

    getValue(key) {
        return this.hashTable[key];
    }
}

class HashTable extends BaseHashTable {
    collisionCounter = 0;

    constructor(size, method = 'chaining') {
        super();
        this.method = method;
        this.size = size;
    }

    get isFull() {
        return this.size === this.length;
    }

    get collisions(){
        return this.collisionCounter;
    }

    set(key, value, c) {
        if (this.isFull) {
            console.warn('Hash table is full');
            return;
        }

        const hash = getHash(key, c, this.size);

        if (this.getValue(hash) === undefined) {
            this.setValue(hash, value);
        } else {
            this.collisionCounter += 1;
            switch (this.method) {
                case 'chaining':
                    this.setElWithChaining(hash, value);
                    break;
                case 'linear probing':
                    this.setElWithLinearProbing(hash, value);
                    break;
                case 'double hashing':
                    this.setElWithDoubleHashing(hash, getAnotherHash(key), value);
                    break;
                default:
                    console.warn('No such collision handling method');
            }
        }
    }

    setElWithChaining(key, value) {
        const initValue = this.getValue(key);

        if (initValue instanceof List) {
            initValue.add(value);
        } else {
            const list = new List();
            list.add(initValue);
            list.add(value);

            this.setValue(key, list);
        }
    }

    setElWithLinearProbing(key, value) {
        for (key + 1; key <= this.size; key += 1) {
            this.collisionCounter += 1;

            if (this.getValue(key) === undefined) {
                this.setValue(key, value);
                return;
            }
        }
    }

    setElWithDoubleHashing(hash, anotherHash, value) {
        let i = 1;
        const doubleHash = () => (hash + i * anotherHash) % this.size;
        while (this.getValue(doubleHash()) !== undefined && i <= this.size) {
            this.collisionCounter += 1;
            i += 1;
        }

        this.setValue(doubleHash(), value);
    }
}

const M = 1024; // size
const P = 500; // numbers of arrays
const N = 500;
const R = 1000;
experiment(M, P, N, R);
function experiment(M, P, N, R) {
    let chainingCollisionsForKnuth = 0;
    let chainingCollisionsForMe = 0;
    let doubleCollisionsForKnuth = 0;
    let doubleCollisionsForMe = 0;
    let linearCollisionsForKnuth = 0;
    let linearCollisionsForMe = 0;

    for (let i = 1; i <= P; i += 1) {
        const array = fillArray(N, R);

        // chaining
        let hashTable = new HashTable(M, 'chaining')
        array.forEach((val) => {
            hashTable.set(val, val, HASH_CONST);
        });
        chainingCollisionsForMe += hashTable.collisions;
        hashTable = new HashTable(M, 'chaining');
        array.forEach((val) => {
            hashTable.set(val, val, KNUTH_CONST);
        })
        chainingCollisionsForKnuth += hashTable.collisions;

        // double hashing
        hashTable = new HashTable(M, 'double hashing');
        array.forEach((val) => {
            hashTable.set(val, val, HASH_CONST);
        })
        doubleCollisionsForMe += hashTable.collisions;
        hashTable = new HashTable(M, 'double hashing');
        array.forEach((val) => {
            hashTable.set(val, val, KNUTH_CONST);
        })
        doubleCollisionsForKnuth += hashTable.collisions;

        // linear probing
        hashTable = new HashTable(M, 'linear probing');
        array.forEach((val) => {
            hashTable.set(val, val, HASH_CONST);
        })
        linearCollisionsForMe += hashTable.collisions;
        hashTable = new HashTable(M, 'linear probing');
        array.forEach((val) => {
            hashTable.set(val, val, KNUTH_CONST);
        })
        linearCollisionsForKnuth += hashTable.collisions;
    }

    console.log(`chaining with my constant: ${chainingCollisionsForMe}`)
    console.log(`chaining with Knuth constant: ${chainingCollisionsForKnuth}`)
    console.log(`double hashing with my constant: ${doubleCollisionsForMe}`)
    console.log(`double hashing with Knuth constant: ${doubleCollisionsForKnuth}`)
    console.log(`linear probing with my constant: ${linearCollisionsForMe}`)
    console.log(`linear probing with Knuth constant: ${linearCollisionsForKnuth}`)
}
