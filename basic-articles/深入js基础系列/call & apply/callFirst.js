Function.prototype.call2 = function(obj) {
  obj.fn = this // foo.Pig = this 此处this可以获取调用call2()的函数的函数体。this的显示绑定机制。
  obj.fn()
  delete obj.fn
}
// have a test
const foo = {
  taste: 'delicious',
  name: "foo's name"
}

function Pig() {
  console.log(this.taste);
  console.log(this.name);
}

Pig.call2(foo); 
