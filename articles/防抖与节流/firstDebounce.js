var count = 1;

var container = document.getElementById('container');

function getUserAction() {
  container.innerHTML = count++;
}

function firstDebounce(fn, wait) { 
  var timeout = null;
  return function() { // 若在wait时间内又触发了该匿名函数的话，会清除掉定时器的内容，直到此时的事件之后没有再触发匿名函数或者下一次触发时间在wait后，会执行出定时器里的内容。
    var context = this;
    var args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function() {
      fn.apply(context, args)
    }, wait);
  }
}

container.onmousemove = firstDebounce(getUserAction, 1000);
 