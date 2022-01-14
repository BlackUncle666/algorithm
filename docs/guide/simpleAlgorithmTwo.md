# leetcode（1/3/5/7/9/12/17/20/28）

## 1. 两数之和
![](../pic/simpleAlgorithmOne/twoSum.png)
```
/**
 * 两数之和算法
 * @param {array} array 
 * @param {number} target 
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