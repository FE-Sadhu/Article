/**
 * 防抖：
 * 利用定时器，每次事件频繁被触发，就删除定时器，从最后一次触发开始计时。
 * 应用场景：王者荣耀回城
 */

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

/**
 * 节流：
 * 在一段时间内频繁触发事件，节流可以让每隔一段时间执行一次事件回调。
 * 也是利用定时器，当计时完成后才会开启下一个定时器。
 */

function throttle(fn, limit) {
  let flag = false
  return function(...args) {
    if (flag) return
    flag = true
    setTimeout(() => {
      fn(...args)
      flag = false
    }, limit)
  }
}

function throttle2(fn, limit) {
  let last = 0
  return function (...args) {
    let now = +new Date()
    if (now - last < limit) {
      return
    }
    fn(...args)
    last = now
  }
}