## ECMAScript and JavaScript
**简单来说，ECMAScript是标准，JavaScript是实现**
ECMAScript是一个标准，遵从此标准的语言有很多，比如JavaScript, CoffeeScript等等
ECMAScript晚于JavaScript出现，是JavaScript申请标准化后制定的



## js使用方法
生成一个递增数组
**ES6:**
Array.from(new Array(10).keys())



## 函数扁平化

```js
  let arr = [1,2,3]
  arr.reduce((result, item) => {
    return result + item
  },0)
  let flatArr = [1, 2, [3, 4]]

  // 通过reduce扁平化数组
  function flatten(arr) {
    return arr.reduce((result, item)=> {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
  }

  // 通过split方法 针对数字数组比较好
  function splitFlatten(arr) {
    // 这里的toString()也可以使用join方法代替，（join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。--MDN）
    return arr.toString().split(',').map(item => Number(item))
  }


  // 遍历数组
  function traverseFlatten(arr) {
      let res = []
      arr.forEach(item => {
        if(Array.isArray(item)) {
          res = res.concat(traverseFlatten(item))
        } else {
          res.push(item)
        }
        // res = res.concat(Array.isArray(item) ? traverseFlatten(item) : item)

    })
    return res
  }
  // 扩展运算符
  [].concat(...array)

  // ES6中添加的新方法 flat(param) 参数为数组深度，不传参默认则为1.可以传入Infinity将任意维度的数组转化为一维数组
  [1,2,3, [4,5,[6,7]]].flat(Infinity)

  // 通过栈的思想
  function stackFlatten(arr) {
    let stack = arr
    let res = []
    while(stack.length) {
      let item = stack.shift()
      if(Array.isArray(item)) {
        stack.unshift(item)
      } else {
        res.push(item)
      }
    }
    return res
  }
```
