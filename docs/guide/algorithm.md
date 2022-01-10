# 算法

## 冒泡排序
```
/*
第1次循环确定最大的
第n次循环确定第n大的
 */
function BubbleSort (arr) {
    const length = arr.length
    for (let i = 0; i < length; i++) {
        for (let j = 1; j < length-i; j++) {
            if (arr[j] < arr[j - 1]) {
                const temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = temp
            }
        }
    }
    return arr
}
```

## 选择排序
```
/*
 寻找第i小的数的位置，放到i位置上
 */
function SelectionSort (arr) {
    const length = arr.length
    for (let i = 0; i < length; i++ ) {
        let minIndex= i
        for (let j = i + 1; j < length; j++) {
            minIndex = arr[minIndex] <= arr[j] ? minIndex : j
        }
        if (minIndex !== i) {
            const temp = arr[i]
            arr[i] = arr[minIndex]
            arr[minIndex] = temp
        }
    }
    return arr
}
```

## 插入排序
```
const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
        let temp = array[i]
        let j = i - 1
        while (j >= 0 && array[j] > temp) {
            array[j + 1] = array[j]
            j--
        }
        array[j + 1] = temp
    }
    return array
}
```

## 快速排序
```
/*
在左边找大数，在右边找小数
交换
 */
function quickSort(arr) {
    const [pivot, ...rest] = arr;
    return [
        ...quickSort(rest.filter(item => item < pivot)),
        pivot,
        ...quickSort(rest.filter(item => item >= pivot))
    ]
}
```

## 实现斐波那契数列
```
function fib(n) {
  if (n < 2 && n >= 0) return n
  return fib(n - 1) + fib(n - 2)
}
fib(10)
```

## 二叉树的先序遍历
```
const preTraversal = (root) => {
    let result = []
    const preOrderTraverseNode = (node) => {
        if(node) {
            // 先根节点
            result.push(node.val)
            // 然后遍历左子树
            preOrderTraverseNode(node.left)
            // 再遍历右子树
            preOrderTraverseNode(node.right)
        }
    }
    preOrderTraverseNode(root)
    return result
}
```

## 二叉树的中序遍历
```
const midTraversal = (root) => {
    let result = []
    const midOrderTraverseNode = (node) => {
        if (node) {
            midOrderTraverseNode(node.left)
            result.push(node.val)
            midOrderTraverseNode(node.right)
        }
    }
    midOrderTraverseNode(root)
    return result
}
```

## 二叉树的后序遍历
```
const posTraversal = (root) => {
    let result = []
    const posOrderTraverseNode = (node) => {
        if (node) {
            posOrderTraverseNode(node.left)
            posOrderTraverseNode(node.right)
            result.push(node.val)
        }
    }
    posOrderTraverseNode(root)
    return result
}
```

## 最长递增子序列
```
function lis(n) {
  if (n.length === 0) return 0
  // 创建一个和参数相同大小的数组，并填充值为 1
  let array = new Array(n.length).fill(1)
  // 从索引 1 开始遍历，因为数组已经所有都填充为 1 了
  for (let i = 1; i < n.length; i++) {
    // 从索引 0 遍历到 i
    // 判断索引 i 上的值是否大于之前的值
    for (let j = 0; j < i; j++) {
      if (n[i] > n[j]) {
        array[i] = Math.max(array[i], 1 + array[j])
      }
    }
  }
  let res = 1
  for (let i = 0; i < array.length; i++) {
    res = Math.max(res, array[i])
  }
  return res
}
```

