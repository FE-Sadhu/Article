var person = {
  name: 'sadhu'
}

person.name = 'kk';

console.log(person.name); // 'kk' 证明此时name属性是可写的

// 重新定义name属性的类型，让其不可写
Object.defineProperty(person, 'name', {
  writable: false
})

person.name = 'TOM'; // 此时修改无效。

console.log(person.name); // kk