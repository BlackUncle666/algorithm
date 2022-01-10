# React
## React是什么特点是什么
- 用于构建用户界面的 JavaScript 库
- 声明式
- 组件化
- 一次学习，随处编写
## React的状态复用逻辑有哪些
- HOC
- hooks
- render props
## 为什么React引入JSX
- React 团队认为 JSX 不会引入太多新的概念，编码更纯净，更具有可读性，更贴近 HTML。而对于 JSX 本身来说，是 React.createElement() 函数的语法糖，createElement() 对参数进行拆解后，发起 ReactElement 调用生成虚拟 DOM 对象。
- React.createElement 到底做了什么呢
  - React. createElement 二次处理 key、ref、self、 source 四个属性值；
  - 遍历 config，筛出可以提进 props 里的属性；
  - 提取子元素，推入 childArray（也即 props.children）数组；
  - 格式化 defaultProps；
  - 结合以上数据作为入参，发起 ReactElement 调用；

## 说一下你对虚拟dom的理解
- 是React.createElement返回的一个JS对象
- 描述真实dom的JS对象
- $$typeof/type/key/props
- 避免用户操作真实DOM
- 可以防范XSS处理
- 减少更新时DOM操作

## 函数式组件和类组件的区别
- 编程思想不同：类组件+基于面向对象的方式编程，而函数式组件+基于函数式编程的思想
- 内存占用：类组件需要创建并保存实例，会在占用一定的内存，函数组件不需要创建实例，可以节约内存
- 捕获特性：函数组件具有值捕获特性
- 可测试性：函数式组件更方便，编写单元测试
- 状态：类组件有自己的实例，可以定义状态，而且可以修改状态更新组件，函数式组件以前没有状态，现在可以使用useState状态
- 生命周期：类组间有自己完整的生命周期，可以在生命周期内编写逻辑，函数组件以前没有生命周期，现在可以使用useEffect实现类似生命周期
- 逻辑复用：类组件可以通过继承实现逻辑的复用，但官方推荐组件的优于继承，函数组件可以通过自定义Hooks实现逻辑复用
- 跳过更新：类组件可以通过shouldComponentUpdate和PureComponent来跳过更新，而函数组件可以使用React.memo来跳过更新
- 发展前景：未来函数式组件将会成为主流，因为它可以更好的避免this问题，规范和复用逻辑

## 请说一下React中的渲染流程
- 对于首次渲染，React 的主要工作就是将 React.render 接收到的 VNode 转化 Fiber 树，并根据 Fiber 树的层级关系，构建生成出 DOM 树并渲染至屏幕中。
- 而对于更新渲染时，Fiber 树已经存在于内存中了，所以 React 更关心的是计算出 Fiber 树中的各个节点的差异，并将变化更新到屏幕中。
- React 将渲染更新的过程分为了两个阶段。render 阶段，利用双缓冲技术，在内存中构造另一颗 Fiber 树，在其上进行协调计算，找到需要更新的节点并记录，这个过程会被重复中断恢复执行。commit 阶段，根据 render 阶段的计算结果，执行更新操作，这个过程是同步执行的。
- Fiber有两层含义：程序架构、数据结构。
- 需要程序具备的可中断、可恢复的特性，Fiber 是一个链表结构，通过child、sibling、return三个属性记录了树型结构中的子节点、兄弟节点、父节点的关系信息，从而可以实现从任一节点出发，都可以访问其他节点的特性。除了作为链表的结构之外，程序运行时还需要记录组件的各种状态、实例、真实DOM元素映射等等信息，这些都会被记录在 Fiber 这个对象身上。

