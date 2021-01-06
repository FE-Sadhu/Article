// 实现一个Queue类，要求包含两个函数
// task函数：新增一个任务。包含两个参数，等待时间和回调函数
// start函数：执行任务队列。将所有任务按队列顺序执行，执行完一个任务才能执行下一个任务
// ps：下面代码，实现添加3个任务，然后执行3个任务。隔1秒，打印1；再隔2秒，打印2；再隔1秒，打印3

class Queue {
  constructor () {
    this.subs = []
  }
  task (wait, cb) {
    this.subs.push(() => {
      setTimeout(() => {
        cb()
      }, wait)
    })
    return this
  }
  async start () {
    for (let i=0; i < this.subs.length; i++) {
      await this.subs[i]
    }
  }
}