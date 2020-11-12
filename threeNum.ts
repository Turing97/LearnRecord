let arr: Array<number> = [1,2,3,4,5,6,7,8,9,6,7,9,9,3,4,5,6,11,12,13,9,9,7,8,53]

function threeNum(target, arr) {
  arr = arr.sort()
  let res = []
  for (let i = 0; i < arr.length ; i++) {
    let temp = target - arr[i]
    for (let j = i + 1; j < arr.length; j++) {
      let k = arr.length - 1
      while(j < k && arr[j] + arr[k] > temp) {
        k--
      }
      if(k == j) {
        break;
      }
      if(arr[j] + arr[k] === temp) {
        res.push([arr[i], arr[j], arr[k]])
      }
    }
  }
  return res
}
console.log(threeNum(15,arr))


