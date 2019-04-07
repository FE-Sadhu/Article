const obj = {
  value: 1
}

function bar () {
  console.log(this.value);
  return this.value;
}

const newBar = bar.bind(obj);

newBar()