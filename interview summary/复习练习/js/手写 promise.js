const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
  constructor (fn) {
    this.state = PENDING
    this.value = null // resolve 出去的值
    this.resolvedCBs = []
    this.rejectedCBs = []

    let resolve = (val) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = val
        setTimeout(() => {
          this.resolvedCBs.forEach(cb => cb(val))
        }, 0)
      }
    }

    let reject = (val) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.value = val
        setTimeout(() => {
          this.rejectedCBs.forEach(cb => cb(val))
        }, 0)
      }
    }

    fn(resolve, reject)
  }

  then (onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    if (this.state === PENDING) {
      return new Promise((resolve, reject) => {
        this.resolvedCBs.push((val) => {
          const x = onResolved(val)
          resolve(x)
        })

        this.rejectedCBs.push((val) => {
          const x = onRejected(val)
          reject(x)
        })
      })
    }

    if (this.state === FULFILLED) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const x = onResolved(this.value)
          resolve(x)
        })
      })
    }

    if (this.state === REJECTED) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const x = onRejected(this.value)
          reject(x)
        })
      })
    }
  }

  catch (onRejected) {
    return this.then(null, onRejected)
  }

  all (arr) {
    return new Promise((resolve, reject) => {
      let len = arr.length,
          count = 0,
          res = [];

      function helper(value, index) {
        res[index] = value
        while(++count === len) {
          resolve(res)
        }
      }
      arr.forEach((item, index) => {
        item.then((value) => {
          helper(value, index)
        }, reject)
      })
    })
  }

  race (arr) {
    return new Promise((resolve, reject) => {
      arr.forEach(item => {
        item.then(resolve, reject)
      })
    })
  }
}

Promise.resolve = function (val) {
  return new Promise((resolve, reject) => {
    resolve(val)
  })
}

Promise.reject = function (val) {
  return new Promise((resolve, reject) => {
    reject(val)
  })
}
