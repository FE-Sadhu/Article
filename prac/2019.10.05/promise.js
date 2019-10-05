const PENDING = 'pending';
const RESOLVED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.resolvedCallback = [];
    this.rejectedCallback = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = RESOLVED;
        this.value = value; // 传给回调的值，用户自己给的
        this.resolvedCallback.forEach(cb => cb())
      }
    }

    const reject = (value) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.value = value;
        this.rejectedCallback.forEach(cb => cb())
      }
    }

    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (e) => { throw e };

    let promise2 = new Promise((resolve, reject) => {
      if (this.state === PENDING) {
        this.resolvedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          })
        })
        this.rejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.value);
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      } else if (this.state === RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    reject(new TypeError('循环引用了'))
  }

  if (x && typeof x === 'object' || typeof x === 'function') {
    let used;
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (used) return;
          used = true;
          resolvePromise(promise2, y, resolve, reject)
        }, (e) => {
          if (used) return;
          used = true;
          reject(e)
        })
      } else {
        if (used) return;
        used = true;
        resolve(x)
      }
    } catch (e) {
      if (used) return;
      used = true;
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise