# CSS
## css盒模型
在网页布局中，我们可以将 HTML 标签看成一个个矩形盒子，盒模型就是用来描述这些矩形盒子所占的空间大小。

有两种：怪异模式盒模型和标准盒模型。
盒模型是由一个元素的 content padding border margin 组成
标准盒模型的宽高由 content 组成
怪异盒模型的宽高由 content padding border 组成

设置方式：
box-sizing: border-box(怪异盒模型)/content-box(标准盒模型)/inherit (从父元素继承 box-sizing的值)

## BFC
BFC，顾名思义，是块级格式化上下文。它是一个独立的渲染区域，区域内部元素与外部元素的样式布局互不影响，不被 float 元素覆盖，内部的盒子会按垂直方向一个一个放置，并且分属不同BFC时可以避免 margin 重叠，计算 BFC 高度时，浮动元素也会计算在内。

### 怎样生成 BFC ：
1. 根元素
2. float 不为 none
3. position 为 absolute/fixed
4. overflow 的值不为 visible
5. display 为 inline-block/flex等

## inline-block 元素之间有间隙
多行排列的 inline-block 元素之间有间隙，是因为两个标签之间有空格，浏览器会把这个空格当做文字的空格，这个就是有间隙的原因。

### 解决办法：
1. 让两个标签之间无间隙，但是排版不好
2. 给父元素添上 font-size: 0;

## 单行文本溢出显示省略号
```css
overflow: hidden;
text-overflow: ellipsis;
white-space: no-wrap; // 不换行
```

## 多行文本溢出显示省略号
```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3; //行数
overflow: hidden;
```

## display:none 和 visibility:hidden 的区别
1. 两者都会在视觉上隐藏元素，但是 display: none 是直接把节点从 DOM 文档中移除再添上，而 visibility :hidden 则是简单的隐藏元素，仍然保留了 DOM 中的位置。
2. 由于第 1 点，display:none 会引发回流，导致渲染树重新渲染然后重新布局绘制展示，代价较大。而 overflow:hidden 则会引发重绘，只是重新绘制该元素的节点信息。

## transform/transition/animation
只提我觉得需要注意的点
1. 分清 transform 是位移、缩放、旋转、倾斜/ transition 是过渡动画/animation 是复杂动画
2. transform: translate3d(x, y, z) 可以触发硬件加速。

> 什么是硬件加速,就是会给元素额外创建一个复合图层，就是硬件加速。因为到最终展示页面的时候是 GPU进程 协助 GUI 渲染线程去展示页面的， GPU 进程会把各个图层合成后展示在页面上。(普通文档流是默认复合图层、absolute虽然脱离了文档流，但还是属于默认复合图层)

## css 优化、提高性能的方法
1. 多个 css 合并，尽量减少 http 请求
2. css sprite
3. 抽象提取公共样式、减少代码量
4. 压缩 css 代码

## css 选择器
- 标签选择
- id选择器
- class 选择器
- 后代选择 (div a)
- 子代选择 (div > a)
- 相邻选择 (div + a)
- 通配符选择 (*)
- 伪类选择
- 属性选择器

## position 有哪些值？ relative 和 absolute 的定位原点是
- static // 正常定位，元素的位置在文档流内正常定位
- relative // 相对定位，元素的位置相对自身的位置进行定位
- absolute // 绝对定位，元素的位置相对祖先元素中 position 非 static 的元素进行定位，如果没有就相对浏览器窗口进行定位
- fixed // 固定定位，相对整个浏览器窗口进行定位
- inherit // 规定从上一级元素继承 position 的值
- sticky // 类似结合relative + fixed 的效果，让元素在规定视口范围内为 relative 效果，超过这个范围就是 fixed 效果。

## 什么是响应式设计，响应式设计的基本原理是什么
- 响应式设计就是网站能够兼容不同大小的终端，而不是为每一个终端都开发一个版本的代码。
- 基本原理就是利用 css3 的媒体查询，为不同尺寸的终端适配不同的样式

## 浮动与清除浮动
浮动：脱离文档流，直到挨着包容框或另一个浮动框的边缘，可以覆盖文档流内的元素但是对文字会形成文字包裹的效果。

清除浮动：
1. 浮动元素的 :after 伪类中定义个 content: '', clear:both
2. 在需要清除浮动的元素上定义 clear: both
3. 把需要清除浮动的元素变成 BFC

## opacity
- opacity: 0 会让元素透明度变为0（隐藏了元素），但是保留 DOM 位置，可以进行事件监听（比如可以点击，但是 visible: hidden就不能点击，只是隐藏了元素），并且 `opacity: 0` 和 `transform:translate3d()` 一样都可以额外生成一个复合图层，系统会额外分配资源,交给额外的线程去处理，当改变了复合图层内部元素的位置样式等信息时，会单独渲染，与普通文档流的默认复合图层没有关联。

