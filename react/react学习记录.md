> 暂未系统整理，零碎知识

### 1. 
```js
this.setState((prevState, prevProps)=> {
  // prevState 是更新之前的 state
  // prevProps 是更新之前的 props
  return {

  }
})
```
1. 这个回调是异步执行的，导致 `state` 的改变是异步的，不确定具体更改时期，所以要**稳定地**用更改之前的 `state` 里的值的话，就用该回调的第一个参数。Props 同理。

2. 建议给每个 state 的 item 赋值的时候，假如要赋引用类型的值，最好打散重组个引用类型。不然赋的是引用，未免以后这个 data 被人手动改里面的值了，等于是手动改 state 了，但是在 React 里面， state 只能在 setState 里面改。

### 2. 
不建议闭包引用事件对象。
```js
handleInputChange = (e) => {
    // 1. setState 回调参数的形式，这个回调是异步执行的，如果在异步回调里面用 e 的话，就是在闭包引用了参数 e (event 对象)
    // 2. 出于事件实现底层的性能，React 中不建议将事件对象 event 放在闭包中使用，所以需要作一层缓存
    const value = e.target.value
    this.setState(() => ({
      inputValue: value // 不要 e.target.value
    }))
  }
```

### 3. 
每个组件的 state 是局部的：只能在当前组件中去修改，在组件树中只能往下传递，不能往上传递，且后代组件只配使用不能更改。

### 4. 单向数据流
  - 父组件属性传值给子组件，子组件用 props 接收。
  - 子组件只能使用 props，不能更改 props。

当一个父组件下有多个子组件都用到了一样的 props，假如某个子组件改变了 props，可能引起其他的子组件产生 bug，而且父组件无法知道是哪个子组件改动了 props，当项目大了后容易产生 bug 不说，还十分难调试。所以直接规定单向数据流，子组件只能接收使用 props 无法更改。

### 5. 父子组件传值
父 -> 子： 属性 props
子 -> 父： 父组件把某个函数方法作为 props 传给子组件，子组件调用父组件传递的函数方法执行，且传值作为参数。

### 6. state、prop 以及 render 的关系
  1. 每个组件的 state 或 prop 改变了，都会引起该组件的 render 函数重新执行一次，生成最新的 vnode 节点，更新视图。
  2. 每个组件的 render 函数重新执行了一次，那么它的后代组件的 render 函数也都会重新执行一次。

### 7. Lifecycle
> 实践经验少，可能有错误

定义：组件从初始化到卸载阶段某一个时刻会自动调用执行的钩子函数。

官方文档给出个实时查看最新 lifecycle 方法的连接： [传送门](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

**首次挂载组件时：**
1. 实例化一个组件，最先执行的自然是 `constructor(props)` -> 目的是初始化 props、state

2. static getDerivedStateFromProps(nextProps, nextState)
  这个钩子的执行时期就是在执行 render() 函数之前。

  问：什么时候会执行 render() 方法？
  答：首次挂载、state 更新时、props 更新时、父组件更新时。

  参数： 更新后的 props 和 state。
  返回值： 返回一个对象可以更新 state，返回 null 则不作更新。  （这个 state 是异步更新吗？自己测试一下：同步）

  类的静态方法，this 不会指向实例。

3. render() 函数，执行返回一套新 vnode，（更新差异），生成 DOM

4. componentDidMount() -> 在 DOM 被挂载到挂载点之后执行。
  这个生命周期内使用 `setState()` 它将触发额外渲染，但此渲染会发生在**浏览器更新屏幕之前**。如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态。请谨慎使用该模式，因为它会导致**性能问题**。 但通常 Ajax 请求还在放在这里的。

**更新时（props、setState()、forceUpdate()）**
1. static getDerivedStateFromProps(nextProps, nextState)

2. shouldComponentUpdate(nextProps, nextState)
调用时期也是在 render 之前，但在 getDerivedStatedFromProps 之后 -> 组件应该被更新吗?
返回 true 接着走更新流程执行 render ，返回 false 就此止住不再执行。

此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该考虑使用内置的 PureComponent 组件。
如果你一定要手动编写此函数，可以将 this.props 与 nextProps 以及 this.state 与nextState 进行比较，并返回 false 以告知 React 可以跳过更新。请注意，**返回 false 并不会阻止子组件在 state 更改时重新渲染。**

假如父组件的更新根本没影响到某个子组件的话，就可以在那个子组件 shouldComponentUpdate 中判断不作更新，如上一段所说。

> 注意: 不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。

3. render()，返回最新 vnode，diff 对比，更新差异

4. getSnapshotBeforeUpdate(prevProps, prevState) 
能访问到和 componentDidUpdate 一样的 DOM ，发生介于 render 和 componentDidUpdate 之间。返回值作为 componentDidUpdate 的参数。

5. componentDidUpdate()
页面更新完成后

**卸载时**
componetWillUnmount() -> 组件被卸载前