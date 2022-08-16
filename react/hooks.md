### useRef

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

### useEffect

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

#### 可能不需要 useEffect

大部分情况下，符合两个规则无需 effect ：

1. 无需在 effect 中处理用于渲染的数据
2. 无需在 effect 中处理事件回调

一定需要 effect ：「一定需要在 effect 中同步外部系统」。

接下来列举**无需 effect 的典型示例**：

#### 基于 props 或 state 去更新 state

错误示例:

```js
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 Avoid: fullName 是多余的 state，effect 是多余的 effect。
  // 因为 firstName 和 lastName 改变了本身会重新执行一遍函数
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}
```

正确做法:

```js
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ Good: calculated during rendering
  const fullName = firstName + ' ' + lastName;
  // ...
}
```

#### 缓存昂贵的计算

错误示例:

```js
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 Avoid: redundant state and unnecessary Effect
  // props 改变本身就会重新执行一遍函数
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}
```

正确做法:

```js
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ 若 getFilteredTodos 计算性能还行，那么这样做就够了
  // 但是如果 TodoList 的更新并不是由 todos、filter 导致的，那么重新执行函数时这里也会再调用一次
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
```

最佳做法:

```js
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ Does not re-run getFilteredTodos() unless todos or filter change
  // useMemo 会在第一次执行 getFilteredTodos 时缓存结果，直到 todos 或 filter 改变才会再次执行，否则直接应用缓存值
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  // ...
}
```

#### 当 Props 改变时，重置 State

错误做法：

```js
export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // 🔴 Avoid: props 改变时重置 state
  useEffect(() => {
    setComment('');
  }, [userId]);
  // ...
}
```

通常，同一组件在同一位置再次渲染时，React 会保留组件的状态

正确做法:

```js

```





