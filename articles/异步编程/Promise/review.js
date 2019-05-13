const PENDING = 'pending';
const RESOLVED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null; // 保存resolve()里面的value
  that.resolvedCallback = []; // then中的回调
  that.rejectedCallback = [];

  function resolve(value) {
    if(that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallback.forEach(cb => cb(that.value)); // 状态改变的时候执行回调,若还是pending则存入回调数组
    }
  }
  function reject (value) {
    if(that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;
      that.rejectedCallback.forEach(cb => cb(that.value))
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
  onResolved = typeof onResolved === 'function' ? onResolved : v => v; // 判断类型，透传
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r};

  if(that.state === PENDING) {
    that.resolvedCallback.push(onResolved);
    that.rejectedCallback.push(onRejected);
  }
  if(that.state === RESOLVED) {
    onResolved(that.value);
  }
  if(that.state === REJECTED) {
    onRejected(that.value);
  }
}
