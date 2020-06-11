/**
 * call apply
 * 1. 函数的 API
 * 2. 参数第一个为改变的 this 绑定，后续参数依次传入给函数
 * 3. 调用时，函数会执行
 */

Function.prototype.newCall = function (that, ...args) {
  const obj = that || window;
  obj.fn = this;
  const result = obj.fn(...args);
  delete obj.fn;
  return result;
};

Function.prototype.newApply = function (that, args = []) {
  const obj = that || window;
  obj.fn = this;
  const result = obj.fn(...args);
  delete obj.fn;
  return result;
};

/**
 * bind
 * 1. 函数柯里化功能
 * 2. 返回一个新函数，新函数执行时 this 绑定为 Bind 的第一个参数
 * 3. 新函数的原型是旧函数的原型，且修改新函数的原型不能影响到旧函数的原型
 * 4. new 能使 bind 绑定的 this 失效
 */

Function.prototype.newBind = function (that, ...args1) {
  const oldFn = this;

  function newFn(...args2) {
    return oldFn.apply(this instanceof newFn ? this : that, [
      ...args1,
      ...args2,
    ]);
  }
  Object.setPrototypeOf(newFn.prototype, oldFn.prototype);
  return newFn;
};

/**
 * new
 * 1. 创建一个新对象
 * 2. 执行函数，函数若有返回一个对象，则返回这个对象
 * 3. 改变 this 绑定
 * 4. 新对象的原型就是函数的原型
 */

function myNew(fn, ...args) {
  const obj = Object.create(null);
  const result = fn.apply(obj, args);
  Object.setPrototypeOf(obj, fn.prototype);
  return typeof result === "object" ? result : obj;
}

/**
 * Object.create()
 * 创建一个新对象，新对象的原型是其参数
 */

Object.prototype.myCreate = function (obj) {
  function A() {}
  A.prototype = obj;
  return typeof obj === "undefined" ? {} : new A();
};

/**
 * const p = Promise.all([x,x,...])
 * 1. 接收参数是一个数组，数组内的元素都是 promise 对象。
 * 2. 只有当数组内所有 promise 对象的状态都变为 fulfilled 时，p 的状态才是 fulfilled，
 * 若当中任意一个变为 rejected 状态时，p 直接为 rejected 状态。
 * 3. 显然， p 也是个 Promise 对象。
 */

Promise.prototype.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const done = helper(resolve, promises.length)
    promises.forEach((item, index) => {
      item.then(value => {
        done(value, index)
      }, reject)
    })
  })
};

function helper(resolve, length) {
  const values = [];
  let count = 0;
  return function(value, index) {
    values[index] = value;
    if (++count === length) {
      resolve(values)
    }
  }
}

/**
 * const p = Promise.race()
 * 1. 参数是数组，每个元素是 promise 对象
 * 2. 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
 * 
 */

Promise.prototype.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(item => {
      item.then(resolve, reject)
    })
  })
}

/**
 * Promise.resolve() , Promise.reject()
 * 不带参数的话，直接返回一个 resolved 状态或 rejected 状态的 Promise 对象。
 * 有参数的话，参数是原始值，就返回一个新的 Promise 对象，resolve 出去的就是这个原始值，thenable 对象的话就转化为 promise 对象，promise 对象的话就原封不动返回
 */

Promise.prototype.resolve = function (a) {
  return Promise((resolve) => {
    resolve(a)
  })
}

Promise.prototype.reject = function (a) {
  return Promise((resolve, reject) => {
    reject(a)
  })
}

/**
 * add(2)(3)(4)()
 * 利用闭包累加最终值、reduce、递归
 */

function add(...args1) {
  let res = args1.reduce((a, b) => {
    return a + b
  })
  return function addCurry(...args2) {
    if(args2.length === 0) return res;
    res = [...args2].reduce((a, b) => {
      return a + b
    }, res)
    return addCurry
  }
}

console.log(add(2)(3)(4)())
console.log(add(1, 2)(3, 2)(3)())

/**
 * 
 */