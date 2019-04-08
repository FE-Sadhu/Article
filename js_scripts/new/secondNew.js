// 第二步这里都只写对应文章的例子。

// 假设构造函数的返回值是对象
// function Foo(name, age) {
//   this.brother = '宇智波鼬';
//   this.age = age
//   return {
//     habit: 'coding',
//     name: name
//   }
// }

// const person = new Foo('佐助', 21);

// console.log(person.age);
// console.log(person.brother);
// console.log('**********华丽的分割线**********');
// console.log(person.habit);
// console.log(person.name);

// 假设构造函数的返回值是一个基本类型的值
function Foo(name, age) {
  this.brother = '宇智波鼬';
  this.age = age
  return 'sadhu'
}

const person = new Foo('佐助', 21);

console.log(person.age);
console.log(person.brother);
console.log('**********华丽的分割线**********');
console.log(person.habit);
console.log(person.name);