# 项目经验

## Node
### 特点
- 单线程
- 事件驱动
- 非阻塞I/O
- 轻量、高效
- 包生态系统
- 开源库

### 核心模块
- 一、HTTP模块的作用：处理网络客户端的请求 
- 二、URL模块的作用：处理客户端请求过来的url
- 三、Query Strings模块的作用：处理客户端通过get/post请求传递过来的参数 
- 四、File System模块的作用：在服务端操作文件，可能是需要将浏览器上传的图片保存到服务器，也可能是需要将服务器的资源读取之后返回给浏览器。
- 五、Path模块的作用:操作文件的路径，为文件操作服务，- 常用的几个函数: path.join(第一个路径，第二个路径) : 拼接路径
- 六、Global模块

### Koa和Express有什么区别？
- 语法区别：
  - experss 异步使用 回调
  - koa1 异步使用 generator + yeild
  - koa2 异步使用 await/async
- 中间件区别
  - koa采用洋葱模型，进行顺序执行，出去反向执行，支持context传递数据
  - express本身无洋葱模型，需要引入插件，不支持context
  - express的中间件中执行异步函数，执行顺序不会按照洋葱模型，异步的执行结果有可能被放到最后，response之前。
  - 这是由于，其中间件执行机制，递归回调中没有等待中间件中的异步函数执行完毕，就是没有await中间件异步函数
- 集成度区别
  - express 内置了很多中间件，集成度高，使用省心，
  - koa 轻量简洁，容易定制

## 微前端
### 是什么
微前端就是将不同的功能按照不同的维度拆分成多个子应用，通过主应用来加载这些子应用

### 为什么
- 拆分：单页应用变得不再单一而是越来越庞大也越来越难以维护，公司架构是按业务分，由此带来的发版容易出错
- 整合：当然还可以整合不同技术栈的系统

### 有哪些
- Single-Spa：2018年 Single-SPA诞生了， single-spa 是一个用于前端微服务化的 JavaScript 前端解决 方案 (本身没有处理样式隔离， js 执行隔离) 实现了路由劫持和应用加载
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false
const appOptions = {
    el:'#vue', // 挂载到父应用中的id为vue的标签中
    router,
    render: h => h(App)
}
const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions
})
// 如果是父应用引用我
if(window.singleSpaNavigate){
  __webpack_public_path__ = 'http://localhost:10000/'
}
if(!window.singleSpaNavigate){
  delete appOptions.el;
  new Vue(appOptions).$mount('#app');
}

// 协议接入 我定好了协议 父应用会调用这些方法
export const bootstrap = vueLifeCycle.bootstrap;
export const mount = vueLifeCycle.mount;
export const unmount = vueLifeCycle.unmount;

// 我们需要父应用加载子应用，将子应用打包成一个个的lib去给父应用使用
// botstrap mount unmount
// soingle-spa  / single-spa-vue
```
- Qiankun：2019年 qiankun 基于Single-SPA, 提供了更加开箱即用的 API ，技术栈无关、并且接入简单。
```
// qiankun-base
import {registerMicroApps,start} from 'qiankun';
const apps = [ 
  {
    name:'vueApp', // 应用的名字
    entry:'//localhost:10000', // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    container:'#vue', // 容器名
    activeRule:'/vue', // 激活的路径
    props:{a:1}

  },
  {
    name:'reactApp',
    entry:'//localhost:20000', // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    container:'#react',
    activeRule:'/react',
  }
]
registerMicroApps(apps); // 注册应用
start({
  prefetch:false // 取消预加载
});// 开启

// qiankun-vue
module.exports = {
    devServer:{
        port:10000,
        headers:{
            'Access-Control-Allow-Origin':'*'
        }
    },
    configureWebpack:{
        output:{
            library:'vueApp',
            libraryTarget:'umd'
        }
    }
}

