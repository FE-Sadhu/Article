var arr = [1, 1, '1', '1', 2, 3, 4, 4, 3];

function unique(arr) {
  var value = new Map();
  return arr.filter((item) => !value.has(item) && value.set(item, 1));
}

console.log(unique(arr));