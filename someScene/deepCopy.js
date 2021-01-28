var _ = require('lodash');

class A {
  a = {c: 1};
  func = () => {console.log(this.a.c)}
}

const instance1 = new A();
const instance2 = _.cloneDeep(instance1);
instance1.a.c = 2;
instance1.func();
instance2.func(); // lodash 的 cloneDeep 是无法深拷贝函数的
console.log(instance2.a);