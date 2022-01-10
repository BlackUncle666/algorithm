# 浏览器

## 浏览器内核
| 名称       | 内核 | 引擎 | 
| :--------- | :--: | :--: | 
|Chrome|Blink（28~）Webkit（Chrome 27）|V8引擎|
|FireFox|Gecko|SpiderMonkey|
|Safari|Webkit|JavaScriptCore|
|Edge|EdgeHTML|Chakra(for JavaScript)|
|IE|Trident|Chakra(for JScript)|

## 事件循环
- 先说基本知识点，宏任务、微任务有哪些
- 说事件循环机制过程（总的结论就是，执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环），边说边画图出来
- await会产生一个微任务，说async/await执行顺序注意，可以把 chrome 的优化，做法其实是违法了规范的，V8 团队的PR这些自信点说出来，显得你很好学，理解得很详细，很透彻。
- 把node的事件循环也说一下，三大重点阶段：timers（会执行 setTimeout 和 setInterval 回调），poll（做判断），check（执行 setImmdiate 的回调）
### 栈、队列的基本概念
- 栈（Stack）
  - 栈在计算机科学中是限定仅在表尾进行插入或删除操作的线性表。 栈是一种数据结构，它按照后进先出的原则存储数据，先进入的数据被压入栈底，最后的数据在栈顶，需要读数据的时候从栈顶开始弹出数据。栈是只能在某一端插入和删除的特殊线性表。
- 队列（Queue）
  - 特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。 队列中没有元素时，称为空队列。队列的数据元素又称为队列元素。在队列中插入一个队列元素称为入队，从队列中删除一个队列元素称为出队。因为队列只允许在一端插入，在另一端删除，所以只有最早进入队列的元素才能最先从队列中删除，故队列又称为先进先出（FIFO—first in first out）

### 两种任务
- 宏任务（MacroTask）
  - script全部代码
  - setTimeout
  - setInterval
  - setImmediate（浏览器暂时不支持，只有IE10支持，具体可见MDN）
  - I/O
  - UI Rendering
- 微任务（MicroTask）
  - Process.nextTick（Node独有）
  - Promise
  - Object.observe(废弃)
  - MutationObserver

### 题目一
```
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0);
Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');

---结果---

script start
script end
promise1
promise2
setTimeout
```

### 题目二
```
console.log('script start')
async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end') 
}
async1()
setTimeout(function() {
  console.log('setTimeout')
}, 0)
new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })
console.log('script end')

---结果---

script start
async2 end
Promise
script end
async1 end
promise1
promise2
setTimeout
```

## 缓存
### 缓存位置
- Service Worker
- Memory Cache
- Disk Cache
- Push Cache
- 网络请求
### 缓存策略
- 强缓存
  - Expires: Wed, 22 Oct 2018 08:41:00 GMT
  - Cache-control: max-age=30
- 协商缓存
  - Last-Modified 和 If-Modified-Since
    - Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来，否则返回 304 状态码
  - ETag 和 If-None-Match
    - ETag 类似于文件指纹，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来。并且 ETag优先级比 Last-Modified 高

## 垃圾回收机制
#### V8实现了准确式GC，GC算法采用了分代式垃圾回收机制
- 新生代
  - Scavenge GC算法
    - From空间和To空间（必定有一个空间是使用的，另一个空间是空闲的。当From 空间被占满时，新生代 GC 就会启动了。算法会检查 From 空间中存活的对象并复制到 To 空间中）
- 老生代
  - 标记清除(例1)
  - 引用计数(例2) - 缺点——循环引用(例3)

```
(例1)
function func3 () {
    const a = 1
    const b = 2
    // 函数执行时，a b 分别被标记 进入环境
}
func3() // 函数执行结束，a b 被标记 离开环境，被回收
```

```
(例2)
function func4 () {
    const c = {} // 引用类型变量 c的引用计数为 0
    let d = c // c 被 d 引用 c的引用计数为 1
    let e = c // c 被 e 引用 c的引用计数为 2
    d = {} // d 不再引用c c的引用计数减为 1
    e = null // e 不再引用 c c的引用计数减为 0 将被回收
}
```

```
(例3)
function func5 () {
    let f = {}
    let g = {}
    f.prop = g
    g.prop = f
    // 由于 f 和 g 互相引用，计数永远不可能为 0
}
```

## 浏览器渲染
### 浏览器进程
- 主进程
- 第三方插件进程
- GPU 进程
- 渲染进程
  - GUI 渲染线程
    - 负责渲染浏览器界面,解析 HTML,CSS,构建 DOM 树和 RenderObject 树,布局和绘制等
    - 当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时,该线程就会执行
    - 注意,GUI 渲染线程与 JS 引擎线程是互斥的,当 JS 引擎执行时 GUI 线程会被挂起（相当于被冻结了）,GUI 更新会被保存在一个队列中等到 JS 引擎空闲时立即被执行
  - JS 引擎线程
    - Javascript 引擎,也称为 JS 内核,负责处理 Javascript 脚本程序。（例如 V8 引擎）
    - JS 引擎线程负责解析 Javascript 脚本,运行代码
    - JS 引擎一直等待着任务队列中任务的到来,然后加以处理,一个 Tab 页（renderer 进程）中无论什么时候都只有一个 JS 线程在运行 JS 程序
    - 注意,GUI 渲染线程与 JS 引擎线程是互斥的,所以如果 JS 执行的时间过长,这样就会造成页面的渲染不连贯,导致页面渲染加载阻塞
  - 事件触发线程
    - 归属于浏览器而不是 JS 引擎,用来控制事件循环（可以理解,JS 引擎自己都忙不过来,需要浏览器另开线程协助）
    - 当 JS 引擎执行代码块如 setTimeOut 时（也可来自浏览器内核的其他线程,如鼠标点击、AJAX 异步请求等）,会将对应任务添加到事件线程中
    - 当对应的事件符合触发条件被触发时,该线程会把事件添加到待处理队列的队尾,等待 JS 引擎的处理
    - 注意,由于 JS 的单线程关系,所以这些待处理队列中的事件都得排队等待 JS 引擎处理（当 JS 引擎空闲时才会去执行）
  - 定时触发器线程
    - 传说中的 setInterval 与 setTimeout 所在线程
    - 浏览器定时计数器并不是由 JavaScript 引擎计数的,（因为 JavaScript 引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确）
    - 因此通过单独线程来计时并触发定时（计时完毕后,添加到事件队列中,等待 JS 引擎空闲后执行）
    - 注意,W3C 在 HTML 标准中规定,规定要求 setTimeout 中低于 4ms 的时间间隔算为 4ms
  - 异步 http 请求线程
    - 在 XMLHttpRequest 在连接后是通过浏览器新开一个线程请求
    - 将检测到状态变更时,如果设置有回调函数,异步线程就产生状态变更事件,将这个回调再放入事件队列中。再由 JavaScript 引擎执行

