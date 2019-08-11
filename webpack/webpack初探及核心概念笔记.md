> 注：最好的最新的学习资料永远是官方文档，此篇笔记仅是学习官方文档过程中的总结。
## webpack定义
webpack is a module bundler.
webpack是一个模块打包工具。（对ES Module/CommonJs/CMD/AMD等模块引入规范的引入模块都可以正确识别）
## 正确安装webpack
1. `node init` (初始化node配置，此操作生成package.json文件)

2. 初始化后改变一下packge.json配置
    - 当项目不会被外部引用，只有自己使用的时候要去掉 "main" 配置项，没有必要向外暴露一个index.js
    - scripts再去掉
    - 这就初始化好了

3. webpack安装方式
    - 全局安装

       `npm install webpack webpack-cli -g`
       >  这样不推荐，万一别的项目需要旧版本的webpack，而我们全局安装当前最新版本的webpack的话，老版本项目就启动不了了，所以我们需要使用项目分别各自安装webpack的方式。
    - 在局部项目中安装

      `npm install webpack webpack-cli --save-dev`(等价 -D)
      说明： 
      `--save`和`--save-dev`可以省掉手动修改package.json文件的步骤。
      `npm install module-name -save` 自动把模块和版本号添加到dependencies部分（运行时的依 赖）
       `npm install module-name -save-dve` 自动把模块和版本号添加到devdependencies部分（开发时的依赖）
       > 注：
        devDependencies 下列出的模块，是我们开发时用的，发布后用不到它。dependencies 下的              模块，则是我们发布后还需要依赖的模块，譬如像jQuery库或者Angular框架类似的，开发完后需要       依赖它们，否则执行不了。
       > 补充：
       正常使用`npm install`时，会下载dependencies和devDependencies中的模块，当使用`npm install –production`或者注明`NODE_ENV`变量值为production时，只会下载dependencies中的模块。

    - 顺便一提 webpack 相关命令
       1. install 好 webpack 后查看版本号 -> webpack -v
       2. 全局删除安装好的 webpack  -> `npm uninstall webpack webpack-cli -g`
4. 局部项目 webpack 安装好后
    - 项目目录会多出 **node_modules** 文件夹，这个文件夹是装的 webpack 和它所依赖的包，都安装在这里。
    - 此时直接输入 webpack 命令例如 webpack -v 会报错，是不行的，因为nodejs会去全局找，而我们只安装在了局部。所以此时我们使用 node 提供的命令 -> **npx**。
    例如要找版本，则使用 `npx webpack -v` 而不是 `webpack -v`。
    npx 命令的话会在 node_modules 文件夹下找，找到 webpack 后再去执行相关命令（该文件夹下有个webpack文件夹）
5. 补充
    - 要下载特定版本的 webpack，需要这样：
        `npm install webpack@版本号` 
    - 若把 node_modules 删除了，再执行`npm install`这个命令，就会把项目所依赖的包都安装好，项目目录下 node_modules 就会回来。
## webpack的配置文件
在没有手动写配置文件的时候，我们`npx webpack 某个文件` or `npx webpack`打包的话，是采用的 webpack 默认的配置文件，配置文件名为 `webpack.config.js`，当然这个名称可以修改，具体方式见引用。根据每个项目的特点，我们是可以手写配置文件的。

> 配置文件默认名称是可以修改的，假如修改为 vue.config.js ， 那么命令行里执行一句 `npx webpack --config vue.config.js` 就行了，这句意思是打包的时候以 vue.config.js 为配置文件进行打包。

我们可以手写一下配置文件：
```js
// webpack.config.js
const path = require('path'); // nodejs的路径模块

module.exports = { // CommonJs的语法
  entry: './src/index.js', // 要打包的入口文件
  output: { // 配置打包后输出的文件
    filename: 'sadhu.js',
    path: path.resolve(__dirname, 'sadhu_dist') // 此时的__dirname就是配置文件的当前路径,sadhu_dist就是该路径下打包后的文件夹
  }
}
```
配置好后直接执行一下`npx webpack`，文件目录就会变成：

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7fdc1a85ccd2a?w=2382&h=1048&f=png&s=564117)

网页正确显示。

### 我们再来谈谈 **npm scripts** 这个方法。
我们一般用 vue/react 打包时都用的命令 `npm run dev/build/...`，而不是用的 `npx webpack` 或者 `webpack 啥啥啥的` , 这就是因为用到了 `npm scripts` 方法。
我们来修改 package.json 里 **scripts** 的字段为这样：

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7fdcde530b956?w=1264&h=1294&f=png&s=126417)

这样的话，我们就可以在命令行运行 `npm run build`，等同于运行了 webpack 指令去进行打包，这就是所谓的 `npm scripts` 方法。

### webpack-cli
webpack-cli 这个包就是为了命令行能正常识别 `webpack` 指令，不装这个包就识别不了。

## loader
webpack默认识别引入的模块是js模块，如果要引入其他模块比如引入一个图片模块：

那么默认就打包不成功，webpack不知道怎么办。

