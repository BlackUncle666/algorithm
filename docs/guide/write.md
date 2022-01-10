# 常见源码

## 节流
```
function throttle(fn, delay) {
  var prevTime = Date.now();
  return function() {
    var curTime = Date.now();
    if (curTime - prevTime > delay) {
      fn.apply(this, arguments);
      prevTime = curTime;
    }
  };
}
// 使用
var throtteScroll = throttle(function() {
  console.log('throtte');
}, 1000);
window.onscroll = throtteScroll;
```

## 防抖
```
function debounce(func, wait) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
// 使用
window.onscroll = debounce(function() {
  console.log('debounce');
}, 1000);
```

## bind 实现
```
Function.prototype.mybind = function () {
  // this指向调用call的对象（即函数）
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  // obj 第一个参数 ...args 第二个及以后的参数
  let [obj, ...args1] = [...arguments];
  return (...args2) => {
    obj = obj || window;
    // 声明一个Symbol属性，防止fn被占用
    const fn = Symbol('fn');
    // 将 调用call的对象（即函数） 赋值给 obj的fn属性
    obj[fn] = this;
    // 执行该fn属性
    const result = obj[fn](...args1.concat(args2));
    // 删除该属性
    delete obj[fn];
    // 返回函数执行结果
    return result;
  }
};

function testFn() {
  console.log(this.name);
  return arguments
}
console.log(testFn.mybind({ name: '黑叔' }, '黑叔001', '黑叔002')());
```

## call 实现
```
Function.prototype.mycall = function () {
  // this指向调用call的对象（即函数）
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  // obj 第一个参数 ...args 第二个及以后的参数
  let [obj, ...args] = [...arguments];
  obj = obj || window;
  // 声明一个Symbol属性，防止fn被占用
  const fn = Symbol('fn');
  // 将 调用call的对象（即函数） 赋值给 obj的fn属性
  obj[fn] = this;
  // 执行该fn属性
  const result = obj[fn](...args);
  // 删除该属性
  delete obj[fn];
  // 返回函数执行结果
  return result;
}
function testFn() {
  console.log(this.name);
  return arguments
}
console.log(testFn.mycall({ name: '黑叔' }, '黑叔001', '黑叔002'));
```

## apply 实现
```
Function.prototype.myapply = function() {
  // this指向调用call的对象（即函数）
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  // obj 第一个参数 args 第二个参数
  let [obj, args] = [...arguments];
  obj = obj || window;
  // 声明一个Symbol属性，防止fn被占用
  const fn = Symbol('fn');
  // 将 调用call的对象（即函数） 赋值给 obj的fn属性
  obj[fn] = this;
  // 执行该fn属性
  const result = obj[fn](args);
  // 删除该属性
  delete obj[fn];
  // 返回函数执行结果
  return result;
};

function testFn() {
  console.log(this.name);
  return arguments
}
console.log(testFn.myapply({ name: '黑叔' }, ['黑叔001', '黑叔002']));
```

## new做了什么及实现
- 创建一个空的实例对象
- 取得外部传入的构造器，把空的实例对象和构造函数通过原型链连接起来
- 将构造函数的this指向实例对象（其中有返回值）
- 如果返回值不是对象，则输出实例对象，如果是，则输出该返回值
```
function myNew() {
  // 创建一个空的实例对象
  var obj = {};
  // 取得外部传入的构造器，把空的实例对象和构造函数通过原型链连接起来
  var Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  // 将构造函数的this指向实例对象（其中有返回值）
  var ret = Constructor.apply(obj, arguments);
  // 如果返回值不是对象，则输出实例对象，如果是，则输出该返回值
  return typeof ret === 'object' && ret !== null ? ret : obj;
}
```

## class 实现继承
使用寄生组合继承的方式
- 原型链继承，使子类可以调用父类原型上的方法和属性
- 借用构造函数继承，可以实现向父类传参
- 寄生继承，创造干净的没有构造方法的函数，用来寄生父类的 prototype
```
// 实现继承，通过继承父类 prototype
function __extends(child, parent) {
  // 修改对象原型
  Object.setPrototypeOf(child, parent);
  // 寄生继承，创建一个干净的构造函数，用于继承父类的 prototype
  // 这样做的好处是，修改子类的 prototype 不会影响父类的 prototype
  function __() {
    // 修正 constructor 指向子类
    this.constructor = child;
  }
  // 原型继承，继承父类原型属性，但是无法向父类构造函数传参
  child.prototype =
    parent === null
      ? Object.create(parent)
      : ((__.prototype = parent.prototype), new __());
}

var B = (function() {
  function B(opt) {
    this.name = opt.name;
  }
  return B;
})();

var A = (function(_super) {
  __extends(A, _super);
  function A() {
    // 借用继承，可以实现向父类传参, 使用 super 可以向父类传参
    return (_super !== null && _super.apply(this, { name: 'B' })) || this;
  }
  return A;
})(B);
```

