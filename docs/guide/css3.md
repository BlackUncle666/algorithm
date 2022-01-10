# CSS3新特性

## 新选择器
- p:frist-child 选择属于其元素的首个子元素
- p:first-of-type 选择属于其父元素的首个p元素的每个p元素
- p:last-of-type 选择属于其父元素的最后p元素的每个p元素
- p:only-of-type 选择属于其父元素唯一的p元素的每个p元素
- p:only-child 选择属于其父元素的唯一子元素的每个p元素
- p:nth-child(2) 选择属于其父元素的第二个子元素的每个p元素
- :after 在元素之前添加内容,也可以用来做清除浮动
- :before 在元素之后添加内容
- :enabled 已启用的表单元素
- :disabled 已禁用的表单元素
- :checked 单选框或复选框被选中

## 过渡（transition）
- transition-property: 属性
- transition-duration: 间隔
- transition-timing-function: 曲线
- transition-delay: 延迟
- 常用钩子: transitionend

## 动画（animation）
- animation-name: 动画名称，对应@keyframes
- animation-duration: 间隔
- animation-timing-function: 曲线
- animation-delay: 延迟
- animation-iteration-count: 次数（infinite: 循环动画）
- animation-direction: 方向（alternate: 反向播放）
- animation-fill-mode: 静止模式
- 常用钩子: animationend

## 旋转（transform）
- translate / translate3d / translateX / translateY / translateZ 移动
- scale / scale3d / scaleX / scaleY / scaleZ 缩放
- rotate / rotate3d / rotateX / rotateY / rotateZ 旋转
- skew / skewX / skewY 倾斜
- perspective / matrix / matrix3d 矩阵

## flex
- flex-direction 
  - 定义主轴的方向
  - row | row-reverse | column | column-reverse
- flex-wrap 
  - 定义是否换行
  - nowrap | wrap | wrap-reverse
- flex-flow
  - flex-direction || flex-wrap
- justify-content 
  - 定义在主轴上的对齐方式
  - flex-start | flex-end | center | space-between | space-around;
- align-items 
  - 定义在交叉轴上对齐方式
  - flex-start | flex-end | center | baseline | stretch
- align-content 
  - 定义多根轴线的对齐方式
  - flex-start | flex-end | center | space-between | space-around | stretch
- 以下6个属性设置在项目上
  - order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
  - flex-grow 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
  - flex-shrink 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
  - flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
  - flex 属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
  - align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
## @media媒体查询
- max-width/min-width/device-width

## 文本属性
- text-shadow/text-overflow/text-wrap/word-break/word-wrap/white-space

## 边框
- border-radius/border-image

## 背景
- rgba/backgrounnd-size:cover/contain

## 渐变
- linear-gradient/radial-gradient

## 多列布局（column）
- 1. columns: column-width || column-count
- 2. column-width：length | auto 设置对象的宽度；使用像素表示。
- 3. column-count：integer | auto 用来定义对象中的列数，使用数字 1-10表示。
- 4. column-gap: normal || length， normal是默认值，为1em， length 是用来设置列与列之间的间距。
- 5. column-rule：column-rule-width || column-rule-style || column-rule-color
- 6. column-fill：auto | balance
- 7. column-break-before：auto | always | avoid | left | right | page | column | avoid-page | avoid-column
- 8. column-break-after：auto | always | avoid | left | right | page | column | avoid-page | avoid-column
- 9. column-break-inside：auto | avoid | avoid-page | avoid-column