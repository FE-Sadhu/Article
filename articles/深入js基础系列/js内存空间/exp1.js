var a1 = 0;   // 变量对象
var a2 = 'this is string'; // 变量对象
var a3 = null; // 变量对象

var b = { m: 20 }; // 变量b存在于变量对象中，{m: 20} 作为对象存在于堆内存中
var c = [1, 2, 3]; // 变量c存在于变量对象中，[1, 2, 3] 作为对象存在于堆内存中

// ************************* 1

var a1 = 0; // 栈 
var a2 = 'this is string'; // 栈
var a3 = null; // 栈

var b = { m: 20 }; // 变量b存在于栈中，{m: 20} 作为对象存在于堆内存中
var c = [1, 2, 3]; // 变量c存在于栈中，[1, 2, 3] 作为对象存在于堆内存中

// ************************* 2

function foo() {
  var a = 0;
  var b = 1;
  function bn() {xxx}
  console.log(b);
}

foo()

// 当foo()函数调用的时候，创建foo的执行上下文，在执行上下文内代码执行前创建了 变量对象 Variable Object.
/*
VO {
  arguments: {...},
  bn: bn的引用<bn reference>, // bn函数本体还是存储在堆内存中。
  a: undefined,
  b: undefined,
}

进入代码执行阶段后， 变量对象VO 激活成 活动对象 AO(activity object)
AO {
  arguments: {...},
  bn: bn的引用<bn reference>,
  a: 0,
  b: 1
}
*/