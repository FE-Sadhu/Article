const xhr = new XMLHttpRequest();
const url = 'xxxx';
// 配置 url
xhr.open('GET', url);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json' // 返回值类型
xhr.timeout = 3000;
xhr.ontimeout = function() {
  console.log('xxx');
}
xhr.onload = function() {
  if (xhr.status < 300 && xhr.status >= 200 || xhr === 304) {
    console.log(xhr.response)
  }
}
/* 请求完成获取数据部分还可以用下面来替代 onload
if (xhr.readyState === 4) { // 请求完成的时候
  if (xhr.status < 300 && xhr.status >= 200 || xhr === 304) {
    console.log(xhr.response)
  }
}
*/
xhr.send() // POST 请求的话 data 放这里参数
