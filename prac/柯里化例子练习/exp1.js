// 实现一个功能,就是输出语句 name 喜欢 song ,其中 name 和 song 都是可变参数;

// 一般情况
function print (name, song) {
  console.log(name + '喜欢:' + song);
}

// currying
function curry (name) {
  return function like (song) {
    console.log(name + '喜欢：' + song)
  }
}

const personLike = curry('Tom');
const person2Like = curry('Sadhu');

personLike('aaa');
person2Like('bbb');

// curry 辅助函数

function curryingHelper (fn) {
  const fn = Array.prototype.slice.call(arguments, 1);
  return function () {
    const argTrace = Array.prototype.slice.call(arguments);
    const resArgs = fn.concat(argTrace);
    return fn.apply(null, resArgs)
  }
}