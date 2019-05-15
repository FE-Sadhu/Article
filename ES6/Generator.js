{
  // generator基本定义 返回值是一个遍历器对象
  let tell = function* () {
    yield 'a';
    yield 'b';
    return 'c';
  }; // 函数执行的时候遇到yield会停下来，当调用一次next的时候执行一个yield/return后的语句直到执行到下一个yield/return 停止

  let k = tell(); // 返回一个遍历器对象(Iterator接口对应的遍历器函数的遍历器对象)

  console.log(k.next()); 
  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
}

{
  let obj = {};
  // 通过创建generator函数的方式来给obj部署 Iterator 接口

  obj[Symbol.iterator] = function* () { // 这里就等于把generator函数当做了遍历器函数
    yield 1;
    yield 2;
    yield 3;
  }

  for(let value of obj) {
    console.log('value', value);
  }
}

{ // 状态机应用，永远不断地获取a b c三种状态之一
  let state = function* () {
    while(1) {
      yield 'a';
      yield 'b';
      yield 'c';
    }
  }

  let status = state();
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
}

{ // 状态机应用，永远不断地获取a b c三种状态之一
  let state = function* () {
    while(1) {
      yield 'a';
      yield 'b';
      yield 'c';
    }
  }

  let status = state();
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
}

{ // 这种方法与上一种一模一样，async/await只是 generator的语法糖
  let state = async function () {
      await 'a';
      await 'b';
      await 'c';
      return 123;
  }

  let status = state();
  status.then((value) => console.log(value)) // 123

  // 与generator的区别在于
  // 1. 内置执行器，无需co模块/next 像普通函数一样执行就行。
  // 2. 更好的语义。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
  // 3. 返回值是 Promise。这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。
  // 并且then中回调的参数是async函数内部return返回的值，还有见呀羽博客
}

{ // 抽奖次数限制实战
  let draw = function(count) {
    // 具体抽奖逻辑
    console.log(`剩余${count}次`)
  }

  let residue = function* (count) { // 次数与抽奖逻辑完全分开
    while(count > 0) {
      count--;
      yield draw(count);
    }
  }

  let star = residue(5);
  let btn = document.createElement('button');
  btn.id = 'start';
  btn.textContent = '抽奖';
  document.body.appendChild(btn);

  document.getElementById('start').addEventListener('click', function() {
    star.next();
  })

}

{ // 长轮询
  let ajax = function* () { // 模拟ajax
    yield new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve({code: 0})
      }, 200);
    })
  }

  // 轮询过程
  let pull = function() {
    let generator = ajax();
    let step = generator.next(); // 返回一次promise实例
    step.value.then(function(d) { // 注意这里value 记得 .next()后返回的是 {value: xxx none: xxx}
      if(d.code !=0) { // 如果数据状态码不是最新的，即没拿到最新的数据，则再次请求
        setTimeout(() => {
          console.log('查询中，等待最新数据');
          pull();
        }, 1000);
      } else {
        console.log('已拿到最新数据：' + d);
      }
    })
  }
}