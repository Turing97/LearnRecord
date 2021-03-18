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

const fs = require("fs");

// C9D7D9S7D2;HAC5S8D8C10
// DQSJD8C4DA;H3C9H7D6S2
// S5HAHJS9DQ;D3S7C6D6S3

// 返回数字
function getNumber(val) {
    if (val == "A") return 1;
    if (!isNaN(parseInt(val))) {
        return parseInt(val);
    }
    return 10;
}
// 返回去除花色数字数组
function getCardValue(str) {
    let res = [];
    for (let i = 1; i < str.length; i = i + 2) {
        if(str[i] + str[i+1] == '10') {
            res.push(getNumber(str[i]+str[i+1]));
            i++
        } else {
            res.push(getNumber(str[i]));
        }
    }
    return res;
}
// 获取两个数加起来和为target
function twoSum(arr, sta, target) {
    arr = arr.sort((a,b) => a-b)
    let res = [];
    let start = sta,
        end = arr.length - 1;
    while (start < end) {
        let left = arr[start],
            right = arr[end];
        if (left + right > target) {
            while (right === arr[end]) {
                end--;
            }
        } else if (left + right < target) {
            while (left === arr[start]) {
                start++;
            }
        } else {
            res.push([start, end]);
            while (left === arr[start]) {
                start++;
            }
            while (right === arr[end]) {
                end--;
            }
        }
    }
    return res;
}
// 三个数加起来为target
function threeSum(arr, target) {
    arr = arr.sort((a,b) => a-b);
    let res = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let tempTarget = (target - arr[i]);
        if (twoSum(arr, i + 1, tempTarget).length > 0) {
            res.push([i].concat(...twoSum(arr, i + 1, tempTarget)));
        }
    }
    return res;
}
// 读取文件
// 封装promise读取文件
let myReadFile = function(src) {
    console.log('读取文件')
    return new Promise((resolve, reject) => {
        fs.readFile(src, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
};
let Enum = {
    A: 1,
    J: 11,
    Q: 12,
    K: 13,
};
let TypeEnum = {
    S: 3,
    H: 2,
    C: 1,
    D: 0,
};
// 排序字符串与分数
function sortHand(str) {
    let res = "";
    let tempStr = "";
    for (let i = 0; i < str.length - 1; i = i + 2) {
        if(str[i+1]+str[i+2] == '10') {
            tempStr = tempStr + str[i] + str[i + 1] + str[i+2] + ",";
            i++
        } else {
            tempStr = tempStr + str[i] + str[i + 1] + ",";
        }
    }
    res = tempStr
        .split(",")
        .sort((a, b) => {
            let left = Enum[a.slice(1)] ? Enum[a.slice(1)] : a.slice(1);
            let right = Enum[b.slice(1)] ? Enum[b.slice(1)] : b.slice(1);
            return left - right;
        })
        .join("");
    return res;
}

function getScore(cardArr, arr) {
    if (arr.length == 0) {
        return 0;
    } else {
        // 计算手牌总和
        let total = 0;
        cardArr.forEach((item) => {
            total += item;
        });
        // 获取所有的和为10倍数的情况
        let minus = [];
        arr.forEach((item) => {
            let temp = 0;
            item.forEach((i) => {
                temp += cardArr[i];
            });
            minus.push(temp);
        });
        let res = -1;
        for (let i = 0; i < minus.length; i++) {
            let temres = total - minus[i];
            if (temres == 10) {
                res = 10;
            } else if(temres > 10){
                res = temres - 10;
            } else{
                res = temres
            }
        }
        return res;
    }
}
// 判断手牌大小
function getWinOrLose(leonHand, judyHand) {
    let leonLastHand = sortHand(leonHand).substr(8, 2);
    let judyLastHand = sortHand(judyHand).substr(8, 2);
    // let left = Enum[a[1]] ? Enum[a[1]] : a[1]
    // let right = Enum[b[1]] ? Enum[b[1]] : b[1]
    // if(leonSortedHand[9] > judySHand[9]){}
    if (
        (Enum[leonLastHand[1]] ? Enum[leonLastHand[1]] : leonLastHand[1]) >
        (Enum[judyLastHand[1]] ? Enum[judyLastHand[1]] : judyLastHand[1])
    ) {
        return true;
    } else if (
        (Enum[leonLastHand[1]] ? Enum[leonLastHand[1]] : leonLastHand[1]) <
        (Enum[judyLastHand[1]] ? Enum[judyLastHand[1]] : judyLastHand[1])
    ) {
        return false;
    } else {
        if (TypeEnum[leonLastHand[0]] > TypeEnum[judyLastHand[0]]) {
            return true;
        } else {
            return false;
        }
    }
}
// 将序列转化为数组
myReadFile("LJ-poker.txt")
    .then((res) => {
        
        let arr = res.split("\n");
        // let arr = 'C8D9S8S2C2;D6DJC5SQCQ'.split("\n");
        arr = arr
            .map((item) => {
                if (item.indexOf(";") == -1) {
                    item += ";";
                }
                return item;
            })
            .join(";")
            .split(";");
        let leon = [],
            judy = [];
        arr.forEach((item, index) => {
            if (index % 2) {
                judy.push(item);
            } else {
                leon.push(item);
            }
        });
        
        // 遍历judy和leon的手牌
        let leonMap = {};
        let judyMap = {};
        for (let i = 0; i < leon.length; i++) {
            if (leon[i].length < 10 || judy[i].length < 10) {
                continue;
            }
            // 去除花色显示
            let leonHand = getCardValue(sortHand(leon[i]));
            let judyHand = getCardValue(sortHand(judy[i]));
            // 寻找three sum 
            let leonArr = threeSum(leonHand, 10)
                .concat(threeSum(leonHand, 20))
                .concat(threeSum(leonHand, 30));
            let judyArr = threeSum(judyHand, 10)
                .concat(threeSum(judyHand, 20))
                .concat(threeSum(judyHand, 30));
            
            let leonScore = getScore(leonHand, leonArr);
            let judyScore = getScore(judyHand, judyArr);

            // 通过map中保存的对战数据进行比较
            leonMap[i] = {
                handCard: leon[i],
                score: leonScore,
            };
            judyMap[i] = {
                handCard: judy[i],
                score: judyScore,
            };
            // 判断谁手牌大
            if (leonScore > judyScore) {
                // leon手牌大
                leonMap[i]["win"] = true;
                judyMap[i]["win"] = false;
            } else if (leonScore < judyScore) {
                leonMap[i]["win"] = false;
                judyMap[i]["win"] = true;
            } else {
                // 判断同分情况
                let leonWin = getWinOrLose(leon[i], judy[i]);
                leonMap[i]["win"] = leonWin;
                judyMap[i]["win"] = !leonWin;
            }
        }
        let leonStr = "",
            judyStr = ""
        for (i in leonMap) {
            if(leonMap[i].win) {
                leonStr +=leonMap[i].handCard + ';' + judyMap[i].handCard + '\n'
            } else {
                judyStr +=leonMap[i].handCard + ';' + judyMap[i].handCard + '\n'
            }
        }
        // 写入文件
        fs.writeFile("leon.txt", leonStr, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('成功生成leon的获奖记录 leon.text')
        });
        fs.writeFile("judy.txt", judyStr, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('成功生成judy的获奖记录 judy.text')
        });
    })
    .catch((err) => {
        console.log(err);
    });