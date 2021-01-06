Function.prototype.myApply = function(ctx, args) {
  const obj = ctx || window

  obj.fn = this;

  const ret = ctx.fn(...args);

  delete obj.fn
  
  return ret;
}