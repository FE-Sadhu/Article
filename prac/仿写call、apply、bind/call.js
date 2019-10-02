// 1. 函数调用
// 2. 第一个主要参数
// 3. 改变 this 指向
// 4. 若第一个参数是 null / undefined,在非严格模式下指向 window(浏览器中)
// 5. 有返回值，这个返回值为调用 call 函数的返回值

Function.prototype.call2 = function (obj, ...args) {
  const obj = obj || window
  obj.fn = this;
  const result = obj.fn(...args);
  delete obj.fn;
  return result;
}

