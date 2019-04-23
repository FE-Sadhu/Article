function add(a, b) {
  return a + b;
}

function curryingAdd(a) {
  return function(b) {
    return a + b;
  }
}