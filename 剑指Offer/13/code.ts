function code(n: number, m:number, k:number) {
  let grid: number[][] = [...new Array(n)]
  for(let i = 0; i < grid.length; i++) {
    grid[i] = [0, 0, 0]
  }
  console.log(grid)
  let canWalk = function(x: number, y:number)  {
    if(x < 0 || y < 0 || x == n || y == m || grid[x][y]) {
      return false
    }
    let total = 0;
    while (x) {
      total += x % 10
      x = Math.floor(x/ 10)
    }
    while (y) {
      total += y % 10
      y = Math.floor(y/ 10)

    }
    return total <= k
  }
  let result = function (x: number, y:number) {
    if(!canWalk(x, y)) return 0;
    ++grid[x][y]
    return 1 + result(x+1, y) + result(x+1, y + 1) + result(x-1, y+1) + result(x-1, y-1)
  }
  return result(0, 0)
}
console.log(code(2,3,1))


