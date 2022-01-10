# ES6+

## let和const 与var的区别
- 块级作用域
```
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
    console.log(n);   //  10 内层的n
  }
  console.log(n);   //  5 当前层的n
}
```
- 不存在变量提升，出现暂时性死区
```
var tmp = 123;   //  声明
if (true) {
  tmp = 'abc';   //  报错 因为本区域有tmp声明变量
  let tmp;   //  绑定if这个块级的作用域 不能出现tmp变量
}
```
- 不可重复声明
- let / const声明的全局变量不会挂在顶层对象上
- const必须马上赋值
- const声明后不能改

## 箭头函数与普通函数的区别
- 箭头函数没有自己的this，箭头函数中this的指向在它在定义时已经确定了，之后不会改变。函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替
- 不可以使用yield命令，因此箭头函数不能用作Generator函数

## Class类
```
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);   //  调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString();   //  调用父类的toString()
  }
}
```

## 模板字符串

## 解构赋值

## 扩展运算符

## 对象简写

## Promise
- 各类方法
```
Promise.prototype.then() 
Promise.prototype.catch() 
Promise.prototype.finally() 
Promise.all() 
Promise.race() 
Promise.allSettled() 
Promise.any() 
Promise.resolve() 
Promise.reject() 
Promise.try()
```
- 基本用法
```
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
- Promise 是ES6提供的一种异步解决方案，比回调函数更加清晰明了
- Promise 翻译过来就是承诺的意思，这个承诺会在未来有一个确切的答复，并且该承诺有三种状态，分别是等待中（pending）/ 完成了 （resolved）/ 拒绝了（rejected）
- 这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了，也就是说一旦状态变为 resolved 后，就不能再次改变
```
new Promise((resolve, reject) => {
  resolve('success')
  // 无效
  reject('reject')
})
```
- 当我们在构造 Promise 的时候，构造函数内部的代码是立即执行的
```
new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('finifsh')
// new Promise -> finifsh
```
- Promise 实现了链式调用，也就是说每次调用 then 之后返回的都是一个 Promise，并且是一个全新的 Promise，原因也是因为状态不可变。如果你在 then 中 使用了 return，那么 return 的值会被 Promise.resolve() 包装
```
Promise.resolve(1)
  .then(res => {
    console.log(res) // => 1
    return 2 // 包装成 Promise.resolve(2)
  })
  .then(res => {
    console.log(res) // => 2
  })
```
- 当然了，Promise 也很好地解决了回调地狱的问题，例如：
```
ajax(url, () => {
    // 处理逻辑
    ajax(url1, () => {
        // 处理逻辑
        ajax(url2, () => {
            // 处理逻辑
        })
    })
})
可以改写成：
ajax(url)
  .then(res => {
      console.log(res)
      return ajax(url1)
  }).then(res => {
      console.log(res)
      return ajax(url2)
  }).then(res => console.log(res))
```
- Promise上有all()，race()，resolve()，reject()，allSettled(ES2020)，any(ES2021)方法，Promise.try()，Promise的原型上有then()，catch()，finally()方法
- 手写Promise
```
const PENDING = 'PENDING';      // 进行中
const FULFILLED = 'FULFILLED';  // 已成功
const REJECTED = 'REJECTED';    // 已失败

