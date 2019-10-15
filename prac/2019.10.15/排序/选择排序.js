function selectSort (arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[min]) { // 寻找最小数
        min = j; // 将最小数索引保存
      }
    }
    temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr;
}