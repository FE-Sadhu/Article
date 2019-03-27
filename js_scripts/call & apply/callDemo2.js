function Pig(weight, age) {
  console.log(this.taste);
  console.log(this.name);
  console.log(weight);
  console.log(age);
}

const foo = {
  taste: 'delicious',
  name: 'honey'
}

Pig.call(foo, 100, 6);