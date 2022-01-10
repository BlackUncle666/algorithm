# Vue

## Vue中的key到底有什么用
key是为Vue中的vnode标记的唯一id，通过这个key，我们的diff操作可以更准确、更快速。diff算法的过程中，先会进行新旧节点的首尾交叉对比，当无法匹配的时候，会用新节点的key与旧节点进行比对，然后找出差异

##  Computed 和 Watch 的区别
- computed 计算属性，watch 侦听器
- Computed支持缓存，只有依赖的数据发生了变化，才会重新计算
- Watch有两个的参数immediate和deep

## 你对MVVM的理解
- Model 代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑
- View 代表UI 组件，它负责将数据模型转化成UI 展现出来
- ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View和 Model的对象，连接Model和View的桥梁

## 响应式数据的理解
- defineReactive函数里面使用了Object.defineProperty
```
function defineReactive (obj,key,val) {
    Object.defineProperty(obj,key,{
        enumerable: true,
        configurable: true,
        get: function () {
            return val;
        },
        set: function (newVal) {
            //判断新值与旧值是否相等
            //判断的后半段是为了验证新值与旧值都为NaN的情况  NaN不等于自身
            if(newVal === val || (newVal !== newVal && value !== value)){
                return ;
            }
            val = newVal;
        }
    });
}
```

- Dep构造函数负责依赖收集（depend方法+subs数组）和派发更新（notify方法）
```
class Dep {
    constructor(){
        //订阅的信息
        this.subs = [];
    }

    addSub(sub){
        this.subs.push(sub);
    }

    removeSub (sub) {
        remove(this.subs, sub);
    }

    //此方法的作用等同于 this.subs.push(Watcher);
    depend(){
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }
    //这个方法就是发布通知了 告诉你 有改变啦
    notify(){
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
          subs[i].update();
        }
    }
}
Dep.target = null;
```

## 如何实现监听数组变化的
Vue 中解决这个问题的方法，是将数组的常用方法进行重写，通过包装之后的数组方法就能够去在调用的时候被监听到
```
// 让 arrExtend 先继承 Array 本身的所有属性
const arrExtend = Object.create(Array.prototype)
const arrMethods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
/**
 * arrExtend 作为一个拦截对象, 对其中的方法进行重写
 */
arrMethods.forEach(method => {
  const oldMethod = Array.prototype[method]
  const newMethod = function(...args) {
    oldMethod.apply(this, args)
    console.log(`${method}方法被执行了`)
  }
  arrExtend[method] = newMethod
})

export default {
  arrExtend
}
```

## 模板编译原理
- 通过parseHTML方法生成AST树
- 再通过optimize方法进行优化
- 最后codegen将优化后的AST树转换为可执行的代码

## 父子组件生命周期的执行顺序
- 编译时，放到mergeOption数组
- 父beforeCreate-> 父created -> 父beforeMounted -> 子beforeCreate-> 子created -> 子beforeMounted -> 子mounted -> 父mounted

## mixin 和 mixins 区别
- mixin 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的
- mixins 应该是我们最常使用的扩展组件的方式

## vue中的nextTick
- 在下次dom更新结束之后执行异步回调，可用于获取更新后的dom状态
- 先判断能否使用setImmediate，不能的话使用MessageChannel，最后使用setTimeout

## 为什么虚拟dom会提高性能
虚拟dom相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能

## DOM Diff
深度优先遍历 + 双指针

## 组件通信
- 父子组件通信
  - 父->子props，子->父 $on、$emit
  - 获取父子组件实例 $parent、$children
  - Ref 获取实例的方式调用组件的属性或者方法
- 兄弟组件通信
  - Event Bus 实现跨组件通信 Vue.prototype.$bus = new Vue
  - Vuex
- 跨多层级组件通信
  - Vuex
  - $attrs、$listeners
  - provide、inject

## data为什么是函数
如果data是对象的话，对象属于引用类型，会影响到所有的实例，避免全局污染

