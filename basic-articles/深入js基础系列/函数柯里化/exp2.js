function print(name, song) {
  console.log(name + '喜欢的歌曲是：' + song);
}

// 对上面的函数进行柯里化后

function curryingPrint(name) {
  return function(song) {
    console.log(name + '喜欢的歌曲是：' + song);
  }
}

var tomLike = curryingPrint('Tom');
tomLike('七里香');
var jerryLike = curryingPrint('Jerry');
jerryLike('雅俗共赏');
