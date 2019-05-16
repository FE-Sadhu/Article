Promise.prototype.all = function(promises) {
  return new Promise(function(resolve, reject) {
    let done = gen(promises.length, resolve);
    promises.forEach((item , index) => {
      item.then(value => {
        done(index, value);
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
  return new Promise(function(resolve, reject) {
    promises.forEach(item => {
      item.then(resolve, reject);
    })
  })
}

Promise.resolve = function(value) {
  return new Promise(function(resolve, reject) {
    resolve(value);
  })
}

Promise.reject = function(value) {
  return new Promise(function(resolve,reject) {
    reject(value);
  })
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}