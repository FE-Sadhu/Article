var count = 1;

var container = document.getElementById('container');

function getUserAction() {
  container.innerHTML = count++;
}

function secondDebounce(fn, wait, immediate) { // immediate为立即执行一次的开关
  var timeout = null;

  return function() { // 一开始立即执行一次fn，若在wait时间内再次触发事件调用匿名函数，newNow会为false,不会调用到fn。若在wait时间后再触发事件则会再次立即执行。
    var context = this;
    var args = arguments;

    if(timeout) clearTimeout(timeout);
    if(immediate) {
      var newNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if(newNow) fn.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        fn.apply(context, args);
      }, wait);
    }
  }
}

container.onmousemove = secondDebounce(getUserAction, 1000, true);
