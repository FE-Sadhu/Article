// 双层循环
var arr = [1, 1, '1', '1'];

function unique(arr) {
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < res.length; j++) {
      if (arr[i] === res[j]) break;
    }
    if (j === res.length) { // 遍历完都无重复则会相等
      res.push(arr[i]);
    }
  }

  return res
}

console.log(unique(arr));