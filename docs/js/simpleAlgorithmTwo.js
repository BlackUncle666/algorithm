/**
 * 28. 实现 strStr()
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = (haystack, needle) => {
    const n = haystack.length, m = needle.length;
    for (let i = 0; i + m <= n; i++) {
        let flag = true;
        for (let j = 0; j < m; j++) {
            if (haystack[i + j] != needle[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            return i;
        }
    }
    return -1;
};


/**
 * 39. 组合总和
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = (candidates, target) => {
    const ans = [];
    const dfs = (target, combine, idx) => {
        if (idx === candidates.length) {
            return;
        }
        if (target === 0) {
            ans.push(combine);
            return;
        }
        // 直接跳过
        dfs(target, combine, idx + 1);
        // 选择当前数
        if (target - candidates[idx] >= 0) {
            dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
        }
    }
    dfs(target, [], 0);
    return ans;
};

/**
 * 40. 组合总和 II
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = (candidates, target) => {
    candidates.sort((a, b) => a - b)
    let ans = [];
    let backTracing = (start, path, sum) => {
        if (sum >= target) {
            if (sum === target) {
                ans.push(path.slice())
            }
            return
        }
        for (let i = start; i < candidates.length; i++) {
            if (i - 1 >= start && candidates[i - 1] == candidates[i]) {
                continue;
            }
            path.push(candidates[i])
            backTracing(i + 1, path, sum + candidates[i])
            path.pop()
        }
    }
    backTracing(0, [], 0)
    return ans
};


/**
 * 42. 接雨水
 * @param {number[]} height
 * @return {number}
 */
 const trap = height => {
    let count = 0;
    let [left, right] = [0, height.length - 1];
    let [leftMax, rightMax] = [0, 0];
    while (left < right) {
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        if (leftMax < rightMax) {
            count += leftMax - height[left++];
        } else {
            count += rightMax - height[right--];
        }
    }
    return count;
};