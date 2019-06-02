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

  Person.call(this, 'Linda'); // 第二次调用父构造函数
}

Wife.prototype = new Person(); // 第一次调用父构造函数

Wife.prototype.constructor = Wife; // 修正constructor指针

Wife.prototype.job = function () {
  console.log('FE');
}

const kk = new Wife('clothes'); 

