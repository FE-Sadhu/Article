// 1. 返回一个对象
// 2. 函数执行时 this 指向这个对象
// 3. 若函数返回的对象则返回函数的对象
// 4. 返回对象的原型指向函数的原型

function myNew (fn, ...args) {
  const obj = {};
  const ret = fn.apply(obj, args);
  obj.__proto__ = fn.prototype
  return typeof ret === 'object' ? ret : obj
}