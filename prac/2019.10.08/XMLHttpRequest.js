const xhr = new XMLHttpRequest();
const url = '';
xhr.open('GET', url, true); // 配置 url
xhr.responseType = 'json'
// xhr.setRequestHeader('xxx', 'xxx');
xhr.timeout = 5000; // 从调用 send() 开始计时
xhr.ontimeout = function () {
  console.log('请求超时');
}

xhr.onload = function () { // xhr.readyState 为 4 的时候
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.response)
  }
}

xhr.send(); // POST的话就在这里添加数据