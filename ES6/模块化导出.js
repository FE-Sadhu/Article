// 第一类的情况
// export let A = 123; // 导出变量

// export function test() { // 导出函数
//   console.log('test');
// }

// export class Hello{
//   test() {
//     console.log('class'); // 导出类
//   }
// }

// 第二类的情况

let A = 123;

function test() {
  console.log('test');
}

class Hello{
  test() {
    console.log('class');
  }
}

export default {
  A,
  test,
  Hello
}