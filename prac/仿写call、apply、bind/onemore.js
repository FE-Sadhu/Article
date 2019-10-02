Function.prototype.apply1 = function (obj, args) {
  var obj = obj || window;
  obj.fn = this;
  var result = obj.fn(...args);
  delete obj.fn;
  return result;
}

Function.prototype.call2 = function (obj, ...args) {
  var obj = obj || window;
  obj.fn = this;
  var result = obj.fn(...args);
  delete obj.fn;
  return result;
}

Function.prototype.bind2 = function (obj, ...args1) {
  var self = this;
  var fBind = function (...args2) {
    return self.apply(this instanceof fBind ? this : obj, args1.concat(args2));
  };
  var Fun = function () {};
  Fun.prototype = this.prototype;
  fBind.prototype = new Fun();
  return fBind
}

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
const newBar2 = bar.bind2(obj, 'sadhu')

// const newObj2 = new newBar2(17);
newBar2();
console.log(obj);
console.log('*******华丽的分界线*******');
// console.log(newObj2.name);
// console.log(newObj2.age);
// console.log(newObj2.habit);
// undefined 
//*******华丽的分界线*******
// sadhu
// 17
// coding

function new2 () {
  var obj = {};

  var constructor = [].shift.call(arguments);

  var res = constructor.apply(obj, arguments);

  obj.__proto__ = fn.prototype;

  return typeof res === 'object' ? res : obj;
}