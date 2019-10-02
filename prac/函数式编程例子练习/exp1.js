// 有一个数组，array = [1, 3, 'h', 5, 'm', '4']
// 现在想要找出这个数组中的所有类型为number的子项。你会怎么做？

const arr = [1, 3, 'h', 5, 'm', '4'];
function findNum (arr) {
  const res = []
  arr.forEach((item) => {
    if (typeof item === 'number') {
      res.push(item)
    }
  })
  return res
}
console.log(findNum(arr));

// 函数是一等公民，可以赋值、作为参数、作为返回值
// 期望封装的函数有返回值
// 期望封装的函数不会改变传入的原始数据，返回一个新值（所谓纯函数），相同的输入对应相同的输出。