/**
 * 先不看结论回顾。
 * 
 * 
 * 结论：await 后面的表达式是同步执行的,假如表达式内有异步任务, 那么这一整个 await 就要等表达式的返回值, await 等待的过程是在 js 宿主环境的 Worker 线程中进行的,也就是异步的.'
 * 
 * 
 * 
 * 
 * 
 */

const arr = []

function wrapper() {
	this.init()
}

wrapper.prototype.init = async () => {
	await waitForLaunch()
	console.log('启动页关闭')
}


const waitForLaunch = async () => {
	console.log('waitForLaunch 开始');
	await new Promise((resolve, reject) => {
		console.log('22')
		arr.push(resolve)
		console.log('33')
	})
	console.log('waitForLaunch 结束')
}

const lanunch = async () => {
	console.log('lanunch 开始')
	await initLayers()

	doFinishLaunch()
	console.log('launch 结束')
}

const initLayers = async () => {
	await new Promise((resolve, reject) => { // 这里可以改为数字，去理解
    setTimeout(() => {
      console.log('模拟异步任务1')
      resolve()
      console.log('模拟异步任务2')
    }, 3000)
  })
	console.log('initLayers 结束')
}

const doFinishLaunch = async () => {
	const resolve = arr.pop()
	resolve()
	console.log('doFinishLaunch 结束')
}

new wrapper()

lanunch()

console.log('你猜我哪儿执行？')
