const PENDING = 'pending';
const RESOLVED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
  constructor(fn) {
    const self = this;
    this.state = PENDING;
    this.value = null;
    this.resolvedCallback = [];
    this.rejectedCallback = [];

    function resolve (value) {
      if (self.state === PENDING) {
        self.state = RESOLVED;
        self.value = value;
        self.resolvedCallback.forEach(cb => cb())
      }
    }

    function reject (value) {
      if (self.state === PENDING) {
        self.state = REJECTED;
        self.value = value;
        self.rejectedCallback.forEach(cb => cb());
      }
    }

    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected: e => { throw e };

    let promise2 = new Promise((resolve, reject) => {
      if (this.state === PENDING) {
        this.resolvedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e){
              reject(e)
            }
          })
        })
        this.rejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          })
        })
      } else if (this.state === RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject)
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

    return promise2;
  }
}

function resolvePromise(promise2, x ,resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle'));
  }

  if (x && typeof x === 'object' || typeof x === 'function') {
    let used;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (used) return;
          used = true;
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (used) return;
          used = true;
          reject(r);
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
    resolve(x);
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