// 1. 改变 this 指向
// 2. 函数会执行
// 3. 传值为 null 或不传值时，默认指向 window

Function.prototype.call = function (obj, ...args) {
  const obj = obj ? obj : window;
  const fn = this;
  obj.fn = fn;
  const ret = obj.fn(...args);
  delete obj.fn;
  return ret
}

Function.prototype.apply = function(obj, args) {
  const fn = this;
  obj.fn = fn;
  const ret = obj.fn(...args);
  delete obj.fn;
  return ret
}