## 0-1背包问题
```
/**
 * @param {*} w 物品重量
 * @param {*} v 物品价值
 * @param {*} C 总容量
 * @returns
 */
function knapsack(w, v, C) {
  let length = w.length
  if (length === 0) return 0

  // 对照表格，生成的二维数组，第一维代表物品，第二维代表背包剩余容量
  // 第二维中的元素代表背包物品总价值
  let array = new Array(length).fill(new Array(C + 1).fill(null))

  // 完成底部子问题的解
  for (let i = 0; i <= C; i++) {
    // 对照表格第一行， array[0] 代表物品 1
    // i 代表剩余总容量
    // 当剩余总容量大于物品 1 的重量时，记录下背包物品总价值，否则价值为 0
    array[0][i] = i >= w[0] ? v[0] : 0
  }

  // 自底向上开始解决子问题，从物品 2 开始
  for (let i = 1; i < length; i++) {
    for (let j = 0; j <= C; j++) {
      // 这里求解子问题，分别为不放当前物品和放当前物品
      // 先求不放当前物品的背包总价值，这里的值也就是对应表格中上一行对应的值
      array[i][j] = array[i - 1][j]
      // 判断当前剩余容量是否可以放入当前物品
      if (j >= w[i]) {
        // 可以放入的话，就比大小
        // 放入当前物品和不放入当前物品，哪个背包总价值大
        array[i][j] = Math.max(array[i][j], v[i] + array[i - 1][j - w[i]])
      }
    }
  }
  return array[length - 1][C]
}
```
## 棒球比赛 682
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f43e2541755c42fa851564c63b24f5fb~tplv-k3u1fbpfcp-watermark.image)
```
/**
 * @param {string[]} ops
 * @return {number}
 */
const calPoints = (ops) => {
    let res = [];
    for (let i = 0; i < ops.length; i++) {
        switch (ops[i]) {
            case "C":
                res.pop();
                break;
            case "D":
                res.push(+res[res.length - 1] * 2);
                break;
            case "+":
                res.push(+res[res.length - 1] + +res[res.length - 2]);
                break;
            default:
                res.push(+ops[i]);
        }
    }
    return res.reduce((i, j) => i + j);
};
```

## 最大矩形 85
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cffd053f594421db6309632ba44392b~tplv-k3u1fbpfcp-watermark.image)
```
var maximalRectangle = function(matrix) {
    const m = matrix.length;
    if (m === 0) {
        return 0;
    }
    const n = matrix[0].length;
    const left = new Array(m).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === '1') {
                left[i][j] = (j === 0 ? 0 : left[i][j - 1]) + 1;
            }
        }
    }

    let ret = 0;
    for (let j = 0; j < n; j++) { // 对于每一列，使用基于柱状图的方法
        const up = new Array(m).fill(0);
        const down = new Array(m).fill(0);

        let stack = new Array();
        for (let i = 0; i < m; i++) {
            while (stack.length && left[stack[stack.length - 1]][j] >= left[i][j]) {
                stack.pop();
            }
            up[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
            stack.push(i);
        }
        stack = [];
        for (let i = m - 1; i >= 0; i--) {
            while (stack.length && left[stack[stack.length - 1]][j] >= left[i][j]) {
                stack.pop();
            }
            down[i] = stack.length === 0 ? m : stack[stack.length - 1];
            stack.push(i);
        }

        for (let i = 0; i < m; i++) {
            const height = down[i] - up[i] - 1;
            const area = height * left[i][j];
            ret = Math.max(ret, area);
        }
    }
    return ret;
};
```
## 设计循环队列 622
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0e64ff065034a3584c4a84f30df8cfb~tplv-k3u1fbpfcp-watermark.image)
```
/**循环队列 */
class MyCircularQueue {
    /**初始化队列容量 */
    constructor(capacity) {
        /**队列容量 */
        this.cap = capacity;
        /**队列头部 */
        this.head = -1;
        /**队列尾部 */
        this.tail = -1;
        /**数据源 */
        this.arr = [];
    }
    /**向循环队列插入一个元素 */
    enQueue(value) {
        if(this.isFull()){
            return false;
        }
        if (this.isEmpty()) {
            this.head = 0;
        }
        this.tail = (this.tail + 1) % this.cap;
        this.arr[this.tail] = value;
        return true;
    }
    /**从循环队列中删除一个元素 */
    deQueue() {
        if(this.isEmpty()){
            return false;
        }
        if(this.head == this.tail){
            this.head = this.tail = -1;
        }else{
            this.head = (this.head + 1) % this.cap;
        }
        return true;
    }
    /**从队首获取元素 */
    Front() {
        if (this.isEmpty()) {
            return -1;
        }
        return this.arr[this.head];
    }
    /**从队尾获取元素 */
    Rear() {
        if (this.isEmpty()) {
            return -1;
        }
        return this.arr[this.tail];
    }
    /**队列是否为空 */
    isEmpty() {
        return this.head == -1;
    }
    /**队列是否已满 */
    isFull() {
        return this.head == (this.tail + 1) % this.cap;
    }
}
```

