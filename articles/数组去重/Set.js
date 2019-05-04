// Set数据结构
var arr = [1, 1, '1', '1', 2, 3, 4, 4, 3];

function unique(arr) {
  // 第一种形式
  // var value = new Set(arr);
  // return Array.from(value); // return Array.from(new Set(arr));

  // 第二种形式
  return [...new Set(arr)];
}

// 再简化第三种形式
var unique1 = (arr) => [...new Set(arr)];

console.log(unique1(arr));

