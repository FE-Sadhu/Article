Function.prototype.mybind = function (obj) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function() {};

  var fBound = function () {
    var newArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fBound ? this : obj, args.concat(newArgs));
  }
  
  fNOP.prototype = this.prototype; // 他俩指向的是同一原型对象。
  fBound.prototype = new fNOP(); // 之后要找原型链上的属性就是 fBound实例.__proto__ === fBound.prototype, fBound.prototype.__ptoto__ === FNOP.prototype === this.prototype。
  return fBound;
}