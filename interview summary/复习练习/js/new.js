function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);

  let ret = fn.apply(obj, args);

  const isObject = typeof ret === 'object' && ret !== null;
  const isFunction = typeof ret === 'function';

  return isObject || isFunction ? ret : obj;
}