function jsonp(obj) {
  return new Promise((resolve, reject) => {
    let { url, params, callback} = obj
    let script = document.createElement('script')

    /* 处理 url 参数 */
    let helper = []
    for (let k in params) {
      helper.push(`${k}=${params[k]}`)
    }
    url = url + '?' + helper.join('&')
    script.src = url

    window[callback] = function (data) {
      resolve(data)
      document.body.removeChild(script)
    }

    document.body.appendChild(script)
  })
}

jsonp({
  url: 'http://xxx',
  params: {xxx: 'xxx'},
  callback: 'xxx'
}).then((data) => {
  console.log(data)
})