Function.prototype.mybind = Function.prototype.bind || function (obj) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  
  var fNOP = function () {};

  var fBound = function () {
    var newArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fBuond ? this : obj, args.concat(newArgs));
  }
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}