# CSS考点
## css 选择器优先级
- !important>行内样式>ID选择器>类选择器>标签选择器>通配符选择器>继承
#### 其他选择器
- 相邻兄弟选择器	h1+p
- 子代选择器	ul>li
- 后代选择器	li a

#### CSS预处理器/后处理器
- 预处理器， 如：less，sass，stylus，用来预编译sass或者less，增加了css代码的复用性。层级，mixin， 变量，循环， 函数等对编写以及开发UI组件都极为方便。
- 后处理器， 如： postCss，通常是在完成的样式表中根据css规范处理css，让其更加有效。目前最常做的是给css属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

## 移动端1px问题
- 媒体查询（dpr）+ 物理像素
```
/*这是css方式*/
.border { border: 1px solid #999 }
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border { border: 0.5px solid #999 }
}
/*ios dpr=2和dpr=3情况下border相差无几，下面代码可以省略*/
@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border { border: 0.333333px solid #999 }
}
```
- 使用1px的边框图片或者背景图片
- 伪类 + 媒体查询（dpr）+ transform:scale()
- viewport + rem
- box-shadow
- postcss-write-svg插件

## 定位position
- static：正常文档流定位（默认值）
- relative：相对定位，相对正常文档流的位置
- absolute：绝对定位，相对最近的定位祖先元素
- fixed：固定定位，相对于视口的位置
- sticky：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的“顶屁股”

## 清除浮动
- 父级div定义height
- 结尾处加空div标签clear:both
- 父级div定义伪类:after和zoom
- 父级div定义overflow:hidden

## 文本溢出
- 单行文本溢出
```
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;      // 溢出用省略号显示
white-space: nowrap;         // 规定段落中的文本不进行换行
```
- 多行文本溢出
```
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;     // 溢出用省略号显示
display:-webkit-box;         // 作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp:3;        // 显示的行数
```

## CSS隐藏页面元素的方式
- opacity:0：占据空间且可以交互
- visibility:hidden: 占据空间但不可以交互
- overflow:hidden: 只隐藏元素溢出的部分
- display:none: 元素从文档流中消失，既不占据空间也不交互，还可能影响布局
- z-index:-9999: 原理是将层级放到底部，这样就被覆盖了，看起来隐藏了
- transform: scale(0,0): 平面变换，将元素缩放为0，但是依然占据空间，但不可交互
- 还有靠绝对定位把元素移到可视区域外

## 移动端适配
- 一般使用rem或vw进行适配
- caniuse网站，显示rem支持性更好
- rem适配的本质是通过动态设置html的font-size来改变大小，其随之而变
- rem：移动端网站，如门户网等
- vw：简单的活动页，如邀请页等
- vw+rem：结合使用

## 盒子模型
- 每一个盒子都由四个部分组成，由于内而外分别是内容区域（content area），内边距区域（padding area），边框区域（border area），外边距区域（margin area）
- 两种标准
  - W3C标准盒模型中，width指的是content的宽度
  - IE标准盒模型中，width指的是content + padding + border
- css3中加入box-sizing:content-box | border-box

## viewport
  - device-width / initial-scale / minimum-scale / maximum-scale / user-scalable

## 水平居中的方法
- 元素为行内元素，设置父元素text-align:center
- 如果元素宽度固定，可以设置左右margin为auto
- 如果元素为绝对定位，设置父元素position为relative，元素设left:0;right:0;margin:auto;
- 使用flex-box布局，指定justify-content属性为center
- display设置为table-cell

## 垂直居中的方法
- 将显示方式设置为表格，display:table-cell,同时设置vertial-align：middle
- 使用flex布局，设置为align-item：center
- 绝对定位中设置bottom:0,top:0,并设置margin:auto
- 绝对定位中固定高度时设置top:50%，margin-top值为高度一半的负值
- 文本垂直居中设置line-height为height值

## rem、em、vh、vw 和 px 的区别
- rem：相对于HTML根元素的字体大小
- em：如果当前没有设置字体大小，就相对于父级的字体大小
- vh和vw：相对于视口的高度和宽度，1vh等于1/100的视口高度
- px：物理像素

## 谈谈对BFC的理解
- 含义：块级格式化上下文（Block Formatting Context）
- 作用：在一块独立的区域，让处于BFC内部的元素与外部的元素相互隔离
- 创建规则：
  - 根元素
  - 浮动元素（float不取值为none）
  - 绝对定位元素（position取值为absolute或fixed） 
  - display取值为inline-block、table-cell、table-caption、flex、inline-flex之一的元素
  - overflow不取值为visible的元素

## 如何实现水平垂直居中
- 第1种
``` 
.wraper {
  position: relative;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
  }
}
```

- 第2种
```
/** 2 **/
.wraper {
  position: relative;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```

- 第3种
```
/** 3 **/
.wraper {
  .box {
    display: flex;
    justify-content:center;
    align-items: center;
    height: 100px;
  }
}
```

- 第4种
```
/** 4 **/
.wraper {
  display: table;
  .box {
    display: table-cell;
    vertical-align: middle;
  }
}
```

## 如何实现左侧宽度固定，右侧宽度自适应的布局
- 第1种
```
/*方法一： BFC(块级格式化上下文)*/
.container{
    width:1000px;height:400px;border: 1px solid red;
}
.left{
    width:200px;height:100%;background: gray;
    float: left;
}
.right{
    overflow:hidden;  /* 触发bfc */
    background: green;
}
```
- 第2种
```
/*方法二： flex布局 */
.container{
    width:1000px;height:400px;border:1px solid red;
    display:flex;         /*flex布局*/
}
.left{
    width:200px; height:100%;background:gray;
    flex:none;
}
.right{
    height:100%;background:green;
    flex:1;        /*flex布局*/
}
```
- 第3种
```
/* 方法三： table布局 */
.container{
    width:1000px;height:400px;border:1px solid red;
    display:table;         /*table布局*/
}
.left{
    width:200px; height:100%;background:gray;
    display:table-cell;
}
.right{
    height:100%;background:green;
    display: table-cell;
}
```
- 第4种
```
/*方法四： css计算宽度calc*/
.container{
    width:1000px;height:400px;border:1px solid red;
}
.left{
    width:200px;height:100%;background:gray;
    float:left;
}
.right{
    height:100%;background:green;
    float:right;
    width:calc(100% - 200px);
}
```
- 第5种
```
/*方法五： margin-left方式*/
.container{
	width:1000px;height:400px;border:1px solid red;
}
.left{
	float:left;width:200px;border:1px solid red;height:100%;background:gray;
}
.right{
	height:100%;border:1px solid blue;width:auto;margin-left:200px;
}
```

## 实现一个三角形
```
div {
    width: 0;
    height: 0;
    border-bottom: 50px solid red;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
}
```

## 实现一个扇形
```
div{
    border: 100px solid transparent;
    width: 0;
    heigt: 0;
    border-radius: 100px;
    border-top-color: red;
}
```