- rgba() 和 opacity 的透明效果有什么不同：opacity 会改变元素及其内部子元素的整个透明度，而 rgba() 则只是作用于当前元素，改变当前元素的颜色或背景色。

## base64的使用
- 将小图片改为 base64 编码写入 css, 可以减少 HTTP 请求。
- base64 的体积约为原图体积的 3/4 。

## 水平居中
### 行内元素/文字居中
```css
.parent {
  text-align: center; // 此方法对 inline,inline-block都有效
}
```
### 块级元素水平居中
#### 1 定宽用 margin 0 auto
```css
.child {
  width: xxx; // 需要定宽
  margin: 0 auto;
}
```
#### 2 display:table + margin:0 auto 使得元素类似块级元素，并且宽度等于内容宽
```css
.child {
  display: table;
  margin: 0 auto;
}
```

#### 3 display: flex + margin:0 auto 
```css
.parent {
  display: flex;
}
.child {
  margin: 0 auto;
}
```

#### 4 absolute + margin-left 需要知道元素宽度
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  width: 100px;
  left: 50%;
  margin-left: -50px // 宽度的一半
}
```
#### 5 absolute + transform 无须知道元素宽度
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

#### 6 flex 
```css
.parent {
  display: flex;
  justify-content: center;
}
```
### 多个块级元素水平居中
#### 1. 把他们都 display: inline-block 然后 父元素 text-align: center;

#### 2. flex 
```css
.parent {
  display: flex;
  justify-content: center;
}
```

## 垂直居中
###  行内元素/文本垂直居中 
设置 line-height 与 父元素高度相等就行

### 块级元素垂直居中
#### 1 已知元素高度，使用 aboslute + margin-top
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  height: 100px;
  top: 50%;
  margin-top: -50px;
}
```
#### 2 未知元素高度 absolute + transform
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

#### 3 flex
```css
.parent {
  display: flex;
  align-item: center;
}
```

#### 4 display: table-cell + vertical-align: center 转换为单元格
```css
.parent {
  display: table-cell;
  vertical-align: center;
}
```

## 水平垂直居中
### 行内元素/文本
同时运用父元素 text-align: center,并且子元素设置 line-height 与 父元素高度一样就可以了。(这是相对于父元素水平垂直居中)

### 块级元素
#### 1 已知宽高，利用 absolute + margin 
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  width: 100px;
  height: 200px;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -50px;
}
```
#### 2 已知宽高， absolute + margin
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin auto;
}
```

#### 3 已知宽高 absolute + calc 
```css
.parent {
  display: relative;
}
.child {
  display: absolute;
  width: 100px;
  height: 200px;
  top: calc(50% - 100px);
  left: calc(50% - 50px)
}
```

#### 4 未知宽高，可利用 absolute + transform
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

#### 5 未知宽高，利用 flex
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
真是太多了，我都不想写了= =...

## 布局
布局具体代码都见仓库 -> **布局** 文件夹
### BFC自适应两栏布局
#### 1 也就是一边浮动且固定宽度，另一个宽度自适应然后形成 BFC 清除浮动。
#### 2 flex: 0 0 width;(固定宽度) flex:1(宽度自适应)

### 三栏布局 (两边固定，中间自适应)
#### 1 圣杯布局
```html
<div class="container">
  <div class='main'>中间元素自适应</div>
  <div class='left'>left</div>
  <div class='right'>right</div>
</div>
```
三个元素需要布局的元素都 `float: left`，然后 left 元素 `margin-left: 100%` 移到最左边盖住 main 元素, right 元素 `margin-left: -selfWidth`,移到 main 最右边盖住 main 元素，然后包裹框 container `padding-left: leftWidth;`, `padding-right: rightWidth;` 留出空位，最后把 left、right 元素都用 `position: relative` 相对定位，定位到左右空位中就行。

缺点： 当中间自适应元素宽度小于左边元素宽度时，页面布局紊乱。

圣杯布局具体代码参见仓库**布局**文件夹。

#### 2 双飞翼布局
```html
<div class="container">
  <div class='main-wrapper'>
    <div class='main'>中间元素自适应</div>
  </div>
  <div class='left'>left</div>
  <div class='right'>right</div>
</div>
```
双飞翼布局和圣杯布局很相似，只是给中间自适应宽度的元素加了个包裹框。

一开始也是包裹框 left right 元素都是 `float: left`，然后 left 元素 `margin-left: -100%`，right 元素 `margin-left: -selfWidth`，之后包裹框内的中间元素加个 `margin-left: leftWidth; margin-right: rightWidth;`从而能在包裹框内留出空位给 left right 元素就行了。

