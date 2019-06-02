“你不需要立马弄明白所有的东西，不过随着你的不断学习和使用，它的参考价值会越来越高。” <br />
现在项目中遇到了，好好回头总结一波Vue生命周期，以后用到的时候再来翻翻。
## 啥叫Vue生命周期？
每个 Vue 实例在被创建时都要经过一系列的初始化过程。<br />
例如：从开始创建、初始化数据、编译模板、挂载Dom、数据变化时更新DOM、卸载等一系列过程。<br />
我们称 **这一系列的过程** 就是Vue的生命周期。<br />
通俗说就是Vue实例从创建到销毁的过程，就是生命周期。<br />
同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会，利用各个钩子来完成我们的业务代码。
## 啥也不说，先来个干货
这是对于Vue生命周期，官网给的那张图的标注图，图片网上看到的，我觉得标注地很nice，建议一步步仔细看完图片，然后把图片自己悄悄保存下来，对照着图片的内容看第二部分的举例说明。

![](https://user-gold-cdn.xitu.io/2018/10/29/166be49ed80a875c?w=1200&h=3039&f=png&s=325989)
## 我相信程序员看代码比看文字更容易理解
对照着上图标注的内容，我们一个钩子一个钩子地举例说明。
### 1.beforeCreate
实例初始化之后、创建实例之前的执行的钩子事件。<br/>
如下例子：
```
<body>
<div id="root">{{test}}</div>
<script type="text/javascript">
	const vm = new Vue({
		el: '#root',
		data: {
			test: '天王盖地虎'
		},
		beforeCreate() {
			console.log('beforeCreate钩子事件：');
			console.log(this.$data);
			console.log(this.$el);
		}
	})
</script>
</body>
```
得到的结果是：

![](https://user-gold-cdn.xitu.io/2018/10/29/166be908078de520?w=279&h=120&f=png&s=5099)
**小总结**：创建实例之前，数据观察和事件配置都没好准备好。也就是数据也没有、DOM也没生成。
### 2.created
实例创建完成后执行的钩子 <br/>
在上一段代码例子中，我们再来console一下。
```
<body>
<div id="root">{{test}}</div>
<script type="text/javascript">
	const vm = new Vue({
		el: '#root',
		data: {
			test: '天王盖地虎'
		},
		created() {
			console.log('created钩子事件：');
			console.log(this.$data);
			console.log(this.$el);
		}
	})
</script>
</body>
```
得到的结果是：
![](https://user-gold-cdn.xitu.io/2018/10/29/166be92534635474?w=309&h=124&f=png&s=6517)
**小总结**：实例创建完成后，我们能读取到数据data的值，但是DOM还没生成，挂载属性el还不存在。
### 3.beforeMount
将编译完成的html挂载到对应的**虚拟DOM**时触发的钩子<br/>
此时页面并没有内容。<br/>
即此阶段解读为: 即将挂载<br/>
我们打印下此时的$el
```
beforeMount() {
			console.log('beforeMount钩子事件：');
			console.log(this.$el);
		}
```
得到的结果是：
![](https://user-gold-cdn.xitu.io/2018/10/29/166beb04e5a35616?w=342&h=129&f=png&s=7360)
**小总结**：此时的el不再是undefined,成功关联到我们指定的dom节点。但是此时的{{test}}还没有成功渲染成data中的数据，页面没有内容。<br />
PS：相关的render函数首次被调用。

### 4.mounted
编译好的html挂载到页面完成后所执行的事件钩子函数。<br />
此时的阶段解读为： 挂载完毕阶段<br>
我们再打印下此时$el看看：
```
mounted() {
			console.log('mounted钩子事件：');
			console.log(this.$el);
		}
```
得到的结果是：

![](https://user-gold-cdn.xitu.io/2018/10/29/166bebd4604596e0?w=295&h=130&f=png&s=7808)
可见， {{test}}已经成功渲染成data里面test对应的值“天王盖地虎”了。<br />
**小总结**：此时编译好的HTML已经挂载到了页面上，页面上已经渲染出了数据。一般会利用这个钩子函数做一些ajax请求获取数据进行数据初始化。<br/>
PS：mounted在整个实例中只执行一次。
### 5.beforeUpdate
**小总结**：当修改vue实例的data时，vue就会自动帮我们更新渲染视图，在这个过程中，vue提供了beforeUpdate的钩子给我们，在检测到我们要修改数据的时候，更新渲染视图之前就会触发钩子beforeUpdate。
### 6.updated
**小总结**：此阶段为更新渲染视图之后，此时再读取视图上的内容，已经是最新的内容。<br />
PS:<br/>
1、该钩子在服务器端渲染期间不被调用。<br/>
2、应该避免在此期间更改状态，因为这可能会导致更新无限循环。
### 7.beforeDestroy
**小总结**：调用实例的destroy( )方法可以销毁当前的组件，在销毁前，会触发beforeDestroy钩子。
### 8.destroyed
**小总结**：成功销毁之后，会触发destroyed钩子，此时该实例与其他实例的关联已经被清除，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

## 话在最后
其实还有三个生命周期钩子没列出来：activated、deactivated、errorCaptured。这三个大家遇到了自行了解哈,暂且这样吧。

