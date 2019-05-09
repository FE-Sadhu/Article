function curryingHelper(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var traceArgs = Array.prototype.slice.call(arguments);
    var resArgs = args.concat(traceArgs);
    return fn.apply(null, resArgs); //返回执行结果
  }
}

// 验证一下

function showMsg(name, age, fruit) {
  console.log('My name is ' + name + ', I\'m ' + age + ' years old, ' + ' and I like eat ' + fruit);
}

var curryingShowMsg1 = curryingHelper(showMsg, 'sadhu');
curryingShowMsg1(21, 'apple');

console.log('---');

var curryingShowMsg2 = curryingHelper(showMsg, 'sadhu', 21);
curryingShowMsg2('apple');

console.log('---');

var curryingShowMsg3 = curryingHelper(showMsg);
curryingShowMsg3('sadhu', 21, 'apple');
