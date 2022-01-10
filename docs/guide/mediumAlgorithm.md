# leetcode（1/2/3/4/5/6/7/8/9/10）

## 1. 两数之和
```
/**
 * 两数之和算法
 * array 数据
 * target 目标和
 */
const twoSum = (array, target) => {
    let map = new Map()
    for (let index = 0; index < array.length; index++) {
        let num = target - array[index]
        if (map.has(num)) {
            return [map.get(num), index]
        } else {
            map.set(array[index], index)
        }
    }
}
```