双飞翼布局解决了圣杯布局的缺点。

#### 3 Flex 布局
父容器 `display: flex;`，left 元素 `flex: 0 0 1`，right 元素 `flex: 0 0 1`，中间元素 `flex: 1`

#### 4 absolute 布局（有很多种搭配方式，我就列举个比较经典的）
左右元素分别定位到左右两边，中间元素 `margin-left: leftWidth; margin-right: rightWidth` 就好。

#### 5 float 布局
三个元素都 `float: left`, 然后中间元素的宽度可以利用 calc 动态计算设置为 `width: calc(100% - 左右元素宽度和)`

#### 6 grid 实现三栏布局
包裹元素上 `display: grid;`,然后设置只有一行并且行高为 xxx px `grid-template-row: 100px`，然后设置有三列: `grid-template-columns: 200px 1fr 300px`

# html
## Doctype 作用
<!DOCTYPE> 告知浏览器应该用什么文档标准去解析这个文档。

文档标准有:
- 标准模式（此模式中页面排版与 js 运作模式都是以该浏览器支持的最高标准进行。）
- 兼容模式 (此模式中页面将以向后兼容的模式展示，当 <!DOCTYPE> 不存在或格式不正确时会导致兼容模式)

## 行内元素有哪些？ 块级元素有哪些？ 空(void)元素有哪些？
- 行内元素: a span img em(倾斜、强调) i(倾斜) strong(加粗、强调) input 
- 块级元素： div ul li h1... p (header footer nav article section等语义化标签都是块级元素，等于是有语义的 div)
- 空元素： br img input link meta

## H5 语义化元素
header footer nav main article section 等元素。

## 简述一下你对 HTML 语义化的理解
- 用正确的标签做正确的事情。比如 header 区域就用 header 标签包裹，文章区域就用 article 标签包裹。
- 因为更语义化了，所以更方便开发者阅读和维护源代码。
- 让页面结构更清晰
- 利于 SEO

## 描述一下 cookies,session.webStorage以及其区别
- cookies 是浏览器存储的方案之一，是服务端（通过在响应头 Set-Cookie 中写入）发送到浏览器并存储在浏览器本地的一小块数据，常用于帮助浏览器和服务端的请求交互，同源的请求交互中每次都会自动携带上 cookies (何谓同源？指相同 协议、主机域名、端口号。)，可以通过设置 max-age 值来控制有效时间，缺点是大小只有 4kb,并且 cookies 里的数据是明文传递(可以采用 rsa 等非对称加密方式进行加密)，js 也可以获取到(可以设置 Set-Cookie 的 HttpOnly 来防止 js 获取)。

- session 是服务端的存储方案，由服务端生成并且存储在服务端，同时会生成对应的 sessonid，等于是这个 sesson 的 key；有效时间比 cookies 长，默认过期时间是 30 分钟，安全性较 cookies 高，但是数据量多了会占用更多服务器资源。一般用来存储用户信息等，一般用于配合 cookies 使用。如下面的场景：
> 在登录页面进行登录，请求发送到服务端，服务端创建 session 存储这个用户的相关信息，生成 sessionid 并把这个 sessionid 写入 cookie，返回到浏览器时，浏览器会存储这个 cookie 到本地。下一次再访问同域名下的页面时，自动携带上 cookie ,服务端会根据 cookie 中的 sessionid 找到 session 自动校验用户信息，无需二次登陆。

- localStorage 是浏览器端的一种存储方式，保存在浏览器本地并且不参与服务端通信，它可以最大存储 5mb 左右数据，是长期存储方案，只能用户手动清除，有原生提供 API，方便操作。

- sessionStorage 是浏览器端的一种存储方式，保存在浏览器端并且不参与服务端通信，它一般最大可存储 5mb 容量，是一种会话级别的存储方案，当关闭页面时就清除 sessionStorage 存的数据。

> by the way, localStorage 可以在浏览器端共享，但是 sessionStorage 不能在各个 tab 页面间共享。

## 移动端项目需要注意的问题

### 1 meta 中设置 viewport 来限制用户放大缩小页面，始终保持页面比例

### 2 重置 css 样式
不同手机浏览器上默认样式是不同的，所以我们需要重置样式。

解决方法： 引入 reset.css 。

### 3 1像素边框问题
有的手机分辨率高，是 2 倍屏或 3 倍屏，其手机浏览器就会把 1 像素展示成两个或三个物理宽度。

解决办法： 引入 border.css ，要实现 1 像素边框时，添加响应的类名就行。

### 4 300毫秒点击延迟的问题
某些手机上 click 事件会延迟 300 毫秒才执行。

