## 点击事件

点击按钮、手在列表上滑动，地图上缩放... 都是触摸。

RN 封装了可以处理常见触摸手势的组件

### Button

RN **内置的** Button 组件可以用来响应点击事件   ---    `onPress`

实测渲染图如下：

IOS 上标签状按钮

![](https://i.loli.net/2021/03/10/ZfkyVpCIUbMsLW1.png)

安卓上块状按钮：

![](https://i.loli.net/2021/03/10/Bzwd8QgeaoiXvkE.png)

特点：

1. 内置的 Button 组件样式是**固定**的，不允许设置样式 `prop`（style）, 只能用 `color` 属性改变颜色。
2. 点击时会有 feedback (反馈) --- IOS: pressIn 背景颜色变浅，pressOut 颜色恢复。 Android: 手指按下时形成类似泛起涟漪的视觉效果，从中间往两边扩散。
3. 不会响应长按事件



### Touchable 系列

同样也是响应点击事件的内置按钮组件。   ---   onPress, onLongPress

包含： 

- TouchableHighlight  --- pressIn 背景颜色变浅，pressOut 颜色恢复  --- 常用来制作按钮或者链接
- TouchableOpacity --- pressIn 按钮整体透明度降低，pressOut 恢复透明度 --- 比 TouchableHighlight 的 feedback 视觉效果更重
- TouchableWithoutFeedback --- 点击按钮无 feedback
- TouchableNativeFeedback --- IOS: 点击按钮无 feedback。Android:  手指按下时形成类似泛起涟漪的视觉效果，从中间往两边扩散。



与 Button 组件的区别:

1. 可自定义样式
2. 每个组件均能响应长按事件  ---  onLongPress
3. 组件渲染图在 IOS、Android 两端保持一致



组件渲染图：

![](https://i.loli.net/2021/03/10/gErdGtoqT2AwlIa.png)

## 滑动事件

滑动事件包含： 上下滑动、左右滑动、双指缩放

### ScrollView

这个是 RN 内置的通用的可滚动的容器。可**垂直滚动**、可**水平滚动**、可**缩放**。可以在容器放入多个组件和视图。

缺点：只适合用来显示数量不多的滚动元素，因为容器内的组件元素都会在第一时间被完全渲染。

### FlatList

该组件用于显示一个垂直的滚动列表，其中的元素之间结构近似，仅数据不同。

适于渲染长列表数据，且元素个数可以增删，示例渲染图如下：

![](https://i.loli.net/2021/03/10/raUT7HVY9uOXmbS.png)

特点：

1. `FlatList` 并不立即渲染所有元素，而是优先渲染屏幕上可见的元素，性能更好。（为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。） --- 适用于 `SectionList`
2. 某行滑出渲染区域之外后，其内部状态将不会保留。（最佳实践：在外层传数据下来）--- 适用于 `SectionList`
3. 数据源是通过 `FlatList` 的 prop 传进去的。需要注意的一点是，传入不同的数据源时，在组件内部是**浅比较** （注意别把堆内存地址相同的引用类型值传入），很可能不会更新列表。 ---  适用于 `SectionList`
4. **适合渲染一维数据**



最佳实践：

利用  `keyExtractor `  prop 为给定的 item 生成一个不重复的 key。 ---  适用于 `SectionList` （Key 的作用是使 React 能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。） 



### SectionList

适用于渲染需要分组的数据（二维数据），也许还带有分组标签的。

示例渲染图如下（D 和 J 就是分组头）：

![](https://i.loli.net/2021/03/10/VyNuIhb7t4B2seL.png)

特点： 

1. 上述 FlatList 特点中描述适用的
2. **适合渲染二维数据**
3. 有独特的分组头部渲染方法 `renderSectionHeader` 用于渲染每个分组的头部



## 手势响应系统

