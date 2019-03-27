// function Pig(name) {
//   this.name = name;
//   console.log(this.name);
//   console.log(this.taste);
// }

const foo = {
  taste: 'delicious',
  name: "foo's name",
  Pig: function() {
    console.log(this.name);
    console.log(this.taste);
  }
}

foo.Pig(); // foo's name, delicious