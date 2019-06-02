var person = {}

// 通过get与set自定义访问与设置name属性的方式
Object.defineProperty(person, 'name', {
  get: function() {
    // 读取name属性的内容时，只会一直读到值'sadhu'
    return 'sadhu'
  },
  set: function(value) {
    var res = value + '后缀'
    console.log(res);
    return res;
  }
})

console.log(person.name); // sadhu 第一次访问，调用get

person.name = 'kk'; // kk后缀 尝试修改调用set

console.log(person.name); // sadhu 第二次访问还是调用get

console.log(person)