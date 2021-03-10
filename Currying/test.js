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
    let stack = [].concat(arr)
    let res = []
    while(stack.length > 0) {
      let item = stack.shift()
      console.log(item)
      if(Array.isArray(item)) {
        stack.unshift(...item)
      } else {
        res.push(item)
      }
    }
    return res
  }
  console.log(stackFlatten(flatArr))

  console.log([1,2,3, [4,5,[6,7]]].flat(Infinity))

function add1(arg1,arg2) {
  return [...arg1].concat(...arg2).reduce((result, item) => {
    return result + item
  })
}
function currying(fn, ...args) {
  console.log(fn.length)
  console.log(args.length)
  if(args.length >= fn.length) {
    return function(arg2) {
      currying(fn,...args,...arg2)
    }
  }
  return fn(...args)
}
console.log(currying(add1,1,2))

const curry = (f, args1 = []) => (...args2) => {
  const args = [ ...args1, ...args2 ]
  console.log(args)
  console.log(f.length)
  return f.length === args.length
  ? f(...args)
  : curry(f, args)
}
function add(...arg) {
  // console.log([...arg].length)
  return [...arg].reduce((result,item) => {return result+item})
}
// console.log(add(1,2,3))
let addCurry = curry(add)
console.log(addCurry(1)(2)(3))






console.log([1,2,3].reduce((result,item) => {return result+item}))




console.time('async')
console.timeLog('async')
setTimeout(() => {
  console.timeLog('async')
  console.timeEnd('async')
}, 1000);
console.log('1111')
console.timeLog('async')

console.log('2222')
console.timeLog('async')

console.log('3333')
console.timeLog('async')



/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var reverseTree = function(root) {
  if (root === null) return root
  let temp = root.left
  root.left = root.right
  root.right = temp
  reverseTree(root.left)
  reverseTree(root.right)
  return root
}



// 查找和为特定值的两个数

let arr = [1, 2, 4, 10, 3, 12, 9]

function twoSum(arr, target) {
  let Arrmap = {}
  let index = 0
  // for (let item in arr) {
  //   Arrmap[item] = index
  //   index++
  // }
  // for (let i = 0; i < arr.length; i++) {
  //   if (Arrmap[target - arr[i]]) {
  //     console.log([arr[i], target - arr[i]])
  //   }
  // }
  for (let i = 0; i < arr.length; i++) {
    if (Arrmap[target - arr[i]] > -1) {
      console.log(arr[i], target - arr[i])
    }
    Arrmap[arr[i]] = i
  }
}

twoSum(arr, 13)

// 查找和为特定值的三个数

function threeSum(arr, target) {
  arr.sort()
  for(let i = 0; i < arr.length; i++) {
    other = target - arr[i]
    for(let j = i + 1; j < arr.length; j++) {
      let k = arr.length - 1
      while(j < k && arr[j] + arr[k] > other) {
        k--
      }
      if (j == k) {
        break;
      }
      if (arr[j] + arr[k] == other) {
        console.log(arr[i], arr[j], arr[k])
      }
    }
  }
}
let arr = [1,2,3,4,5,6,7,8]
threeSum(arr, 12)

function threeSum(arr, target) {
  arr.sort()
  for(let i = 0; i< arr.length; i++) {
    other = target - arr[i]
    for(let j = arr.length - 1; j > i; j--) {
      let k = i + 1
      while (k < j && arr[k] + arr[j] < other) {
        k++
      }
      if (k == j) {
        break;
      }
      if (arr[k] + arr[j] === other) {
        console.log(arr[i], arr[k], arr[j])
      }
    }
  }
}


// git 655
function git655(tree) {
  if (tree == null) return []
  let dep = getDep(tree)
  function getDep(tree) {
    let res = 1
    if (tree.left) {
      return res + getDep(tree.left)
    }else if (tree.right) {
      return res + getDep(tree.right)
    } else {
      return res
    }
  }
  let result = []
  for(let i = 0; i < dep; i++) {
    result.push(Array(Math.pow(2,dep) -1).fill(""))
  }
  // 广度搜索
  function bfs(tree, d, pos) {
    result[d][pos] = tree.val
    if (tree.left) {
      bfs(tree.left, d+1, pos - Math.pow(2, d+1))
    }
    if(tree.right) {
      bfs(tree.left, d+1, pos + Math.pow(2, d+1))
    }
  }
  bfs(tree, 0, (Math.pow(2, dep)/2) -1)
  return result
}

// 

// 柯里化
function currying() {
  let arg = [...arguments]
  let tempFun = function () {
    arg.push(...arguments)
    return tempFun
  }
  tempFun.toString = function() {
    return arg.reduce((pre, cur) => pre+cur)
  }
  return tempFun
}
console.log(currying(1)(2))