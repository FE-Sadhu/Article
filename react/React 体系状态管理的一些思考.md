前端状态管理的工具库纷杂，在开启一个新项目的时候不禁让人纠结，该用哪个？其实每个都能达到我的目的，我们想要的无非就是管理好系统内的状态，使代码利于维护和拓展，尽可能降低系统的复杂度。

使用 Vue 的同学可能更愿意相信其官方的生态，直接上 vuex/pinia，不用过多纠结。由于我平常使用 React 较多，故就当前应用较广泛的 Redux、Mobx 俩工具库为例，研读了一番，作出自己浅薄的理解。

Redux、Mobx 或多或少都借鉴了 Flux 理念，比如大家经常听到的 “单向数据流” 这项原则最开始就是由 Flux 带入前端领域的，所以我们先来聊聊 Flux。

## Flux

Flux 是由 facebook 团队推出的一种架构理念，并给出一份[代码实现](https://github.com/facebook/flux)。

### 为什么会有 Flux 的诞生呢？

Facebook 一开始是采用传统的 MVC 范式进行系统的开发

![](https://cdn.jsdelivr.net/gh/FE-Sadhu/diagram/img/20220510004418.png)

但随着业务逻辑的复杂，渐渐地发现代码里越来越难去加入新功能，很多状态耦合在了一起，对于状态的处理也耦合在了一起

![](https://cdn.jsdelivr.net/gh/FE-Sadhu/diagram/img/20220510010044.png)

造成了 FB 团队对 MVC 吐槽最深的两个点：

1. Controller 的中心化不利于扩展，核心是因为 Controller 里需要处理大量复杂的对于 Model 更改的逻辑
2. 对于 Model 的更改可能来源于各个方向。 可能是开发者本身想对 Model 进行更改、可能是 View 上的某个回调想对 Model 进行更改，可能是一个 Model 的更改引发了另一个 Model 的更改。

我们可以大概总结出，基于 MVC 的数据流向就有三种：

- Controller -> Model -> View
- Controller -> Model -> View -> Model -> View ... (loop)
- Controller -> Model1 -> Model2 -> View1 -> view2 ...

并且这三种数据流向在实际业务中还很有可能是交织在一起的。

所以，为了改善以上 MVC 在复杂应用中的缺陷，降低系统整体复杂度，FB 团队推出了 Flux 架构，结合 React 重构了他们的代码，这就是 Flux 架构诞生的原因。

### Flux 具体是什么

Flux 由几个部分组成：

- Store
- Action
- View
- Dispatcher

Store 就是存放 Model 的地方，View 和 MVC 的 View 一样就是视图，Action 可以理解为操作 Model 的逻辑，Dispatcher 可以理解为 Model 操作的执行者。

![](https://cdn.jsdelivr.net/gh/FE-Sadhu/diagram/img/20220510203540.png)

Dispatcher 是 Flux 的核心，它把对 Model 的操作给统一了起来，在 Flux 里，Dispatcher 与 View 可以视为 Model 的唯一输入输出。

那么相对于 MVC 带来的变化或者说好处是什么呢？

首先，数据流统一了，无论谁想要操作数据，必须通过 disptacher ，所以状态在整个系统里的流向就是：

Action -> dispatcher -> Model -> View -> Action -> dispatcher -> Model -> View ...

**这就是所谓的 “单向数据流”。 相对于 MVC 中多种数据流交叉，单向数据流明显降低了系统的复杂度。**

基于 MVC 范式的代码，项目的长期维护者可能清楚各个地方状态变更会引发什么操作，但是若团队来了新人，想搞清楚这些肯定需要费不少劲，假如基于 Flux 架构，开发者只需要追踪一个 Action 是怎样在整个系统中流动的，就知道系统的其余部分是怎样工作的了。因为 Flux 的数据流动是单向的且一致的。比如通过 Action 就知道要对状态做怎样的变更，再搜一下哪里用了变更的状态就知道这里的视图会 rerender，同样的搜一下哪个地方 disptach 了这个 action，就知道谁想对状态做出改变。

其次，可以通过 Dispatcher 在架构中的设计感受下好处，Dispatcher 可以理解为一个纯函数的概念，就是只负责根据 Action 处理对 Model 的改动，不会改变入参或外部变量，相同的输入始终对应相同的输出。意味着之后任意一个时间点做出一个之前时间点的 Action，得到的更改后的状态与之前得到的是一致的。这就是所谓的 “时间旅行” 功能的原理，“时间旅行” 本质就是记录下每一次数据修改，只要每次修改都是无状态的，那么我们理论上就可以通过修改记录还原之前任意时刻的数据。

Dispatcher 这样设计带来三点好处：

1. **提高代码的可预测性。**根据 Action 开发者就知道会发生怎样的变更。
2. **方便开发者调试。**我们可以利用 “时间旅行” 复现之前任意时间点的状态，可以统一地在 dispatcher 里加日志看到何时做了什么改变。
3. **基于纯函数构建的代码更容易写单测**

至于中心化的  Controller 中对大量复杂的 Model 逻辑的操作，则被 Flux 抽象到一个个 Action 里去了。







