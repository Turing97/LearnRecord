const data = [
  {
    name: 'total',
    children: [
      {
        name: 'a',
        children: [
          {
            name: 'a1',
            children: [
              {
                name: 'a11'
              },
              {
                name: 'a12'
              }
            ]
          },
          {
            name: 'a2'
          }
        ]
      },
      {
        name: 'b',
        children: [
          {
            name: 'b1'
          },
          {
            name: 'b2',
            children: [
              {
                name: 'b21'
              },
              {
                name: 'b22'
              }
            ]
          }
        ]
      }
    ]
  }
]
// // 深度遍历, 使用递归
// function getName(data) {
//   const result = [];
//   data.forEach(item => {
//       const map = data => {
//           result.push(data.name);
//           data.children && data.children.forEach(child => map(child));
//       }
//       map(item);
//   })
//   return result.join(',');
// }

// console.log(getName(data));
// //  a,a1,a11,a12,a2,a21,a22,a3,a31,a32,b,b1,b11,b12,b2,b21,b22,b3,b31,b32

// 递归实现
function DFS(item: Array<object>) {
  let result = []
  item.forEach(child => {
    let mapItem = (item1) => {
      result.push(item1.name)
      item1.children && item1.children.forEach(element => {
        mapItem(element)
      });

    }
    mapItem(child)
  });
  return result.join(',')
}
// console.log(DFS(data))

interface child {
  name: string,
  children?: Array<child>
}
// 非递归实现
function DFSStack(item: Array<child>) {
  let result: Array<string> = []
  let stack: Array<child> = item
  while (stack.length > 0) {
    let child = stack.pop()
    result.push(child.name)
    child.children && stack.push(...child.children.reverse())
  }
  return result.join(',')
}
// console.log(DFSStack(data))





// 非递归实现
function BFSStack(item: Array<child>) {
  let result: Array<string> = []
  let queue: Array<child> = item
  while (queue.length > 0) {
    let child = queue.shift()
    result.push(child.name)
    child.children && queue.push(...child.children)
  }
  return result.join(',')
}
console.log(BFSStack(data))

// 回溯法 ： 字母大小写全排列
let str = 'a21d'

function allStr(str) {
  let result = []
  let traverse = (res, pre, str, index) => {
    if(index === str.length) {
      res.push(pre)
      // return res
    } else {
      if(/\d/.test(str[index])) {
        traverse(res, pre + str[index], str, index + 1)
      } else {
        // let pre = pre + str[index].toLowerCase()
        // console.log(str)
        traverse(res, pre + str[index].toLowerCase(), str, index + 1)
        // pre = pre + str[index].toUpperCase()
        // console.log(str[index].toUpperCase())
        traverse(res, pre + str[index].toUpperCase(), str, index + 1)
      }
    }
  }
  traverse(result, '', str,0)
  console.log(result)
  return result
}
allStr(str)


// 全排列问题 求[1,2,3]的全排列

function fullPos(arr, res) {
  
  if (arr.length <= 2) {
    res.push([arr[0], arr[1]])
    res.push([arr[1], arr[0]])
    return res
  } else {
    arr.forEach((element) => {
      res.push(element)
      res = fullPos(arr.filter(item => item != element), res.concat([element]))
      return res
    });
  }
  return res
}
console.log(fullPos([1,2,3], []))