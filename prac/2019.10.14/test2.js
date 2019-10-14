// 实现一个可以返回当前最小值的 栈

// 方案一
const stack = {
  items: [], // 存储栈元素
  add (item) {
    if (this.items.length === 0 ) {
      this.items.push(item);
      this.items.push(item);
    } else {
      let min = this.getMinELement();
      if (item < min) {
        min = item;
      }
      this.items.push(item);
      this.items.push(min);
    }
  },
  remove() {
    this.items.pop();
    return this.items.pop();
  },
  getMinELement () {
    if (this.items.length === 0 ) {
      return null;
    } else {
      return this.items[this.items.length - 1];
    }
  }
}

// 方案二
const Stack = {
  items: [],
  mins: [],
  add (item) {
    if (this.items.length === 0) {
      this.mins.push(item);
    } else {
      if (item < this.mins[this.mins.length - 1]) {
        this.mins.push(item);
      } else {
        this.mins.push(this.mins[this.mins.length - 1]);
      }
    }

    this.items.push(item);
  },
  pop () {
    this.mins.pop();
    return this.items.pop();
  },
  getMin () {
    if (this.items.length) {
      return null;
    } else {
      return this.mins[this.mins.length - 1];
    }
  }
}