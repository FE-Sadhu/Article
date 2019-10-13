## sadhu-music
在线预览地址：[传送门](http://ptuyxr.cn/music/)。

移动端浏览体验更佳。

目前只总结了个人认为值得记录下来的内容：

- 总结了项目开发中遇到的核心问题、解决思路及采用的解决方案。
- 总结了项目中利用到的两个区域双向联动业务逻辑思路。
- 总结了播放器音乐播放流程

半年内空下来时会从头到尾记录下来，争取写成一本友好的小实践书。

## 技术栈
- Vue-Cli（Vue 脚手架工具）
- Vue（核心框架）
- Vue-Router（页面路由）
- Vuex（状态管理）
- ES 6（JavaScript 语言的下一代标准）
- stylus（CSS 预处理器）
- Axios（HTTP 请求库）
- Better-Scroll (处理移动端各种滚动场景需求)
- FastClick（解决移动端 300ms 点击延迟）
- flexbox + position 布局 (Flex 是移动端自适应布局神器！！！)

本项目数据均是在线请求 QQ 音乐官方接口获得。（node 端采用 express router 路由代理浏览器端本地接口转发请求真实接口解决跨域问题，本质上是在服务端发送 ajax 请求不受浏览器端同源策略限制。）

## 所遇问题以及解决方案
### 推荐页面应用 better-scroll 的内容区域末尾被隐藏
#### 定位问题

首先，检查自己代码和 bs 官方 api，看看是不是自己代码写错，发现没有，根据现象观察发现只是 bs 下 内容区域的高度不正确，有部分区域被隐藏了，带着问题去官方文档查询，得出出现这问题的核心，就是 better-scroll 对 content 元素的高度计算不正确。

我是在推荐页面请求到数据时的 nextTick 中调用的 refresh 重新计算 content 区域，但是我请求到的数据中，包含了图片的 url ，而我需要用到这图片，所以在给 img 标签的 src 写上 url 数据后，浏览器在渲染过程中会再次发送 http 请求读取相应 图片 资源展示在页面上。所以这有两次 http 请求，我只在第一次的时候 refresh 让 bs 重新计算高度，这是不够的。

#### 解决方案
1. 方案一： 监听图片 load 事件，在最后一张图片加载完成后再次 refresh 重新计算内容区域高度。

2. 方案二： 给 img 标签外部套个 wrapper， 利用 wrapper 先固定高度。

### 利用 axios 库发送 ajax 请求时，发现 request url 里携带的参数编码不对
#### 定位问题
有个请求，需要携带的参数是嵌套的对象，对象里面就有 ':' 号、 ',' 号，然后利用 axios 发送请求，分析 network 时发现，request url 中 ':' 和 ',' 竟然没被 url encode。

1. 首先，检查自己代码，看看是不是代码部分写得有问题， axios 提供的一些 api 有没正确运用。

2. 看看是不是浏览器问题，自己手动 encodeURIComponent 参数后再发送请求。发现 request url 依旧没被正确编码。

3. 由于我们使用的 axios 是第三方库，我的疑心起到了 axios 身上，毕竟 axios 对我们是黑盒，所以我去看了 axios 参数编码相关的源码，最后在 ./lib/helper/buildURL.js 中定位了问题，它有个 encode 方法把 url 编码过后的参数做了一些替换，其中就有把 ':' 号、',' 号对应的 url 编码替换成了编码前的 ':' 、 ','。

#### 解决方案
通过重写 axios 的 paramsSerializer 方法可以解决问题，让其不被替换。

### 在请求歌曲 url 数据时，发现请求一次有概率会出现请求成功但没有数据的情况
#### 定位问题
因为这是概率性问题，发送一次大概 70% 概率会请求成功有数据，30% 概率会请求成功无数据，证明代码是没有问题，可能是 qq 音乐服务器在同一时间请求数量太多造成。

#### 解决方案
利用 promise 封装请求函数 request() ，经分析 network ，发现请求到的包含 songUrl 的数据有三层，每一层都有一个判断有无数据的标志位，songUrl 在第三层数据中，
所以我们在 api 请求中 return 一个 promise ，promise 中执行 request() 请求函数，请求函数中先利用 axios 发送请求，得到数据后判断数据第一次标志位有无数据，无的话 retry 重新执行 request() 函数，若第一层有数据则拿第二层中标志位判断，若标志位有数据则接着判断第三层标志位有无数据，若有则拿到数据 songUrl，然后 resolve 出去，若标志都无数据的话，则重新执行 request() 函数发送数据。同时在 retry() 函数中定义最多请求 3 次，若超过 3 次 则 reject 出去。

## 业务逻辑

### 歌手页字母表和内容区域联动效果

1. 首先手指按下字母表中某个字母， content 区滑动到对应区域

利用了移动端 touchstart 事件 + better-scroll 实现该逻辑： 

first -> 字母表是一个数组，我们渲染到页面上后，用的是 v-for ，在 v-for 的 li 标签上自定义属性 'data-index'，它的属性值就是 v-for 中定义的第二个参数，如 v-for="(item, index) of singers"，这等于可以通过获取自定义属性值取得字母表中对应字母在数组中的索引。

second -> 在移动端 touchstart 事件中可以通过事件对象 e.target 获取到手指在页面上处于元素的 DOM 节点, 然后利用获取到的 DOM 节点，获取自定义属性 'data-index' 的属性值，就得到了手指处于元素的该元素的索引 A。

third -> content 区域也是利用 singers 数据渲染的，每个 chunk 和 字母表 一一对应。在 li 上 v-for="(item, index) of singers"，我们再在 li 标签上加上 ref="listGroup" ，接下来我们再接着在 touchstart 的回调中利用 better-scroll 的 scrollToElement(this.$refs.listGroup[索引A])，就可以实现当手指按下时， content 滑动到对应区域。

2. 当手指滑动时，content 区域 也对应联动

利用了 touchmove 事件 与 better-scroll 实现

first -> 在 touchstart 的回调中记录下开始触摸时的字母的索引 A, 然后记录下开始触摸时的字母相对于 html 文档的高度 A (e.touches[0].pageY), 然后在 touchmove 中记录下滑动到此时的相对 html 文档的高度 B(e.touches[0].pageY)

second -> 利用 (B - A)/每个字母高度后向下取整，得出此时滑动了 x 个字母

third -> 利用 scrollToElement(this.$refs.listGroup[索引 A + x]) 就可以让 content 区域跟着滑动了。

3. 当滑动 content 区域时，字母表跟着联动

其实这是个障眼法，应该转换过来解释： 当滑动到某个 content 区域是，对应字母表的字母有额外的样式，比如在音乐中就是字母颜色变红。

first -> 在字母表 li 上动态绑定类名 `:class={'showRed': currentIndex === index }`

second -> 把 content 中每个 chunk 的高度(clientHeight)以累加的方式存入数组 listHeight 中，比如第一个 chunk 高度为 2 ，第二个 chunk 高度为 3，listHeight 就是 [0, 2, 5 ...]， content 区域监听 bs 中 scroll 事件，实时取得当前滑动的距离 scrollY， watch scrollY 。

third -> 当 scrollY 改变的时候，循环遍历 listHeight，在一次循环中把当前值设为 height1 ,把当前值的下一个值设为 height2，当 height1 <= scrollY < height2 时，设置 this.currentIndex 为当前循环的 index 值，就实现滑动到 content 某个区域，对应字母变红效果了。

fourth -> 在 touchstart 和 touchmove 的回调中设置 scrollY = this.listHeight[当前字母的 index] 就 ok。

### 播放器内核

播放器内核 player 充分应用了 vuex 管理状态。因为播放器在全局的任何组件中都可以调用出来。

关于播放器，在 vuex 中保存了这些状态：playing(表示正在播放与否)、sequenceList(排序播放列表)、playList(播放歌曲列表)、fullScreen(表示是否展示播放器页面)、currentIndex(当前播放歌曲在播放列表中的索引)、mode(播放模式)

```js
// ./store/state.js
export const state = {
  playing: false, // 播放就是 true
  fullScreen: false, // 全屏
  playList: [], // 播放列表
  sequenceList: [], // 排序播放列表
  mode: playMode.sequence, // 播放的模式： 顺序或其他的,默认为顺序播放
  currentIndex: -1, // 当前播放的索引 =》 (控制前进后退播放那些的)
}
```

一旦在哪个页面点击了某首歌后，比如在歌手详情页点击了该歌手的第三首歌，那么就会把 3 这个索引和当前歌手的全部歌曲 list 存入 vuex，索引 3 就设置成 currentIndex， list 就设置成 sequenceList 和 playList，然后在 vuex getters 中可以返回个 currentSong, 它的值就是 `playList[currentIndex]` 啦，如下：

```js
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
```
并且会改变 `fullScreen: true, playing: true;`。 在播放器内部，就会从 vuex 中取出这些值，比如当 fullScreen 为 true 时就 show 出播放器页面。比如在播放器 player 内部会 watch currentSong，当 currentSong 改变的时候就播放歌曲 `audio.url = currentSong.url; audio.play()` 等等。

播放器等于就是完全受 vuex 中数据控制的。以后遇到类似大部分组件都可以用到的组件时，我们也可以用 Vuex 里的数据来控制该组件。

配张主要流程脑图：

![](https://user-gold-cdn.xitu.io/2019/10/13/16dc5a2d57533f4a?w=1336&h=1190&f=png&s=252533)

