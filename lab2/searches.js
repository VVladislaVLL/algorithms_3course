let binarySearchCounter = 0
let interpolationSearchCounter = 0

function searches(arr, numberToSearch) {
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
        const middle = left + (numberToSearch - arr[left]) * (right - left) / (arr[right] - arr[left]);
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