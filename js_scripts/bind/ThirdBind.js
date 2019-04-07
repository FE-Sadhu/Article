// codes
Function.prototype.mybind = function (obj) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  
  var fBound = function () {
    var newArgs = Array.prototype.slice.call(arguments);
    // 当fBound为构造函数时，它的this指向实例。 instanceof判断为true。
    // 当fBound为普通函数时，它的this默认指向winodw。 instanceof判断为false。
    return self.apply(this instanceof fBound ? this : obj, args.concat(newArgs));
  }
  // 这样返回函数fBound的实例就可以访问到绑定函数的prototype属性上的值。
  fBound.prototype = this.prototype
  return fBound
}

// Example
const value = 2;

const obj = {
  value: 1
}

function bar (name, age) {
  this.name = name;
  this.age = age;
  console.log(this.value);
}

bar.prototype.habit = 'coding'; // 划重点

const newBar = bar.bind(obj, 'sadhu');
const newBar2 = bar.mybind(obj, 'sadhu')

// const newObj = new newBar(17);
// console.log('*******华丽的分界线*******');
// console.log(newObj.name);
// console.log(newObj.age);
// console.log(newObj.habit);

const newObj2 = new newBar2(17);
console.log('*******华丽的分界线*******');
console.log(newObj2.name);
console.log(newObj2.age);
console.log(newObj2.habit);