var arr = [1, 1, '1', '1', 2, 3, 4, 4, 3];



function unique(arr) {
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    if(res.indexOf(arr[i]) === -1) {
      res.push(arr[i]);
    }
  }

  return res;
}

console.log(unique(arr));