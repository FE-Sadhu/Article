Function.prototype.apply2 = function (obj, arr) {
  const obj = obj || window;
  obj.fn = this;
  const result = obj.fn(...arr);
  delete obj.fn;
  return result;
}
