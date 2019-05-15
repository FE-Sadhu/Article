{
  // obj类似为供应商对象，通过Proxy新生成一个对象monitor，这个对象是映射obj的，做了一些操作，
  // 用户访问的是monitor对象，不管用户是读取/设置monitor对象，最终会通过Proxy再传给obj对象
  let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  };

  let monitor = new Proxy(obj, {
    // 拦截对象属性的读取
    get(target, key) { // target指的是obj原对象，key就是其属性
      return target[key].replace('2017', '2018')
    },
    // 拦截对象设置属性
    set(target, key, value) { // target指的是obj原对象，key就是其属性,value就是属性的值
      if (key === 'name') {
        return target[key] = value
      } else {
        return target[key];
      }
    },
    // 拦截key in object 操作(检查对象是否有某属性)
    has(target, key) {
      if (key === 'name') {
        return target[key]
      } else {
        return false
      }
    },
    // 拦截delete
    deleteProperty(target, key) {
      if (key.indexOf('_') > -1) {
        delete target[key];
        return true
      } else {
        return target[key]
      }
    },
    // 拦截Object.keys, Object.getOwnPropertySymbols, Object.hgetOwnPropertyNames
    ownKeys(target) {
      return Object.keys(target).filter(item => item !== 'time')
    }

  }); // obj是需要代理的函数， 第二个参数是设置代理的一些操作

  console.log('get', monitor.time); //get 2018-03-11 这就是代理的作用，但是原对象obj的还是没变的

  monitor.time = '2018'
  console.log('set', monitor.time);

  monitor.name = 'sadhu'
  console.log(monitor.name, monitor); // sadhu Proxy {time: "2017-03-11", name: "sadhu", _r: 123}

  console.log('has', 'name' in monitor, 'time' in monitor);

  // delete monitor.time
  // console.log('delete', monitor);

  // delete monitor._r;
  // console.log('delete', monitor);

  console.log('OwnKeys', Object.keys(monitor)); // OwnKeys (2) ["name", "_r"]
}

{ // Reflect 就是映射对象，间接方便地操作对象
  let obj={
    time:'2017-03-11',
    name:'net',
    _r:123
  };

  console.log('Reflect get',Reflect.get(obj,'time'));
  Reflect.set(obj,'name','mukewang');
  console.log(obj);
  console.log('has',Reflect.has(obj,'name'));
}

{
  function validator(target, validator) {
    return new Proxy(target, {
      _validator: validator,
      set(target, key, value, proxy) {
        if (target.hasOwnProperty(key)) {
          let va = this._validator[key];
          if (!!va(value)) {
            return Reflect.set(target, key, value, proxy);
          } else {
            throw Error(`不能设置${key}为${value}`)
          }
        } else {
          throw Error(`${key} 不存在`);
        }
      }
    })
  }

  const personValidators = {
    name(val) {
      return typeof val === 'string'
    },
    age(val) {
      return typeof val === 'number' && val > 18
    }
  }

  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
      return validator(this, personValidators)
    }
  }

  const person = new Person('sadhu', 21);
  console.log(person);

  person.name = 30; // 不符合拦截的set的限制。抛出不能设置name为30
}