// qiankun-react
module.exports = {
    webpack:(config)=>{
        config.output.library = 'reactApp';
        config.output.libraryTarget = 'umd';
        config.output.publicPath = 'http://localhost:20000/';
        return config;
    },
    devServer:(configFunction)=>{
        return function (proxy,allowedHost){
            const config = configFunction(proxy,allowedHost);
            config.headers = {
                "Access-Control-Allow-Origin":'*'
            }
            return config
        }
    }
}
```
### 实现原理：微前端的基座框架
- 路由切换的分发问题
   - 切换时移除老应用样式，添加新应用样式
   - js沙箱机制
- 主微应用的隔离问题
- 通信问题

## 函数式编程
- 特征
	- 函数是第一等公民
	- 函数是纯函数
		- 同输入同输出
		- 无副作用
- 基本运算
	- 合成（compose）
		- 将代表各个动作的多个函数合并成一个函数
	- 柯里化（Currying）
		- 把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
- 函子
	- Maybe 函子
		- 指在 map 方法中增加了对空值的判断的函子
	- Either 函子
		- 指内部有分别有左值（left）和右值（right），正常情况下会使用右值，而当右值不存在的时候会使用左值的函子
	- Monad 函子
		- 指能够将函子多层嵌套解除的函子

## 前端安全
- XSS（跨站脚本攻击）
	- 存储型 XSS
		- 攻击者将恶意代码提交到目标网站的数据库中，这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等
	- 反射型 XSS
		- 攻击者构造出特殊的 URL，其中包含恶意代码，这种攻击常见于通过 URL 传递参数的功能，如网站搜索、跳转等。由于需要用户主动打开恶意的 URL 才能生效，攻击者往- 往会结合多种手段诱导用户点击
	- DOM 型 XSS
		- DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞
- CSRF（跨站请求伪造）
	- POST类型的CSRF
		- 通过表单提交，相当于模拟用户完成一次POST操作
	- 链接类型的CSRF
		- 用户点击链接才会触发
- 网络劫持
	- DNS劫持
		- 通过修改运营商的本地DNS记录，来引导用户流量到缓存服务器
	- HTTP劫持
		- 由于http明文传输,运营商会修改你的http响应内容(即加广告)
- 中间人攻击
	- 中间人 (Man-in-the-middle attack, MITM) 是指攻击者与通讯的两端分别创建独立的联系, 并交换其所收到的数据, 使通讯的两端认为他们正在通过一个私密的连接与对方直接对话, 但事实上整个会话都被攻击者完全控制. 在中间人攻击中, 攻击者可以拦截通讯双方的通话并插入新的内容.
- 网络劫持分析及解决方案
	- 最有效的办法就是全站HTTPS
- CSRF分析及解决方案
	- 分析
		- CSRF通常发生在第三方域名
		- CSRF攻击者不能获取到Cookie等信息，只是使用
	- 解决方案
		- 同源检测
		- Samesite Cookie属性
		- 双重Cookie验证
		- CSRF Token
- XSS分析及解决方案
	- 分析
		- 攻击者提交恶意代码
		- 浏览器执行恶意代码
	- 解决方案
		- 输入过滤
		- 纯前端渲染
		- 转义 HTML

## 跨域
- 最经典的跨域方案jsonp
	- jsonp本质上是一个Hack，它利用script标签不受同源策略限制的特性进行跨域操作
	- 优点
		- 实现简单
		- 兼容性非常好
	- 缺点
		- 只支持get请求（因为script标签只能get）
		- 有安全性问题，容易遭受xss攻击
		- 需要服务端配合jsonp进行一定程度的改造
```
function JSONP({  
  url,
  params,
  callbackKey,
  callback
}) {
  // 在参数里制定 callback 的名字
  params = params || {}
  params[callbackKey] = 'jsonpCallback'
    // 预留 callback
  window.jsonpCallback = callback
    // 拼接参数字符串
  const paramKeys = Object.keys(params)
  const paramString = paramKeys
    .map(key => `${key}=${params[key]}`)
    .join('&')
    // 插入 DOM 元素
  const script = document.createElement('script')
  script.setAttribute('src', `${url}?${paramString}`)
  document.body.appendChild(script)
}

JSONP({  
  url: 'http://s.weibo.com/ajax/jsonp/suggestion',
  params: {
    key: 'test',
  },
  callbackKey: '_cb',
  callback(result) {
    console.log(result.data)
  }
})
```
- 最流行的跨域方案cors
	- cors是目前主流的跨域解决方案，跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器 让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求
```
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

