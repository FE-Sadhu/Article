function Person(name) {
  this.name = name;
  this.body = ['head', 'arm', 'leg'];
}

Person.prototype.act = function() {
  console.log('run');
}

function Wife(hobby) {
  this.hobby = hobby;
  this.friend = [1, 2, 3];
}

Wife.prototype.job = function() {
  console.log('FE');
}

// 将父构造函数的实例赋给子构造函数的原型。
Wife.prototype = new Person(); // Wife.prototype.__proto__ === Person.prototype

const kk = new Wife('clothes');

const ww = new Wife('cook');

kk.body.push('eye');

console.log(ww.body);

console.log(ww.constructor);