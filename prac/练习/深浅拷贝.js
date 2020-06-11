/**
 * 浅拷贝
 * 只拷贝对象的第一层
 * 以下 api 都是浅拷贝：Object.assign()/Array.prototype.slice()/Array.prototype.concat()/ 扩展运算符 /Array.from()
 */

function shallowCopy(obj) {
  const newObj = oldObj instanceof Array ? [] : {};
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj;
}

/**
 * 深拷贝
 * 深层拷贝
 */

function deepCopy(obj) {
  const newObj = oldObj instanceof Array ? [] : {};
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj;
}