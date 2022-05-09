前端状态管理的工具库纷杂，在开启一个新项目的时候不禁让人纠结，该用哪个？其实每个都能达到我的目的，我们想要的无非就是管理好系统内的状态，使代码利于维护和拓展，尽可能降低系统的复杂度。

使用 Vue 的同学可能更愿意相信其官方的生态，直接上 vuex/pinia，不用过多纠结。由于我平常使用 React 较多，故就当前应用较广泛的 Redux、Mobx 俩工具库为例，研读了一番，作出自己浅薄的理解。

Redux、Mobx 或多或少都借鉴了 Flux 理念，大家经常听到的 “单向数据流” 这项原则最开始就是由 Flux 带入前端领域的，所以我们先来聊聊 Flux。

## Flux

Flux 是由 facebook 团队推出的一种架构理念，并给出一份[代码实现](https://github.com/facebook/flux)。

>  推荐 Flux、React 核心开发者的一次[演讲](https://www.youtube.com/watch?v=nYkdrAPrdcw)，以下关于 Flux 的介绍多为本次演讲的提炼。

### 为什么会有 Flux 的诞生呢？

Facebook 一开始是采用传统的 MVC 范式进行系统的开发

![](https://cdn.jsdelivr.net/gh/FE-Sadhu/diagram/img/20220510004418.png)

但随着业务逻辑的复杂，渐渐地发现代码里越来越难去加入新功能，很多状态耦合在了一起，对于状态的处理也耦合在了一起

![](https://cdn.jsdelivr.net/gh/FE-Sadhu/diagram/img/20220510010044.png)

造成了 FB 团队对 MVC 吐槽最深的两个点：

1. Controller 的中心化不利于扩展，核心是因为 Controller 里需要处理大量复杂的对于 Model 更改的逻辑（"Action"）
2. 对于 Model 的更改可能来源于各个方向。 可能是开发者本身想对 Model 进行更改、可能是 View 上的某个回调想对 Model 进行更改，可能是一个 Model 的更改引发了另一个 Model 的更改。

为了改善以上 MVC 在复杂应用中的缺陷，降低系统整体复杂度，FB 团队推出了 Flux 架构，结合 React 重构了他们的代码，这就是 Flux 架构诞生的原因。

### Flux 具体是什么

