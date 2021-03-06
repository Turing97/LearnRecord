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
function BFS(item: Array<object>) {
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
console.log(BFS(data))

interface child {
  name: string,
  child?: Array<child>
}
// 非递归实现
function BFSStack(item: Array<child>) {
  let result: Array<string> = []
  let stack: Array<child> = item
  while (stack.length > 0) {
    let child = stack.pop()
    result.push(child.name)

  }
  return result
}