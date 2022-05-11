# leetcode（77）

## 77. 组合
![](../pic/simpleAlgorithmFour/combine.png)
```
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = (n, k) => {
    const ans = [];
    const dfs = (cur, n, k, temp) => {
        // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
        if (temp.length + (n - cur + 1) < k) {
            return;
        }
        // 记录合法的答案
        if (temp.length == k) {
            ans.push(temp);
            return;
        }
        // 考虑选择当前位置
        dfs(cur + 1, n, k, [...temp, cur]);
        // 考虑不选择当前位置
        dfs(cur + 1, n, k, temp);
    }
    dfs(1, n, k, []);
    return ans;
};
```

## 78. 子集
![](../pic/simpleAlgorithmFour/subsets.png)
```
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = (nums) => {
    const t = [];
    const ans = [];
    const n = nums.length;
    const dfs = (cur) => {
        if (cur === nums.length) {
            ans.push(t.slice());
            return;
        }
        t.push(nums[cur]);
        dfs(cur + 1, nums);
        t.pop(t.length - 1);
        dfs(cur + 1, nums);
    }
    dfs(0, nums);
    return ans;
};
```

## 88. 合并两个有序数组
![](../pic/simpleAlgorithmFour/merge.png)
```
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = (nums1, m, nums2, n) => {
    nums1.splice(m, nums1.length - m, ...nums2);
    nums1.sort((a, b) => a - b);
};
```