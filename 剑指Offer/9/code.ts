// 两个栈实现一个队列， 由于js的数组具有 pop push shift unshift方法可以很简单的模拟栈的先进后出 和 队列的先进先出特点 所以限定只是用数组的push和pop用数组模拟栈


let stack1 = []
let stack2 = []
function deleteEle() {
  if(stack2.length == 0 && stack1.length == 0) {
    console.log('队列中没有元素')
    return
  }
  if (stack2.length == 0) {
    for(let item in stack1) {
      stack2.push(item)
    }
    stack1 = []
  }
  console.log(stack2)
}
function addELe (ele:number) {
  stack1.push(ele)
}

addELe(1)
addELe(1)
deleteEle()
