// codes
function copyNew() {
  var obj = new Object();

  var constructor = [].shift.call(arguments); // 取出第一个构造函数参数。注意shift可以改变原数组。

  obj.__proto__ = constructor.prototype; // 这样obj就可以访问在构造函数的prototype上的属性

  // 根据apply经典继承来让函数的this指向实例
  constructor.apply(obj, arguments);

  return obj
}

// example
function Foo(name, age) {
  this.name = name;
  this.age = age;
  this.sex = 'male';
}
Foo.prototype.brother = "宇智波鼬";

Foo.prototype.chat = function () {
  console.log('how are you? 鸣人');
}

var person = copyNew(Foo, '佐助', 21);

console.log(person.name);
console.log(person.sex);
console.log(person.brother);
person.chat();