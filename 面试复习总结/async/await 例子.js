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
