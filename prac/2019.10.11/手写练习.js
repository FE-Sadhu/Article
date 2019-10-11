Function.prototype.call = function (obj, ...args) {
  const obj1 = obj || window;
  const fn = this;
  obj1.fn = fn;
  const ret = obj1.fn(...args);
  delete obj1.fn;
  return ret;
}

Function.prototype.apply = function (obj, ...args) {
  const obj1 = obj || window;
  const fn = this;
  obj1.fn = fn;
  const ret = obj1.fn(args);
  delete obj1.fn;
  return ret;
}

Function.prototype.bind = function (obj, ...args1) {
  const obj1 = obj || window;
  const fn = this;
  const fBind = function (...args) {
    return fn.apply(this instanceof fBind ? this : obj1 , args.concat(args1))
  }
  function F() {};
  F.prototype = fn.prototype;
  fBind.prototype = new F();

  return fBind;
}

function myNew (fn, ...args) {
  const obj = {};
  const ret = fn.apply(obj, args);
  obj.__proto__ = fn.prototype;
  obj.prototype.constructor = fn;

  return typeof ret === 'object' ? ret : obj;
}


function A () {

}
A.prototype.fly = function () {

}

function B () {
  A.call(this);
}

function create (child, parent) {
  const prototype = Object.create(parent.prototype)
  prototype.constructor = child;
  child.prototype = prototype;
}

create(B, A)

B.prototype.move = function () {

}

function shallowClone (obj) {
  if (typeof obj !== 'object') {
    return;
  }
  const ret = obj instanceof Array ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = obj[key]
    }
  }

  return ret;
}

function deepClone (obj) {
  if (typeof obj !== 'object') return;

  const ret = obj instanceof Array ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }

  return ret;
}