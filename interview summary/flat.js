var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

// 编写一个程序将数据扁平化并去重，最终得到一个升序不重复数组
// 解决方案如下：

const flat = arr.flat(4);
function unique (arr) {
  return Array.from(new Set(arr))
}
const result = unique(flat).sort((a, b) => a > b ? 1 : -1);
console.log(result);