### 为什么 Javascript 要是单线程的
如果 JavaScript 是多线程的方式来操作这些 UI DOM,则可能出现 UI 操作的冲突。假设存在两个线程同时操作一个 DOM,一个负责修改一个负责删除,那么这个时候就需要浏览器来裁决如何生效哪个线程的执行结果

### 为什么 JS 阻塞页面加载
GUI 渲染线程与 JavaScript 引擎为互斥的关系。当 JavaScript 引擎执行时 GUI 线程会被挂起,GUI 更新会被保存在一个队列中等到引擎线程空闲时立即被执行。

### css 加载会造成阻塞吗
- DOM 解析和 CSS 解析是两个并行的进程,所以 CSS 加载不会阻塞 DOM 的解析
- 然而,由于 Render Tree 是依赖于 DOM Tree 和 CSSOM Tree 的,所以他必须等待到 CSSOM Tree 构建完成,也就是 CSS 资源加载完成(或者 CSS 资源加载失败)后,才能开始渲染。因此,CSS 加载会阻塞。

### DOMContentLoaded 与 load 的区别
- 当 DOMContentLoaded 事件触发时,仅当 DOM 解析完成后,不包括样式表,图片
- 当 onload 事件触发时,页面上所有的 DOM,样式表,脚本,图片等资源已经加载完毕

### CRP,即关键渲染路径(Critical Rendering Path)
- 含义
  - 关键渲染路径是浏览器将 HTML CSS JavaScript 转换为在屏幕上呈现的像素内容所经历的一系列步骤
- 优化
  - 关键资源的数量: 可能阻止网页首次渲染的资源
  - 关键路径长度: 获取所有关键资源所需的往返次数或总时间
  - 关键字节: 实现网页首次渲染所需的总字节数,等同于所有关键资源传送文件大小的总和

### defer 和 async 的区别

### 谈谈回流与重绘

### 什么是渲染层合并
- 对于页面中 DOM 元素的绘制(Paint)是在多个层上进行的
- 在每个层上完成绘制过程之后,浏览器会将绘制的位图发送给 GPU 绘制到屏幕上,将所有层按照合理的顺序合并成一个图层,然后在屏幕上呈现

## 输入URL会发生什么？
- 浏览器根据请求的URL交给DNS域名解析，找到真实IP
  - 浏览器查看缓存
    - 如果资源未缓存，发起新请求
    - 如果已缓存，检验是否足够新鲜，足够新鲜直接提供给客户端，否则与服务器进行验证
    - 检验新鲜通常有两个HTTP头进行控制Expires和Cache-Control
  - 浏览器解析URL获取协议，主机，端口，path
  - 浏览器组装一个HTTP（GET）请求报文
  - 浏览器获取主机ip地址
    - 浏览器缓存
    - 本机缓存
    - hosts文件
    - 路由器缓存
    - ISP DNS缓存
    - DNS递归查询（可能存在负载均衡导致每次IP不一样）
- 建立TCP链接，发起HTTP请求
  - 打开一个socket与目标IP地址，端口建立TCP链接，三次握手
    - 客户端发送一个TCP的SYN=1，Seq=X的包到服务器端口
    - 服务器发回SYN=1， ACK=X+1， Seq=Y的响应包
    - 客户端发送ACK=Y+1， Seq=Z
- 服务器响应HTTP请求，返回数据后，浏览器对加载到的资源进行语法解析
  - 服务器检查HTTP请求头是否包含缓存验证信息如果验证缓存新鲜，返回304等对应状态码
  - 处理程序读取完整请求并准备HTTP响应，可能需要查询数据库等操作
  - 服务器将响应报文通过TCP连接发送回浏览器
  - 浏览器接收HTTP响应，然后根据情况选择关闭TCP连接或者保留重用，关闭TCP连接的四次握手
    - 主动方发送Fin=1， Ack=Z， Seq= X报文
    - 被动方发送ACK=X+1， Seq=Z报文
    - 被动方发送Fin=1， ACK=X， Seq=Y报文
    - 主动方发送ACK=Y， Seq=X报文
  - 浏览器检查响应状态吗：是否为1XX，3XX， 4XX， 5XX，这些情况处理与2XX不同
  - 如果资源可缓存，进行缓存
  - 对响应进行解码（例如gzip压缩）
  - 根据资源类型决定如何处理（假设资源为HTML文档）
- 得到DOM树和CSS树，然后形成render树
- 之后就进入布局（Layout）阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标
- 随后进行绘制（Painting），页面完成