## 排序链表 148
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7437c026868941078d26b0816d194e89~tplv-k3u1fbpfcp-watermark.image)
```
const merge = (head1, head2) => {
    const dummyHead = new ListNode(0);
    let temp = dummyHead, temp1 = head1, temp2 = head2;
    while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
            temp.next = temp1;
            temp1 = temp1.next;
        } else {
            temp.next = temp2;
            temp2 = temp2.next;
        }
        temp = temp.next;
    }
    if (temp1 !== null) {
        temp.next = temp1;
    } else if (temp2 !== null) {
        temp.next = temp2;
    }
    return dummyHead.next;
}

const toSortList = (head, tail) => {
    if (head === null) {
        return head;
    }
    if (head.next === tail) {
        head.next = null;
        return head;
    }
    let slow = head, fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }
    const mid = slow;
    return merge(toSortList(head, mid), toSortList(mid, tail));
}

var sortList = function(head) {
    return toSortList(head, null);
};
```

## 环形链表 141
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3be78887dd554dfe97dd0ba7254dcb44~tplv-k3u1fbpfcp-watermark.image)
```
// JSON.stringify(head) 秒杀法😃
// 除非不报错，报错就是有环！！
var hasCycle = function (head) {
    try {
        JSON.stringify(head)
    } catch{
        return true
    }
    return false
};
```
## 螺旋矩阵 54
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1de7ee952a7406f81e3fb3263cfc77c~tplv-k3u1fbpfcp-watermark.image)
![image.png](https://pic.leetcode-cn.com/42ee2ec6854ee79ac2b7c91259d2ad5db70522668d11fc691e9e14426918a666-image.png)
![image.png](https://pic.leetcode-cn.com/b9616323085f8cecbee4b9e4a42e8368d11e9a2ae971ce83e9830b719157959c-image.png)
```
var spiralOrder = function (matrix) {
  if (matrix.length === 0) return []
  const res = []
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1
  while (top < bottom && left < right) {
    for (let i = left; i < right; i++) res.push(matrix[top][i])   // 上层
    for (let i = top; i < bottom; i++) res.push(matrix[i][right]) // 右层
    for (let i = right; i > left; i--) res.push(matrix[bottom][i])// 下层
    for (let i = bottom; i > top; i--) res.push(matrix[i][left])  // 左层
    right--
    top++
    bottom--
    left++  // 四个边界同时收缩，进入内层
  }
  if (top === bottom) // 剩下一行，从左到右依次添加
    for (let i = left; i <= right; i++) res.push(matrix[top][i])
  else if (left === right) // 剩下一列，从上到下依次添加
    for (let i = top; i <= bottom; i++) res.push(matrix[i][left])
  return res
};
```

## 旋转图像 48
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44ca4d9d202b47cdba7ff337a5fafe68~tplv-k3u1fbpfcp-watermark.image)
- 使用辅助数组
```
var rotate = function(matrix) {
    const n = matrix.length;
    const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix_new[j][n - i - 1] = matrix[i][j];
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = matrix_new[i][j];
        }
    }
};
```

## 验证二叉搜索树 98
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/362ba849f5184f52adf5cc633bcdc64f~tplv-k3u1fbpfcp-watermark.image)
- 递归
```
const helper = (root, lower, upper) => {
    if (root === null) {
        return true;
    }
    if (root.val <= lower || root.val >= upper) {
        return false;
    }
    return helper(root.left, lower, root.val) && helper(root.right, root.val, upper);
}
var isValidBST = function(root) {
    return helper(root, -Infinity, Infinity);
};
```
## 根据字符出现频率排序 451
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c91cbd95a184aa2bf5978a7ae705770~tplv-k3u1fbpfcp-watermark.image)
```
var frequencySort = function(s) {
    const map = new Map();
    const length = s.length;
    for (let i = 0; i < length; i++) {
        const c = s[i];
        const frequency = (map.get(c) || 0) + 1;
        map.set(c, frequency);
    }
    const list = [...map.keys()];
    list.sort((a, b) => map.get(b) - map.get(a));
    const sb = [];
    const size = list.length;
    for (let i = 0; i < size; i++) {
        const c = list[i];
        const frequency = map.get(c);
        for (let j = 0; j < frequency; j++) {
            sb.push(c);
        }
    }
    return sb.join('');
};
```

