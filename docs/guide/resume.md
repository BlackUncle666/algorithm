# 简历解析

## 技术选型，为什么用react？
- React函数式编程理念使代码更优雅和合理
- 严谨的单向数据流设计，方便构建大型复杂稳定的单页面应用
- 丰富的技术生态圈，拥有世界范围内各大技术社区支持
- 方便配合ReactNative开发跨终端应用

## vue和react两者的差异
- react主张函数式编程，所以推崇纯组件。
- vue保留了html、css、js分离的写法，react是没有模板的，直接就是一个渲染函数，它中间返回的就是一个虚拟DOM树
- vue是实现了双向数据绑定，它提供了v-model这样的指令，react推崇单向数据流，当然需要双向的地方也可以手动实现，比如借助 onChange 和 setState 来实现一个双向的数据流。
- 生命周期不同
- diff不同
- 事件处理

## 规划
- 环境搭建，脚手架以及相关库 
- 部署（与运维同学沟通）
- 工具库（lodash，moment）
- 规范化（产品原型的规范，与后端接口的规范，与测试交付认知的规范）

## 搭建项目
- 项目初始化及配置（package.json，LICENSE，.gitignore，.npmrc，README.md）
- 规范代码与提交（EditorConfig，Prettier，ESLint，StyleLint，lint命令，commitlint + changelog + husky）
- Webpack（input、output，mode环境区分，devtool映射方式，打包编译前清理 dist 目录，样式文件处理，图片和字体文件处理）
- 支持TypeScript，tsconfig.json，更多 babel 配置
- 公共（common）环境优化（拷贝公共静态资源，显示编译进度，编译时的 Typescirpt 类型检查，加快二次编译速度，external 减少打包体积，抽离公共代码）
- 开发dev环境优化（热更新，跨域请求）
- 生产prod环境优化（抽离出 css 样式，去除无用样式，压缩 js 和 css 代码，添加包注释，tree-shaking，CDN）
- 上线

## TS的使用有什么优缺点？
- 优点：有利于团队维护和避免编译时的错误
- 缺点：短期内新增了学习成本和开发成本

## 你封装过哪些自定义hooks？
- useFetch
- useDebounce
- useThrottle
- useTitle
- useScroll

## 你封装的公共组件有哪些？
- Tab栏切换
- 弹窗
- 按钮
- 倒计时
- 长列表组件

## 全链路性能优化
- 分析工具
  - NetWork
  - webpack-bundle-analyzer
  - Performance
  - 抓包（charles,fiddler）
  - 其他性能测试工具（Pingdom，Load Impact，WebPage Test，Octa Gate Site Timer，Free Speed Test）
- vue 
  - 非响应式数据通过 Object.freeze 冻结数据
  - computed 和 watch 区别使用
  - v-if 和 v-show 区别使用
  - v-for 避免和 v-if 一起使用，且绑定 key 值要唯一
  - 组件销毁后清除定时器和事件
  - 图片懒加载
  - 路由懒加载
  - 防抖、节流
  - 按需引入外部库
  - keep-alive缓存使用
- react 
  - .babelrc 增加对 antd 样式按需引入
  - asyncRouter懒加载路由,并实现路由监听
  - 受控性组件颗粒化 ，独立请求服务渲染单元
  - useMome、useCallback用法都差不多，都会在第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行，并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。
  - PureComponent、React.memo，在 React 工作流中，如果只有父组件发生状态更新，即使父组件传给子组件的所有 Props 都没有修改，也会引起子组件的 Render 过程。PureComponent 和 React.memo 就是应对这种场景的，PureComponent 是对类组件的 Props 和 State 进行浅比较，React.memo 是对函数组件的 Props 进行浅比较。
```
class Text extends React.PureComponent<any,any>{
    render(){
        console.log(this.props)
        return <div>hello,wrold</div>
    }
}
```
  - shouldComponentUpdate
  - 懒加载 Suspense 和 lazy
