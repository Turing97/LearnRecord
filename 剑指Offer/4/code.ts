//在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
let array4: number[][]= [[1,3,4,6],[7,8,9,11],[12,13,15,17]]

let offer4 = function (arr: number[][], target: number) {
  let res = false
  if (arr.length === 0 || arr[0]?.length === 0) {
    return false
  }
  let row = 0
  let column = arr[0].length - 1
  while(row < arr.length && column >= 0) {
    if (arr[row][column] === target){
      console.log(row, column)
    }
    if (arr[row][column] > target) {
      column--
    } else {
      row ++
    }
  }
}
offer4(array4, 1)