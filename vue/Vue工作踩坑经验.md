## 自定义组件的 v-model

假如要在一个自定义组件上使用 v-model ,内部组件应该加入

```js
model: {
  prop: 'xx', // 接受外部 v-model 的值
  event: 'xxxx' // 内部自定义事件
},
props: {
  xx: Number/其他 // 需要注意 model 里面 prop 的需要在 props 里声明一下
}
```

当这个事件被 emit 出去的时候，附带的值就会改变外部 v-model 的值。

> 注意： model 下的 event 可以定义为原生事件，如 radio、input 的 change 事件，与原生的事件可以联合使用，不冲突。

举个例子：

```html
<script>
    Vue.component('childComp', {
      template: '<li @click="handleClick">{{liValue}}</li>',
      model: {
        prop: 'liValue',
        event: 'changeLi'
      },
      props: {
        liValue: {
          type: Number,
          default: 1
        }
      },
      data () {
        return {
          mutate: this.liValue
        }
      },
      methods: {
        handleClick() {
          this.$emit('changeLi', ++this.mutate)
        }
      },
    })

    const app = new Vue({
      el: '#root',
      data: {
        test: 0
      },
      watch: {
        test(val) {
          console.log('测试子组件中修改，组件 v-model 是否响应：', val)
        }
      },
    })
  </script>
```

调试图如下：

![](https://user-gold-cdn.xitu.io/2019/12/10/16eee97ae3889bae?w=1898&h=1050&f=png&s=310987)

## $emit 传出多个参数，并且外部组件还要接收额外参数

solution: $event or arguments

见该 [issues](https://github.com/vuejs/vue/issues/5735)

正常情况下的 emit on 传参很简单，如下：

```js
// 内部 child 组件
this.$emit('change', 1)

// 外部
<child @change="handleChange">

methods: {
  handleChange(val) {
    console.log(val) // 就拿到了
  }
}
```

但是我遇到了三种特殊情况

1. 内部 emit 传多个参时
2. 内部 emit 传一个参，并且外部额外需要接个自定义参数时
3. 内部 emit 多个参，外部需要接参

对于第一种：

```js
// 子组件
this.$emit('change', 1, 2, 3, 4)
// 父组件
@change='handleChange(arguments)'

methods: {
  handleChange(inside) {
    console.log(inside)
  }
}
```

第二种:

```js
// 子
this.$emit('change', 1)
// 父
@change='handleChange($event, userDefined)'

handleChange(inside, outside) {
  console.log(inside, ' --- ', outside) // 1 --- userDefined
}
```

第三种

```js
// 子
this.$emit('change', 1, 2, 3)
// 父
@change='handleChange(arguments, userDefined)'

handleChange(inside, outside) {
  console.log(inside, ' --- ', outside) // arguments --- userDefined
}
```

## node 端代理转发本地接口 ( express Router )

需要代理本地接口且用到本地某个目录文件 mock json 数据或者 需要跨域请求时可以用此方式代理接口。

### 法一

由于 webpack 的 devServer 提供了个 `before` 方法(我猜 webpack 这里内置了 express)，我们可以直接利用，在服务端转发接口。

比如在客户端这样请求：

```js
export const getCardsData = data => axios('/api/searchT', data)
```

假设我们 mock 数据的目录是在 `../src/sys/static/mock/cards.json`，我们可以这样利用 devServer 转发请求。

```js
// directory -> webpack.dev.conf.js
const appData = require("../src/sys/static/mock/cards.json");

devServer: {
  before(app) {
    app.get('/api/searchT', (reg, res) => {
      res.json(appData) // 代理了 '/api/searchT' 接口,自定义返回 appData 数据。
    })
  }
}
```

自然，很容易想到，代理接口后，可以在服务端发起新的请求，正好绕过浏览器同源策略的限制，实现跨域，然后把在服务端新起请求的请求结果 res.json(result) 传给代理的接口就行。举个例子：

```js
devServer: {
  before(app) {
    app.get('/api/searchT', (req, res) => {
      const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
    })
  }
}
```

### 法二

node 端起个 express router 服务代理接口。举个例子：

```js
// 起个 express router 帮我们在 node 端代理本地接口。
const axios = require('axios')
const express = require("express");
const app = express();
const apiRoutes = express.Router();

apiRoutes.get('/getSlider', function (req, res) {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes); // 这里的 'api' 等同于拼接了字符串，此例来说拼接后 apiRoutes 代理的 url 就是 -> '/api/getSlider'
```
