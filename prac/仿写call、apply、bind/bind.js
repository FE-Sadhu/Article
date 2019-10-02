// 1. 返回一个新函数
// 2. 新函数被调用时，执行的是绑定函数，绑定函数的 this 绑定到 bind 第一个参数中
// 3. 可以传参
// 4. new 能使 bind 绑定的 this 失效
// 5. 绑定函数的原型对象 === 新函数的原型对象

Function.prototype.bind2 = function (obj, ...args1) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var self = this;
  var fNOP = function () {}; // 经过一个空函数转换，当我们修改新函数的原型上的属/方法的时候就不会影响到绑定函数的原型了。

  var fBind = function (...args2) {
    return self.apply(this instanceof fBind ? this : obj, [...args1, ...args2]);
  }

  fNOP.prototype = this.prototype;
  fBind.prototype = new fNOP(); // fBind实例.__proto__.__proto__ === fNOP.prototype === this.prototype;

  return fBind;
}
