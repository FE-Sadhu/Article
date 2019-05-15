// 获取一个接口

function useFetch() {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/users/superman66')
      .then((data) => {
        resolve(data.json());
      }).catch((e) => {})
  })
}

/**** 使用 Promise 方式处理
 * 
 * 
 * 

function getFetchByPromise() {
  let pObj = useFetch();
  pObj.then((data) => {
    console.log(data)
  })
}

getFetchByPromise();

*/

/**** 使用 generator 方式处理
 * 
 * 

function* getFetchByGenerator() {
  let res = yield useFetch();
  return res;
}

const kk = getFetchByGenerator(); // 遍历器对象

const gen = kk.next(); // 第一次next执行到 yield 语句， value是 yield 后面的值（此时后面的值是个Promise对象）

gen.value.then(data => console.log(data));

 */

async function getFetchByAsync() { // 返回一个 Promise 对象
  const res = await useFetch(); // 这个 res 就是 await 后面的Promise对象 resolve 或者 reject 出去的数据。
  console.log(res);
  return res;
}

getFetchByAsync().then(data => console.log(data));
