# TypeScript

## 类型声明
- 数字类型
  - number
```ts
let a: number;
a = '10086';//报错，但还是可以编译成功js运行的
```

```ts
let a = 10086;
a =‘10086’；//在ts文件里面会报错
```

- 布尔类型
  - boolean
- 字符串类型
  - string
- null类型
  - null
- undefined类型
  - undefined
- 符号类型
  - 关键字为 symbol
- void类型
  - 表示没有类型或空类型
- never类型
  - never
- 任意值类型
  - 关键字为 any
- 类型安全的any
  - unknown
- 对象类型
  - object
```ts
// 声明一个值为对象字面量
let man = { name: 'joye', age: 30 };

// 等价于
let man: { name: string; age: number } = { name: 'joye', age: 30 };
```
- 数组类型
  - T[]
```ts
let a: number[];

let b: Array<number>;
```
- 元组类型
  - [T0, T1, ...]
```ts
let a: [number, string];
```
- 函数类型
  - let fn: () => void;

## 函数定义
```ts
function sum(a: number, b: number): number {
    return a + b
}
```

## 可选参数
```ts
function test(a: number, b?: number): void {
    // ...
}
```

## 枚举类型
```ts
enum Direction {
    Up,   // 值默认为 0
    Down, // 值默认为 1
    Left, // 值默认为 2
    Right // 值默认为 3
}
```

## 交叉类型
```ts
// T1 & T2 & ...
```

## 联合类型
```ts
// T1 | T2 | ...
```

## keyof关键字
```ts
let a: keyof 10086;
```

## type关键字 / 别名
```ts
type a = string | number;
let data: a = 123;
```

## interface关键字 / 接口类型
```ts
// 定义接口类型Person
interface Person {
    name: string;
    age: number;
}

// 声明变量 man 为 Person 接口类型
let man: Person = { name: 'joye', age: 30 };
```

## class关键字 / 类类型
```ts
// 定义类
class TypeA {
    // ...
}

// 声明TypeA类型
let a: TypeA;
// 赋值TypeA类型
a = new TypeA();
```

## 构造器类型
```ts
// new (p1: T1, p2: T2, ...) => T

class TypeA {
    constructor(name: string) {
        // ...
    }
}

// 变量b为构造器类型，和类TypeA的构造器兼容
let b: new (name: string) => TypeA;
b = TypeA;
// b现在是一个类
new b('type');
```

## 泛型语法
- 泛型函数
```ts
// 定义泛型函数，类型变量为T
// T接下来在"参数、返回值、变量"定义中可以作为类型使用
function identity<T>(m: T): T {
    // T 注解了函数内部的变量定义
    let n: T = m;
    return n;
}

// 调用泛型函数，此时用string类型替换类型变量 T
// identity<string> 作为一个整体相当于一个函数名
let m: string = identity<string>('hello world');
```

- 泛型类
```ts
// 定义泛型类，包含两个类型变量
class Identity<T1, T2> {
    attr1: T1;
    attr2: T2;
    show(m: T1, n: T2): T2 {
        return n;
    }
}

// 用真实类型替换泛型类的类型变量
// Identity<string, number>作为一个整体相当于一个类名
let a: Identity<string, number>;
// 初始化变量a
a = new Identity<string, number>();
// T1=>string，T1被替换为string，属性attr1为字符串类型
a.attr1 = 'hello';
// T2=>number，T2被替换为number，属性attr2位数字类型
a.attr2 = 99;

// 错误，类型不匹配
// error TS2322: Type '"good"' is not assignable to type 'number'
a.attr2 = 'good';
```

## 类型推论
```ts
```