class Promise {
  constructor(exector) {
    // 初始化状态
    this.status = PENDING;
    // 将成功、失败结果放在this上，便于then、catch访问
    this.value = undefined;
    this.reason = undefined;
    // 成功态回调函数队列
    this.onFulfilledCallbacks = [];
    // 失败态回调函数队列
    this.onRejectedCallbacks = [];

    const resolve = value => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 成功态函数依次执行
        this.onFulfilledCallbacks.forEach(fn => fn(this.value));
      }
    }
    const reject = reason => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 失败态函数依次执行
        this.onRejectedCallbacks.forEach(fn => fn(this.reason))
      }
    }
    try {
      // 立即执行executor
      // 把内部的resolve和reject传入executor，用户可调用resolve和reject
      exector(resolve, reject);
    } catch(e) {
      // executor执行出错，将错误内容reject抛出去
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function'? onRejected:
      reason => { throw new Error(reason instanceof Error ? reason.message:reason) }
    // 保存this
    const self = this;
    return new Promise((resolve, reject) => {
      if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          // try捕获错误
          try {
            // 模拟微任务
            setTimeout(() => {
              const result = onFulfilled(self.value);
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              result instanceof Promise ? result.then(resolve, reject) : resolve(result);
            })
          } catch(e) {
            reject(e);
          }
        });
        self.onRejectedCallbacks.push(() => {
          // 以下同理
          try {
            setTimeout(() => {
              const result = onRejected(self.reason);
              // 不同点：此时是reject
              result instanceof Promise ? result.then(resolve, reject) : reject(result);
            })
          } catch(e) {
            reject(e);
          }
        })
      } else if (self.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(self.value);
            result instanceof Promise ? result.then(resolve, reject) : resolve(result);
          });
        } catch(e) {
          reject(e);
        }
      } else if (self.status === REJECTED){
        try {
          setTimeout(() => {
            const result = onRejected(self.reason);
            result instanceof Promise ? result.then(resolve, reject) : reject(result);
          })
        } catch(e) {
          reject(e);
        }
      }
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  static resolve(value) {
    if (value instanceof Promise) {
      // 如果是Promise实例，直接返回
      return value;
    } else {
      // 如果不是Promise实例，返回一个新的Promise对象，状态为FULFILLED
      return new Promise((resolve, reject) => resolve(value));
    }
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }
}
```

## 模块（Module）
- 谈谈CommenJS和ES6的module？

## 属性的简洁表示法

## async 和 await
- Promise可以解决回调地狱的问题，Promise的语法糖async/await解决链式调用问题。 原理就是利用 Generator 函数的语法糖。然后我们使用一个函数让其自迭代，每一个yield 用 promise 包裹起来。返回值是 Promise，执行下一步的时机由 promise 来控制
- async => * await => yield
```
// 基本用法
async function timeout (ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)    
  })
}
async function asyncConsole (value, ms) {
  await timeout(ms)
  console.log(value)
}
asyncConsole('hello async and await', 1000)
```

## 迭代器（Iterator） 和 for...of
- 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。 
- 原生具备 Iterator 接口的数据结构如下
```
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象
```
- 与for in 的区别
  - 一个是遍历key，一个式遍历value
  - 具有iterator接口，就可以用for...of循环遍历它的成员，对于普通的对象，for...of 结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。
  - 补充：只能遍历可枚举的，不可枚举的用Object.getOwnPropertyNames()

## Set 和 Map 数据结构
- 和WeakSet、WeakMap的区别
  - Set：ES6 新增的一种新的数据结构，类似于数组，但成员是唯一且无序的，没有重复的值
  - Map：本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键
  - WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别
    - 首先，WeakSet 的成员只能是对象，而不能是其他类型的值
    - 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
  - WeakMap结构与Map结构类似，也是用于生成键值对的集合
    - 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
    - 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制
  - 有哪些方法
    - Set有constructor，size，has(value)，add(value)，delete(value)，clear()，keys()，values()，entries()，forEach()
    - Map有size，set(key,value)，get(key)，has(key)，delete(key)，clear()，keys()，values()，entries()，forEach()
- 与传统对象的区别
  - 传统对象只能字符串作为key

## Proxy
- Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。

## Reflect
- Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与 Proxy 的方法相同。Reflect不是一个函数对象，因此它是不可构造的
- Reflect 的用途
```
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```

- Proxy跟Reflect是非常完美的配合
```
const observe = (data, callback) => {
      return new Proxy(data, {
            get(target, key) {
                return Reflect.get(target, key)
            },
            set(target, key, value, proxy) {
                  callback(key, value);
                  target[key] = value;
                  return Reflect.set(target, key, value, proxy)
            }
      })
}

