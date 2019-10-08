// 1. 会返回一个新函数
// 2. 新函数执行时，函数内部 this 指向绑定后的值
// 3. bind 绑定的 this 对 new 无效,就是如果新函数被当做构造函数使用，其内部 this 也会指向实例
// 4. 可以实现函数柯里化，提前绑定部分参数
// 5. 要求新函数的实例的原型对象的修改不与绑定函数同步，所以新函数的实例指向的原型对象应该可以访问到绑定函数的原型对象。

Function.prototype.bind = function (obj, ...args) {
  const fn = this;
  var fBound = function (...args2) {
    let ret = fn.apply(this instanceof fBound ? this : obj, args.concat(args2))
    return ret;
  }

  var F = function () {}
  F.prototype = this.prototype
  fBound.prototype = new F();
  
  return fBound;
}
