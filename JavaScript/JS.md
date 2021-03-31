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



## 原型链
每个构造函数(constructor)都有一个原型对象(prototype),原型对象都包含一个指向构造函数的指针,而实例(instance)都包含一个指向原型对象的内部指针.

创建函数对象
Function Animal() {}
let Dog = new(Animal)

Dog._proto_ = Animal.prototype
Animal.prototype._proto_ = Object.prototype
~~~mermaid
graph LR;
  Dog--_proto_-->Animal.prototype
  Dog--constructor--> Animal-Fun
  Animal.prototype --_proto_-->Object.prototype
  Animal.prototype --constructor--> Animal-Fun
  Animal-Fun--prototype--> Animal.prototype
  Animal-Fun--constructor-->Function-Fun
  Animal-Fun--_proto_-->Function.prototype
  Object.prototype--constructor-->Object-Fun
  Object.prototype --_proto_-->null
  Object-Fun--_proto_-->Function.prototype
  Object-Fun--constructor-->Function-Fun
  Function-Fun--_proto_-->Function.prototype
  Function-Fun--prototype-->Function.prototype
  Function-Fun--constructor-->Function-Fun
  Function.prototype --constructor-->Function-Fun
  Function.prototype--_proto_-->Object.prototype
~~~
~~~mermaid
graph LR;
  Dog--__proto__-->Animal.prototype
  Dog--constructor-->Animal-Fun
  Animal.prototype--constructor-->Animal-Fun
  Animal.prototype--__proto__-->Object.prototype
  Object.prototype--constructor --> Object-Fun
  Object.prototype--__proto__ --> Null
  Animal-Fun--constructor-->Function-Fun
  Animal-Fun--prototype-->Animal.prototype
  Animal-Fun--__proto__-->Function.prototype
  Function-Fun--constructor-->Function-Fun
  Function-Fun--__proto__-->Function.prototype
  Function-Fun--prototype-->Function.prototype
  Function.prototype--constructor-->Function-Fun
  Object-Fun--__proto__-->Function.prototype
  Object-Fun--constructor-->Function-Fun
  Object-Fun--prototype-->Object.prototype
~~~
## js继承 
寄生继承
function father(val) {
  this.name = val
}
father.prototype.say = function(val) {
  console.log(this.name + '说:' + val)
}
function child() {
  father.call(this)
}
child.prototype  = Object.create(father.prototype)
child.prototype.constructor = child.constructor

todo watch video
// apply call bind
call
Function.prototype.myApply = function(ctx) {
  let ctx = ctx || window
  ctx.fn = this
  let args = ''
  for(let i = 1; i< arguments.length; i++) {
    args += 'arguments'+ '['+ i +']'
  }
  let res= eval('ctx.fn('+ args + ')')
  delete ctx.fn
  return res
}

apply
Function.prototype.myApply = function(ctx, arr) {
  let ctx = ctx || window
  ctx.fn = this
  let args = ''
  if(arr) {
    for(let i = 0; i < arr.length; i++) {
      args += 'arr[' + i+ ']'
    }
  }
  let res= eval('ctx.fn(+ 'args+ ')')
  delete ctx.fn
  return res
}

bind


更改this绑定

箭头函数的 this 始终指向函数定义时的 this，而非执行时。
// 输入地址到显示页面
// 常用算法
// 防抖节流
防抖
function de(fn, delay) {
  let timer = null
  return function() {
    window.clearInterval(timer)
    timer = setTimeout(()=> {
      fn()
    },daley)
  }
}
节流
function jieliu(fn, delay) {
  let timer = null
  return function() {
    if(!timer) {
      timer = setTimeout(()=> {
        fn()
        timer = null
      },daley)
    }
  }
}
// 数据劫持
Object.defineProperty
proxy
vue双向绑定
mvvm
生命周期
三次握手


js数组

slice 切片 不改变原数组
splice 拼接 改变原数组 万能方法 三个参数 第一个为开始索引， 第二个为切去的数量 第三个为添加的元素

forEach循环不能打断 只能用try catch返回 推荐使用some  every替换 

# 高阶函数
## reduce
function flatten(ary) {
    return ary.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
}
let ary = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(ary))


## map
## filter

axios

手写 call  apply  bind 

手写instanceOf
function myInstanceOf(left, right) {
    if(left == null || typeof left !== 'object') return false
    let proto = Object.getPrototypeOf(left)
    while(true) {
        if(proto === null) return false
        if(proto == right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}


## 手写new

function myNew(obj, ...args) {
  let newObj = {}
  newObj.__proto__ = obj.prototype
  let res = obj.apply(newObj, args)
  return typeOf res === 'object' ? res : newObj
}


如何让a==1&& a==2
let a = {
  name = 0
  valueOf = (){
    return this.name++
  }

}
promise



https


vue 相关知识


http

报文结构

```