默认不成功，但是**我们可以在模块打包的时候，手动配置一个 loader 告诉 webpack 要怎样打包。**
```js
module.exports = {
  entry: './src/index.js', // 要打包的入口文件
  module: { // 配置当打包一个模块儿的时候干啥
    rules: [{
      test: /\.jpg$/, // 当打包以 .jpg 结尾的文件时使用下一行的 loader 来帮助我们坐打包
      use: {
        loader: 'file-loader' // 我们需要先安装一下 file-loader 这个工具 -> npm install file-loader -D
      }
    }]
  },
  output: {
    filename: 'sadhu.js',
    path: path.resolve(__dirname, 'sadhu_dist') // 此时的__dirname就是配置文件的当前路径,sadhu_dist就是该路径下打包后的文件夹
  }
}
```
所以，loader的定义就是：
**loader其实就是一个打包方案，对于某些特定后缀特定文件，webpack本身不知道怎么打包，就可以借助配置loader。**

### 使用 url-loader 的例子
```js
module: { // 配置当打包一个模块儿的时候干啥
    rules: [{
      test: /\.jpg$/, // 当打包以 .jpg 结尾的文件时使用下一行的 loader 来帮助我们坐打包
      use: {
        loader: 'url-loader', // 我们需要先安装一下 file-loader 这个工具 -> npm install file-loader -D
        options: { // 配置参数参考文档，各个什么意思参考官方文档
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 2048 // 在文件大小 > 2kb 时，输出在 images文件夹里，反之，转为 base64 码嵌进 js 中。
        }
      }
    }]
  },
```
loader的东西还是要多查文档。

## 使用Plugins让打包跟快捷
### 用处定义
**plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情。**（类似于 vue/react 的生命周期函数钩子，如下的 htmlWebpackPlugin 就是在打包完成之后帮我们在 dist 目录下加一个 html 模板）
### htmlWebpackPlugin举例
该 plugin 会在打包结束后自动生成一个 html 文件， 并把打包生成的 js 自动引入到这个 html 文件中。
### cleanWebpackPlugin举例
该 plugin 的作用是会每次当你输入命令重新打包之前，会删除原来的打包输出的 dist 文件。(导致重新打包后会生成新的 dist 文件。)
用法：
1. npm install clean-webpack-plugin -D
2. 在配置文件 webpack.config.js 中定义： const cleanWebpackPlugin  = require('clean-webpack-plugin')
3. 在 plugin 中实例化。(`plugins: [new cleanWebpackPlugin(['dist'])])`)

## sourceMap
### 定义
使用 sourceMap 来映射业务文件与打包后的文件的关系，更利于排错，控制台直接报出的就是打包前业务文件里第几行的错。**总结来说，当打包后的代码出错的时候，配置了sourceMap的话，就直接在控制台提示的是源代码的错误位置。**

### 最佳实践
development 开发环境下，配置sourceMap为 `devtool: 'cheap(为了更快性能)-module(为了找出webpack配置的错)-eval-source-map'`。
production 生产环境下，配置sourceMap为 `devtool: 'cheap-module-source-map'`。

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7fdf84242ffd3?w=2312&h=428&f=png&s=605516)

## 配置devServer来提高开发效率
见下图以及注释：
原本我们是手动 npx webpack 或者 npm run xxx 进行打包后，生成 dist 目录，然后手动打开 dist 目录下的html文件查看页面，配置 webpack-dev-server 后，自动化执行了，见下图注释。

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7fe09517a01f8?w=2386&h=504&f=png&s=446398)

## 热模块更新 HMR -> Hot Module Replacement
### 定义（作用）
引用官网一句话：模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。**它允许在运行时更新各种模块，而无需进行完全刷新。**（即当我们修改某个模块的内容时，在不变动当前渲染得情况下进行页面修改。）
原理去官网看。

### 在 webpack-dev-server 中开启热更新
1. 首先在 devServer 中配置：

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7fe09517a01f8?w=2386&h=504&f=png&s=446398)

2. 然后引入 webpack 包

3. 写入 plugins 中

4. 看情况需要在源代码中编写 module.hot.accept() 实现当某模块修改时要进行什么操作。

### HMR的例子
我的webpack的repo里有 引入css模块修改和js模块修改的例子。
### 注意
在有用 css-loader 的情况下，我们直接修改 css 的一些内容就会在页面当前渲染得情况下响应相应修改。
但是对于webpack默认就可以识别的引入js模块，当某个js模块内内容修改时，不会直接在页面当前渲染情况下响应相应修改，需要自己利用 `module.hot.accept('xx', () => {})` 来编写相应代码，拿我repo里js模块修改的例子来说：

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7fea08cb698a9?w=2354&h=884&f=png&s=398067)

这里是当 number.js 里内容修改后，删除修改代码前的 number.js 生成的DOM节点，再次执行修改后的 number.js 生成新的DOM节点挂载到页面上。这样在页面上，就是当 number.js 模块内容修改时，在当前页面渲染的情况下页面响应了该模块的修改内容。
而 css 模块修改内容就直接可以在当前页面渲染情况下响应修改的原因是我们 use 了 css-loader，**在 css-loader 中帮我们写了其相应的 module.hot.accept() 的逻辑，所以我们不用自己写，页面直接在当前渲染情况下响应内容。**

## 配置 Babel
按照文档来，一般情况下，分为两种情况来配置：
1. 对于一般的业务逻辑，要把 ES6 转化为 ES5 语法去兼容以前版本的浏览器的话，使用如下配置：

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7feabc2e48447?w=2360&h=774&f=png&s=370031)

2. 我们要生成一些第三方模块 or UI库等库打包的时候，不能使用方法1造成 babel污染全局变量，所以要使用如下配置：
```js
options: {
"plugins": [[
      "@babel/plugin-transform-runtime", {
       "corejs": 2,
       "helpers": true,
       "regenerator": true,
       "useESModules": false
      }]]
}
```