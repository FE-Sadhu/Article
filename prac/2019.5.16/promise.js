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
    if(that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      setTimeout(() => {
        that.resolvedCallbacks.forEach(cb => cb(that.value));
      }, 0)
    }
  }

  function reject(value) {
    if(that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;
      setTimeout(() => {
        that.rejectedCallbacks.forEach(cb => cb(that.value));
      }, 0)
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  const that = this;
  let promise2 = null;
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : (r) => {throw r};

  if(that.state === PENDING) {
    return (promise2 = new MyPromise(function(resolve, reject) {
        that.resolvedCallbacks.push(() => {
          try {
            const x = onResolved(that.value);
            resolve(x); // 没考虑返回值为特殊情况直接resolve出去， 对象自身 / Thenable / MyPromise实例
          } catch (e) {
            reject(e);
          }
        })
        that.rejectedCallbacks.push(() => {
          try {
            const x = onRejected(that.value);
            resolve(x); // 没考虑返回值为特殊情况直接resolve出去， 对象自身 / Thenable / MyPromise实例
          } catch (e) {
            reject(e);
          }
        })
    }))
  }

  if(that.state === RESOLVED) {
    return (promise2 = new MyPromise(function(resolve, reject) {
      setTimeout(() => {
        try {
          const x = onResolved(that.value);
          resolve(x);
        } catch (e) {
          reject(e)
        }
      }, 0)
    }))
  }

  if(that.state === REJECTED) {
    return (promise2 = new MyPromise(function(resolve, reject) {
      setTimeout(() => {
        try {
          const x = onRejected(that.value);
          resolve(x);
        } catch (e) {
          reject(e)
        }
      }, 0)
    }))
  }
}

// test
// 链式调用
// new MyPromise((resolve, reject) => {
//   console.log('立即执行');
//   resolve({name: 'sadhu'})
// }).then(res => {
//   console.log(res)
// }).then(data => console.log(data));

// new MyPromise((resolve, reject) => {
//   console.log('立即执行');
//   resolve({name: 'sadhu'})
// }).then(res => {
//   console.log(res)
//   return res; // 这个 onResolved 的返回值 res 就是就是上文的 x 
// }).then(data => console.log(data));

// 值穿透
// new MyPromise((resolve, reject) => {
//   console.log('立即执行');
//   resolve({name: 'sadhu'})
// }).then().then(res => {
//   console.log(res)
//   // return res
// })