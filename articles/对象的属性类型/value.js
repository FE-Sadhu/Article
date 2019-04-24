var person = {
  name: 'sadhu'
}

Object.defineProperty(person, 'name', {
  value: 'kk'
})

console.log(person.name) // 'kk' 改变了属性原本的值sadhu。

var _person = {};

Object.defineProperty(_person, 'name', {
  value: 'sadhu'
})

console.log(_person.name); // 'sadhu'