var person = {
  name: 'Sadhu'
}

delete person.name; // 使用delete删除该属性 返回true表示删除成功

Object.defineProperty(person, 'name', { // Object.defineProperty()重新添加name属性
  configurable: false,
  value: 'TOM'
})

console.log(person.name); // TOM 

delete person.name; // 已经不能删除了

console.log(person.name); // TOM

// 试图改变value
person.name = 'sadhu'; // 定义了configurable: false时，其他的特性也不能改变，定义过了value: 'TOM' ，再改变值也不能改变了。
console.log(person.name); // TOM 