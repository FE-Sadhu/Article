// 百词斩的Robin和Lily非常喜欢开车，他们经常讨论谁开的更好更快。
// 现在有一条公路，起点是0公里，终点是100公里。这条公路被划分为N段，每一段有不同的限速。
// 现在他们从A公里处开始，到B公里处结束。请帮他们计算在不超过限速的情况下，最少需要多少时间完成这段路程。

// 输入：

// 1、第一行为公路划分的段数N

// 2、接下来N行，每行三个正整数，分别是起始点，终止点（前后两段一定保证是连续的），和限速值（单位：公里/小时）

// 3、紧接是要计算的起始点A，和终止点B

//  

// 输出：

// 1、输出为一行，即从A到B需要的最少时间（单位：小时）,精确到小数点后两位

//

// Sample Input:

// 4

// 0 30 10

// 30 40 20

// 40 80 20

// 80 100 5

// 20 60

//

// Sample Output:

// 2.50

// info: 记录每段起始点、终点、限速的数组
// start: 起始点
// end: 终止点

function cal(segment, info, start, end) {
  if (start < 0 || start > 100) return '起点不符合';
  if (segment !== info.length) return '分段不符合';

  let startId, endId, result = 0;
  info.forEach((item, index) => {
    if (start > item[0]) startId = index;
    if (end > item[0]) endId = index;
  })
  
  info.forEach((item, index) => {
    if (index > startId && index < endId) {
      result += (item[1] - item[0]) / item[2];
    }
  })

  result += (info[startId][1] - start) / info[startId][2]
  result += (info[endId][1] - end) / info[endId][2];

  return result.toFixed(2);
  
}
cal(4, [[0,30,10],[30,40,20],[40,80,20],[80,100,5]],20,60)