Function.prototype.call2 = function(obj) {
  obj.fn = this;
  var arr = Array.prototype.slice.call(arguments, 1);
  obj.fn(...arr);
  console.log(...arr);
  delete obj.fn;
}
// have a test
const foo = {
  taste: 'delicious',
  name: 'honey'
}

function Pig(weight, age) {
  console.log(this.taste);
  console.log(this.name);
  console.log(weight, age)
}

Pig.call2(foo, 100, 6)