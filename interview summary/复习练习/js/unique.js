let a = [1, 1, '1', 2, '1']

function unique(arr) {
  let ret = []

  for (let i = 0; i < arr.length; i++) {
    if (ret.indexOf(arr[i]) === -1) {
      ret.push(arr[i])
    }
  }

  return ret
}

// console.log(unique(a))

/**
 * Set
 * @param {去重数组} arr 
 */
function unique1(arr) {
  return [...new Set(arr)]
}

// console.log(unique1(a))

/**
 * Map + filter
 */

 function unique2(arr) {
   let seen = new Map()
   return arr.filter((item) => !seen.has(item) && seen.set(item, true))
 }

 console.log(unique2(a))