# HTML5新特性
## canvas
- fillstyle/strokeStyle等颜色、样式和阴影API
- lineCap/lineWidth等样式API
- rect/fillRect等矩形API
- fill/stroke/beginPath/moveTo/lineTo等路径API
- scale/rotate/translate/transform等转换API
- font/textAlign/fillText等文本API
- drawImage图像绘画API

#### Canvas和SVG的区别
- SVG：SVG可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言XML描述的2D图形的语言，SVG基于XML就意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

- Canvas：Canvas是画布，通过Javascript来绘制2D图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。
## 新增video和audio标签
- 属性：autoplay/controls/height/loop/width/preload等
## 语义化标签
- 新标签：article/nav/header/section/aside/footer/hgroup等
- 作用和优点
  - 让页面具有良好的结构和含义
  - 开发者友好，即有利于团队的开发与维护
  - 机器友好，适合搜索引擎的爬虫

## 表单控件
- Type属性值（url/email/date/time/week/number/range/tel/color/search）
- 属性（placeholder/autofocus/autocomplete）

## 数据存储
- localStorage
- sessionStorage

## history API
- go、forward、back、pushstate
## webworker/websocket/geolocation
- webworker
  - 允许在主线程之外再创建一个 worker 线程，在主线程执行任务的同时，worker 线程也可以在后台执行它自己的任务，互不干扰
  - 在worker内不能直接操作DOM节点，也不能使用window对象的默认方法和属性，无法加载本地资源

- websocket
  - WebSocket 本质上一种应用层的协议
  - WebSocket 是一种在单个TCP连接上进行全双工通信的协议
  - websocket 提供ws和wss（加密）两种URL方案

- geolocation
  - 地理位置 API 通过window.navigator.geolocation提供

## 离线储存
- 离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。
- 原理：HTML5的离线存储是基于一个新建的 .appcache 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示