## 超级丑数 313
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de273125b1484563b3d0786050076b91~tplv-k3u1fbpfcp-watermark.image)
```
var nthSuperUglyNumber = function(n, primes) {
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    const m = primes.length;
    const pointers = new Array(m).fill(1);
    for (let i = 2; i <= n; i++) {
        const nums = new Array(m).fill(m);
        let minNum = Number.MAX_SAFE_INTEGER;
        for (let j = 0; j < m; j++) {
            nums[j] = dp[pointers[j]] * primes[j];
            minNum = Math.min(minNum, nums[j]);
        }
        dp[i] = minNum;
        for (let j = 0; j < m; j++) {
            if (minNum == nums[j]) {
                pointers[j]++;
            }
        }
    }
    return dp[n];
};
```
## 买卖股票的最佳时机 121
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e02e9194c7284be9839f371c3b25c787~tplv-k3u1fbpfcp-watermark.image)
- 动态规划
```
const maxProfit = prices => {
    const len = prices.length;
    // 创建dp数组
    const dp = new Array(len).fill([0, 0]);
    // dp数组初始化
    dp[0] = [-prices[0], 0];
    for (let i = 1; i < len; i++) {
        // 更新dp[i]
        dp[i] = [
            Math.max(dp[i - 1][0], -prices[i]),
            Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0]),
        ];
    }
    return dp[len - 1][1];
};
```
- 贪心算法
```
const maxProfit = prices => {
    // 先定义第一天为最低价格
    let min = prices[0];
    // 利润
    let profit = 0;
    // 遍历数据
    for (let i = 1; i < prices.length; i++) {
        // 如果发现比最低价格还低的，更新最低价格
        min = Math.min(min, prices[i]);
        // 如果发现当前利润比之前高的，更新利润
        profit = Math.max(profit, prices[i] - min);
    }
    return profit;
};
```

## 柠檬水找零 860
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09efe624f4024ba793cdc90a8710146a~tplv-k3u1fbpfcp-watermark.image)
- 贪心算法
```
var lemonadeChange = function(bills) {
    let five = 0, ten = 0;
    for (const bill of bills) {
        if (bill === 5) {
            five += 1;
        } else if (bill === 10) {
            if (five === 0) {
                return false;
            }
            five -= 1;
            ten += 1;
        } else {
            if (five > 0 && ten > 0) {
                five -= 1;
                ten -= 1;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        }
    }
    return true;
};
```

## 不同路径 II 63
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba5a09751b194ccca78fb2fb5e2442e5~tplv-k3u1fbpfcp-watermark.image)
```
const uniquePathsWithObstacles = (obstacleGrid) => {
  if (obstacleGrid[0][0] == 1) return 0; // 出发点就被障碍堵住 
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  // dp数组初始化
  const dp = new Array(m);
  for (let i = 0; i < m; i++) dp[i] = new Array(n);
  // base case
  dp[0][0] = 1;                 // 终点就是出发点
  for (let i = 1; i < m; i++) { // 第一列其余的case
    dp[i][0] = obstacleGrid[i][0] == 1 || dp[i - 1][0] == 0 ? 0 : 1;
  }
  for (let i = 1; i < n; i++) { // 第一行其余的case
    dp[0][i] = obstacleGrid[0][i] == 1 || dp[0][i - 1] == 0 ? 0 : 1;
  }
  // 迭代
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = obstacleGrid[i][j] == 1 ?
        0 :
        dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1]; // 到达(m-1,n-1)的路径数
};
```

## K 站中转内最便宜的航班 787
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14b9ba150e9c458385c975bf6c989efb~tplv-k3u1fbpfcp-watermark.image)
```
暂无
```
## 反转字符串中的单词 557

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2bd59dfd5fe44dd810de5695662e25b~tplv-k3u1fbpfcp-watermark.image)
```
var reverseWords = function(s) {
    const ret = [];
    const length = s.length;
    let i = 0;
    while (i < length) {
        let start = i;
        while (i < length && s.charAt(i) != ' ') {
            i++;
        }
        for (let p = start; p < i; p++) {
            ret.push(s.charAt(start + i - 1 - p));
        }
        while (i < length && s.charAt(i) == ' ') {
            i++;
            ret.push(' ');
        }
    }
    return ret.join('');
};
```
## 计数二进制子串 696
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eed14bf9a1924ede917cb137a6f7f897~tplv-k3u1fbpfcp-watermark.image)

```
var countBinarySubstrings = function(s) {
    const counts = [];
    let ptr = 0, n = s.length;
    while (ptr < n) {
        const c = s.charAt(ptr);
        let count = 0;
        while (ptr < n && s.charAt(ptr) === c) {
            ++ptr;
            ++count;
        }
        counts.push(count);
    }
    let ans = 0;
    for (let i = 1; i < counts.length; ++i) {
        ans += Math.min(counts[i], counts[i - 1]);
    }
    return ans;
};
```


