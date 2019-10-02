function copyNew (fn) {
  var obj = new Object();
  var constructor = [].shift.call(arguments);

  obj.__proto__ = constructor.prototype

  var result = constructor.apply(obj, arguments);

  return typeof result === 'object' ? result : obj;
}
