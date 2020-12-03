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
这个回调是异步执行的，导致 `state` 的改变是异步的，不确定具体更改时期，所以要**稳定地**用更改之前的 `state` 里的值的话，就用该回调的第一个参数。Props 同理。

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

