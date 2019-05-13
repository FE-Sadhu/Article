// 简易版 不符合A+规范的实现 也没实现链式调用 
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this; // 代码可能会异步执行，这里保存下this
  that.state = PENDING;
  that.value = null; // value变量用于保存 resolve/reject 中传入的值
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];
  function resolve(value) {
    if (that.state === PENDING) { // 只有 pending 态才可以改变状态
      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.forEach(cb => cb(that.value)); // 遍历回调数组并执行
    }
  }

  function reject(value) {
    if(that.state === PENDING) {
      that.state === REJECTED;
      that.value = value;
      that.rejectedCallbacks.forEach(cb => cb(that.value));
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  // 判断参数是不是函数类型，不是函数类型则创建一个函数赋值对应的参数，实现值穿透传
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r};
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected);
  }
  if(that.state === RESOLVED) {
    onFulfilled(that.value);
  }
  if(that.state === REJECTED) {
    onRejected(that.value);
  }
}

/* 这个例子在执行then()的时候就会进入等待态的逻辑
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 0)
}).then(value => {
  console.log(value)
}) 
*/

/* 这个例子是个值透传的例子，这例子在简易版中还实现不了
Promise.resolve(4).then().then((value) => console.log(value))
*/

Promise.prototype.resolve = function(value) {
  new Promise(function(resolve, reject) {
    resolve(value);
  })
}

