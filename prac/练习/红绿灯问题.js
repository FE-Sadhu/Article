/*
题目：红灯三秒亮一次，绿灯2秒亮一次，黄灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promse 实现）

三个亮灯函数已经存在：

function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}
*/
function red(){
  console.log('red');
}
function green(){
  console.log('green');
}
function yellow(){
  console.log('yellow');
}

var light = function(timer, cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve()
    }, timer)
  })
}

var step = function() {
  return Promise.resolve().then(() => {
    return light(3000, red);
  }).then(() => {
    return light(2000, green)
  }).then(() => {
    return light(1000, yellow)
  }).then(() => {
    step()
  })
}

step()