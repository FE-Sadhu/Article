{
  let list = new Set()
  list.add(5);
  list.add(7);

  console.log('size', list.size);
}

{
  let arr = [1,2,3,4,5];
  let list = new Set(arr);

  console.log('size', list.size);
}

{
  let list = new Set();

  list.add(1);
  list.add(2);
  list.add(1);

  console.log('list', list);

  let arr = [1,2,3,1,2,'2'];

  let list2 = new Set(arr);
  console.log('list2', list2);
}

{
  let arr = ['add', 'delete', 'clear', 'has']; // Set是有这么几个方法

  let list = new Set(arr);

  console.log('has', list.has('add'));
  console.log('delete', list.delete('add'), list);
  
  console.log('list', list.clear(), list);
}

{ // 遍历
  let arr = ['add', 'delete', 'clear', 'has']; // Set是有这么几个方法
  let list = new Set(arr);

  for(let key of list.keys()) {
    console.log('keys', key);
  }
  for(let value of list.values()) { // 默认遍历list的话就是list.values()
    console.log('value', value);
  }

  for(let value of list) { // 默认遍历list的话就是list.values()
    console.log('value', value);
  }

  list.forEach(function(item) { console.log(item);});
}

{
  let weakList = new WeakSet(); // 1、支持的数据类型与Set不一样，只能是对象。2、WeakSet中的对象都是弱引用，不与垃圾回收机制挂钩。

  let arg = {};

  weakList.add(arg);
// weakList.add(2); 这样写会报错,支持的数据类型只能是对象。
  console.log(weakList);

  // weakSet没有clear方法，没有size属性，不能遍历
}

{// Map类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
  let map = new Map();

  let arr = ['123'];

  map.set(arr, 456) // Set添加元素是用add， Map添加元素是用set，格式是key 和 value

  console.log('map', map, map.get(arr));
}

{
  let map = new Map([['a', 123], ['b', 456]]); // 这是这种方式定义的格式

  console.log('map args', map);

  console.log('size', map.size);

  console.log('delete', map.delete('a'), map);

  console.log('clear', map.clear(), map);

  // map的遍历的api与set是一模一样的
}

{ // weakMap 
  let weakmap = new WeakMap(); // 与map的区别是 1.key值必须是对象 2.没有size clear方法 3.不能遍历

  let o = {};

  weakmap.set(o, 123);

  console.log(weakmap.get(o), weakmap);
}