## 理解
**闭包是一种特殊的对象。**

**它由两部分组成。执行上下文(代号A)，以及在该执行上下文中创建的函数（代号B）。**

**当B执行时，如果访问了A中变量对象中的值，那么闭包就会产生。**

在大多数理解中，包括许多著名的书籍，文章里都以函数B的名字代指这里生成的闭包。而在chrome中，则以执行上下文A的函数名**代指**闭包。

因此我们只需要知道，一个闭包对象，由A、B共同组成，在以后的篇幅中，我将以chrome的标准来称呼。

举个例子：

```js
// demo01
function foo() {
    var a = 20;
    var b = 30;

    function bar() {
        return a + b;
    }

    return bar;
}

var bar = foo();
bar();
```

上面的例子，首先有执行上下文foo，在foo中定义了函数bar，而通过对外返回bar的方式让bar得以执行。当bar执行时，访问了foo内部的变量a，b。因此这个时候闭包产生。

闭包有两个特性：
1. **通过闭包，我们可以在其他的执行上下文中，访问到函数的内部变量。**（比如上面那个例子中bar在全局执行上下文中执行，访问到了foo函数内的变量a、b）
2. **闭包有比较高的内存占用**（因为特性1才有的特性2，而且特性2绝不是闭包造成内存泄漏的原因，具体解释看我内存分析那篇文章:[深入js之内存管理与内存泄漏](https://github.com/YxrSadhu/Article/issues/6)）

再举个例子：

```js
var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() {
        console.log(a);
    }
    fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar() {
    fn(); // 此处的保留的innerFoo的引用
}

foo();
bar(); // 2
```

foo()执行完毕之后，按照常理，其执行环境生命周期会结束，所占内存被垃圾收集器释放。但是通过fn = innerFoo(造成内存泄漏的原因是这个)，函数innerFoo的引用被保留了下来，复制给了全局变量fn。那么标记清除就会从根（window）开始找，找到从根开始引用的对象fn，找到fn引用的对象innerFoo，所以innerFoo不会被GC回收，因为闭包能让内部函数innerFoo访问到foo的变量对象的值，所以foo的变量对象也被保留了下来。于是，函数fn在函数bar内部执行时，依然可以访问这个被保留下来的变量对象。所以此刻仍然能够访问到变量a的值。

下面证明为什么我们称这个foo函数名代指闭包（以chrome的说法）:


![](https://user-gold-cdn.xitu.io/2019/4/21/16a4083f1b384dac?w=1400&h=698&f=png&s=170416)

在上面的图中，红色箭头所指的正是闭包。其中Call Stack为当前的函数调用栈，Scope为当前正在被执行的函数的作用域链，Local为当前的局部变量。

注意：在闭包中，能访问到的变量，仍然是作用域链上能够查询到的变量。

修改下上面例子：

```js
var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() {
        console.log(c); // 在这里，试图访问函数bar中的c变量，会抛出错误
        console.log(a);
    }
    fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar() {
    var c = 100;
    fn(); // 此处的保留的innerFoo的引用
}

foo();
bar();
```
此时会报错c没有定义：`Uncaught ReferenceError: c is not defined`

## 应用场景

+ 柯里化

之后文章会讲到。

+ 模块化（变量私有化，通过模块暴露出的api访问或操作内部私有化的变量/函数）

举个例子：
```js
var foo = (function() {
    var secret = 'secret';
    // 闭包内的函数可以访问secret变量，而secret变量对于外部却是隐藏的
    return {
        get_secret: function() {
            return secret;
        },
        new_secret: function( new_secret ) {
            secret = new_secret;
        }
    };
})();

foo.get_secret(); // 得到 'secret'
foo.secret; // Type error，访问不能
foo.new_secret('a new secret');
foo.get_secret(); // 得到 'a new secret'
```

## 经典题型
1、利用闭包，修改下面的代码，让循环输出的结果依次为1， 2， 3， 4， 5
```js
for (var i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log(i);
    }, i*1000 );
}
```
解决方法分两步：一是使用自执行函数提供闭包条件，二是传入i值并保存在闭包中。

解法一：
```js
for(var i=1; i<=5; i++) {
    (function(i) {
        setTimeout( function timer() {
        console.log(i);
    }, i*1000)
    })(i)
    
}
```

解法二：
```js
for(var i=1; i<=5; i++) {
    setTimeout(
        (function(i){
            return function timer() {
                console.log(i);
            }
        })(i), i*1000)
}
```
2、
```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
```
解法交给你。

本文完。

希望看到各位技术人对这篇文章有不同的有“证据”，符合逻辑的分析、看法～

文章会第一时间更新在GitHub，觉得写得还不错的，可以点个star支持下作者🍪