
## 前言

我是一枚一心只想“搞钱”的，2021年应届的程序媛，毕业于南方某二本院校，长相一般，成绩一般，考研失利。

从二月份开始，自学了四个月的前端，在这个学习过程中，我关注了一个前端公众号“程序员黑叔”，于是加了黑叔的微信，总是请教黑叔，有耐心，能力很强。

2021年6月，我毕业了，拿着毕业证和闺蜜，搭上了从长沙南开往深圳北的列车，从此踏上了猪脚饭和房租的日子。

## 初来乍到，简历海投

对于没有收入的我来说，房租1500，有点贵，和闺蜜合租在了宝安区。开始投简历，石沉大海，没人理会，以至于我晚上一个人躲在厕所里偷偷的哭了，不敢出声，不想让闺蜜知道，担心影响她的心态。

大晚上的，我给黑叔发了一条微信：“能帮我看看简历并指导一下吗？谢谢！“

黑叔竟然回我了：“那你发过了来吧！”

过了几分钟，黑叔：“把学历-本科至前，毕业学校写最后，不要专门写是应届生，删掉，毕竟不是校招了，项目经验的就不要写烂大街的高仿XXX了。换个具体的项目名。然后找待遇低一点的公司投投看，反正你也没有实习经历，最好是那种最高都只能10k的，别看招聘写着一到三年经验，其实HR会给你机会的！”

我：“为什么？”

黑叔：“因为深圳一大批挣不到钱的小公司，有的甚至靠着融资维持生计，而且你价格低，有利于这类公司的长远发展。”

果然第二天上午投出去的简历，下午真有HR打电话给我约面试了。（我是海投，看见5-10k的区间就都投了一遍）

## offer到手

陆陆续续，约了六场面试，都是一些不知名的公司，我就不一一列举了，我拿到了一个offer。

我想分享来了，把我的经历讲给毕业还未找到工作的人听。

我每次去都会反问自己，妆画好了没有？出门头发洗了没有？面试时脸上有没有微笑？我要面试官留下好的印象，毕竟未来我可能是他的同事。

拿到这个offer，面试的场景还是历历在目。

面试地点是中国储能大厦XX楼，需要前台登记扫码进去，进去后我到了指定楼层，打电话给HR，HR给我安排了面试室，到了一杯水，我静静的等着的。过了数分钟，面试官敲了一下门，是一个胖胖的，有点油腻，胡子毛孔很粗的大哥，我礼貌的问了一声好。

面试开始了，面试官：”你简单介绍一下你自己？“

我：”我是...，省略几百字...“

面试官：“HTML5和CSS3有哪些新特性”

我：“HTML5新增有canvas，video和audio标签，其属性有autoplay/controls/height/loop/width/preload等，还有语义化标签，article/nav/header/section/aside/footer/hgroup等，还有表单控件，Type属性值的新增。CSS3新增有新选择器，过渡（transition），动画（animation），旋转（transform），flex， @media媒体查询，新文本属性，新边框属性，渐变属性等”

面试官：“那你说说你对Flex的使用”

我：“Flex有主轴和交叉轴，其属性有flex-direction，flex-wrap ，justify-content ，align-items ，align-content等，应用场景比如各类居中，或者左边固定，右边自适应。”

面试官：“那你随意挑一个，手写一下水平垂直居中或者左边固定，右边自适应的代码”

我从包，拿出笔，一分钟不到就写完了。

（以下是水平垂直居中的参考答案）

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

（以下是左侧宽度固定，右侧宽度自适应的参考答案）

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

面试官：“你做过移动端适配吗？原理是什么？”

我：“一般使用rem或vw进行适配，caniuse网站，显示rem支持性更好，rem适配的本质是通过动态设置html的font-size来改变大小，其随之而变，rem用于移动端网站，如门户网等，而vw用于简单的活动页，如邀请页等，vw+rem可结合使用，”

面试官：“移动端1px问题，你听说过吗？你之前是怎么解决的？”

我：“其实有很多种方法，媒体查询（dpr）+物理像素，使用1px的边框图片或者背景图片，伪类 + 媒体查询（dpr）+ transform:scale()，viewport + rem，box-shadow，postcss-write-svg插件等”

面试官：“你看过对vue能熟练使用吗？”

我：“能！”

面试官微微一笑：“我们这边是这样的，我们公司呢，现在是为商家提供活动服务的，以H5动画页面为主，管理系统为辅，如果你能够接受的话，我们继续下一面。”

我：“接受”

面试官：“你等等，我出去一趟。”

过了五分钟，HR来了，开始聊人生，聊规划，万变不离其宗就是为了那句“回家等通知”。

HR：“聊了这么多，已经七点了，我们这边已经下班一个小时，等我和面试官再沟通一下，明天给你回复，你先回去吧。”

我：“谢谢”，拿起我包，口水都讲干了，拖着疲惫的身子，和干饭人挤地铁回家，该死的死亡一号线。

第二天，电话打来了，HR：“给你定位的是初级前端，你是应届生，没什么经验，可以给到的薪资是6k，五险一金按3000是基数缴纳，朝九晚六，不加班，不知道你接不接受？”

我：“感谢你们的认可，可以让我考虑一天可以吗？”

HR：“可以的。”

## 虚心请教

考研失利，自学四个月，一个没有真实经验的应届女孩，我到底要不要接受这6k的offer呢？
