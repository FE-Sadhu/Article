function A () {
  this.namea = 'sadhu'
}

A.prototype.fly = function () {
  console.log('A')
}

function B () {
  this.nameb = 'B';
  A.call(this) // 组合
}

function createPrototype (child, parent) { // 寄生内部增强
  let prototype = Object.create(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

createPrototype(B, A);

B.prototype.move = function () {
  console.log('B');
}

function ObjectCreate (obj) {
  function F() {};
  F.prototype = obj;
  return new F();
}