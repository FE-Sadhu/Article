var person = {};

Object.defineProperties(person, {
  name: {
    value: 'sadhu',
    writable: false,
    configurable: false
  },
  age: {
    get: function() {
      return this.value || 21
    },
    set: function(value) {
      this.value = value;
    }
  }
})

var desc = Object.getOwnPropertyDescriptor(person, 'name');

console.log(desc);