## 函数柯里化实现
```
let curry = (fn, ...args) =>
  fn.length > args.length ?
    (...arguments) => curry(fn, ...args, ...arguments) :
    fn(...args)
const sum = (a, b, c, d) => a + b + c + d;
const currySum = curry(sum);
console.log(currySum(1)(2)(3)(4));
console.log(currySum(1, 2)(3)(4));
console.log(currySum(1)(2, 3)(4));
```

## Object.create 原理(粗略版)
```
function create(proto) {
    function Fn() {};
    Fn.prototype = proto;
    Fn.prototype.constructor = Fn;
    return new Fn();
}
```

## async/await 实现
- 异步迭代，模拟异步函数
```
function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    // 将返回值promise化
    return new Promise(function(resolve, reject) {
      // 获取迭代器实例
      var gen = fn.apply(self, args);
      // 执行下一步
      function _next(value) {
        asyncGeneratorStep(
          gen, 
          resolve, 
          reject, 
          _next, 
          _throw, 
          'next', 
          value
        );
      }
      // 抛出异常
      function _throw(err) {
        asyncGeneratorStep(
          gen, 
          resolve, 
          reject, 
          _next, 
          _throw, 
          'throw', 
          err
        );
      }
      // 第一次触发
      _next(undefined);
    });
  };
}
```
- 执行迭代步骤，处理下次迭代结果
```
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    // 迭代器完成
    resolve(value);
  } else {
    // -- 这行代码就是精髓 --
    // 将所有值promise化
    // 比如 yield 1
    // const a = Promise.resolve(1) a 是一个 promise
    // const b = Promise.resolve(a) b 是一个 promise
    // 可以做到统一 promise 输出
    // 当 promise 执行完之后再执行下一步
    // 递归调用 next 函数，直到 done == true
    Promise.resolve(value).then(_next, _throw);
  }
}
```

## Array.isArray 实现
```
Array.myIsArray = function(o) {
  return Object.prototype.toString.call(Object(o)) === '[object Array]';
};

console.log(Array.myIsArray([])); // true
```

## instanceof 实现
原理：L的__proto__是不是等于R.prototype，不等于再找L.__proto__.__proto__直到__proto__为null
```
// L 表示左表达式，R 表示右表达式
function instance_of(L, R) {
  var O = R.prototype;
  var L = L.__proto__;
  while (true) {
    if (L === null) return false;
    // 这里重点：当 O 严格等于 L 时，返回 true
    if (O === L) return true;
    L = L.__proto__;
  }
}
```

## 实现一个双向绑定
- defineProperty 版本
```
// 数据
const data = {
  text: 'default'
};
const input = document.getElementById('input');
const span = document.getElementById('span');
// 数据劫持
Object.defineProperty(data, 'text', {
  // 数据变化 --> 修改视图
  set(newVal) {
    input.value = newVal;
    span.innerHTML = newVal;
  }
});
// 视图更改 --> 数据变化
input.addEventListener('keyup', function(e) {
  data.text = e.target.value;
});
```

- proxy 版本
```
// 数据
const data = {
  text: 'default'
};
const input = document.getElementById('input');
const span = document.getElementById('span');
// 数据劫持
const handler = {
  set(target, key, value) {
    target[key] = value;
    // 数据变化 --> 修改视图
    input.value = value;
    span.innerHTML = value;
    return value;
  }
};
const proxy = new Proxy(data, handler);

// 视图更改 --> 数据变化
input.addEventListener('keyup', function(e) {
  proxy.text = e.target.value;
});
```

## 深浅拷贝
- 深拷贝
  - JSON.parse(JSON.stringify(object))局限性
    - 会忽略 undefined
    - 不能序列化函数
    - 不能解决循环引用的对象
  - lodash函数库实现深拷贝
  - 如何解决循环引用
    - 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题
  - 实现
```
function deepCopy(ori) {
  const type = getType(ori);
  let copy;
  switch (type) {
    case 'array':
      return copyArray(ori, type, copy);
    case 'object':
      return copyObject(ori, type, copy);
    case 'function':
      return copyFunction(ori, type, copy);
    default:
      return ori;
  }
}

function copyArray(ori, type, copy = []) {
  for (const [index, value] of ori.entries()) {
    copy[index] = deepCopy(value);
  }
  return copy;
}

function copyObject(ori, type, copy = {}) {
  for (const [key, value] of Object.entries(ori)) {
    copy[key] = deepCopy(value);
  }
  return copy;
}

function copyFunction(ori, type, copy = () => {}) {
  const fun = eval(ori.toString());
  fun.prototype = ori.prototype
  return fun
}
```
- 浅拷贝
  - Object.assign
  - 展开运算符（…）
