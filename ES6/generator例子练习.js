{
// 模拟抽奖程序

  function price(count) {
    // 一些抽奖逻辑
    console.log(`还可以抽奖${count}次`)
  }

  function* num(count) {
    while(count > 0) {
      count--;
      yield price(count);
    }
  }

  const btn = document.createElement('button');
  btn.textContent = '抽奖';
  document.body.appendChild(btn);
  
  let k = num(5);

  btn.addEventListener('click', function() {
    console.log('好奇 + ', k.next());
  })
}

{
  // 长轮询
  function* ajax() { // 模拟ajax请求
    yield new Promise((resolve) => {
      setTimeout(() => {
        resolve({code: 0})
      }, 200);
    })
  }

  let pull = function() {
    let generator = ajax();
    let step = generator.next().value; // 得到一个Promise对象
    step.then((data) => {
      if(data.code != 0) {
        setTimeout(() => {
          console.log('查询最新数据中，请等待...');
          pull();
        }, 1000);
      } else {
        console.log(`已拿到最新数据:${data}`);
      }
    })
  }
  pull();
}

{
  function a() {
    return 1;
  }
  function b() {
    return 2;
  }
  function c() {
    return 3;
  }

  function* gen() {
    let aa = yield a();
    console.log('11');
    let bb = yield b();
    let cc = yield c();
    return 4;
  }

  let kk = gen();
}
