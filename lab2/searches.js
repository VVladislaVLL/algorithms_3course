let binarySearchCounter = 0
let interpolationSearchCounter = 0

const getRandom = (max, min= 0) => Math.floor(Math.random() * (max - min + 1) + min);
const fillArray = (n, max) => {
    return [...new Array(n)].map(() => getRandom(max))
}

const getK = (k) => {
    let i = k
    while (i >= 64) {
        i >>= 1
    }
    return i
}
const convertToSec = (ms) => ms / 1000;

const insertionSort = (arr, left = 0, right = arr.length - 1) => {
    for (let i = left; i <= right; i++) {
        for (let j = i; j > 0 && arr[j - 1] > arr[j]; j--) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
        }
    }
    return arr
}

const _mergeArrays = (a, b) => {
    const c = [];

    while (a.length && b.length) {
        c.push(a[0] > b[0] ? b.shift() : a.shift())
    }

    while (a.length) {
        c.push(a.shift());
    }
    while (b.length) {
        c.push(b.shift());
    }
    return c
}

const mergeSort = (arr, k) => {
    if (arr.length < 2) {
        return arr;
    }

    if (arr.length < k) {
        return insertionSort(arr);
    }
    const middle = Math.floor(arr.length / 2);
    const arrL = arr.slice(0, middle);
    const arrR = arr.slice(middle, arr.length);
    const sortedL = mergeSort(arrL, k);
    const sortedR = mergeSort(arrR, k);
    return _mergeArrays(sortedL, sortedR);
}

function generateArray(length, maxNumber) {
    const array = fillArray(length, maxNumber);
    return mergeSort(array, 50);
}

function binarySearch(arr, numberToSearch) {
    let left = 0;
    let right = arr.length - 1;
    binarySearchCounter += 4;
    while (arr[left] < numberToSearch && numberToSearch < arr[right]) {
        const middle = Math.floor((left + right) / 2);
        binarySearchCounter += 9;
        if (arr[middle] < numberToSearch) {
            left = middle + 1;
            binarySearchCounter += 4;
        } else if (arr[middle] > numberToSearch) {
            right = middle - 1;
            binarySearchCounter += 4;
        } else {
            return middle
        }
    }

    if (arr[left] === numberToSearch) {
        binarySearchCounter += 2;
        return left;
    } else if (arr[right] === numberToSearch) {
        binarySearchCounter += 2;
        return  right;
    } else {
        return -1;
    }
}


function interpolationSearch(arr, numberToSearch) {
    let left = 0;
    let right = arr.length - 1;
    interpolationSearchCounter += 4;
    while (arr[left] < numberToSearch && numberToSearch < arr[right]) {
        const middle = left + Math.floor((numberToSearch - arr[left]) * (right - left) / (arr[right] - arr[left]));
        interpolationSearchCounter += 15;
        if (arr[middle] < numberToSearch) {
            left = middle + 1;
            interpolationSearchCounter += 4;
        } else if (arr[middle] > numberToSearch) {
            right = middle - 1;
            interpolationSearchCounter += 4;
        } else {
            return middle
        }
    }

    if (arr[left] === numberToSearch) {
        interpolationSearchCounter += 2;
        return left;
    } else if (arr[right] === numberToSearch) {
        interpolationSearchCounter += 2;
        return  right;
    } else {
        return -1;
    }
}

const MAX_NUMBER = 1000;
const LENGTH = 30000;
const NUMBER_TO_SEARCH = 25;
const array = generateArray(LENGTH, MAX_NUMBER);
console.log('indexOf = ', array.indexOf(NUMBER_TO_SEARCH));
console.log('binarySearch = ', binarySearch(array, NUMBER_TO_SEARCH));
console.log('interpolationSearch = ', interpolationSearch(array, NUMBER_TO_SEARCH));
console.log('binarySearchCounter = ', binarySearchCounter);
console.log('interpolationSearchCounter = ', interpolationSearchCounter);