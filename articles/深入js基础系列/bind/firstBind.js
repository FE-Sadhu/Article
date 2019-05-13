// 第一版代码
Function.prototype.mybind = function (obj) {
  var self = this;
  return function () {
    return self.apply(obj)
  }
}

// 例子
const obj = {
  value: 1
}

function bar () {
  console.log(this.value);
  return this.value;
}

const newBar = bar.bind(obj);
const newBar2 = bar.mybind(obj);

console.log(newBar());
console.log('*******华丽的分界线*******');
console.log(newBar2());
