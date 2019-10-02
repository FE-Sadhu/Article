function A (name) { // 父构造函数，父类
  this.name = name;
  this.arr = [1, 2, 'abc']
}

A.prototype.fly = function () {
  console.log('我要飞')
}

function Children (age, hobby, name) { // 子构造函数，子类
  this.age = age;
  this.hobby = hobby;
  A.call(this, name); 
  // this.name = name;
  // this.arr = [xxx]
}

function createObj (child, parent) {
  const prototype = Object.create(parent.prototype); // prototype.__proto__ === parent.prototype
  prototype.constructor = child;
  child.prototype = prototype;
}

createObj(Children, A);

Children.prototype.move = function () {
  console.log(this.age);
}

const instance = new Children(21, 'game', 'sadhu');

console.log(instance);

