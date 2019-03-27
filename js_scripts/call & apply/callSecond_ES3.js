Function.prototype.call2 = function(obj) {
    obj.fn = this;
    const arr = [];
    for (let i = 1, len = arguments.length; i < len; i++) {
        arr.push(arguments[i]);
    }
    eval('obj.fn(' + arr + ')')
}

// have a test
const foo = {
    taste: 'delicious',
    name: 'honey'
}

function Pig(weight, age) {
    console.log(this.taste);
    console.log(this.name);
    console.log(weight, age);
}

Pig.call2(foo, 100, 6);