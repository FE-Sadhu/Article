var arr = [1, 1, '1', '1', 2, 3, 4, 4, 3];

function unique(arr) {
  var res = [];
  var sortArr = arr.concat().sort(); // 浅拷贝一个新数组来sort排序
  var seen;
  // console.log(sortArr); // [ 1, 1, '1', '1', 2, 3, 3, 4, 4 ]
  for (var i=0; i<sortArr.length; i++) {
    if(!i || seen !== sortArr[i]) { // 不是第一个元素或者不等于上一个元素
      res.push(sortArr[i]);
    }
    seen = sortArr[i];
  }
  return res;
}

console.log(unique(arr));
