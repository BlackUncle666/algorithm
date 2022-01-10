# JS基础
## 闭包
- 含义：闭包就是能够读取其他函数内部的变量
- 优点：可以避免全局变量的污染
- 缺点：闭包的变量不会被回收
```
function outer(){
    var a=666;
    function inner(){
        console.log(a);
    }
    return inner;
}
```

## 作用域
- 作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问
- 简单的说，作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期

## 原型链
- 谈谈你对原型链的理解
- 经典题目
```
function Foo(){
    getName = function(){
        console.log(1);
    };
    return this;
} 

Foo.getName = function(){
    console.log(2);
}
Foo.prototype.getName = function(){
    console.log(3);
}
var getName = function(){
    console.log(4);
}
function getName(){
    console.log(5);
}
//输出以下的输出结果
//函数Foo的静态方法
Foo.getName();//2

//function getName有提前声明的规则，声明后被var getName= 。。覆盖，则getName为4
getName();//4

//Foo()的return this为window，window.getName 在Foo里面被覆盖，则输出1
Foo().getName();//1

//同上，因调用了Foo();window的getName被覆盖
getName();//1

//依然只是调用了Foo对象上的getName,又因为Foo.getNname，所以相当于
/**
 *  function a(){console.log(2)};
 *  new a();
 * **/
new Foo.getName();//2

//先执行了new Foo()；返回一个对象，这个对象的getName为prototype上的getName,相当于(new Foo()).getName();
new Foo().getName();//3

new new Foo().getName();//3
```

## ajax
```
/** 1. 创建连接 **/
var xhr = new XMLHttpRequest()
/** 2. 连接服务器 **/
xhr.open('get', url, true)
/** 3. 发送请求 **/
xhr.send(null);
/** 4. 接受请求 **/
xhr.onreadystatechange = function(){
	if(xhr.readyState === 4 && xhr.status === 200){
		success(xhr.responseText);
	} else { 
		/** false **/
		fail && fail(xhr.status);
	}
}
```

## 事件流
- 三个阶段：捕获阶段（capturing）、目标阶段（targeting）、冒泡阶段（bubbling）
- 阻止冒泡：在W3c中，使用stopPropagation()方法；在IE下设置cancelBubble = true
- 阻止捕获：阻止事件的默认行为，例如click - a标签后的跳转。在W3c中，使用preventDefault()方法，在IE下设置window.event.returnValue = false

## 判断是否是数组
```
var a = []; 
// 1.基于instanceof 
a instanceof Array; 
// 2.基于constructor 
a.constructor === Array; 
// 3.基于Object.prototype.isPrototypeOf 
Array.prototype.isPrototypeOf(a); 
// 4.基于getPrototypeOf 
Object.getPrototypeOf(a) === Array.prototype; 
// 5.基于Object.prototype.toString 
Object.prototype.toString.apply(a) === '[object Array]';
// 6.ES6 (原理同第五点)
Array.isArray(a); // => true 
Array.isArray({0: 'a', length: 1}); // => false
```

## defer与async的区别
- async: 加载后立即执行，两者下载的过程不会阻塞 DOM,但执行会
- defer: 与 async 的区别在于,脚本需要等到文档解析后（ DOMContentLoaded 事件前）执行

## 事件委托
- 减少事件注册，节约内存
- 实现当新增子对象时无需再次对其绑定
```
<ul id="ul"></ul>
<script>
    let ul = document.querySelector('#ul')
    ul.addEventListener('click', (event) => {
        console.log(event.target);
    })
</script>
```

## 数组常用方法
- map: 遍历数组，返回回调返回值组成的新数组
- forEach: 无法break，可以用try/catch中throw new Error来停止
- filter: 过滤
- some: 有一项返回true，则整体为true
- every: 有一项返回false，则整体为false
- join: 通过指定连接符生成字符串
- push / pop: 末尾新增和删除，改变原数组， 返回新增/删除项
- unshift / shift: 头部新增和删除，改变原数组，返回操作项
- sort(fn) / reverse: 排序与反转，改变原数组
- concat: 连接数组，不影响原数组， 浅拷贝
- slice(start, end): 返回截断后的新数组，不改变原数组
- splice(start, number, value...): 返回删除元素组成的数组，value为插入项，改变原数组
- indexOf / lastIndexOf(value, fromIndex): 查找数组项，返回对应的下标
- reduce / reduceRight(fn(prev, cur)， defaultPrev): 两两执行，prev 为上次化简函数的return值，cur为当前值(从第二项开始)
- Array.from() 转为真数组
- Array.of() 将一组值转换为数组
- copyWithin()
- find() 和 findIndex() 找出第一个符合条件的数组成员或下标
- fill() 填充
- entries()，keys() 和 values()
- includes() 返回一个布尔值，表示某个数组是否包含给定的值
- flat()，flatMap() 数组扁平化
## 作用域
- 函数作用域：指在函数内声明的所有变量在函数体内始终是可见的，可以在整个函数的范围内使用及复用
- 块级作用域：指在变量声明的代码段之外是不可见的。参考：ES6的let以及const
- 词法作用域：指函数在定义它们的作用域里运行，而不是在执行它们的作用域里运行.而JavaScript采用的就是词法作用域，也称为静态作用域

## 执行上下文
- 它包含三个部分
  - 变量对象(VO)
  - 作用域链(词法作用域) 
  - this指向
- 它的类型
  - 全局执行上下文
  - 函数执行上下文
  - eval执行上下文
- 代码执行过程
  - 创建 全局上下文 (global EC)
  - 全局执行上下文 (caller) 逐行 自上而下 执行。遇到函数时，函数执行上下文 (callee) 被push到执行栈顶层
  - 函数执行上下文被激活，成为 active EC, 开始执行函数中的代码，caller 被挂起
  - 函数执行完后，callee 被pop移除出执行栈，控制权交还全局上下文 (caller)，继续执行

