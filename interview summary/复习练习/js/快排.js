
function quickSort(arr) {
	quick(arr, 0, arr.length - 1)
	return arr
}

function quick(arr, left, right) {
	let index
	if (arr.length > 1) {
		index = partition(arr, left, right)
		if (left < index - 1) {
			quick(arr, left, index - 1)
		}
		if (right > index) {
			quick(arr, index, right)
		}
	}
	return arr
}

function partition(arr, left, right) {
	let pivot = arr[Math.floor((left + right) / 2)]
	let i = left;
	let j = right;

	while(i <= j) {
		while(arr[i] < pivot) {
			i++
		}
		while(arr[j] > pivot) {
			j--
		}

		if (i <= j) {
			swap(arr, i, j);
			i++;
			j--;
		}
	}

	return i
}

function swap(arr, i, j) {
	const tmp = arr[i]
	arr[i] = arr[j]
	arr[j] = tmp
}

let arr = [3, 5, 1, 6, 4, 7, 2]

console.log(quickSort(arr))