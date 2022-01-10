# 重点算法
## 判断链表是否有环
```
// 给每个已遍历过的节点加标志位，遍历链表，当出现下一个节点已被标志时，则证明单链表有环
let hasCycle = function (head) {
  while (head) {
    if (head.flag) return true;
    head.flag = true;
    head = head.next;
  }
  return false;
};
```

## 两数之和 1
```
const twoSum = function (array, target) {
    let map = new Map()
    for (let i = 0; i < array.length; i++) {
        const element = target - array[i];
        if (map.has(element)) {
            return [map.get(element), i]
        } else {
            map.set(array[i], i)
        }
    }
}
```


## 字符串相加
```
var addStrings = function(num1, num2) {
    let i = num1.length - 1, j = num2.length - 1, add = 0;
    const ans = [];
    while (i >= 0 || j >= 0 || add != 0) {
        const x = i >= 0 ? num1.charAt(i) - '0' : 0;
        const y = j >= 0 ? num2.charAt(j) - '0' : 0;
        const result = x + y + add;
        ans.push(result % 10);
        add = Math.floor(result / 10);
        i -= 1;
        j -= 1;
    }
    return ans.reverse().join('');
};
```

## 计算多个数组的交集
```
const getIntersection = (...arrs) => {
    return Array.from(
        new Set(
            arrs.reduce((total, arr) => {
                return arr.filter((item) => total.includes(item));
            })
        )
    );
};
```

## 用两个栈实现队列
```
// 栈后进先出，队列先进先出
// 双栈可以实现序列倒置：假设有 stack1=[1, 2, 3] 、 stack2=[] ，如果循环出栈 stack1 并将出栈元素进栈 stack2 ，则循环结束后， stack1=[] 、 stack2=[3, 2, 1] ，即通过 stack2 实现了 stack1 中元素的倒置
// 当需要删除队首元素时，仅仅需要 stack2 出栈即可；当 stack2 为空时，出队就需要将 stack1 元素倒置倒 stack2 ， stack2 再出队即可；如果 stack1 也为空，即队列中没有元素，返回 -1

const CQueue = function () {
    this.stack1 = [];
    this.stack2 = [];
};
CQueue.prototype.appendTail = function (value) {
    this.stack1.push(value);
};
CQueue.prototype.deleteHead = function () {
    if (this.stack2.length) {
        return this.stack2.pop();
    }
    if (!this.stack1.length) return -1;
    while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
    }
    return this.stack2.pop();
};
```

## 二叉树的最大深度
```
// 深度优先遍历--递归模式
function TreeDepth(node) {
    // 最大深度等于左子树或者右子树的最大值加1
    return !node
        ? 0
        : Math.max(TreeDepth(node.left), TreeDepth(node.right)) + 1;
}
```

## 爬楼梯问题 70
```
// 定义子问题 如果用 dp[n] 表示第 n 级台阶的方案数，并且由题目知：最后一步可能迈 2 个台阶，也可迈 1 个台阶，即第 n 级台阶的方案数等于第 n-1 级台阶的方案数加上第 n-2 级台阶的方案数
// 实现需要反复执行解决的子子问题部分 dp[n] = dp[n−1] + dp[n−2]
// 识别并求解出边界条件 // 第 0 级 1 种方案 dp[0]=1 // 第 1 级也是 1 种方案 dp[1]=1

let climbStairs = function (n) {
    let dp = [1, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};
```
## 全排列 46
```
var permute = function (nums) {
  // 结果集
  let res = [];
  // 路径
  let path = [];
  // 路径：记录在path中
  // 选择列表：nums中不存在于pah的那些元素
  // 结束条件：nums中的元素全都path中出现
  let dfs = (nums, path) => {
    if (path.length == nums.length) {
      return res.push(path.concat());
    }
    for (let i = 0; i < nums.length; i++) {
      // 排除不合法的选择
      if (path.indexOf(nums[i]) > -1) {
        continue;
      }
      // 做选择
      path.push(nums[i]);
      // 进入下层决策树
      dfs(nums, path);
      // 取消选择
      path.pop();
    }
  };
  dfs(nums, path);
  return res;
};


// 补充
// 现有规格：
// const type = ['男装', '女装']
// const color = ['黑色', '白色']
// const size = ['S', 'L']

// 得到的结果为:
// [
//     ['男装', '黑色', 'S'],
//     ['男装', '黑色', 'L'],
//     ...
// ]

function combine(...lists) {
    let res = [];
    function dfs(depth, select, lists) {
        if (depth === lists.length) {
            res.push(select);
            return;
        }
        for (let i = 0; i < lists[depth].length; i++) {
            select.push(lists[depth][i]);
            dfs(depth + 1, select.slice(0), lists);
            select.pop();
        }
    }
    dfs(0, [], lists);
    return res;
}
```

