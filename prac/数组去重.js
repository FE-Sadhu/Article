const arr = [1, 1, '1', 2, '2', '1', 3, 4, 1, 4];

// 兼容方法
function unique(arr) {
  const ret = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < ret.length; j++) {
      if (ret[j] === arr[i]) break; // 双等号的话可以连类似 '1'也去重了
    }
    if (j === ret.length) {
      ret.push(arr[i]);
    }
  }
  return ret;
}

// indexOf

function unique (arr) {
  const ret = []
  arr.forEach(item => {
    if (ret.indexOf(item) === -1) {
      ret.push(item);
    }
  })
  return ret;
}

// filter
function unique (arr) {
  const ret = arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  })
  return ret
}

// ES6 set
function unique (arr) {
  return Array.from(new Set(arr));
}
