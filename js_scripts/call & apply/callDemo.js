function Pig(name, taste) {
  this.name = name;
  this.taste = taste;
}
function Cat(name, taste) {
  Pig.call(this, name, taste);
  this.shape = 'cute';
}

console.log(new Cat('honey', 'delicious').name)