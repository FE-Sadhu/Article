function Info() {};

const person = new Info();

console.log(Info.prototype === person.__proto__);
console.log('--')
console.log(Object.getPrototypeOf(person) === Info.prototype);
console.log('---')
console.log(Info.prototype.constructor === Info);
