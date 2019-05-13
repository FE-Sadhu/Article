// 符合 Promise A+ 规范的Promise
const PENDING = 'pending';
const RESOLVED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null;
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    };

     // 实际在执行回调的时候应该加入 micro task 的 而定时器加入的是 macro task
      if (that.state === PENDING) {
        that.state = RESOLVED;
        that.value = value;
        setTimeout(() => {
        that.resolvedCallbacks.forEach(cb => cb(that.value));
        }, 0);
      }
  }

  function reject(value) {
    setTimeout(() => { // 异步执行 保证执行顺序
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallbacks.forEach(cb => cb(that.value));
      }
    }, 0)
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  const that = this;
  let promise2 = null;
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => {
    throw r
  };

  if (that.state === PENDING) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      that.resolvedCallbacks.push(() => {
        try {
          const x = onResolved(that.value) // 规范规定，执行 onFulfilled 或者 onRejected 函数时会返回一个 x，并且执行 Promise 解决过程，这是为了不同的 Promise 都可以兼容使用
          // resolutionProcedure(promise2, x, resolve, reject) // 执行 Promise 解决过程，这是为了不同的 Promise 都可以兼容使用
        } catch (r) {
          reject(r)
        }
      })

      that.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(that.value); // 规范规定，执行 onFulfilled 或者 onRejected 函数时会返回一个 x，并且执行 Promise 解决过程，这是为了不同的 Promise 都可以兼容使用
          // resolutionProcedure(promise2, x, resolve, reject); // 执行 Promise 解决过程，这是为了不同的 Promise 都可以兼容使用
        } catch (r) {
          reject(r)
        }
      })
    }))
  }

  if (that.state === RESOLVED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => { // 保证异步执行，上面没有套一个setTimeout是因为，上面在下一次resolve的时候就会遍历回调数组异步执行了
        try {
          const x = onResolved(that.value); // 返回值 x 可能为 promise 对象呀等等
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }))
  }

  if (that.state === REJECTED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onRejected(that.value);
          // resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      }, 0)
    }))
  }
}

// 实现兼容多种 Promise 的 resolutionProcedure 函数,这就是规范规定了
function resolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) { // 可能发生循环引用
    return reject(new TypeError('Error'));
  }

  if (x instanceof MyPromise) {
    x.then(function (value) {
      resolutionProcedure(promise2, value, resolve, reject)
    }, reject)
  }

  let called = false;

  if (x !== null && typeof x === 'object' || typeof x === 'function') { // 可能thenable对象
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
            if (called) return;
            called = true;
            resolutionProcedure(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        )
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x)
  }
}

/* 
*
* test

// 链式调用
new MyPromise((resolve, reject) => {
  console.log('立即执行');
  resolve({name: 'sadhu'})
}).then(res => {
  console.log(res)
  
}).then(data => console.log(data));

new MyPromise((resolve, reject) => {
  console.log('立即执行');
  resolve({name: 'sadhu'})
}).then(res => {
  console.log(res)
  return res; // 这个 onResolved 的返回值 res 就是就是上文的 x 
}).then(data => console.log(data));

// 值穿透
new MyPromise((resolve, reject) => {
  console.log('立即执行');
  resolve({name: 'sadhu'})
}).then().then(res => {
  console.log(res)
  // return res
})

*/