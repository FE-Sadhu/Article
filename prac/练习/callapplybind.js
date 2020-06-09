/**
 * call apply
 * 1. 函数的 API
 * 2. 参数第一个为改变的 this 绑定，后续参数依次传入给函数
 * 3. 调用时，函数会执行
 */

Function.prototype.newCall = function(that, ...args) {
  const obj = that || window
  obj.fn = this;
  const result = obj.fn(...args);
  delete obj.fn
  return result;
}

Function.prototype.newApply = function(that, args = []) {
  const obj = that || window
  obj.fn = this
  const result = obj.fn(...args)
  delete obj.fn
  return result
}

/**
 * bind
 * 1. 函数柯里化功能
 * 2. 返回一个新函数，新函数执行时 this 绑定为 Bind 的第一个参数
 * 3. 新函数的原型是旧函数的原型，且修改新函数的原型不能影响到旧函数的原型
 * 4. new 能使 bind 绑定的 this 失效
 */

Function.prototype.newBind = function(that, ...args1) {
  const oldFn = this;
  function newFn(...args2) {
    return oldFn.apply(this instanceof newFn ? this : that, [...args1, ...args2])
  }
  Object.setPrototypeOf(newFn.prototype, oldFn.prototype)
  return newFn;
}

/**
 * new
 * 1. 创建一个新对象
 * 2. 执行函数，函数若有返回一个对象，则返回这个对象
 * 3. 改变 this 绑定
 * 4. 新对象的原型就是函数的原型
 */

 function myNew(fn, ...args) {
   const obj = Object.create(null);
   const result = fn.apply(obj, args);
   Object.setPrototypeOf(obj, fn.prototype);
   return typeof result === 'object' ? result : obj;
 }

/**
 * Object.create() 
 * 创建一个新对象，新对象的原型是其参数
 */

 Object.prototype.myCreate = function (obj) {
   function A() {};
   A.prototype = obj;
   return typeof obj === 'undefined' ? {} : new A();
 }