// 将字符串中的空格替换城 %20

let str5:string = "I Am Happy"

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
// offer5(str5)


let offer51 = function (str: string) {
  let blankCount = 0
  let arr = str.split('')
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === ' ') {
      blankCount++
    }
  }
  let resArr = []
  resArr.length = arr.length + 2 * blankCount - blankCount * 1
  console.log(resArr.length)
  for(let i = resArr.length - 1, j = arr.length - 1; j != -1; j--,i--) {
    if(arr[j] === ' ') {
      console.log('11111111111')
      resArr[i] = '2'
      i--
      resArr[i] = '%'
      continue;
    } else {
      resArr[i] = arr[j]
    }
  }
  // console.log(resArr)
}
offer51(str5)