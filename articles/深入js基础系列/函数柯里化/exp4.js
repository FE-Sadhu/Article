function curryingHelper(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var traceArgs = Array.prototype.slice.call(arguments);
    var resArgs = args.concat(traceArgs);
    return fn.apply(null, resArgs); //返回执行结果
  }
}

function betterCurryingHelper(fn, len) {
  var length = len || fn.length // 可以指出fn总形参的个数
  return function() {
    var allArgsFulfilled = (arguments.length >= length);

    // 如果参数全部满足,就可以终止递归调用
    if (allArgsFulfilled) {
      return fn.apply(null, arguments);
    } else {
      var argsNeedFulfilled = [fn].concat(Array.prototype.slice.call(arguments));
      return betterCurryingHelper(curryingHelper.apply(null, argsNeedFulfilled), length - arguments.length);
    }
  }
}

// 验证一下
function showMsg(name, age, fruit) {
  console.log('My name is ' + name + ', I\'m ' + age + ' years old, ' + ' and I like eat ' + fruit);
}

var betterShowMsg = betterCurryingHelper(showMsg);

betterShowMsg('sadhu', 21, 'apple');
console.log('---');
betterShowMsg('sadhu', 21)('apple');
console.log('---');
betterShowMsg('sadhu')(21, 'apple');
console.log('---');
betterShowMsg('sadhu')(21)('apple');
