var person = {
  name: 'sadhu',
  age: 21
}

var params = []

// 使用for-in枚举person属性
for (var key in person) {
  params.push(key);
}

console.log(params); // [ 'name', 'age' ]

// 重新设置name属性的类型，让其不可被枚举.
Object.defineProperty(person, 'name', {
  enumerable: false
})

var _params = [];

for(var key in person) {
  _params.push(key);
}

console.log(_params); // [ 'age' ]