```
const LazyComponent = React.lazy(() => import('./LazyComponent'));
function demo () {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  )
}
```
- webpack优化
  - treeShaking
  - 动态引入polyfill
  - 压缩
  - CDN
  - 提取公共代码库（SplitChunksPlugin）
  - sourceMap（devtool的合理）
  - preloading和prefetch（后者是空闲去加载）
  - 打包分析工具（webpack-bundle-analyzer）
  - 持久化缓存（保证 hash 值的唯一性，即为每个打包后的资源生成一个独一无二的 hash 值，只要打包内容不一致，那么 hash 值就不一致。）
- web worker
- 缓存（缓存的原理就是更快读写的存储介质+减少IO+减少CPU计算=性能优化。而性能优化的第一定律就是：优先考虑使用缓存。缓存的主要手段有：浏览器缓存、CDN、反向代理、本地缓存、分布式缓存、数据库缓存。）
- GPU渲染
- SSR

## 首页优化，加载时间从2.4秒缩短至0.6秒，这个数据是怎么来的？
- FP：First Paint(页面在导航后首次呈现出不同于导航前内容的时间点)；
- FCP：First Contentful Paint(首次绘制任何文本，图像，非空白canvas或SVG的时间点)；
- LCP：Largest Contenful Paint(页面开始加载到最大文本块内容或图片显示在页面中的时间)；
- DCL：DOMContentLoaded Event(HTML加载完成事件)
- L：OnLoad Event(页面所有资源加载完成事件)。
- DNS 查询耗时：domainLookupEnd - domainLookupStart
- TCP 连接耗时：connectEnd - connectStart
- 内容加载耗时：responseEnd - requestStart
- firstbyte（首包时间）：responseStart – domainLookupStart
- fpt（First Paint Time 首次渲染时间 / 白屏时间）：responseEnd – fetchStart
- tti（Time to Interact 首次可交互时间）：domInteractive – fetchStart
- ready（HTML 加载完成时间）：domContentLoaded – fetchStart
- load（页面完全加载时间）：loadEventStart – fetchStart
- 数据图

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c0fd1db7d474675808604c4c4673662~tplv-k3u1fbpfcp-watermark.awebp)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f959adfae395414385ccd3ad9a422452~tplv-k3u1fbpfcp-watermark.awebp)
## 高复用的组件是如何进行的提质改造？长列表优化
- 方案：分页加载、切片加载、虚拟列表
- 目的：解决分页请求问题，切片DOM过多问题，并且解决埋点问题
- 滚动计算：
  - 首先，通过containerRef.current.scrollTop可以知道元素滚动条内的顶部隐藏列表的高度，然后使用Math.floor方法向下取整后，来获取当前偏移的元素数量，在减去一开始的上下文预加载数量PRE_LOAD_COUNT，就可以得出截取内容开始的位置。
  - 其次，通过containerRef.current.clientHeight可以获取滚动视窗的高度，那么通过containerRef.current.clientHeight / ITEM_HEIGHT这个公式就可以得出当前容器窗口可以容纳几个列表项。
  - 当我通过当前滚动条位置下之前滚动的元素个数且已经计算出截取窗口的起始位置后，就可以通过启动位置 + 容器显示个数 + 预加载个数这个公式计算出了当前截取窗口的结束位置。使用setShowPageRange方法更新新的位置下标后，当我上下滑动窗口，显示的数据会根据showRange切割成为不同的数据渲染在页面上。
- 滚动条偏移
  - 目前而言，比较流行的解决方案分为marginTop和transform做距离顶部的偏移来实现高度的撑开。
```
const scrollViewOffset = useMemo(() => {
  return showRange.start * ITEM_HEIGHT;
}, [showRange.start]);
```
## 前端工程化是指什么？
- 目的：用于提升前端工程师的开发效率和代码质量。
- 前端工程化可以分成四个方面来说，分别为模块化、组件化、规范化和自动化。
- 模块化：是指将一个文件拆分成多个相互依赖的文件，最后进行统一的打包和加载，这样能够很好的保证高效的多人协作。其中包含
  - JS 模块化：CommonJS、AMD、CMD 以及 ES6 Module。
  - CSS 模块化：Sass、Less、Stylus、BEM、CSS Modules 等。其中预处理器和 BEM 都会有的一个问题就是样式覆盖。而 CSS Modules 则是通过 JS 来管理依赖，最大化的结合了 JS 模块化和 CSS 生态，比如 Vue 中的 style scoped。
  - 资源模块化：任何资源都能以模块的形式进行加载，目前大部分项目中的文件、CSS、图片等都能直接通过 JS 做统一的依赖关系处理。