- 根组件的 JSX 定义会被 babel 转换为 React.createElement 的调用，其返回值为 VNode树。
- React.render 调用，实例化 FiberRootNode，并创建 根Fiber 节点 HostRoot 赋值给 FiberRoot 的 current 属性
- 创建更新对象，其更新内容为 React.render 接受到的第一个参数 VNode树，将更新对象添加到 HostRoot 节点的 updateQueue 中
- 处理更新队列，从 HostRoot 节点开始遍历，在其 alternate 属性中构建 WIP 树，在构建 Fiber 树的过程中会根据 VNode 的类型进行组件实例化、生命周期调用等工作，对需要操作视图的动作将其保存到 Fiber 节点的 effectTag 上面，将需要更新在DOM上的属性保存至 updateQueue 中，并将其与父节点的 lastEffect 连接。
- 当整颗树遍历完成后，进入 commit 阶段，此阶段就是将 effectList 收集的 DOM 操作应用到屏幕上。
- commit 完成将 current 替换为 WIP 树。

## 请说一下你对react合成事件的理解
- 解决了浏览器之间的兼容问题，是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力。 
- 将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）
- 首先得了解事件捕获，事件目标，事件冒泡和事件委托。
- React 所有事件都挂载在 document 对象上；
- 当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件；
- 所以会先执行原生事件，然后处理 React 事件；
- 最后真正执行 document 上挂载的事件。
- React 事件池仅支持在 React 16 及更早版本中，在 React 17 已经不使用事件池。
- 在 React 合成事件中，需要阻止冒泡时， react事件中使用e.stopPropagation()阻止冒泡，原生事件中使用e.nativeEvent.stopImmediatePropagation() 方法解决。

## 谈谈受控组件和非受控组件的区别
- 判断一个组件是不是受控组件，就要看这个表单组件它是否由react的state状态控制，它的值是否保存在this.state中，是否只能使用setState将修改后的值同步到初始变量。
简而言之，表单数据状态受React的state控制，通过setState修改的就是受控组件，通过DOM控制，不受state控制的就是非受控组件
## 谈谈react的生命周期
一个完整的React组件生命周期会依次调用如下钩子：
旧生命周期：
- 挂载
  - constructor
  - componentWillMount
  - render
  - componentDidMount
- 更新
  - componentWillReceiveProps
  - shouldComponentUpdate
  - componentWillUpdate
  - render
  - componentDidUpdate
- 卸载
  - componentWillUnmount

新生命周期
- 挂载
  - constructor
  - getDerivedStateFromProps
  - render
  - componentDidMount 
- 更新
  - getDerivedStateFromProps
  - shouldComponentUpdate
  - render
  - getSnapshotBeforeUpdate
  - componentDidUpdate
- 卸载
  - componentWillUnmount

从以上生命周期的对比，我们不难看出，React从v16.3开始废弃 componentWillMount componentWillReceiveProps componentWillUpdate 三个钩子函数

## 谈谈react中refs的使用
Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

