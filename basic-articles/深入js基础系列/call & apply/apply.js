Function.prototype.apply2 = function(obj, arr) {
  var obj = obj || window;
  obj.fn = this;
  var result;
  if (!arr) {
      result = obj.fn();
  } else {
      var args = [];
      for (let i = 0, len = arr.length; i < len; i++) {
          args.push('arr[' + i + ']');
      }
      result = eval('obj.fn(' + args + ')');
  }
  delete obj.fn;
  return result;
}