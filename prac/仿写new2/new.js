function myNew (fn) {
  var obj = {};

  var args = Array.prototype.slice.call(arguments, 1); // 类数组对象
  // console.log(args);
  var result = fn.apply(obj, args);
  
  Object.setPrototypeOf(obj, fn.prototype); 

  return typeof result === 'object' ? result : obj;
  // if (typeof result === 'object') {
  //   return result
  // } else {
  //   return obj;
  // }
}

function Cons (name, age) {
  this.name = name;
  this.age = age;
}

Cons.prototype = {
  aaa: 1,
  fly() {
    console.log(this.aaa);
  }
}

// new Fun() {}  new 在官方文档中的作用
// 1. 生成一个对象
// 2. 构造函数会执行
// 3. 构造函数里面的 this 会指向它生成的 对象
// 4. 如果构造函数内部有自己返回一个对象的话，那么用 new 生成的对象就是其内部返回的对象。
// 5. 构造函数创建出来的实例，这个实例的原型对象就是与这个构造函数相关联的原型对象。

myNew(Cons, 'sadhu', 21);