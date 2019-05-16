const xhr = new XMLHttpRequest();
const url = 'https://api.github.com/users';

xhr.open('GET', url, true);
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.responseType = 'json';
xhr.timeout = 5000;
xhr.ontimeout = function() {
  console.log('Oops, 请求超时了')
}
xhr.onprogress = function(event) {
  try {
    console.log(event.total);
  } catch (e) {
    console.log('errSadhu:' + e);
  }
}
// xhr.onload = function() { 
//   if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//     console.log(xhr.response);
//   }
// }
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      console.log(xhr.response);
    }
  }
}
xhr.send();