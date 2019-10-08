// 会返回一个新对象，新对象第一层的基础类型数据是与原对象互不关联的，但是第一层的引用类型值是和原对象的指向的是同一个引用类型的值，他们修改同步，默认不拷贝原型链上的数据
function shallowCopy (oldObj) {
  const obj = oldObj instanceof Array ? [] : {};
  
  for (let key in oldObj) {
    if (oldObj.hasOwnProperty(key)) { // 默认不拷贝原型链上的属性
      obj[key] = oldObj[key]
    }
  }
  return obj;
} // Object.assign()/Array.prototype.slice()/Array.prototype.concat()/ 扩展运算符 /Array.from()

// 深拷贝也是返回一个新对象，内部所有值都与原对象互不关联
function deepClone (oldObj) {
  const obj = oldObj instanceof Array ? [] : {}
  for(let key in oldObj) {
    obj[key] = typeof oldObj[key] === 'object' ? deepClone(oldObj[key]) : obj[key];
  }
  return obj
}