//...
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'cool beans' }));
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});
```
- 最方便的跨域方案Nginx
	- nginx是一款极其强大的web服务器，其优点就是轻量级、启动快、高并发
- HTML5 XMLHttpRequest 有一个API，postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。
	- SendMessage、PostMessage的运行机制
- WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了，因此可以跨域。
	- WebSocket是HTML5一种新的协议，WebSocket是真正实现了全双工通信的服务器向客户端推的互联网技术，是一种在单个TCP连接上进行全双工通讯协议。
- window.name + iframe：window.name属性值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值，我们可以利用这个特点进行跨域。
- location.hash + iframe：a.html欲与c.html跨域相互通信，通过中间页b.html来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。
- document.domain + iframe： 该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式，我们只需要给页面添加 
- document.domain ='test.com' 表示二级域名都相同就可以实现跨域，两个页面都通过js强制设置document.domain为基础主域，就实现了同域

## jsbridge
JSBridge是连接Native(客户端)和JavaScript前端的桥梁，通过JSBridge 两端的代码才可以通信。简单的说，JSBridge 一方面给js提供了调用native的方法，而反过来，它也承接了native调用js事件队列的封装。JSBridge构建了js和native之间的通信，而且是双向的

## 滚动加载
原理就是监听页面滚动事件，分析clientHeight、scrollTop、scrollHeight三者的属性关系
```
window.addEventListener('scroll', function() {
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  if (clientHeight + scrollTop >= scrollHeight) {
    // 检测到滚动至页面底部，进行后续操作
    // ...
  }
}, false);
```

## git flow 工作流
- 分支
	- master：主分支，属保护分支，不能直接在此进行代码修改和提交。
	- develop：日常使用分支。
	- release：待发布分支。
	- feature：新功能分支，当完成一个功能并测试通过后进行合并到develop分支中。
	- hotfix：线上紧急漏洞修复分支，从master分支拉取创建，修复完bug后合并到master和develop分支中。
- 提交规范（code review）
	- 产生背景
		- 老项目代码，在不断新增功能的同时，互相维护起来非常痛苦
	- 如何分析
		- 主动要求增加 code review，前期稍微多投入点时间，后期固定一个小时
	- 如何实施
		- 从 master 拉分支
		- 开发原因（hotfix/feature），直至开发完成；（eslint husky第一道卡口）
		- 开发完成，合往develop分支联调；
		- 调联自测完成，合往test（ci）分支；
		- 简单测试，修改BUG完成；
		- 合到指定的 reviewer 分支，审查者开始审查代码；有问题地方留下comment供被审查着进行代码改进；
		- 被审查者根据comment修改代码，如果有疑问直接问审查者，进行沟通学习，直至 reviewer 通过；
		- 合到release分支，测试进行回归测试，准备上线了，预生产测试；
		- 回归完成，release，合到master分支；
		- 完成之后，各开发分支同步master代码
- 插件
  - eslint
  - prettier
  - commitlint 搭配 husky 的 commit message 钩子后，每次提交 git 版本信息的时候，会根据配置的规则进行校验，若不符合规则会 commit 失败，并提示相应信息。
## 前端埋点
- 代码埋点
	- 就是以嵌入代码的形式进行埋点，比如需要监控用户的点击事件，会选择在用户点击时，插入一段代码，保存这个监听行为或者直接将监听行为以某一种数据格式直接传递给server端。此外比如需要统计产品的PV和UV的时候，需要在网页的初始化时，发送用户的访问信息等
	- 优点：可以在任意时刻，精确的发送或保存所需要的数据信息
	- 缺点：工作量较大，每一个组件的埋点都需要添加相应的代码
- 可视化埋点
	- 通过可视化交互的手段，代替代码埋点。将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等等，最后输出的代码耦合了业务代码和埋点代码
	- 缺点：可视化埋点可以埋点的控件有限，不能手动定制
- 无埋点
	- 无埋点并不是说不需要埋点，而是全部埋点，前端的任意一个事件都被绑定一个标识，所有的事件都别记录下来。通过定期上传记录文件，配合文件解析，解析出来我们想要的数据，并生成可视化报告供专业人员分析因此实现“无埋点”统计
	- 优点：由于采集的是全量数据，所以产品迭代过程中是不需要关注埋点逻辑的，也不会出现漏埋、误埋等现象
	- 缺点：无埋点采集全量数据，给数据传输和服务器增加压力和无法灵活的定制各个事件所需要上传的数据

## 性能优化
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
- 图片优化
	- 懒加载
	- 使用合理的图片
	  - BMP，是无损的、既支持索引色也支持直接色的点阵图。这种图片格式几乎没有对数据进行压缩，所以BMP格式的图片通常是较大的文件。
      - GIF是无损的、采用索引色的点阵图。采用LZW压缩算法进行编码。文件小，是GIF格式的优点，同时，GIF格式还具有支持动画以及透明的优点。但是GIF格式仅支持8bit的索引色，所以GIF格式适用于对色彩要求不高同时需要文件体积较小的场景。
      - JPEG是有损的、采用直接色的点阵图。JPEG的图片的优点是采用了直接色，得益于更丰富的色彩，JPEG非常适合用来存储照片，与GIF相比，JPEG不适合用来存储企业Logo、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较GIF更大。
      - PNG-8是无损的、使用索引色的点阵图。PNG是一种比较新的图片格式，PNG-8是非常好的GIF格式替代者，在可能的情况下，应该尽可能的使用PNG-8而不是GIF，因为在相同的图片效果下，PNG-8具有更小的文件体积。除此之外，PNG-8还支持透明度的调节，而GIF并不支持。除非需要动画的支持，否则没有理由使用GIF而不是PNG-8。
      - PNG-24是无损的、使用直接色的点阵图。PNG-24的优点在于它压缩了图片的数据，使得同样效果的图片，PNG-24格式的文件大小要比BMP小得多。当然，PNG24的图片还是要比JPEG、GIF、PNG-8大得多。
      - SVG是无损的矢量图。SVG是矢量图意味着SVG图片由直线和曲线以及绘制它们的方法组成。当放大SVG图片时，看到的还是线和曲线，而不会出现像素点。SVG图片在放大时，不会失真，所以它适合用来绘制Logo、Icon等。
      - WebP是谷歌开发的一种新图片格式，WebP是同时支持有损和无损压缩的、使用直接色的点阵图。从名字就可以看出来它是为Web而生的，什么叫为Web而生呢？就是说相同质量的图片，WebP具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。目前只有Chrome浏览器和Opera浏览器支持WebP格式，兼容性不太好。

- 合理使用缓存策略
	- 不变的东西
- 合理使用本地存储
	- 离线包
	- cookie里面不要乱存
- 浏览器渲染
	- 减少重排与重绘
	- 将脚本放在底部
	- 利用好async和defer这两个属性
- 事件循环
	- DOM操作优化
- 节流与防抖
- Performance/LightHouse

## 首屏优化
- 首屏优化：主要是为了减少的首屏呈现给用户的时间
- 使用字体图标（iconfont）或者 精灵图
- 图片懒加载（vue-lazyload）
- Skeleton Screen（骨架屏）
- 路由懒加载（把不同路由对应的组件分割为不同的代码块，当路由被访问的时候，再加载对应的组件，对中大型项目来说，会显得很高效，对开发者而言，也方便维护。）
- webpack优化
	- treeShaking
	- 动态引入polyfill
	- 提取公共代码库（SplitChunksPlugin）
	- sourceMap（devtool的合理）
	- preloading和prefetch（后者是空闲去加载）
	- 打包分析工具（webpack-bundle-analyzer）
	- 持久化缓存（保证 hash 值的唯一性，即为每个打包后的资源生成一个独一无二的 hash 值，只要打包内容不一致，那么 hash 值就不一致。）
- 使用ssr渲染

## 鉴权
- session-cookie
- token验证方案JWT
- OAuth（开放授权）

## 移动端点击延迟怎么处理
- 禁用缩放
- FastClick
- 更改默认视口宽度meta标签 name="viewport" content="width=device-width"
- css新属性touch-action

## 监控系统
- 监控系统指标
	- First contentful paint (FCP) ：测量页面从开始加载到页面任何一部分内容渲染到屏幕上的时间。（lab，field）
	- Largest contentful paint (LCP) ：测量页面从开始加载到最大文本块或图像元素渲染到屏幕上的时间。（lab，field）
	- First input delay (FID) ：测量用户第一次与你的站点交互到浏览器实际可以响应该交互的时间。（field）
	- Time to Interactive (TTI) ：测量从页面开始加载到可视化呈现、其初始化脚本（如果有的话）已加载，以及能够可靠快速地响应用户输入的时间。（lab）
	- Total blocking time (TBT) ：测量 FCP 和 TTI 之间，长时间阻塞主线程导致阻碍输入响应的总时间。（lab）
	- Cumulative layout shift (CLS) ：测量从页面开始加载到其生命周期状态变为 Hidden 之间发生的所有非预期布局移动的累积分数。（lab，field）
- 有哪些异常
	- JavaScript异常（语法错误、代码错误）
	- 静态资源加载异常（img、js、css）
	- Ajax 请求异常
	- promise异常
	- iframe 异常
- 上报哪些信息
	- 错误id / 用户id / 用户名 / 用户IP / 设备 / 错误信息 / 游览器 / 系统版本 / 应用版本 / 机型 / 时间戳 / 异常级别（error、warning、info）
	- 异常上报方式分为ajax和图片形式
- 原理
	- try-catch
	- window.onerror
	- window.addEventListener('error')
	- window.addEventListener('unhandledrejection')
	- vue
	- React

```
Vue.config.errorHandler = (err, vm, info) => {
  console.error('捕获异常：', err, vm, info);
}
```

```
componentDidCatch(error, info) {
    console.error('捕获异常：', error, info);
}
```
- 数据监控
	- PV/UV:PV(page view)，即页面浏览量或点击量。UV:指访问某个站点或点击某条新闻的不同IP地址的人数
	- 用户在每一个页面的停留时间
	- 用户通过什么入口来访问该网页
	- 用户在相应的页面中触发的行为
- 性能监控
	- 不同用户，不同机型和不同系统下的首屏加载时间
	- 白屏时间
	- http等请求的响应时间
	- 静态资源整体下载时间
	- 页面渲染时间
	- 页面交互动画完成时间

## 项目的亮点和难点
### 骨架屏的搭建
- puppeteer
- Server.js（启服务）
- skeletonScript.js（转换操作）
- SkeletonPlugin.js（apply/compiler.hooks.done.tap就等编译完钩子）
- 启动一个http服务器
```
  let express = require('express');
  let http = require('http');
  this.httpServer = http.createServer(app);
  this.httpServer.listen;
  this.httpServer.close;
