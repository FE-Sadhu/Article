// 防抖 一段时间重复触发某个函数调用的话，用定时器维护一个固定时间，固定时间内再次触发会清除定时器重新定时触发

function debounce (fn, wait, immediate) {
  let timer;
  return function (...args) {
    clearTimeout(timer)
    if (immediate) {
      let nowExe = !timer;
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
      if (nowExe) fn.apply(this, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}

// 节流就是一段时间内若频繁触发某个方法，设置一个固定时间，要求方法只在固定时间执行一次，若再次执行则清除定时器
function throttle(fn, wait) {
  let last, timer
  return function (...args) {
    let now = +new Date();
    if (last && now < last + wait) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
        last = +new Date()
      }, wait)
    } else {
      last = now;
      fn.apply(this, args)
    }
  }
}

// 1. 返回一个新函数 (新函数了，那么原型就会变)
// 2. 新函数执行时，执行体是绑定函数，并且 this 会绑定到绑定参数
// 3. new 会使新函数的 this 绑定无效
// 4. bind 可以实现柯里化
Function.prototype.bind = function (obj, ...args1) {
  const fn = this
  let fBind = function (...args2) {
    const res = fn.apply(this instanceof fBind ? this : obj, args1.concat(args2))
    return res;
  }

  function F() {};
  F.prototype = this.prototype;
  fBind.prototype = new F();

  return fBind;
}

function ajax(url) {
  const xhr = new XMLHttpRequest();
  
  xhr.open('GET', url, true);
  
  // xhr.setRequestHeader('xxx', 'xxx')
  xhr.responseType = 'json'
  xhr.timeout = 5000;
  xhr.ontimeout = function () {
    console.log('超时了')
  }
  xhr.onload = function () { // xhr.readyState === 4
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.response);
    }
  }
  xhr.send(); // POST 的话就往里面加数据, 如下
  // const formdata = new FormData();
  // formdata.append('username', 'xxx');
  // formdata.append('id', 111);
  // xhr.send(formdata);
}
