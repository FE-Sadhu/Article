function A (name) {
  this.name = name;
  this.friends = [1, 2, 'ccc'];
}

A.prototype.fly = function () {
  console.log('我是 A 原型上的方法')
}

function B (age) {
  this.age = age
  A.call(this, 'sadhu')
}
 
function createObj (child, parent) {
  const prototype = Object.create(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

createObj(B, A);

B.prototype.move = function () {
  console.log('我是 B 原型上的方法');
}

const person = new B(21);