```
- 启动一个无头浏览器
```
  async initialize(){//打开一个浏览器
      this.browser = await puppeteer.launch({headless:false});//无头 不打开浏览器
  }
```
- 生成骨架屏的html和style
- 再销毁无头浏览器
- 完事后要关闭服务器

### Vue大文件上传和断点续传
- 基于文件流
	- buffer + form-date格式
	- file（文件流信息）包括size和type等，filename为文件名字
- 转化成base64
	- 首先使用fileReader方法解析文件
	- 然后进行readAsDataURL处理（转换成base64）
	- 上传前将数据分成若干份
	- 通过new sparkMD5.ArrayBuffer().end()函数获得hash值
	- 每一份用hash/suffix为命名规则
	- 然后分别赋值给chunk和filename，并存入数组chunkList
  - 最后发起请求上传

### 优化数据量大的业务场景长列表
- 分片加载
```
let index = 0;
let id = 0;
function load() {
    index += 20;
    if (index > total) {
        requestAnimationFrame(() => {
            for (let i = 0; i < 20; i++) {
                let fragment = document.createDocumentFragment();
                let li = document.createComment('li');
                li.innerHTML = id++;
                fragment.appendChild(li);
            }
            container.appendChild(fragment);
            load()
        })
    }
}
```
- 虚拟列表
	- 可视区
	- 真实列表
	- startIndex
	- endIndex
	- 总结
		- 实现虚拟列表需要正确计算出可视区域的列表项，以及顶部和底部留白的高度，同时需要避免滚动时留白部分出现在可视区域内以及页面抖动，而通过给上下预留位置可以解决这两个问题

### 封装的组件需要少量算法功底
- 全排列
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
- 求同
```
export default function ListCompare(list1 = [], list2 = []) {
  const hash = new Map();
  list2.forEach(({ tableEnName }, index) => hash.set(tableEnName, index));
  const result = []; // 相同的保留
  result.push(...list1.filter(({ tableEnName }) => hash.has(tableEnName)));
  hash.clear();
  list1.forEach(({ tableEnName }, index) => hash.set(tableEnName, index));
  result.push(...list2.filter(({ tableEnName }) => !hash.has(tableEnName)));
  return result;
}
```
- 数组扁平化

### 前端监控系统Sentry搭建
### 微前端
### 封装的组件解决可配置性问题
