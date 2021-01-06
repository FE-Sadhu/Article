Function.prototype.call = function(ctx, ...args) {
  const obj = ctx || window
  obj.fn = this
  const ret = obj.fn(...args)
  delete obj.fn
  return ret
}