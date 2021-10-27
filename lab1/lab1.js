let counterQuickSort = 0;
let counterInsertionSort = 0;
let counterMergeSort = 0;

/* Arrays and Keys*/
const getRandom = (max, min= 0) => Math.floor(Math.random() * (max - min + 1) + min);
const fillArray = (n, max) => {
    return [...new Array(n)].map(() => getRandom(max))
}
const getK = (k) => {
    let i = k
    while (i >= 64) {
        i >>= 1
    }
    console.log('K:', i)
    return i
}
const convertToSec = (ms) => ms / 1000

/* INSERTION SORT */
const insertionSort = (arr, left = 0, right = arr.length - 1) => {
    counterInsertionSort += 2;
    for (let i = left; i <= right; i++) {
        counterInsertionSort += 3;

        for (let j = i; j > 0 && arr[j - 1] > arr[j]; j--) {
            // counterInsertionSort += 3;
            // if(arr[j - 1] > arr[j]) {
            //     [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
            //     counterInsertionSort += 10;
            // }
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
            counterInsertionSort += 13;
        }
    }

    return arr
}



/* QUICK SORT */
const partition = (arr, left, right) => {
    const sep = left
    let i = left
    let j = right
  
    while (i <= j) {
      // while left elements less than pivot shift our pointer
      counterQuickSort += 1
      while (arr[i] < arr[sep]) {
        i += 1
        counterQuickSort += 5
      }
      // while right elements greater than pivot shift our pointer
      while (arr[j] > arr[sep]) {
        j -= 1
        counterQuickSort += 5
      }
  
      // swap elements
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
        i += 1
        j -= 1
        counterQuickSort += 13
      }
    }
  
    return i
  }
  
  const quickSort = (arr, k, left = 0, right = arr.length - 1) => {
    if (right - left) {
        counterQuickSort += 2;
      if (right - left <= k) {
        counterQuickSort += 2;
        return insertionSort(arr, left, right)
      } else if (left <= right) {
        counterQuickSort += 2;
        const i = partition(arr, left, right)
        // recursive call for subarray
        if (left < i - 1) {
            counterQuickSort += 3;
    
            quickSort(arr, k, left, i - 1)
        }
        if (i < right) {
            counterQuickSort += 1;
            quickSort(arr, k, i, right)
        }
      }
    }
  
    return arr
  }

/* MERGE SORT */
const _mergeArrays = (a, b) => {
    const c = [];
    counterMergeSort += 1;

    while (a.length && b.length) {
        c.push(a[0] > b[0] ? b.shift() : a.shift())
        counterMergeSort += 3;
    }

    while (a.length) {
        c.push(a.shift());
        counterMergeSort += 2;
    }
    while (b.length) {
        c.push(b.shift());
        counterMergeSort += 2;
    }

    return c
}

const mergeSort = (arr, k) => {
    if (arr.length < 2) {
        counterMergeSort += 1;
        return arr;
    }

    if (arr.length < k) {
        counterMergeSort += 2;
        return insertionSort(arr);
    }
    const middle = Math.floor(arr.length / 2);
    const arrL = arr.slice(0, middle);
    const arrR = arr.slice(middle, arr.length);
    const sortedL = mergeSort(arrL, k);
    const sortedR = mergeSort(arrR, k);
    counterMergeSort += 11;
    return _mergeArrays(sortedL, sortedR);
}


/* CHECK*/
const mergeSortCheck = (array) => {
    let k = array.length
    while (k >>= 1) {
        const start = new Date().getTime()
        mergeSort(array, k)
        const end = new Date().getTime()

        console.log(`${k}: ${end - start}`)
    }
}

const quickSortCheck = (array) => {
    let k = array.length
    while (k >>= 2) {
        const start = new Date().getTime()
        quickSort(array, k)
        const end = new Date().getTime()

        console.log(`${k}: ${end - start}`)
    }
}


/* LAB */
const showTimeForSort = (options, sortFn, flag = true, num = 0) => {
    // let fs = require('fs');
    // let array = fs.readFileSync('file.txt').toString().split("\n");
    const array = fillArray(options.arrayLength, options.maxValue)

    if (flag) {
        const k = getK(options.arrayLength)
        counterMergeSort = 0;
        counterInsertionSort = 0;
        counterQuickSort = 0;
        for (let i = 1; i <= options.arraysCount; i += 1) {
            const array = fillArray(options.arrayLength, options.maxValue)
            const start = new Date().getTime()
            sortFn(array, k)
            const end = new Date().getTime()
            console.log('TIME OF SORT:', convertToSec(end - start))
        }
        console.log('ELEMENTARY OPERATIONS:', counterInsertionSort + counterQuickSort);
    } else {
        switch (num) {
            case 1:
                mergeSortCheck(array);
                break;
            case 2:
                quickSortCheck(array);
                break;
            default:
                break;
        }
    }
  }

/* mergeSort */
// showTimeForSort({maxValue: 1000, arrayLength: 30000, arraysCount: 1}, mergeSort);
// showTimeForSort({maxValue: 1000, arrayLength: 30000, arraysCount: 1}, mergeSort, false, 1);

/* quickSort */
showTimeForSort({maxValue: 1000, arrayLength: 30000, arraysCount: 1}, quickSort);
// showTimeForSort({maxValue: 1000, arrayLength: 30000, arraysCount: 1}, quickSort, false, 2);
// console.log(quickSortCheck())
// const array = fillArray(30000, 1000)

// mergeSortCheck(array)
