function Pig(name) {
  this.name = name;
  console.log(this.name);
  console.log(this.taste);
}

const foo = {
  taste: 'delicious',
  name: "foo's name"
}

Pig.call(foo, 'honey')
console.log(foo.name)