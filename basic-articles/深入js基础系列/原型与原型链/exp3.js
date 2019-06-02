function Person(name) {
  this.name = name;
}

var per = new Person('sadhu');

var friend = Object.create(per);

friend.hobby = 'FE';

console.log(friend instanceof Person); // Person.prototype是否存在于friend对象的原型链上

console.log(per.isPrototypeOf(friend)); // per对象是否存在于friend对象的原型链上