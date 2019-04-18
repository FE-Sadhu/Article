var xhr = new XMLHttpRequest();
var url = 'https://api.github.com/users'

xhr.open('GET', url, true);
xhr.responseType = 'json';
xhr.onload = function() {
  if(xhr.status >= 200 & xhr.status <300 || xhr.status === 304) {
    console.log(xhr.response);
  }
}
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.ontimeout = function(event) {
  console.log('请求超时!');
}
xhr.send();