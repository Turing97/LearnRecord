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
      // if(Array.isArray(item)) {
      //   res = res.concat(traverseFlatten(item))
      // } else {
      //   res = res.concat(item)
      // }
      res = res.concat(Array.isArray(item) ? traverseFlatten(item) : item)
  })
  return res
}
  // console.log(traverseFlatten(flatArr))
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
  console.log(stackFlatten(flatArr))

  console.log([1,2,3, [4,5,[6,7]]].flat(Infinity))