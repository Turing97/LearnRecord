// 将字符串中的空格替换城 %20


let str51:string = "I Am HappyHappyHappyHappy HappyHappyHappyHappy"


let offer51 = function (str: string) {
  let blankCount = 3
  let arr = str.split('')
  // for(let i = 0; i < arr.length; i++) {
  //   if(arr[i] === ' ') {
  //     blankCount++
  //   }
  // }
  let resArr = []
  resArr.length = arr.length + 2 * blankCount - blankCount * 1
  for(let i = resArr.length - 1, j = arr.length - 1; j != -1; j--,i--) {
    if(arr[j] === ' ') {
      resArr[i] = '2'
      i--
      resArr[i] = '%'
      continue;
    } else {
      resArr[i] = arr[j]
    }
  }
  // console.log(resArr)
  console.log(resArr.reduce((pre, cur) => {
    return pre+cur
  }))
}




let str5:string = "I Am HappyHappyHappyHappy HappyHappyHappyHappy"

let offer5 = function(str: string) {
  let arr = str.split('')
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === ' ') {
      arr[i] = '%2'
    }
  }
  console.log(arr.reduce((pre, cur) => {
    return pre+cur
  }))
}


console.time('2222')
offer51(str51)
console.timeEnd('2222')

console.time('1111')
offer5(str5)
console.timeEnd('1111')





// 斐波那契数列
let fec = function (num: number) {
  if(num <= 1) {
    return num
  }
  if (num === 2) {
    return 1
  }
  return fec(num - 1) + fec(num - 2)
}
let res = fec(11)
res

// 避免重复运算 将之前的计算结果保存在数组中
let fec1 = function (num: number, arr: number[]) {
  if (arr[num]) {
    return arr[num]
  } else {
    arr[num] = fec1(num - 1, arr) + fec1(num - 2, arr)
    return arr[num]
  }
}

console.log(fec1(11, [0,1,1]))