## react中setState到底是异步还是同步
- 有时是同步，有时是异步。
- 合成事件和生命周期函数里是异步的，其实造成setState的异步并不是由内部的异步代码引起的，在本身的执行过程中时同步的，但是合成事件和生命周期函数的调用顺序在更新之前，导致在内部不能直接得到更新后的值。
- 在原生事件和setTimeout里是同步的
- 异步setState可能会被合并的问题，就是进行多次相同的异步setState操作时，更新前会被合并。
## 谈谈react中组件通信方式有哪些
- ⽗组件向⼦组件通讯: ⽗组件可以向⼦组件通过传 props 的⽅式，向⼦组件进⾏通讯
- ⼦组件向⽗组件通讯: props+回调的⽅式，⽗组件向⼦组件传递props进⾏通讯，此props为作⽤域为⽗组件⾃身的函 数，⼦组件调⽤该函数，将⼦组件想要传递的信息，作为参数，传递到⽗组件的作⽤域中
- 兄弟组件通信: 找到这两个兄弟节点共同的⽗节点,结合上⾯两种⽅式由⽗节点转发信息进⾏通信
- 跨层级通信: Context 设计⽬的是为了共享那些对于⼀个组件树⽽⾔是“全局”的数据，例如当前认证的⽤户、主题或⾸选语⾔，对于跨越多层的全局数据通过 Context 通信再适合不过
- 发布订阅模式: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引⼊event模块进⾏通信
- 全局状态管理⼯具: 借助Redux或者Mobx等全局状态管理⼯具进⾏通信,这种⼯具会维护⼀个全局状态中⼼Store,并根据不同的事件产⽣新的状态
## 谈谈对React fiber的理解
- 为了解决 diff 时间过长导致的卡顿问题，React Fiber 用类似 requestIdleCallback 的机制来做异步 diff。但是之前的数据结构不支持这样的实现异步 diff，于是 React 实现了一个类似链表的数据结构，将原来的 递归diff 变成了现在的 遍历diff，这样就能方便的做中断和恢复了。
- 操作系统会按照一定的调度策略，先到先得(First-Come-First-Served, FCFS)，轮转，最短进程优先(Shortest Process Next, SPN)，最短剩余时间(Shortest Remaining Time, SRT)，最高响应比优先(HRRN)-（注：响应比 = （等待执行时间 + 进程执行时间） / 进程执行时间）， 反馈法
- React 的 Reconcilation 是CPU密集型的操作, 它就相当于我们上面说的’长进程‘，为了给用户制造一种应用很快的'假象'，我们不能让一个程序长期霸占着资源. 你可以将浏览器的渲染、布局、绘制、资源加载(例如HTML解析)、事件响应、脚本执行视作操作系统的'进程'，我们需要通过某些调度策略合理地分配CPU资源，从而提高浏览器的用户响应速率, 同时兼顾任务执行效率。
- 所以 React 通过Fiber 架构，让自己的Reconcilation 过程变成可被中断。 '适时'地让出CPU执行权，除了可以让浏览器及时地响应用户的交互，还有其一次性操作大量 DOM 节点相比, 分批延时对DOM进行操作，可以得到更好的用户体验。
- React 目前的做法是使用链表, 每个 VirtualDOM 节点内部现在使用 Fiber表示, 可以很清晰地看到每次渲染有两个阶段：Reconciliation(协调阶段) 和 Commit(提交阶段）
- Reconciliation(协调阶段)可以认为是 Diff 阶段, 这个阶段可以被中断, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为'副作用(Effect)' ，Commit(提交阶段）将上一个阶段计算出来的需要处理的副作用(Effects)一次性执行了。这个阶段必须同步执行，不能被打断。
- Fiber 包含结构信息，节点类型信息，节点的状态，副作用，替身
- WIP 树构建这种技术类似于图形化领域的'双缓存(Double Buffering)'技术, 图形绘制引擎一般会使用双缓冲技术，先将图片绘制到一个缓冲区，再一次性传递给屏幕进行显示，这样可以防止屏幕抖动，优化渲染性能。
- 接下来就是副作用的收集和提交
## 谈谈你对react中的Mixin的了解
Mixin模式就是一些提供能够被一个或者一组子类简单继承功能的类,意在重用其功能
## 谈谈你对react中Render Props的了解
- render prop是一种在React组件之间使用一个值为函数的prop共享代码的技术，即使用了render这个prop的组件，接受一个函数来渲染元素，即父组件控制这部分的显示内容，而不是组件内部去实现自己的渲染逻辑。而父组件渲染的元素使用的数据是子组件内部控制的状态

## 谈谈你对react中高阶组件HOC的了解
- 高阶组件(HOC)是接受一个组件并返回一个新组件的函数。
- HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。
- HOC 是纯函数，没有副作用。
- 适用场景：代码复用，逻辑抽象/渲染劫持/State 抽象和更改/Props 更改

## 谈谈你对react中react-hooks的了解
- Hooks 是 React 16.8 新增的特性，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
- Hooks 解决的问题，组件的不足（状态逻辑难复用，趋向复杂难以维护，this 指向问），能在无需修改组件结构的情况下复用状态逻辑（自定义 Hooks ），能将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），副作用的关注点分离：副作用指那些没有发生在数据向视图转换过程中的逻辑，如 ajax 请求、访问原生dom 元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等。
- 它们允许在不编写类的情况下使用state和其他 React 特性。使用 Hooks，可以从组件中提取有状态逻辑，这样就可以独立地测试和重用它。Hooks 允许咱们在不改变组件层次结构的情况下重用有状态逻辑，这样在许多组件之间或与社区共享 Hooks 变得很容易。
- 首先，Hooks 通常支持提取和重用跨多个组件通用的有状态逻辑，而无需承担高阶组件或渲染 props 的负担。Hooks 可以轻松地操作函数组件的状态，而不需要将它们转换为类组件。
- Hooks 在类中不起作用，通过使用它们，咱们可以完全避免使用生命周期方法，例如 componentDidMount、componentDidUpdate、componentWillUnmount。相反，使用像useEffect这样的内置钩子。
## 谈谈你对Redux的了解
- Redux 三大概念：Store，Action，Reducers 
- Store->View 更新视图
- View->Reducers 发起更新动作
- Reducers->Store 更新状态
- 更新 Store 的状态有且仅有一种方式：那就是调用 dispatch 函数，传递一个 action 给这个函数 。
- reducer 是一个普通的 JavaScript 函数，它接收两个参数：state 和 action，前者为 Store 中存储的那棵 JavaScript 对象状态树，后者即为我们在组件中 dispatch 的那个 Action。
- dispatch(action) 用来在 React 组件中发出修改 Store 中保存状态的指令。在我们需要新加一个待办事项时，它取代了之前定义在组件中的 onSubmit 方法。
- reducer(state, action) 用来根据这一指令修改 Store 中保存状态对应的部分。在我们需要新加一个待办事项时，它取代了之前定义在组件中的 this.setState 操作。
- connect(mapStateToProps) 用来将更新好的数据传给组件，然后触发 React 重新渲染，显示最新的状态。它架设起 Redux 和 React 之间的数据通信桥梁。
## 谈谈Redux和MobX的区别
- 共同点
  - 为了解决状态管理混乱，无法有效同步的问题统一维护管理应用状态;
  - 某一状态只有一个可信数据来源（通常命名为store，指状态容器）;
  - 操作更新状态方式统一，并且可控（通常以action方式提供更新状态的途径）;
  - 支持将store与React组件连接，如react-redux，mobx- react;
- 区别
  - redux将数据保存在单一的store中，mobx将数据保存在分散的多个store中
  - redux使用plain object保存数据，需要手动处理变化后的操作;mobx适用observable保存数据，数据变化后自动处理响应的操作
  - redux使用不可变状态，这意味着状态是只读的，不能直接去修改它，而是应该返回一个新的状态，同时使用纯函数;mobx中的状态是可变的，可以直接对其进行修改
  - mobx相对来说比较简单，在其中有很多的抽象，mobx更多的使用面向对象的编程思维;redux会比较复杂，因为其中的函数式编程思想掌握起来不是那么容易，同时需要借助一系列的中间件来处理异步和副作用
  - mobx中有更多的抽象和封装，调试会比较困难，同时结果也难以预测;而redux提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易
## 谈谈React18
- 新的 ReactDom.creatRoot() API（替换之前的 ReactDom.render）
- 新的 startTransition API 可以让我们把响应数据标记成 transitions 状态延迟处理。
- 渲染的自动批处理优化（主要解决异步回调无法批处理问题）
- 支持 Suspense 组件（将暂时闲置的组件搁置起来，实现懒加载。）

## React 和 Vue 的异同
- 相似之处：
  - 都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库
  - 都有自己的构建工具，能让你得到一个根据最佳实践设置的项目模板。
  - 都使用了Virtual DOM（虚拟DOM）提高重绘性能
  - 都有props的概念，允许组件间的数据传递
  - 都鼓励组件化应用，将应用分拆成一个个功能明确的模块，提高复用性

- 不同之处：
  - 数据流：Vue默认支持数据双向绑定，而React一直提倡单向数据流
  - 虚拟DOM：Vue会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树，对于React而言，每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过 PureComponent/shouldComponentUpdate这个生命周期方法来进行控制，但Vue将此视为默认的优化。
  - 监听数据变化的实现原理不同：Vue 通过 getter/setter 以及一些函数的劫持，React 默认是通过比较引用的方式进行的
  - 扩展组件：react可以通过高阶组件（Higher Order Components-- HOC）来扩展，而vue需要通过mixins来扩展。