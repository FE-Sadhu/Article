function Person(name) {
  this.name = name;
  this.body = ['head', 'arm', 'leg'];
}

Person.prototype.act = function() {
  console.log('run');
}

function Wife(hobby) {
  Person.call(this, 'Linda')
  this.hobby = hobby;
  this.friend = [1, 2, 3];
}

Wife.prototype.job = function() {
  console.log('FE');
}

const kk = new Wife('clothes');