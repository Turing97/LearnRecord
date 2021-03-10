// // 数组扁平化
// let a = [1,[1,2,43], [1,[1,2,3]]]
// let flatFun = (ary) => {
//   let res = []
//   if(ary instanceof Array) {
//     for(let item of ary) {
//       res = res.concat(flatFun(item))
//     }
//   } else {
//     res.push(ary)
//   }
//   return res
// }
// // console.log(flatFun(a))
// // console.log(a.flat(Infinity))

// function flatten(input) {
//   return input.toString().split(',').map(item => +item);
//   // return input.join().split(',').map(item => +item);
//   // return input.join(',').split(',').map(item => +item);
// }
// console.log(flatten(a)); //[1, 2, 3, 1, 2, 3, 4, 2, 3, 4]


// // 二分查找
// let b = [1,2,4,5,6]
// function erfen(ary, target) {
//   ary = ary.sort()
//   if(target < ary[0] || target > ary[ary.length-1]) return '不存在'
//   let left = 0, right = ary.length;
//   while(left < right) {
//     let mid = Math.floor((left + right) /2)
//     if(ary[mid] == target) {
//       return mid
//     }
//     if(ary[mid] > target) {
//       right = mid 
//     }else {
//       left = mid + 1
//     }
//   }
//   return '不存在'
// }
// console.log(erfen(b, 3))

// // 插入排序
// function insertSort() {

// }
// 冒泡排序
// 数组去重
// 选择排序
function selectSort(ary) {
  for(let i = 0; i< ary.length; i++) {
    let min = ary[i]
    let index = i
    let j = i
    while(j< ary.length) {
      j++
      if(ary[j] < min) {
        index = j
        min = ary[j]
      }
    }
    let temp = ary[i]
    ary[i] = min
    ary[index] = temp
  }
  return ary
}
console.log(selectSort([11,2,19,2,3]))
// 生成长度为n的斐波那契

// 斐波那契数组 1 1 2 3 5 8
// n = n-1 + n -2
// n + n + 1 = n + 2

// 累加
function feb(len) {
  let res = [0]
  if(len ==0) {
    return res
  }
  if(len == 1) {
    res = [1]
  }
  res = [0,1]
  if(len > 2) {
    let ind = 2
    while(ind < len) {
      res.push(res[ind - 1] + res[ind - 2])
      ind++
    }
  }
  return res
}
// 递归
function feb1(len) {
  if(len < 3) {
    return len-1
  } else {
    return feb1(len-1) + feb1(len-2)
  }
}
function feb2(len) {
  let res = []
  res.push()
}
console.log(feb1(6))
// 返回第n个斐波那契