## 种花问题 605
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01c2a1eece7143059455834827372087~tplv-k3u1fbpfcp-watermark.image)

- 贪心
```
var canPlaceFlowers = function(flowerbed, n) {
    let count = 0;
    const m = flowerbed.length;
    let prev = -1;
    for (let i = 0; i < m; i++) {
        if (flowerbed[i] === 1) {
            if (prev < 0) {
                count += Math.floor(i / 2);
            } else {
                count += Math.floor((i - prev - 2) / 2);
            }
            prev = i;
        }
    }
    if (prev < 0) {
        count += (m + 1) / 2;
    } else {
        count += (m - prev - 1) / 2;
    }
    return count >= n;
};
```


## 格雷编码  89
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57227b25f02d48249951acb32da31dc5~tplv-k3u1fbpfcp-watermark.image)
```
/**
 * @param {number} n
 * @return {number[]}
 */
const grayCode = (num) => {
    // 递归函数，用来算输入为n的格雷编码序列
    const make = (num) => {
        if (num === 1) {
            return ['0', '1']
        } else {
            const pre = make(num - 1)
            let result = []
            const max = Math.pow(2, num) - 1
            for (let i = 0; i < pre.length; i++) {
                result[i] = `0${pre[i]}`
                result[max - i] = `1${pre[i]}`
            }
            return result
        }
    }
    return make(num).map((ele) => { return parseInt(ele, 2) })
}
```


## 电话号码的字母组合 17
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbbabce437ab4e0e886fe04cb40e5701~tplv-k3u1fbpfcp-watermark.image)
```
/**
 * @param {string} numStr
 * @return {string[]}
 */
const letterCombinations = (numStr) => {
    // 建立电话号码键盘映射
    const map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    // 把输入字符串按单字符分隔变成数组，234=>[2,3,4]
    let numArr = numStr.split('');
    // 保存键盘映射后的字母内容，如 23=>['abc','def']
    let keyArr = numArr.map(ele => {
        return map[ele]
    });
    if (numStr.length === 0) {
        return keyArr;
    }
    if (numStr.length === 1) {
        return keyArr.join().split('');
    }
    const combinationsHandler = (arr) => {
        // 临时变量用来保存前两个组合的结果
        let temp = [];
        // 最外层的循环是遍历第一个元素，里层的循环是遍历第二个元素
        for (let i = 0, iLength = arr[0].length; i < iLength; i++) {
            for (let j = 0, jLength = arr[1].length; j < jLength; j++) {
                temp.push(`${arr[0][i]}${arr[1][j]}`)
            }
        }
        arr.splice(0, 2, temp)
        return arr.length > 1 ? combinationsHandler(arr) : temp;
    }
    return combinationsHandler(keyArr)
}
```


## 卡牌分组 914
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca098ef76f9a4eb6b662228f382f6ced~tplv-k3u1fbpfcp-watermark.image)
```
/**
 * @param {number[]} cardArr
 * @return {boolean}
 */
const hasGroupsSizeX = function (cardArr) {
    // 最大公约数计算公式
    const gcd = (num1, num2) => {
        // 利用辗转相除法来计算最大公约数
        return num2 === 0 ? num1 : gcd(num2, num1 % num2)
    }
    // 相同牌出现次数Map
    let cardMap = new Map()
    cardArr.forEach(ele => {
        cardMap.set(ele, cardMap.has(ele) ? cardMap.get(ele) + 1 : 1)
    })
    // Map.protype.values()返回的是一个新的Iterator对象，所以可以使用扩展运算符(...)来构造成数组
    const numArr = [...cardMap.values()]
    let min = numArr[0]
    // 遍历出现次数，计算最大公约数
    numArr.forEach((ele) => {
        // 因为需要比较所有牌出现次数的最大公约数，故需要一个中间值
        min = gcd(min, ele)
    })
    // 判断是否满足题意
    return min > 1;
}
```

