
/*
 先根序遍历: GDAFEMHZ
 中序遍历: ADEFGHMZ
*/

let pre = "GDAFEMHZ"
let vin = "ADEFGHMZ"

let offer7 = function(pre: string, vin: string) {
  let index = vin.indexOf(pre[0])
  if(pre.length > 0 || vin.length > 0) {
  return {
        root: pre[0],
        left: offer7(pre.slice(1, index + 1), vin.slice(0, index)),
        right: offer7(pre.slice(index + 1), vin.slice(index + 1))
      }
    }
  }
let res7 = offer7(pre, vin)
res7