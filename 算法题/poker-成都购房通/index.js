// https://b1.rippletek.com/games/poker.html

// Game #1 - Poker
// Provided:

// There are 52 cards in a deck and 2 players - Leon & Judy
// Each player will take a hand of 5 cards from the same deck
// A number is assigned for each rank (table 1)
// A	2	3	4	5	6	7	8	9	10	J	Q	K
// 1	2	3	4	5	6	7	8	9	10	10	10	10
// The score of a hand is calculated with the steps below
// Identify 3 cards in 5 whose sum is divisible by 10
// If such 3-cards group can be identified, the score of 5-cards group is the sum of 2 rest cards if the sum is not greater than 10, or else it is the sum minus 10.
// If such 3-cards group can not be identified, the score is 0
// e.g score(J, Q, K, 5, 8) = 3, score(2, Q, K, 5, 3) = 10, score(A, 2, 3, 4, A) = 0, score(5, 6, 10, 9, 3) = 3
// If Leon's score is higher than Judy's then Leon beats Judy and vice visa
// If Leon's score equals Judy's then their highest rank will be compared in ascending order described in table 1 above. Therefore, hand (J, Q, K, 5, 8) beats (5, 6, 10, 9, 3)
// If the scores and the highest ranks of two hands both equal then the suits of cards with the highest rank will be compared in order spade(S) > heart(H) > club(C) > diamond(D). Therefore, "H9S7CAC2D7" (heart 9, spade 7, club A, club 2 and diamond 7) beats "D9D5C6S5DA".
// I made a record for every game they played that day in format '<Leon's hand>;<Judy's hand>' (e.g "H9S7CAC2D7;D9D5C6S5DA"). But they played so many times that I was totally lost. Could you please help me find out who won more?
// Please write a program to generate two files - leon.txt for Leon's winning records and judy.txt for Judy's (the order of lines must be kept).

// I tried my best to keep the correctness of my record but feel free to skip it if you find any game that doesn't make sense.

// You may download my record at here.

// For your quick verification, the first 3 lines of leon.txt should be:

// C9D7D9S7D2;HAC5S8D8C10
// DQSJD8C4DA;H3C9H7D6S2
// S5HAHJS9DQ;D3S7C6D6S3
// Thank you!

// Please send your code (test code must be provided as well) to code@rippletek.com

const fs = require('fs')


// C9D7D9S7D2;HAC5S8D8C10
// DQSJD8C4DA;H3C9H7D6S2
// S5HAHJS9DQ;D3S7C6D6S3

// 返回数字
function getNumber(val) {
  if(val == 'A') return 1
  if(!isNaN(parseInt(val))) {
    return parseInt(val)
  } 
  return 10
}
// 返回去除花色数字数组
function getCardValue(str) {
  let res = []
  for(let i = 1; i < str.length; i = i+2) {
    res.push(getNumber(str[i]))
  }
  return res
}
// 获取两个数加起来和为target
function twoSum(arr, sta, target) {
  let res = []
  let start = sta,
      end = arr.length-1;
  while(start < end) {
    let left = arr[start],
        right = arr[end]
    if((left + right) > target) {
      while(right === arr[end]) {
        end--
      }
    } else if((left + right) < target) {
      while(left === arr[start]) {
        start++
      }
    } else {
      res.push([left, right])
      while(left === arr[start]) {
        start++
      }
      while(right === arr[end]) {
        end--
      }
    }
  }
  return res
}

// 三个数加起来为target
function threeSum(arr, target) {
  arr = arr.sort()
  let res = []
  for(let i = 0; i < arr.length-1; i++) {
    let tempTarget = target - getNumber(arr[i])
    if(twoSum(arr, i+1, tempTarget).length > 0) {
      res.push([arr[i]].concat(...twoSum(arr, i+1, tempTarget)))
    }
  }
  return res
}
// 读取文件
// 封装promise读取文件
let myReadFile = function(src) {
  return new Promise((resolve, reject) =>{
    fs.readFile(src, 'utf8' , (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })
}



// 将序列转化为数组
myReadFile('LJ-poker.txt').then(res =>{
  // let arr = res.split(";").join('\n').split("\n")
  let arr = 'C9D7D9S7D2;HAC5S8D8C10;DQSJD8C4DA;H3C9H7D6S2;S5HAHJS9DQ;D3S7C6D6S3;C8CKS9H6;D4S8HQC2DA;C9D7D9S7D2;HAC5S8D8C10;C7H9D6S2D9;S7S9D10D3C7;D6D8C8S10C5;CKH9S6S7H3;DQSJD8C4DA;H3C9H7D6S2;S5HAHJS9DQ;D3S7C6D6S3;H5S8D7S2;C3S7S9S3S5;D9DAD5H10;S2C5H5DKH9;D3S6C7DJDQ;D8C8D2H7C6'.split(";")
  let leon = [],
      judy = []
  arr.forEach((item, index) => {
    if(index % 2) {
      judy.push(item)
    } else {
      leon.push(item)
    }
  });
  // 遍历judy和leon的手牌
  let leonMap = {}
  let judyMap = {}
  for(let i = 0; i < leon.length; i++) {
    if(leon[i].length != 10 || judy[i].length != 10 ) {
      continue;
    }
    // 去除花色显示
    let leonHand = getCardValue(leon[i])
    let judyHand = getCardValue(judy[i])
    // 寻找three sum

    judyMap[i] = threeSum(judyHand, 10).concat(threeSum(judyHand, 20)).concat(threeSum(judyHand, 30))
    leonMap[i] = threeSum(leonHand, 10).concat(threeSum(leonHand, 20)).concat(threeSum(leonHand, 30))
  }
  console.log(leonMap)
  console.log(judyMap)
  // 通过map中保存的对战数据进行比较
  


}).catch(err => {
  console.log(err)
})