## 内存泄漏的情况
- 定义
  - 程序中己动态分配的堆内存由于某种原因程序未释放或无法释放引发的各种问题
- 结果
  - 崩溃，延迟大等
- 原因
  - 全局变量
  - dom清空时，还存在引用
  - 使用闭包
  - 定时器未清除
  - 子元素存在引起的内存泄露
- 避免策略
  - 减少不必要的全局变量，或者生命周期较长的对象，及时对无用的数据进行垃圾回收
  - 注意程序逻辑，避免“死循环”之类的
  - 避免创建过多的对象 原则：不用了的东西要及时归还
  - 减少层级过多的引用

## callee和caller的作用
- caller是返回一个对函数的引用，该函数调用了当前函数
- callee是返回正在被执行的function函数，也就是所指定的function对象的正文

## eval的作用
- 它的功能是把对应的字符串解析成JS代码并运行
- 应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）
- 由JSON字符串转换为JSON对象的时候可以用eval，var obj =eval('('+ str +')')

## 谈谈对CommonJS,AMD,CMD,ES6 Module的理解
| 模块       | 场景 |         作用 |
| :--------- | :--: | -----------: |
| CommonJS      |  Node.js  |     CommonJS是对模块的浅拷⻉，同步加载模块,在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，会出现堵塞情况，所以不适用。CommonJS的风格通过对module.exports或exports的属性赋值来达到暴露模块对象 |
| ES6 Module   |  ES6  |   ES6 Module是对模块的引⽤，即ES6 Module只存只读，不能改变其值，一个模块就是一个独立的文件，该文件内部的所有变量，外部无法改变。两个命令：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能 |
| AMD |  require.js  | 采用异步方式加载模块，需要定义回调define方式，require.js实现AMD规范的模块化 |
| CMD |  sea.js  | CMD与AMD类似，但不同点在于：AMD推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。sea.js实现CMD规范的模块化 |

## 三大家族(offset、scroll、client)
- offsetWidth/offsetHeight
  - 返回值包含content + padding + border，效果与e.getBoundingClientRect()相同
- clientWidth/clientHeight
  - 返回值只包含content + padding，如果有滚动条，也不包含滚动条
- scrollWidth/scrollHeight
  - 返回值包含content + padding + 溢出内容的尺寸

## null和undefined的区别
- null是空值
- undefined是没有值

## 判断变量的几种方式，有哪些不同
| 模块       | 场景 | 
| :--------- | :--: | 
| typeof | typeOf能判断出一个变量的类型，但是只能判断出number,string,function,boolean,undefined,null和其他对象类型返回结果都为object | 
| instanceof | instanceof能判断出一个对象是否是另一个类的实例 | 
| Object.prototype.toString.call | Object.prototype.toString.call能判断出所有变量的类型，返回值为[Object ***] | 

## dom 操作有哪些 api
- 创建新节点
```
createDocumentFragment()    //创建一个DOM片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
```
- 添加、移除、替换、插入
```
appendChild()      //添加
removeChild()      //移除
replaceChild()      //替换
insertBefore()      //插入
```
- 查找
```
getElementsByTagName()    //通过标签名称
getElementsByName()     //通过元素的Name属性的值
getElementById()        //通过元素Id，唯一性
```

## 数组去重
- Array.from(new Set(arr))
- [...new Set(arr)]
- splice()
- indexOf()
- includes()
- Map()
- Sort()

## 数组扁平化
- 普通递归
```
/* ES6 */
const flatten = (arr) => {
  let result = [];
  arr.forEach((item, i, arr) => {
    if (Array.isArray(item)) {
	  result = result.concat(flatten(item));
	  // result.push(...flatten(ele))
    } else {
      result.push(arr[i])
    }
  })
  return result;
};
```
- toString
```
/* ES6 */
const flatten = (arr) => arr.toString().split(',');
```
- reduce
```
function flatten(arr){
  return arr.reduce(function(prev, cur){
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
```
- some + 展开运算符
```
function flatten(arr){
  while(arr.some(item => Array.isArray(item))){
    arr = [].concat(...arr);
  }
  return arr;
}
```
- ES2019 新增了 Array.prototype.flat 方法，可以直接扁平化，还能任意指定层数

- some + [].concat.apply
```
/* ES6 */
const flatten = (arr) => {
  while (arr.some(item => Array.isArray(item))){
    arr = [].concat.apply([], arr);
  }
  return arr;
}
```

## this指向
- 1
```
var name = "windowsName";
function a() {
    var name = "Cherry";
    console.log(this.name);          // windowsName
    console.log("inner:" + this);    // inner: Window
}
a();
console.log("outer:" + this)         // outer: Window
```

- 2
```
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        console.log(this.name);      // Cherry
    }
}
a.fn();
```

- 3
```
var name = "windowsName";
var a = {
  // name: "Cherry",
  fn: function () {
    console.log(this.name);      // undefined
  }
}
window.a.fn();
```

- 4
```
var name = "windowsName";
var a = {
  name: null,
  // name: "Cherry",
  fn: function () {
    console.log(this.name);      // windowsName
  }
}
var f = a.fn;
f();
```

- 5
```
var name = "windowsName";
function fn() {
    var name = 'Cherry';
    innerFunction();
    function innerFunction() {
        console.log(this.name);      // windowsName
    }
}
fn()
```

- 改变 this 的指向
  - 使用 ES6 的箭头函数
  - 在函数内部使用 _this = this
  - 使用 apply、call、bind
  - new 实例化一个对象