## v-if和v-show的区别
当条件不成立时，v-if不会渲染DOM元素，v-show操作的是样式(display)，切换当前DOM的显示和隐藏

## 修饰符有哪些
capture/once/passive/stop/self/prevent

## 如何理解自定义指令
- 生成AST语法树
- genDirective生成指令代码放在数组里
- 渲染时，bind方法调用

## 插槽（slot）
- 普通插槽 子组件渲染
- 作用域插槽 父组件渲染

## 内置组件
- component
- transition
- transition-group
- keep-alive
- slot

## keep-alive
- keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载
- 常用的两个属性include/exclude，允许组件有条件的进行缓存
- 两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态
- keep-alive的中还运用了LRU(Least Recently Used)最少最近使用算法

## 前端路由（vue-router）
- 原理
  - 前端路由实现起来其实很简单，hash路由本质就是onhashchange事件监听URL的变化，然后匹配路由规则，而history是由于HTML5 history新增了两个API:history.pushState和history.replaceState
- 模式
  - hash
  - history
    - 通过back(), forward(), go()等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作。
- 使用
```
this.$router.push()
<router-link to=""></router-link>
```
- $route和$router的区别
  - $route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数
  - 而$router是“路由实例”对象包括了路由的跳转方法，钩子函数等
- 导航守卫
  - 全局守卫
    - 全局前置守卫 router.beforeEach((to,from,next)=>{}) （判断是否登录了，没登录就跳转到登录页）
    - 全局后置钩子 router.afterEach((to,from)=>{})（跳转之后滚动条回到顶部）
  - 组件内的守卫 beforeRouteEnter:(to,from,next)=>{}
  - 路由独享的守卫 beforeEnter:(to,from,next)=>{}
#### 路由传参中params和query的区别
- 前者在浏览器地址栏中显示参数，后者则不显示，query刷新不会丢失query里面的数据 params刷新会丢失 params里面的数据。
## vuex
- state: 状态中心
- mutations: 更改状态（同步函数）
- actions: 更改状态（同步和异步函数均可）
  - 当组件进行数据修改的时候我们需要调用dispatch来触发actions里面的方法。actions里面的每个方法中都会有一个commit方法，当方法执行的时候会通过commit来触发mutations里面的方法进行数据的修改。mutations里面的每个函数都会有一个state参数，这样就可以在mutations里面进行state的数据修改，当数据修改完毕后，会传导给页面。页面的数据也会发生改变
- getters: 从基本数据派生出来的数据
- modules: 将state分成多个modules，便于管理

## v-for优先于v-if

## vue3和vue2的区别
- vue2和vue3双向数据绑定原理发生了改变
- 新加入了 TypeScript 以及 PWA 的支持
- vue3对比vue2具有明显的性能提升（打包大小减少41%，初次渲染快55%，更新快133%，内存使用减少54%）
- vue3具有的composition API实现逻辑模块化和重用
- 增加了新特性，如Teleport组件，全局API的修改和优化等
## vue和react的区别
- react
  - 生命周期
  - setState是异步的
  - HOC（高阶组件）
- vue双向数据绑定，而react是setState
- jsx，对于初学者，react上手慢

## Vue3.0新特性以及使用经验总结
- Composition API
  - setup(props, context)
  - reactive、ref 与 toRefs
  - 生命周期钩子(Vue2.x 中的beforeDestroy名称变更成beforeUnmount; destroyed 更为 unmounted，beforeCreate和created被setup替换了)
  - 自定义 Hooks
- 响应式（Proxy）
  - Object.defineProperty只能劫持对象的属性， 而 Proxy 是直接代理对象
  - Object.defineProperty对新增属性需要手动进行Observe，需要使用$set才能保证新增的属性也是响应式的
- Teleport（将它们嵌套在另一个内部）
- Suspense（Suspense 只是一个带插槽的组件，只是它的插槽指定了default 和 fallback 两种状态）
- Fragment（可以直接写多个根节点）
- 部分变更详情见链接（https://juejin.cn/post/6940454764421316644）