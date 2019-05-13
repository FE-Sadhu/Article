// Second Codes
Function.prototype.mybind = function (obj) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1); // 切出从第一位开始到最后的函数参数数组args
  return function () {
    var newArgs = Array.prototype.slice.call(arguments);
    return self.apply(obj, args.concat(newArgs));
  }
}

// Example
const obj = {
  value: 1
}

function bar (name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
}

const newBar = bar.bind(obj, 'Sadhu');
const newBar2 = bar.mybind(obj, 'Sadhu');

newBar(17);
console.log('*******华丽的分界线*******');
newBar2(17);