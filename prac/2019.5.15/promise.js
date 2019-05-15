const PENDING = 'pending';
const RESOLVED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null; // 存储 then回调 中接受的参数
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
    reject(e);
  }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  const that = this;
  let promise2 = null;
  onResolved = typeof onResolved === 'function' ? onResolved : v => v; // 值穿透
  onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e};

  if(that.state === PENDING) {
    return (promise2 = new MyPromise(function(resolve, reject) {
        that.resolvedCallbacks.push(() => {
            try {
              const x = onResolved(that.value);
              resolve(x); // x为普通变量/对象的时候,没有处理为新的 MyPromise 实例 或是 thenable对象 或是 就是该对象promise2 的时候  
            } catch (e) {
              reject(e)
            }
        })

        that.rejectedCallbacks.push(() => {
          const x = onRejected(that.value);
          resolve(x);
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