## 三数之和
```
var threeSum = function(nums) {
  // 最左侧值为定值，右侧所有值进行两边推进计算
  let res = [];
  nums.sort((a, b) => a - b);
  let size = nums.length;
  if (nums[0] <= 0 && nums[size - 1] >= 0) {
    // 保证有正数负数
    let i = 0;
    while (i < size - 2) {
      if (nums[i] > 0) break; // 最左侧大于0，无解
      let first = i + 1;
      let last = size - 1;
      while (first < last) {
        if (nums[i] * nums[last] > 0) break; // 三数同符号，无解
        let sum = nums[i] + nums[first] + nums[last];
        if (sum === 0) {
          res.push([nums[i], nums[first], nums[last]]);
        }
        if (sum <= 0) {
          // 负数过小，first右移
          while (nums[first] === nums[++first]) {} // 重复值跳过
        } else {
          while (nums[last] === nums[--last]) {} // 重复值跳过
        }
      }
      while (nums[i] === nums[++i]) {}
    }
  }

  return res;
};
```

## 反转链表 206
```
var reverseList = function (head) {
    let prev = null;
    cur = head;
    while (cur) {
        const next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
};
```

## 二分查找 704
```
var search = function(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((high - low) / 2) + low;
        const num = nums[mid];
        if (num === target) {
            return mid;
        } else if (num > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
};

```

##  统计字符串中相同字符出现的次数
```

```

## 找出字符串中连续出现最多的字符和个数
```
// 统计字符串中的连续重复 ['a','b','c','aa','k','j','bb']

function replate(str) {
    const arr = str.match(/(\w)\1*/gi); // w字符出现1次或多次 ['a':2,'c':3];
    //   const maxLen = Math.max(...arr.map(x => x.length));
    return arr.reduce((prev, curr) => {
        if (curr.length === Math.max(...arr.map((x) => x.length))) {
            // 取其中一个值就好了 'aa' -- curr[0] {a: 'aa'.length}
            prev[curr[0]] = curr.length;
        }
        return prev;
    }, {});
}
```

## 合并2个有序数组 88
```
var merge = function(nums1, m, nums2, n) {
    nums1.splice(m, nums1.length - m, ...nums2);
    nums1.sort((a, b) => a - b);
};
// nums1 、 nums2 有序，若把 nums2 全部合并到 nums1 ，则合并后的 nums1 长度为 m+n
//   我们可以从下标 m+n-1 的位置填充 nums1 ，比较 nums1[len1] 与 nums2[len2] 的大小，将最大值写入 nums1[len]，即
//   nums1[len1]>=nums2[len2] ，nums1[len--] = nums1[len1--] ,这里 -- 是因为写入成功后，下标自动建议，继续往前比较
//   否则 nums1[len--] = nums2[len2--]
// 边界条件：
//   若 len1 < 0 ，即 len2 >= 0 ，此时 nums1 已重写入， nums2 还未合并完，仅仅需要将 nums2 的剩余元素（0…len）写入 nums2 即可，写入后，合并完成
//   若 len2 < 0，此时 nums2 已全部合并到 nums1 ，合并完成

var arr1 = [2, 5, 6, 3];
var arr2 = [1, 6, 4, 3, 0];
const merge = function (nums1, m, nums2, n) {
    let len1 = m - 1,
        len2 = n - 1,
        len = m + n - 1;
    while (len2 >= 0) {
        if (len1 < 0) {
            nums1[len--] = nums2[len2--];
            continue;
        }
        nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
    }
    return nums1;
};
console.log(merge(arr1, 4, arr2, 5));
```

