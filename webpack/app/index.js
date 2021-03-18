// import sum from './sum.js'
// sum()

let obj = {
  "name": "a",
  "left": {
    "name": "b",
    "left": {
      "name": "d"
    },
    "right": null
  },
  "right": {
    "name": "c",
    "left": null,
    "right": null
  }
}


// 非递归
let midStack = (root, array) => {
  const result = [];
  const stack = [];
  let last = null; // 标记上一个访问的节点
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack[stack.length - 1];
    if (!current.right || current.right == last) {
      current = stack.pop();
      result.push(current.val);
      last = current;
      current = null; // 继续弹栈
    } else {
      current = current.right;
    }
  }
  return result;
}
console.log(midStack(obj, []))
console.log(mid(obj, []))