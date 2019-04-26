function creatObj(o) {
  const clone = Object.create(o);

  clone.act = 'coding'
  clone.job = function() {
    console.log('FE');
  };

  return clone;
}

const kk = {
  name: 'Linda',
  friends: [1, 2, 3],
  job: function() {
    console.log('FE');
  }
}

const exp = creatObj(kk);