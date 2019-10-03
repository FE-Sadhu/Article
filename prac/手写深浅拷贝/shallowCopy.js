function shallowCopy (obj) {
  if (typeof obj !== 'object') return;
  var newObj = Array.isArray(obj) ? [] : {}; // 可以把 Array.isArray 换为 Object.prototype.toString.call(obj) === '[object Array]'
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
    newObj[key] = obj[key];
  }
  return newObj;
}