const FooBar = { open: false };
const FooBarObserver = observe(FooBar, (property, value) => {
  property === 'open' && value 
          ? console.log('FooBar is open!!!') 
          : console.log('keep waiting');
});
console.log(FooBarObserver.open) // false
FooBarObserver.open = true // FooBar is open!!!
```

- 当然也不是什么都可以被代理的，如果对象带有configurable: false 跟writable: false 属性，则代理失效

## Symbol
- 一种新的原始数据类型Symbol，表示独一无二的值

## 函数的扩展
- 函数参数的默认值 
- rest参数（只能是最后一个参数）
- 严格模式（ES5开始，函数内部可以设定为严格模式，ES6只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。）
- name属性
- 箭头函数
- 尾调用优化（就是指某个函数的最后一步是调用另一个函数，即调用栈优化）
- 函数参数的尾逗号（ES2017 允许函数的最后一个参数有尾逗号）
- catch命令的参数省略（以前明确要求catch命令后面必须跟参数，接受try代码块抛出的错误对象，ES2019做出了改变，允许catch语句省略参数）
```
try {
  // ...
} catch {
  // ...
}
```

## 数组的扩展
- 扩展运算符
- Array.from()
``` 
let arr = Array.from({
  0: '1',
  1: '2',
  2: 3,
  length: 3
});
console.log(); // ['1', '2', 3]
```
- Array.of()
```
console.log(Array.of(1, '2', true)); // [1, '2', true]
```
- 数组实例的 copyWithin(target,start,end)（将指定位置的成员复制到其他位置，会覆盖原有成员，然后返回当前数组）
- 数组实例的 find() 和 findIndex()，参数为函数
- 数组实例的 fill() 
- 数组实例的 entries()，keys() 和 values()
- 数组实例的 includes()
- 数组实例的 flat()，flatMap()
- 数组的空位 Array.prototype.sort() 的排序稳定性

## 对象的扩展
- 属性名表达式
- 方法的name属性
- 属性的可枚举性和遍历（Object.getOwnPropertyDescriptor(obj, key)方法可以获取该属性的描述对象）
- super关键字（指向当前对象的原型对象）
```
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```
- 对象的扩展运算符
- 链判断运算符
- Object.fromEntries()
- Object.is()
```
Object.is({q:1},{q:1});  // false

Object.is(+0,-0);  //false
+0 === -0  //true

//二是NaN等于本身
Object.is(NaN,NaN); //true
NaN === NaN  //false
```
- Object.assign()
- __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf() 
- Object.keys()，Object.values()，Object.entries()

## 生成器（Generator）
- Generator 是 ES6中新增的语法，和 Promise 一样，都可以用来异步编程
- 使用 * 表示这是一个 Generator 函数，内部可以通过 yield 暂停代码，通过调用 next 恢复执行
- 从以下代码可以发现，加上 *的函数执行后拥有了 next 函数，也就是说函数执行后返回了一个对象。每次调用 next 函数可以继续执行被暂停的代码。
```
function* test() {
  let a = 1 + 2;
  yield 2;
  yield 3;
}
let b = test();
console.log(b.next()); // >  { value: 2, done: false }
console.log(b.next()); // >  { value: 3, done: false }
console.log(b.next()); // >  { value: undefined, done: true }
```
- 以下是 Generator 函数的简单实现
```
// cb 也就是编译过的 test 函数
function generator(cb) {
  return (function() {
    var object = {
      next: 0,
      stop: function() {}
    };
    return {
      next: function() {
        var ret = cb(object);
        if (ret === undefined) return { value: undefined, done: true };
        return {
          value: ret,
          done: false
        };
      }
    };
  })();
}
// 如果你使用 babel 编译后可以发现 test 函数变成了这样
function test() {
  var a;
  return generator(function(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        // 可以发现通过 yield 将代码分割成几块
        // 每次执行 next 函数就执行一块代码
        // 并且表明下次需要执行哪块代码
        case 0:
          a = 1 + 2;
          _context.next = 4;
          return 2;
        case 4:
          _context.next = 6;
          return 3;
		    // 执行完毕
        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}
```