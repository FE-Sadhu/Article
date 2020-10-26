/**
 * 浅拷贝
 * 只拷贝第一层，改变原始变量的基础类型数据不会影响拷贝值，但是改变引用类型的值会影响拷贝值
 * 
 * 常用数组的浅拷贝方法: slice、...展开运算符、concat
 * 常用对象浅拷贝方法: Object.assign(target, source)
 * 
 */

function shallowCopy(value) {
  const isArray = Array.isArray(value)
  const isObject = Object.prototype.toString.call(value) === '[object Object]'
  let res = null;

  if (isArray) {
    res = [];
    for (let val of value) {
      res.push(val)
    }
  } else if (isObject) {
    res = {}
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        res[key] = value[key]
      }
    }
  }

  return res ? res : value;
}

let arr = [1, 2, {
  a: 3
}]
let newArr = shallowCopy(arr);
arr[2].a = 4
arr[1] = 'change'
// console.log(arr);
// console.log(newArr);


let obj = {
  a: 1,
  b: 2,
  c: {
    d: 3
  }
}
let newObj = shallowCopy(obj)
obj.a = 'change'
obj.c.e = 'change'

// console.log(obj)
// console.log(newObj)


/**
 * 深拷贝
 * 
 */

function deepCopy(value) {
  let res = Object.prototype.toString.call(value) === '[object Object]' ? {} : Array.isArray(value) ? [] : null;

  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      let val = value[key]
      res[key] = typeof val === 'object' ? deepCopy(val) : val;
    }
  }

  return res ? res : value;
}

let arr1 = [1, 2, {
  a: 3,
  b: [1, [2]],
  c: {
    d: 4
  }
}]
let obj2 = {
  a: 1,
  b: 2,
  c: {
    d: 3
  }
}

const newArr1 = deepCopy(arr1);
arr1[2].c.d = 'change'
arr1[2].b[0] = 'change'
console.log(arr1)
console.log(newArr1)

const newObj2 = deepCopy(obj2);

obj2.c.e = 'change'

console.log(newObj2)
console.log(obj2)