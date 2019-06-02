// function aa(o) {
//   function F() {};
//   F.prototype = o;
//   return new F();
// }

function creatObj(child, parent) {
  const prototype = Object.create(parent.prototype);
  prototype.constructor = child
  child.prototype = prototype;
}

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

  Person.call(this, 'Linda');
}

// Wife.prototype = new Person(); 

// Wife.prototype.constructor = Wife; // 修正constructor指针
creatObj(Wife, Person);

Wife.prototype.job = function() {
  console.log('FE');
}

const kk = new Wife('clothes');

