#### useRef

ref 两个用途：

1. 引用组件实例、DOM 节点
2. 在组件多次 render 间保持不变的值，并且改变后不会触发 rerender

用法：

``` js
import { useRef } from 'react';

// useRef 返回值数据结构 { 
//  current: 0
// }
const ref = useRef(0); // 0 初始值

```

注意点：

1. ref 就是一个普通的有 current 属性的 JS 对象，current 属性自然是 Mutable 的，可读可写。

2. 组件的 ref 默认情况下不会引用到组件内部使用的 DOM 节点，若想引用到可以使用 `forwardRef` 语法转发到组件内部的 DOM 节点。

3. 默认情况下，forwardRef 会转发 DOM 节点支持的所有操作，可以使用  `useImperativeHandle` 自定义只转发那些 API。

#### useEffect

在开发环境，React 内部会让先执行一次 useEffect 回调以及销毁回调后再执行一次 useEffect 回调，意在帮开发者发现诸如竞态或未做销毁行为等错误。（当[Strict Mode](https://beta.reactjs.org/apis/strictmode)开启时，React 在挂载后重新挂载每个组件一次（状态和 DOM 被保留））

effect 回调在每次重新调用前，调用上一次回调的销毁函数。 组件卸载时也会调用销毁函数。

防止竞态例子:

```js
useEffect(() => {
	  // 在下一次调用 useEffect 回调前，会先执行本次的销毁函数。
  	// 所以无论本次的网络请求结果什么时候到达，都也不会处理 state，不会跟下一次 effect 请求产生竞态。
    let ignore = false; 
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    }
  }, [person]);
```







