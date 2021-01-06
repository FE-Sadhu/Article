/**
 * 法一： 普通递归
 * @param {待展平数组} arr 
 */

function fn(arr) {
  let i = 0;
  let newArr = []

  while(i++ < arr.length) {
    let item = arr[i - 1]
    if (Array.isArray(item)) {
      newArr = newArr.concat(fn(item));
      continue
    }

    if (Object.prototype.toString.call(item) === '[object Object]') {
      for (let key in item) {
        if (Array.isArray(item[key])) {
          item[key] = fn(item[key])
        }
      }
    }

    newArr.push(item)
  }

  return newArr
}

let a1 = [1, [2, [3, 4, [5, 6]]], [7, 8], 9]
let a2 = [[1, [2, [3]]], [4], [5, { a: 1, b: [2, [3, 4]]}]]


// console.log(fn(a1));
// console.log(fn(a2));

/**
 * 方法二: reduce
 */

function flatten(arr) {
  return arr.reduce((prev, next) => {
    return Array.isArray(next) ? prev.concat(flatten(next)) : prev.concat(next)
  }, [])
}
// console.log(flatten(a1));
// console.log(flatten(a2));

/**
 * 方法三: 展开运算符
 */
function flatten3(arr) {
  while(arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }

  return arr;
}

console.log(flatten3(a1));
console.log(flatten3(a2));