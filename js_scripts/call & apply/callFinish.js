// 第三步完整代码：
Function.prototype.call2 = function(obj) {
  var obj = obj || window;
  obj.fn = this;
  const arr = [];
  for (let i = 1, len = arguments.length; i < len; i++) {
      arr.push('arguments[' + i + ']'); 
  }
  const result = eval('obj.fn(' + arr + ')');
  delete obj.fn;
  return result;
}

// have a test
var name = "Darling";

const foo = {
  name: 'honey'
}

function Pig(weight, age) {
  console.log(this.name);
  return {
      weight: weight,
      age: age,
      name: this.name
  }
}

Pig.call2(null);
// Darling
// Object { 
//    weight: undefined
//    age: undefined
//    name: "Darling"
// }
Pig.call2(foo, 100, 6);
// honey
// Object {
//    weight: 100,
//    age: 6,
//    name: 'honey'
//}
