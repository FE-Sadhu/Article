const url = 'https://api.github.com/users';

fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then((response) => { // response 是 Response 的实例
  if (response.ok && ((response.status >= 200 && response.status < 300) || response.status == 304)) {
    console.log(response); // 输出该实例
    response.json().then((data) => console.log(data));
  } else {
    console.log('Oops, 请求失败')
  }
})