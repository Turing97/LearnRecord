let arr6 =[1,3,4,5,6,7,8,9]

let offer6 = function (arr: number[]) {
  let res = []
  if(arr.length > 0) {
    let helper = function(array, index) {
      res.push(array[index])
      if(array[index + 1]) {
        helper(array, index + 1)
      }
    }
    helper(arr, 0)
  }
  return res.reverse()
  
}
let result = offer6(arr6)
result