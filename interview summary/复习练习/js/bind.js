/**
 * 注意一点：实现 new 能使 bind 的绑定失效
 * 
 * @param {绑定的执行上下文} ctx 
 * @param  {...any} args1 
 */

Function.prototype.bind = function (ctx, ...args1) {
  const fn = this;

  const fBind =  function (...args2) {
    return fn.apply(this instanceof fBind ? this : ctx, args1.concat(args2))
  }

  fBind.prototype = Object.create(fn.prototype);
  
  return fBind
}