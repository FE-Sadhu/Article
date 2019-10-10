## 对 vue 生命周期的理解
一个 vue 实例从被创建到销毁的过程就是 vue 的生命周期，在这生命周期中的各个阶段中呢，会触发该阶段对应的函数，这些函数就称为生命周期钩子函数。下面以说明各个钩子函数在哪个阶段触发。

- beforeCreate -> 在实例刚刚被初始化的时候触发，内部还是空的，获取不到数据、方法等。
- created -> 实例已经创建完成，这个钩子函数中可以拿到数据、方法了，但是还没进行模板编译，固然页面还没渲染。
- beforeMount -> 模板编译完了，在即将渲染到页面之前
- mounted -> DOM 已经挂载在了页面上。此时起，实例已经初始化完毕，vue 从 创建阶段 过渡到 运行阶段了
- beforeUpdate -> 此时数据已经更新了，但数据与页面还未同步，数据是新的，页面是旧的。此时从源码解释就是数据更新了，触发 setter ， 通知到 watcher ，就到这步为止，watcher 还没通知外界(虚拟dom patch -> re-render)
- updated -> 此时数据和页面都是新的，同步了。此时 watcher 通知了 虚拟 dom ，实现 watcher -> patch -> render
- beforeDestroy -> 在实例被销毁之前，可以做事件解绑、清除定时器什么的... 此时可以访问到 data/methods/指令 等
- destroyed -> 实例被销毁了

当对组件使用 Keep-alive 的时候，会额外触发 activated deactivated 钩子函数。当组件进入 keep-alive 效果的组件时会触发 activated 钩子函数，当离开 keep-alive 效果的组件时会触发 deactivated 钩子函数。

> 父子组件生命周期顺序： 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

## vue 组件如何通信
- 普通的 prop & emit （只能父子或祖先子孙）
- event bus (可以兄弟组件可以父子)
- vuex (小项目不要用，成本高)
- provide & inject (允许祖先组件往子孙后代注入一个依赖)

## computed 和 watch 的区别
- computed 是计算属性，应该常用于依赖某些 data 去计算某个值这样的场景，而且计算得到的值会存入缓存中，若之后依赖的值没有改变，会直接从内存那种取这个值。

- watch 是监听某个值，当某个值改变的时候去执行个回调做某件事情，无缓存性，两者应用场景就不一样。

## vue 是如何实现双向绑定的
首先双向绑定，是哪双向？ =>  数据更新驱动 -> 视图更新 ， 视图更新驱动 -> 数据更新

先从 数据更新 驱动 视图更新说起：

vue 内部会对 data 中的每个值进行深度数据劫持。所谓数据劫持就是给 data 的每个属性都加上 getter 和 setter ，然后结合发布-订阅模式，在每个 getter 中添加订阅者，在每个 setter 中通知订阅者。这个订阅者在 vue 中就是 watcher。什么是watcher? vue 中定义了个 Watcher 的类，它的作用的就是监听一个 变量路径，传入路径值改变时回调函数，并且内部会触发这个路径的 getter ，订阅这个 watcher 实例，比如 v-model = 'a.b' 或是 插值表达式 {{a.b}} 中的 a.b 就是路径，当这个路径的值发生变化之后，就会触发 watcher 中的回调函数，watcher 中的回调定义在 Watcher 类原型上的 update() 方法中执行。

拿 vue 双向绑定中的 数据驱动视图更新来说，就是 数据更新，触发 setter ，通知 watcher，然后 watcher 通知外界，触发 patch 机制 -> 经过 diff 算法 -> 重新渲染视图

从 视图更新驱动 -> 数据更新来说的话：

比如 input 框，在页面上手动在框内输入数据，然后 vue 内部会监听 input 事件，在事件回调中取得这个节点上的数据比如 node.value，把获取到的数据赋值给 对应路径 的值，并且此时会触发这个路径的 setter，然后页面上任何使用这个路径的值的地方都会重新渲染了。这就视图更新驱动 -> 数据更新。

两者合起来就是双向绑定。

## 对比 proxy 和 Object.defineProperty
Object.defineProperty: 
1. 只能监听对象自身的属性
2. 无法监听对象新增或删除属性
2. 无法监听数组
3. 兼容性 ie8+

proxy: 
1. 提供元编程能力，代理对象后返回一个新对象，我们可以直接对新对象进行操作。
2. 可以代理监听一整个对象而不仅仅是属性。
3. 可以代理数组。
4. 代理对象不仅有 getter/setter 的功能，还有例如 has/apply 等更多的功能。
5. 兼容性 ie11+

## 如何理解 vue 响应式系统
vue 内部是结合数据劫持和发布订阅来实现响应式系统的。vue 内部会对 data 中的每个值进行深度数据劫持。所谓数据劫持就是给 data 的每个属性都加上 getter 和 setter ，然后结合发布-订阅模式，在每个 getter 中添加订阅者，在每个 setter 中通知订阅者。这个订阅者在 vue 中就是 watcher。什么是watcher? vue 中定义了个 Watcher 的类，它的作用的就是监听一个 变量路径，传入路径值改变时回调函数，并且内部会触发这个路径的 getter ，订阅这个 watcher 实例，比如 v-model = 'a.b' 或是 插值表达式 {{a.b}} 中的 a.b 就是路径，当这个路径的值发生变化之后，就会触发 watcher 中的回调函数，watcher 中的回调定义在 Watcher 类原型上的 update() 方法中执行。

> 注意，vue 2+，是以组件为单位的 watcher 实例，组件内有值变更的时候会通知这个组件的 watcher，然后 watcher 触发执行 render 函数，组件内部通过虚拟dom -> patch 机制 diff 比对后更新视图。

## 虚拟 DOM 是什么？为什么 vue2.0 后引入虚拟DOM？引入虚拟 DOM 有哪些好处？
虚拟DOM是一种技术方案，解决当只有某些状态改变时，只重新渲染与这些状态相关的DOM。

解决这个问题的技术方案有很多，比如 angular 的脏检测、react 的虚拟DOM、vue1.0 的细粒度绑定。那为什么 vue2.0 后会引入虚拟 DOM呢？

因为 vue1.0 更细粒度的绑定，每个状态都会绑定一个 watcher，一旦当一个项目的复杂度变大了，项目的状态过多，就会绑定很多 watcher，造成一些依赖开销和内存开销。为了解决这个问题，vue2.0 采用了个适中的方案，结合细粒度绑定和引入了虚拟 DOM，vue 使得以组件为单位去绑定 watcher，组件内部的状态发生变化后，只会通知这个一个 watcher，watcher 触发这个组件的 render 函数，然后组件内部通过虚拟 DOM 比对新旧虚拟节点树找出差异进行视图更新。

引入虚拟DOM 还有个目的是可以跨平台： 因为虚拟DOM 再怎么说也是以 javascript 构建的对象 为基础的。所以可以跨平台，对于不同的平台，vue 只需要适配不同平台某些操作 DOM 不同的 API 即可。

