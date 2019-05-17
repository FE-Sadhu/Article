Promise.prototype.all = function(promises) {
  // 返回一个新 promise 对象，resolve 出去的是里面数组各个 promise 对象 resolve 出去的结果组成的数组
  // 当数组里各个 promise 对象的状态都变为 fulfilled 的时候才会返回
  return new Promise((resolve, reject) => {
    const done = gen(promises.length, resolve);
    promises.forEach((item, index) => {
      item.then((value) => {
        done(index, value)
      })
    })
  })

}

function gen(length, resolve) {
  let count = 0;
  const values = [];
  return function(index, value) {
    values[index] = value;
    if( ++count === length) {
      console.log(values);
      resolve(values);
    }
  }
}

Promise.prototype.race = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((item) => {
      item.then(resolve, reject);
    })
  })
}

Promise.resolve = function(value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  })
}

Promise.reject = function(value) {
  return new Promise((resolve, reject) => {
    reject(value);
  })
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}