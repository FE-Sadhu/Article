function object(obj) {
  function F() {};
  F.prototype = obj;
  return new F();
}

const kk = {
  name: 'Linda',
  friends: [1, 2, 3],
  job: function() {
    console.log('FE');
  }
}

const exp = object(kk);
const exp2 = object(kk);

exp.name = 'sadhu';
console.log(exp2.name); 