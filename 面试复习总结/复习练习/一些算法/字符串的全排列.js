/**
 * 输入一个字符串，打印出该字符串中字符的所有排列。例如输入字符串 abc，
 * 则打印出由字符 a、b、c 所能排列出来的所有字符串 abc、acb、bac、bca、cab 和 cba。
 */

function handler(str) {

	const result = []

	function dfs(str, road) {

		if (str.length === 0) {
			result.push(road)
			return
		}

		for (let i = 0; i < str.length; i++) {
			let restStr = str.slice()
      		let cur = restStr.splice(i, 1)
			road += cur

			dfs(restStr, road)

			road = road.slice(0, road.length - 1)
		}
	}

	dfs(str.split(''), '')

	return result
}

console.log(handler('abc'))