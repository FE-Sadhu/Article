function bubble (arr) {
  for (let j = 0; j < arr.length - 1; j++) {
    let done = true;
    for (let i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] > arr[i + 1]) {
        var temp = arr[i + 1]
        arr[i + 1] = arr[i];
        arr[i] = temp;
        done = false;
      }
    }
    if (done) break; // 如果一轮下来都没进行过两树交换，证明已经排序成功
  }
  return arr;
}
// 时间复杂度： O(n * n)
// 空间复杂度： O(1)