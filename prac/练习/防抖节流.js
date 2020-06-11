// 封装一个防抖函数，一段时间内多次触发的函数，只执行最后一次
function debounce(fn, wait) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

// 给上面的防抖函数加个要求，加个参数 immediate ，为 true 时表示，先执行函数一次，之后再隔 wait 秒后再次执行。
function perfectDebounce(fn, wait, immediate) {
  let timer = null;
  return function(...args) {
    if (immediate) {
      if (timer) {
        clearTimeout(timer)
      } else {
        fn.apply(this, args)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}

// function testDebounce() {
//   console.log(111);
// }
// const afterDebounce = perfectDebounce(testDebounce, 2000, true);

// setInterval(() => {
//   afterDebounce()
// }, 3000)

/**
 * 节流
 * 一段时间内多次触发的函数按规定的间隔时间执行。
 * 特点，一开始要执行一次，最后定时器执行一次。
 */

function throttle(fn, wait) {
  let timer = null,
      last;
  return function(...args) {
    let now = +new Date();
    const remainTime = wait - (now - last);
    
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, args)
      last = now
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
        last = +new Date()
      }, remainTime)
    }
  }
}