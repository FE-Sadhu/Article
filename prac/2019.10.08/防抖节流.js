// 当某段时间，会频繁触发某个函数时，维护一个定时器，若在定时器时间内再次触发，则清除定时器，下一次定时完成后触发。
function debounce1 (fn, wait) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
}

// 希望立刻执行函数，然后停止触发 n 秒后再次执行

function debounce2 (fn, wait, immediate) {
  let timer = null;
  return function (...args) {
    if (immediate) {
      let callNow = !timer;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, wait)
      if (callNow) fn.apply(this, args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}

// 节流：一开始立即执行，如果一段时间内频繁触发某个函数，则让他固定时间触发一次，在这固定时间内若再次触发则清除定时器

function throttle (fn, wait) {
  let last, timer;
  return function (...args) {
    let now = +new Date();
    if (last && now < last + wait) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
        last = +new Date();
      }, wait)
    } else {
      last = now;
      fn.apply(this, args)
    }
  }
}


// 防抖： 若一个函数在一段时间内频繁触发，我们可以维护一个定时器，在定时时间内触发的话就清除定时器，然后重新定时让函数执行
function debouncePrac (fn, wait, immediate) {
  let timer = null;
  return function (...args) {
    if (immediate) {
      let noWait = !timer;
      if (noWait) {
        fn.apply(this, args);
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, wait)
      }
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}

// 节流： 若一个函数在一段时间内频繁被触发， 我们可以设置一个固定时间，让它在固定时间内只触发一次，若固定时间内再次触发则清除定时器
function throttlePrac (fn, wait) {
  let last, timer;
  return function (...args) {
    let now = +new Date();
    if (last && now < last + wait) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args);
        last = +new Date();
      }, wait)
    } else {
      last = now;
      fn.apply(this, args);
    }
  }
}
