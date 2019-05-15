fetch('https://api.github.com/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => { // res 是 response实例 的信息
  if (res.ok && ((res.status >= 200 && res.status < 300) || res.status == 304)) {
    console.log(res.json().then(data => console.log(data)));
  }
})

// fetch api 返回一个 promise 来处理 response，当请求成功时 ok 会为 true，
// 因为response实例会为它的 body 对应不同数据类型提供了不同的方法， 如 blob()/json()/text()
// 调用这些方法如上 res.json() 会返回一个 promise 对象，并且会把相应处理过后的数据 传到 该 promise 的 then的回调中