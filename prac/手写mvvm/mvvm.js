function Mvvm (options = {}) {
  this.$options = options;
  let data = this._data = this.$options.data;

  // 数据劫持，也就是给对象每个属性加上 setter getter
  observe(data);

  // 数据代理 把 this 代理成 this.$options.data
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get () {
        return this._data[key];
      },
      set (newVal) {
        if (val === newVal) return;
        this._data[key] = newVal;
      }
    })
  }

  // 初始化 computed,将 this 指向实例
  initComputed.call(this);

  // 数据编译
  new Compile(options.el, this);

  options.mounted.call(this); // 这就实现了mounted钩子函数
}

function initComputed() {
  let vm = this;
  let computed = this.$options.computed;
  Object.keys(computed).forEach(key => {
    Object.defineProperty(vm, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set() {}
    })
  })
}

function Observe (data) {
  let dep = new Dep();
  for (let key in data) {
    let val = data[key];
    observe(val); // 递归向下找，若是对象，实现深度数据劫持
    Object.defineProperty(data, key, {
      configurable: true,
      get () {
        Dep.target && dep.addSub(Dep.target); // 将 watcher 实例添加到订阅事件中
        return val
      },
      set (newVal) {
        if (val === newVal) return;
        val = newVal;
        observe(val); // 设置为新值后，也要深度劫持新值
        dep.notify();
      }
    })
  }
}

function observe(data) {
  if (!data || typeof data !== 'object') return;
  return new Observe(data);
}

function Compile(el, vm) {
  vm.$el = document.getElementById(el);

  // 把 el 下的所有节点都移到内存中，放入文档碎片中处理，节省开销
  let fragment = document.createDocumentFragment();
  let child;
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child); // 将 el 中的内容移到内存中
  }

  // 对 el 里面的内容进行替换
  function replace (frag) {
    Array.from(frag.childNodes).forEach(node => {
      let txt = node.textContent; // 取出第一层子节点以及它自身的后代节点中的文本内容
      let reg = /\{\}\(.*?){\}\}/g;

      if (node.nodeType === 3 && reg.test(txt)) { // 既是文本节点又包含大括号的
        function replaceTxt () {
          node.textContent = txt.replace(reg, (matched, placeholder) => {
            new Watcher(vm, placeholder, replaceTxt); // 监听变化，进行匹配替换内容

            return placeholder.split('.').reduce((val, key) => {
              return val[key];
            }, vm)
          })
        }
        replaceTxt();
      }
      // 下面就是双向绑定
      if (node.nodeType === 1) { // 元素节点
        let nodeAttr = node.attributes; // 获取 dom 上所有属性，是个类数组
        Array.from(nodeAttr).forEach(attr => {
          let name = attr.name;
          let exp = attr.value;
          if (name.includes('v-')) {
            node.value = vm[exp]
          }

          new Watcher(vm, exp, () => {
            exp.split('.').reduce((val, key) => {
              val = val[key]
            }, vm)
            node.value = val;
          })

          node.addEventListener('input', e => {
            let newVal = e.target.value;
            vm[exp] = newVal;
          })
        })
      }

      // 如果还有子节点，递归replace
      if (node.childNodes && node.childNodes.length) {
        replace(node);
      }
    })
  }

  replace(fragment);

  vm.$el.appendChild(fragment);
}

// 发布订阅
function Dep () {
  this.subs = []; // 维护一个数组存放订阅者
}

Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  notify () {
    // 绑定的方法都有一个 update 方法
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

// 监听函数
// 通过 Watcher 创建的实例，都有 update 方法
function Watcher (vm, exp, fn) {
  this.fn = fn;
  this.vm = vm;
  this.exp = exp;

  Dep.target = this;
  let arr = this.exp.split('.');
  let val = vm;
  arr.forEach(key => {
    val = val[key]; //  触发 get，添加订阅者
  })
  Dep.target = null;
}

Watcher.prototype.update = function () {
  this.fn()
}


