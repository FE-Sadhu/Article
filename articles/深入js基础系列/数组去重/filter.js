var arr = [1, 1, '1', '1', 2, 3, 4, 4, 3];
 // 简化indexOf
function indexOfUnique(arr) {
  var res = arr.filter(function (item, index, array) {
    return array.indexOf(item) === index; // indexOf只返回该值在数组中的顺序第一次出现的索引
  })
  return res;
}

console.log(indexOfUnique(arr));

// 简化排序
function sortUnique(arr) {
  var res = arr.concat().sort().filter(function(item, index, array) {
    return !index || item !== array[index - 1];
  })
  return res;
}

console.log(sortUnique(arr));