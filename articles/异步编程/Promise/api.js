/**
 * Promise.all Promise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 当这个数组里的所有 promise 对象全部变为 resolved 状态的时候，才会resolve。
 * 返回的实例.then(res) 的这个res 是由数组内所有promise对象的res组成的。
 */

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let done = gen(promises.length, resolve);
    promises.forEach((promise, index) => {
      promise.then((value) => {
        done(index, value)
      }, reject);
    })
  })

  function gen(length, resolve) {
    let count = 0;
    let values = []; // api 给它的then传的值
    return function(i, value) {
      values[i] = value;
      if( ++ count === length) {
        console.log(values);
        resolve(values);
      }
    }
  }
}

/**
 * Promise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */

 Promise.prototype.race = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject); // 这里用得很巧妙，传的是返回的新的promise的resolve 和 reject去执行，然后状态只能改变一次，所以谁先执行改变了状态，接下来的都无法执行了。
    })
  })
 }

 // 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
 Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
 }

 Promise.resolve = function(value) {
   return new Promise(resolve => {
     resolve(value);
   })
 }

 Promise.reject = function(value) {
   return new Promise(reject => {
     reject(value);
   })
 }