## 重复的子字符串 459
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a081c8fa9014a63bab69cb011e3b3f6~tplv-k3u1fbpfcp-watermark.image)
```
/**
 * @param {string} str
 * @return {boolean}
 */
const repeatedSubstringPattern = (str) => {
    var reg = /^(\w+)\1+$/
    return reg.test(str)
}
```
## 按奇偶排序数组 II  922

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85c4dfb3a418419ba8917ba603ed5fc1~tplv-k3u1fbpfcp-watermark.image)
```
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 const sortArrayByParityII = function (nums) {
    // 进行升序排序
    nums.sort()
    // 声明一个空数组用来存储奇偶排序后的数组
    let arr = []
    // 记录奇数、偶数位下标
    let odd = 1
    let even = 0
    // 对数组进行遍历
    nums.forEach(ele => {
        if (ele % 2 === 1) {
            arr[odd] = ele
            odd += 2
        } else {
            arr[even] = ele
            even += 2
        }
    })
    return arr
}
```
## 数组中的第K个最大元素  215
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dba3d57f8b3345aaa7b602b92b93e4fc~tplv-k3u1fbpfcp-watermark.image)
```
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = function(nums, k) {
    return nums.sort((a, b) => b - a)[k - 1]
};
```
## 最大间距 164
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2175d0c9dbd8485fa9dbd7e4ea6fbb07~tplv-k3u1fbpfcp-watermark.image)
```
/**
 * @param {number[]} numArr
 * @return {number}
 */
const maximumGap = (numArr) => {
    if (numArr.length < 2) return 0
    numArr.sort((a, b) => a - b)
    let max = 0
    for (let i = 0, l = numArr.length - 1; i < l; i++) {
        max = Math.max(max, numArr[i + 1] - numArr[i])
    }
    return max
}
```

## 缺失的第一个正数  41
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b4c3138cda64c7bbac9a8f06fa3e556~tplv-k3u1fbpfcp-watermark.image)
```
const firstMissingPositive = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    while (
      nums[i] >= 1 &&              
      nums[i] <= nums.length &&     // 对1~nums.length范围内的元素进行安排
      nums[nums[i] - 1] !== nums[i] // 已经出现在理想位置的，就不用交换
    ) {
      const temp = nums[nums[i] - 1]; // 交换
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }
  // 现在期待的是 [1,2,3,...]，如果遍历到不是放着该放的元素
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != i + 1) { 
      return i + 1;        
    }
  }
  return nums.length + 1; // 发现元素 1~nums.length 占满了数组，一个没缺
};
```

## 复原IP地址 93
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b4c6ffd3a134d3fa5845cb0c87cfc51~tplv-k3u1fbpfcp-watermark.image)
```
// 解题思路
// - 一个合法的 IP 地址必须为四段，即 x.x.x.x 的格式。
// - 所以可以用一个 p 表示当前 IP 的段数，p == 4 为结束条件。
// - 每当 p == 4 时，判断已经匹配的字符串长度是否和 s 的长度相等，如果相等则是正确答案。
// - 每个段的第一个字符如果是 0，说明这段已经结束了。
// - 如果 3 个字符串拼在一起大于 255，则必须放弃这段字符串。
// - 通过以上 5 个条件，我们可以用递归来做。

// 设 3 个变量：
// - start，表示已经匹配的字符串索引
// - p，表示已经有多少个段
// - path，已经匹配的字符串

/**
 * @param {string} s
 * @return {string[]}
 */
 var restoreIpAddresses = function(s) {
    const len = s.length
    if (len < 4 || len > 12) return []
    const result = []

    function dfs(start, p, path) {
        if (p == 4) {
            if (start == len) result.push(path)
            return 
        }

        let c = ''
        for (let i = start; i < start + 3; i++) {
            c += s[i]
            if (c > 255) break
            dfs(i + 1, p + 1, path + c + (p == 3? '' : '.'))
            if (s[start] == 0) break
        }
    }

    dfs(0, 0, '')
    return result
};
```

## 串联所有单词的子串  30
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2d5cc72435a49cabcee229a30fefecb~tplv-k3u1fbpfcp-watermark.image)
```
​/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    if (!words || !words.length) return[];
    let wordLen = words[0].length;
    let allWordsLen = wordLen * words.length;
    let ans = [], wordMap = {};
    for (let w of words) {
        wordMap[w] ? wordMap[w]++ :wordMap[w] = 1
    }
    for (let i = 0; i < s.length - allWordsLen + 1; i++) {
        let wm = Object.assign({}, wordMap);
        for (let j = i; j < i + allWordsLen - wordLen + 1; j += wordLen) {
            let w = s.slice(j, j + wordLen);
            if (wm[w]) {
                wm[w]--
            } else {
                break;
            }
        }
        if (Object.values(wm).every(n => n === 0)) ans.push(i);
    }
    return ans;
};
```
