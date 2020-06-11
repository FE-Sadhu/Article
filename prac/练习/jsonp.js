// 规定封装 jsonp 函数后的使用格式如下
Jsonp({
  url: "xxx",
  params: {
    xx: "xxx",
    xxx: "xx",
  },
  callback: "xxx",
}).then((val) => {
  console.log(val);
});

/**
 * jsonp
 */

function Jsonp(obj) {
  return new Promise((resolve, reject) => {
    let {url, params, callback} = obj;
    const script = document.createElement('script');
    window[callback] = function(val) {
      resolve(val);
      document.body.removeChild(script)
    }
    const helper = []
    for(let key in params) {
      if (params.hasOwnProperty(key)) {
        helper.push(`${key}=${params[key]}`)
      }
    }
    url = url + '?' + helper.join('&');
    script.src = url;
    document.body.appendChild(script); // 发起 get 请求
  })
  
}