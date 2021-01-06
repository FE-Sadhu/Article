async function async1 () {
  console.log('async1 start');
  await async2();
  console.log('async1 end')
}

async function async2 () {
  console.log('async2')
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout')
})

async1();

new Promise((resolve, reject) => {
  console.log('promise 1');
  resolve()
}).then(() => {
  console.log('promise 2');
})

console.log('script end');

// Script start
// task [setTimeout ]
// A1 start
// A2
// mic [a1 end, p2]
// P1 
// Script end
// A1 end
// P2
// setTimeout