- 组件化：不同于模块化，模块化是对文件、对代码和资源拆分，而组件化则是对 UI 层面的拆分。
- 规范化：
  - 项目目录结构
  - 编码规范：对于编码这块的约束，一般我们都会采用一些强制措施，比如 ESLint、StyleLint 等。
  - 联调规范
  - 文件命名规范
  - 样式管理规范：目前流行的样式管理有 BEM、Sass、Less、Stylus、CSS Modules 等方式。
  - 开发流程，git flow 工作流：其中包含分支命名规范、代码合并规范等。
  - 定期 code review
- 自动化：
  - webpack
  - 自动化测试
  - 部署构建发布
  - 监控性能优化
## 什么高效沟通方式？如何解决跨域？
- 跨业务部门的接口，通过8000客服拉群，让运维同学配置nginx
- 自己部门的接口，让后端同学设置cors

## 实战怎样的场景使用了设计模式？
- 工厂模式：弹窗组件，无脑传参即可创建组件
- 策略模式：商品折扣（根据会员等级）
- 迭代器模式：各种遍历
- 单例模式：弹窗，无论点击多少次，弹窗只应该被创建一次。
- 装饰者模式：给组件新增功能/@的使用
- 原型模式：当年写jq来创建新组件的时候，会把函数放到prototype上
- 代理模式：当年写jq的时候用事件代理/webpack设置proxy解决跨域
## 什么是面相对象编程？
- 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了。
- 面向对象是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描叙某个事物在整个解决问题的步骤中的行为。
- 面向对象有三大特性，封装、继承和多态。
- 继承的方式：
  - 原型链继承（SubType.prototype = new SuperType()）
  - 借用构造函数继承（function  SubType(){ SuperType.call(this); }）
  - 组合继承
  - 原型式继承（function object(obj){ function F(){}; F.prototype = obj; return new F();}）
  - 寄生式继承（在原型式继承的基础上，增强对象并返回）
  - 寄生组合式继承（结合借用构造函数传递参数和寄生模式实现继承）
  - 混入方式继承多个对象（Object.assign(MyClass.prototype, OtherSuperClass.prototype);）
  - ES6类继承extends
  
## SKU算法
```
let names = ["iPhone X", "iPhone XS"]
let colors = ["黑色", "白色"]
let storages = ["64g", "256g"]
let combine = function (...chunks) {
  let res = []
  let helper = function (chunkIndex, prev) {
    let chunk = chunks[chunkIndex]
    let isLast = chunkIndex === chunks.length - 1
    for (let val of chunk) {
      let cur = prev.concat(val)
      if (isLast) {
        // 如果已经处理到数组的最后一项了 则把拼接的结果放入返回值中
        res.push(cur)
      } else {
        helper(chunkIndex + 1, cur)
      }
    }
  }
  // 从属性数组下标为 0 开始处理
  // 并且此时的 prev 是个空数组
  helper(0, [])
  return res
}
console.log(combine(names, colors, storages))
```

## 什么技术难点？websocket轮循
- WebSocket 本质上一种应用层的协议
- WebSocket 是一种在单个TCP连接上进行全双工通信的协议
- websocket 提供ws和wss（加密）两种URL方案
```
var ws = new WebSocket('ws://localhost:8080');
ws.onopen = function () {
  console.log('ws onopen');
  ws.send('from client: hello');
};
ws.onmessage = function (e) {
  console.log('ws onmessage');
  console.log('from server: ' + e.data);
};
```
- 客户端：申请协议升级（Upgrade: websocket）
- 连接保持+心跳（ ws.ping('', false, true) ）

