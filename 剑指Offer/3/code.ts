// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

let array: Array<number> = [1,3,2,3,2,1,4,5]


// 排序后直接遍历 时间复杂度为 O(nlogn) 空间复杂度O(1)
let a =  function(arr: Array<number>) {
  for (let i = 0; i < arr.length; i++) {
    let j = i + 1
    while (j < arr.length) {
      if (arr[i] > arr[j]) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
        // arr[i], arr[j] = arr[j], arr[i]
      }
      j++
    }
  }
  console.log(arr)
  for(let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      console.log(arr[i])
    }
  }
}
// a(array)

// 通过map键值对方式 时间复杂度为O(n) 空间复杂度为 O(n)

let b =  function(arr: Array<number>) {
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    if(map[arr[i]] > -1) {
      console.log(arr[i])
      continue;
    }
    map[arr[i]] = i
  }
}
b(array)

//
let c = function(arr: Array<number>) {
  for (let i = 0; i < arr.length; i++) {
    while(arr[i] != i) {
      if(arr[i] === arr[arr[i]]){
        console.log(arr[i])
        break;
      } else {
        [arr[i], arr[arr[i]]] = [arr[arr[i]], arr[i]]
      }
      
    }

  //   const num = arr[i];
  //   if (num === i) {
  //       continue;
  //   }

  //   if (num === arr[num]) {
  //       console.log(num)
  //       // return num;
  //       continue;
  //   } else {
  //       [arr[i], arr[num]] = [arr[num], arr[i]];
  //   }
  // }
  }
  
}
// c(array)