解决方法：引入 fastclick.js 库。

## html5 有哪些新特性
1. canvas
2. video/audio
3. webStorage(localStorage/localStorage)
4. 语义化标签
5. webworker/websocket

# js
注：这是在我写的文章的基础上我个人觉得额外需要补充的。

## Object.prototype.toString 可以判断任何类型
```js
function dd() {}
var toString = Object.prototype.toString;
toString.call(dd);          //[object Function]
toString.call(new Object);  //[object Object]
toString.call(new Array);   //[object Array]
toString.call(new Date);    //[object Date]
toString.call(new String);  //[object String]
toString.call(Math);        //[object Math]
toString.call(undefined);   //[object Undefined]
toString.call(null);        //[object Null]
toString.call(123)          //[object Number]
toString.call('abc')        //[object String]
```

## 怎样判断一个数据是否是一个数组
### 1 Array.isArray()
### 2 xxx instanceof Array
### 3 Object.prototype.toString.call(xxx) === '[object Array]'
### 4 xxx.constructor === Array

## 什么是 SPA 单页应用
SPA 我理解为是一种网站应用的模型，做出来的应用是单页应用，只需要加载一次网页，利用路由原理去变换 url 而并不需要刷新网页(histroy/hash)，动态重写当前页面来处理用户与页面的交互。目前主流框架都采用了 SPA 原则。

优点：
- 用户无刷新体验
- 前后端明显分离，后端只负责处理数据提供接口，前端负责页面渲染与交互逻辑
- 因为只请求一次页面，所以会减轻服务端压力
- 只需要后端提供同一套 API ，则在不同终端都可以使用这套 API
- 开发不用以页面为单位，可以更多的采用组件化思想

缺点：
- 不利于 SEO
- 对前端开发者有一定的技术要求

## 什么是 MVVM
MVVM 是一种架构模式。应该这样读： M-V-VM，M 是 model 层，只负责处理数据状态，View 是视图层，只负责处理 UI 展示，VM 是 ViewModel 层，负责映射数据状态与视图间的关系。这种架构模式可以让开发者只需要关注数据处理就行，ViewModel 层会自动帮我们实现数据映射到 DOM 的交互，这就是数据驱动页面的开发方式。现在的主流框架都是采用这种架构模式进行开发的。这种方式可以减少 DOM 操作，也更利于开发者维护开发。当然当状态过多了，也是比较不容易维护的。

## MVVM 与 MVC 的区别
两者都是一种设计思想，区别不大，主要就是 MVC 的 controller 演变成了 MVVM 的 ViewModel，这也引发了其最大的区别就是 VM 能使 model 自动同步到 view，不用手动操作 DOM，所以MVVM 就是主要解决了 MVC 中大量的 DOM 操作使页面性能降低、加载速度变慢、影响用户体验等缺点。

## GET 和 POST 的区别
由于 HTTP 协议的规定和浏览器/服务端的限制，GET 和 POST 有以下区别：
- GET 请求在浏览器回退时是无害的，但 POST 会再次提交请求
- GET 请求会被浏览器主动缓存，POST 请求不会
- GET 请求只能支持 URL 编码，而 POST 请求支持多种编码方式
- GET 请求参数会被完整地保留在浏览器历史记录里面，POST 请求不会
- POST 请求可以通过 request body 来传输比 GET 请求更多的参数。因为 GET 请求在 url 中传输的参数有长度限制的（由于浏览器的不同）
- 对于参数的数据类型，GET 只接受 ASCII 字符，POST 无限制
- POST 请求会比 GET 请求安全一些，因为 GET 参数会直接暴露在 URL 上。但是抓包的话，两个请求的参数都看得到。
- 一般情况下，GET 参数通过 URL 来传递，POST 则会放在 request body 中。
- GET 请求会产生一个数据包，一次性把 headers 和 data 都发送到服务端。POST 请求则会产生两个数据包，第一次发送 headers，收到 100 continue 的响应后再发送 data 过去。
- GET 用于获取信息，是无副作用的，不会修改服务端资源，是幂等的，POST 用于修改服务器上的数据，有副作用，非幂等。

什么是幂等？ 我们发送 M 和 N（M、N都大于1且不相等）次时，服务端资源都是一致的。比如搜索请求，请求多少次服务端资源都不会改变。

为什么开头要加由于 HTTP 规范的规定以及浏览器/服务器的限制，因为 GET 请求也可以把参数放在 request body 中，POST 请求也可以把参数放在 url 中，它们本质都是 tcp 连接。只不过这样放置参数的方式有些服务器可能不会处理直接忽略罢了... 而且有些浏览器上 POST 请求也不一定就会产生两个数据包，比如 firefox 就只产生一个数据包。