## 浏览器兼容
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/5/16468bfe8343415c~tplv-t2oaga2asx-watermark.awebp)

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/5/16468c023f296879~tplv-t2oaga2asx-watermark.awebp)

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/5/16468c060484968d~tplv-t2oaga2asx-watermark.awebp)

## webpack5有了解吗？
- Tree Shaking优化（webpack5的 mode=“production” 自动开启 tree-shaking）
- 缓存配置（webpack4安装hard-source-webpack-plugin，webpack5配置cache）
- 启动服务的差别（webpack4安装webpack-dev-server 启动服务，webpack5内置使用 webpack serve 启动，但是他的日志不是很好）
- 热更新差别（webpack5使用module.hot.accept('需要热启动的文件',(source)=>{//自定义热启动})）
- 对loader的配置优化
- 模块联邦（微前端）
## vite有了解吗？
- Vite，一个基于浏览器原生 ES imports 的开发服务器。利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。同时不仅有 Vue 文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 rollup 打包。虽然现在还比较粗糙，但这个方向我觉得是有潜力的，做得好可以彻底解决改一行代码等半天热更新的问题。
- Vite 实现的核心——拦截浏览器对模块的请求并返回处理后的结果。
- imports 替换
- @modules/* 路径解析（核心逻辑就是去 node_modules 里找有没有对应的模块，有的话就返回，没有的话就报 404）
- Vite 热更新的实现（客户端的代码在 src/client/client.ts，主要是创建 WebSocket 客户端，监听来自服务端的 HMR 消息推送。）
## history模式可能出现什么问题？
- 会出现404页面，修改Nginx配置
## 你的组件库是怎么做的？
- 环境搭建以及配置
  - Create React App：官方支持的 CLI 脚手架，提供一个零配置的现代构建设置；
  - React: 用于构建用户界面的 JavaScript 库；
  - Ant Design：一套企业级 UI 设计语言和 React 组件库；
  - Storybook: 辅助 UI 控件开发的工具，通过story创建独立的控件，让每个控件开发都有一个独立的开发调试环境；
  - TypeScript：2020 最火的前端语言，是JavaScript类型的超集；
  - ESLint && husky：统一团队代码风格；
  - Jest：JavaScript 测试框架，用于组件库的单元测试；
  - Travis CI: 提供持续集成服务，用于进行项目的持续集成以及持续部署；
  - less
- 组件开发
  - 验证码输入组件
  - 添加单元测试
  - 借助react-docgen插件编写组件说明文档
- 构建及测试
  - 在package.json中配置构建脚本
- 发布至公司的NPM
  - 添加描述信息
  - 代码规范检查和单元测试检查
- 配置持续集成环境
- 持续发布
## new Vue() 干了什么？
-  Vue 会调用 _init 函数进行初始化，也就是这里的 init 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。其中最重要的是通过 Object.defineProperty 设置 setter 与 getter 函数，用来实现「响应式」以及「依赖收集」
## v-model原理
- $emit触发input事件修改接收的值
## redux的中间件
- redux-thunk 
  - redux-thunk 中间件可以允许你写的 action creator 函数可以返回 action 对象的同时，也可以返回一个函数。函数传递两个参数 (dispatch,getState), 在函数体内进行业务逻辑的封装, getState() 方法获取 state这个中间件可以被用来延缓分发 action 的时机，或者实现只在满足某个条件的时候才触发 action。简而言之，中间件都是对 store.dispatch () 的增强。
- redux-saga
  - 官网上的描述redux-saga 是一个用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单。 粗浅的使用后的感受是很强大-各种情况下的流程控制都有对应的api,这些api保证了更简便的流程控制和易于测试的好处,因 thunk 插件还是需要你自己来写promise来保证各种异步和异常。


## 你的职业规划是什么？
- 第一，熟悉本岗位业务，让自己去胜任这个岗位。
- 第二，我们要完全掌握这一岗位所需要具备的二技能并在此基础上对于整个企业有了全面了解。
- 第三，不断学习、积极探索，横向拓宽自己的业务能力，寻求更多的反战机会。