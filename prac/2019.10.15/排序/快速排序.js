function quickSort (arr) {
  if (arr.length < 1) return arr;
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1);
  let left = [];
  let right = [];


  for (let i = 0; i < arr.length; i++) {
    if (pivot > arr[i]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));
}

quickSort([85,24,63,45,17,31,96,50])