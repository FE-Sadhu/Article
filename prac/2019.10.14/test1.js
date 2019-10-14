// 一个数组中所有数都出现了两次，只有一个元素只出现了一次，找出这个元素。

var arr = [1, 1, 2, 2, 3, 'a', 'a']

// 方案一: 运用 indexOf 与 find 与 filter
function findOut (arr) {
  const res =  arr.filter((item, index, array) => {
    return array.indexOf(item) !== index
  })

  return arr.find((item) => {
    return res.indexOf(item) === -1;
  })
}
findOut(arr)

// 方案二 运用异或
const singleNumber = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    arr[0] = arr[0] ^ arr[i]
  }
  return arr[0]
}

